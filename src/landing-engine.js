(() => {
  'use strict';

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ======================================================================
     1. Thème — système par défaut, choix explicite persistant
     ====================================================================== */
  const root = document.documentElement;
  const STORE = 'murabbi-theme';
  try {
    const saved = localStorage.getItem(STORE);
    if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  } catch (_) { /* stockage indisponible : on reste sur le thème système */ }

  document.getElementById('theme-toggle').addEventListener('click', () => {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const current = root.getAttribute('data-theme') || (systemDark ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem(STORE, next); } catch (_) {}
    drawChart();
  });

  /* ======================================================================
     2. Calcul solaire (NOAA) → horaires de prière
        Convention : Ligue Islamique Mondiale (Sobh −18°, Isha −17°),
        Asr méthode standard (ombre = 1× la hauteur).
        Vérifié contre le moteur de l'application Flutter sur Dakar,
        23/08/2026 : Sobh, Dhuhr et Asr identiques à la minute,
        Maghrib et Isha à une minute près.
     ====================================================================== */
  const RAD = Math.PI / 180;

  const CITIES = {
    dakar:     { label: 'Dakar',     lat: 14.7167, lon: -17.4677, tz: 0,  dst: null },
    abidjan:   { label: 'Abidjan',   lat: 5.3600,  lon: -4.0083,  tz: 0,  dst: null },
    paris:     { label: 'Paris',     lat: 48.8566, lon: 2.3522,   tz: 1,  dst: 'eu' },
    bruxelles: { label: 'Bruxelles', lat: 50.8503, lon: 4.3517,   tz: 1,  dst: 'eu' },
    tunis:     { label: 'Tunis',     lat: 36.8065, lon: 10.1815,  tz: 1,  dst: null },
    istanbul:  { label: 'Istanbul',  lat: 41.0082, lon: 28.9784,  tz: 3,  dst: null },
    riyad:     { label: 'Riyad',     lat: 24.7136, lon: 46.6753,  tz: 3,  dst: null }
  };

  const ANCHORS = [
    { key: 'fajr',    label: 'Sobh' },
    { key: 'sunrise', label: 'Lever du soleil' },
    { key: 'dhuhr',   label: 'Dhuhr' },
    { key: 'asr',     label: 'Asr' },
    { key: 'maghrib', label: 'Maghrib' },
    { key: 'isha',    label: 'Isha' }
  ];
  // Les cinq prières affichées sur la carte d'accueil (le lever du soleil
  // borne une fenêtre mais n'est pas une prière).
  const PRAYERS = ANCHORS.filter(a => a.key !== 'sunrise');

  function julianDay(y, m, d) {
    if (m <= 2) { y -= 1; m += 12; }
    const A = Math.floor(y / 100);
    const B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;
  }

  function sunPosition(jd) {
    const T = (jd - 2451545) / 36525;
    const L0 = (280.46646 + T * (36000.76983 + T * 0.0003032)) % 360;
    const M = 357.52911 + T * (35999.05029 - 0.0001537 * T);
    const e = 0.016708634 - T * (0.000042037 + 0.0000001267 * T);
    const C = Math.sin(M * RAD) * (1.914602 - T * (0.004817 + 0.000014 * T))
            + Math.sin(2 * M * RAD) * (0.019993 - 0.000101 * T)
            + Math.sin(3 * M * RAD) * 0.000289;
    const trueLong = L0 + C;
    const omega = 125.04 - 1934.136 * T;
    const lambda = trueLong - 0.00569 - 0.00478 * Math.sin(omega * RAD);
    const eps0 = 23 + (26 + (21.448 - T * (46.815 + T * (0.00059 - T * 0.001813))) / 60) / 60;
    const eps = eps0 + 0.00256 * Math.cos(omega * RAD);
    const decl = Math.asin(Math.sin(eps * RAD) * Math.sin(lambda * RAD)) / RAD;
    const y = Math.pow(Math.tan(eps / 2 * RAD), 2);
    const eqTime = 4 * (y * Math.sin(2 * L0 * RAD)
                  - 2 * e * Math.sin(M * RAD)
                  + 4 * e * y * Math.sin(M * RAD) * Math.cos(2 * L0 * RAD)
                  - 0.5 * y * y * Math.sin(4 * L0 * RAD)
                  - 1.25 * e * e * Math.sin(2 * M * RAD)) / RAD;
    return { decl, eqTime };
  }

  // zen : distance zénithale en degrés (90,833 = horizon avec réfraction).
  function hourAngle(lat, decl, zen) {
    const c = (Math.cos(zen * RAD) - Math.sin(lat * RAD) * Math.sin(decl * RAD))
            / (Math.cos(lat * RAD) * Math.cos(decl * RAD));
    if (c > 1 || c < -1) return null;   // le phénomène n'a pas lieu ce jour-là
    return Math.acos(c) / RAD;
  }

  // Dernier dimanche du mois `m` (0-indexé) de l'année `y`, en UTC.
  function lastSunday(y, m) {
    const d = new Date(Date.UTC(y, m + 1, 0));
    return d.getUTCDate() - d.getUTCDay();
  }

  // Heure d'été européenne : dernier dimanche de mars 01:00 UTC → dernier
  // dimanche d'octobre 01:00 UTC.
  function euDst(date) {
    const y = date.getUTCFullYear();
    const start = Date.UTC(y, 2, lastSunday(y, 2), 1);
    const end   = Date.UTC(y, 9, lastSunday(y, 9), 1);
    const t = date.getTime();
    return t >= start && t < end ? 1 : 0;
  }

  function utcOffset(city, date) {
    return city.tz + (city.dst === 'eu' ? euDst(date) : 0);
  }

  /** Horaires en heures décimales locales, pour la date `date` (UTC midnight). */
  function prayerTimes(city, date) {
    const y = date.getUTCFullYear(), m = date.getUTCMonth() + 1, d = date.getUTCDate();
    const tz = utcOffset(city, date);
    const jd = julianDay(y, m, d) + (12 - city.lon / 15 - tz) / 24;
    const { decl, eqTime } = sunPosition(jd);
    const noon = 12 - city.lon / 15 - eqTime / 60 + tz;
    const ha = (zen) => hourAngle(city.lat, decl, zen);

    const shadowAngle = Math.atan(1 / (1 + Math.tan(Math.abs(city.lat - decl) * RAD))) / RAD;
    const asrHA = hourAngle(city.lat, decl, 90 - shadowAngle);

    const sub = (h) => (h === null ? null : noon - h / 15);
    const add = (h) => (h === null ? null : noon + h / 15);

    return {
      fajr:    sub(ha(108)),
      sunrise: sub(ha(90.833)),
      dhuhr:   noon + 1 / 60,
      asr:     add(asrHA),
      maghrib: add(ha(90.833)),
      isha:    add(ha(107))
    };
  }

  function fmt(h) {
    if (h === null || Number.isNaN(h)) return '—';
    let t = ((h % 24) + 24) % 24;
    const total = Math.floor(t * 60 + 1e-6);
    return String(Math.floor(total / 60)).padStart(2, '0') + ':' + String(total % 60).padStart(2, '0');
  }

  const midnightUTC = (d) => new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));

  /* ======================================================================
     3. État
     ====================================================================== */
  const state = {
    city: CITIES.dakar,
    dir: 'after',
    anchor: 'fajr',
    offset: 15
  };

  const today = midnightUTC(new Date());

  /* ======================================================================
     4. Carte « aujourd'hui » : date, arc du jour, cinq repères
     ====================================================================== */
  const elDate = document.getElementById('today-date');
  const elArc = document.getElementById('arc');
  const elAnchors = document.getElementById('anchors');
  const elFoot = document.getElementById('today-foot');

  function renderToday() {
    const t = prayerTimes(state.city, today);
    const dateFmt = new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'
    }).format(today);
    elDate.textContent = dateFmt.charAt(0).toUpperCase() + dateFmt.slice(1);

    // Heure locale de la ville choisie, en heures décimales.
    const now = new Date();
    const nowLocal = ((now.getUTCHours() + now.getUTCMinutes() / 60 + now.getUTCSeconds() / 3600)
                     + utcOffset(state.city, now) + 24) % 24;

    // Le prochain repère : la première prière encore à venir.
    let nextKey = null;
    for (const p of PRAYERS) {
      if (t[p.key] !== null && t[p.key] > nowLocal) { nextKey = p.key; break; }
    }

    elAnchors.innerHTML = PRAYERS.map(p => {
      const past = t[p.key] !== null && t[p.key] <= nowLocal;
      return `<div class="anchor" role="listitem"
                   data-next="${p.key === nextKey}" data-past="${past}">
                <p class="anchor-name">${p.label}</p>
                <p class="anchor-time mono">${fmt(t[p.key])}</p>
              </div>`;
    }).join('');

    drawArc(t, nowLocal, nextKey);

    if (nextKey) {
      const mins = Math.max(0, Math.round((t[nextKey] - nowLocal) * 60));
      const h = Math.floor(mins / 60), mm = mins % 60;
      const delay = h > 0 ? `${h} h ${String(mm).padStart(2, '0')}` : `${mm} min`;
      const label = PRAYERS.find(p => p.key === nextKey).label;
      elFoot.textContent = `Prochain repère à ${state.city.label} : ${label}, dans ${delay}. `
        + `Demain, il ne tombera pas à la même minute.`;
    } else {
      elFoot.textContent = `La journée est passée à ${state.city.label}. `
        + `Demain, les cinq repères ne tomberont pas aux mêmes minutes.`;
    }
  }

  /** Arc du jour : de l'aube à la nuit, avec les repères posés dessus. */
  function drawArc(t, nowLocal, nextKey) {
    const W = 480, H = 132, PAD = 22;
    const start = t.fajr !== null ? t.fajr - 0.6 : 4;
    const end = t.isha !== null ? t.isha + 0.6 : 22;
    const span = end - start;
    const x = (h) => PAD + ((h - start) / span) * (W - PAD * 2);
    // Arc : parabole douce, sommet au midi solaire.
    const yOf = (h) => {
      const u = (h - start) / span * 2 - 1;             // −1 … 1
      return H - 26 - (1 - u * u) * (H - 58);
    };

    let path = '';
    for (let i = 0; i <= 60; i++) {
      const h = start + (span * i) / 60;
      path += (i === 0 ? 'M' : 'L') + x(h).toFixed(1) + ' ' + yOf(h).toFixed(1);
    }

    const marks = ANCHORS
      .filter(a => t[a.key] !== null && t[a.key] >= start && t[a.key] <= end)
      .map(a => {
        const cx = x(t[a.key]), cy = yOf(t[a.key]);
        const isNext = a.key === nextKey;
        const r = isNext ? 6 : (a.key === 'sunrise' ? 2.6 : 4);
        const fill = isNext ? 'var(--accent)' : 'var(--text-3)';
        const halo = isNext
          ? `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="11" fill="var(--accent)" opacity=".16"/>`
          : '';
        return `${halo}<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r}" fill="${fill}"/>`;
      }).join('');

    const inRange = nowLocal >= start && nowLocal <= end;
    const cursor = inRange
      ? `<line x1="${x(nowLocal).toFixed(1)}" y1="14" x2="${x(nowLocal).toFixed(1)}" y2="${H - 20}"
               stroke="var(--accent)" stroke-width="1" stroke-dasharray="2 4" opacity=".55"/>`
      : '';

    elArc.innerHTML =
      `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" role="img">
         <line x1="${PAD}" y1="${H - 20}" x2="${W - PAD}" y2="${H - 20}"
               stroke="var(--hairline)" stroke-width="1"/>
         <path d="${path}" fill="none" stroke="var(--accent)" stroke-width="1.6"
               stroke-linecap="round" opacity=".45"/>
         ${cursor}${marks}
       </svg>`;
  }

  /* ======================================================================
     5. Graphe de dérive annuelle
     ====================================================================== */
  const chart = document.getElementById('drift-chart');
  const FIXED_MAGHRIB = 19.5;   // « une alarme à 19 h 30 »
  const FIXED_FAJR = 6;         // « une alarme à 6 h 00 »

  function yearSeries() {
    const y = today.getUTCFullYear();
    const out = [];
    for (let i = 0; i < 365; i++) {
      const d = new Date(Date.UTC(y, 0, 1 + i));
      const t = prayerTimes(state.city, d);
      out.push({ i, date: d, fajr: t.fajr, maghrib: t.maghrib });
    }
    return out;
  }

  function drawChart() {
    const data = yearSeries();
    const W = 720, H = 300, L = 46, R = 14, T = 16, B = 34;
    const vals = data.flatMap(p => [p.fajr, p.maghrib]).filter(v => v !== null);
    const lo = Math.floor(Math.min(...vals, FIXED_FAJR) - 0.6);
    const hi = Math.ceil(Math.max(...vals, FIXED_MAGHRIB) + 0.6);

    const x = (i) => L + (i / 364) * (W - L - R);
    const y = (h) => T + (1 - (h - lo) / (hi - lo)) * (H - T - B);

    const line = (key) => data.reduce((acc, p, i) => {
      if (p[key] === null) return acc;
      return acc + (acc === '' ? 'M' : 'L') + x(i).toFixed(1) + ' ' + y(p[key]).toFixed(1);
    }, '');

    // Graduations horaires
    let grid = '';
    for (let h = lo; h <= hi; h++) {
      if ((h - lo) % 2 !== 0) continue;
      grid += `<line x1="${L}" y1="${y(h).toFixed(1)}" x2="${W - R}" y2="${y(h).toFixed(1)}"
                     stroke="var(--hairline)" stroke-width="1"/>
               <text x="${L - 10}" y="${(y(h) + 4).toFixed(1)}" text-anchor="end"
                     font-size="11" fill="var(--text-2)"
                     font-family="Geist Mono, monospace">${String(h).padStart(2, '0')}:00</text>`;
    }

    // Mois
    const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
    let months = '';
    for (let m = 0; m < 12; m++) {
      const idx = Math.round((Date.UTC(today.getUTCFullYear(), m, 1)
                  - Date.UTC(today.getUTCFullYear(), 0, 1)) / 86400000);
      months += `<text x="${x(idx + 14).toFixed(1)}" y="${H - 12}" text-anchor="middle"
                       font-size="11" fill="var(--text-2)"
                       font-family="Geist, sans-serif">${MONTHS[m]}</text>`;
    }

    const fixedLine = (h, label) =>
      `<line x1="${L}" y1="${y(h).toFixed(1)}" x2="${W - R}" y2="${y(h).toFixed(1)}"
             stroke="var(--text-3)" stroke-width="1.5" stroke-dasharray="5 5" opacity=".65"/>
       <text x="${W - R - 4}" y="${(y(h) - 7).toFixed(1)}" text-anchor="end"
             font-size="11" fill="var(--text-2)" font-family="Geist, sans-serif">${label}</text>`;

    chart.innerHTML =
      `<title id="drift-title">Déplacement des horaires sur douze mois</title>
       <desc id="drift-desc">Les courbes du Sobh et du Maghrib ondulent sur toute l'année
       tandis que deux repères d'alarme fixes restent des lignes plates.</desc>
       ${grid}${months}
       ${fixedLine(FIXED_MAGHRIB, 'alarme 19:30')}
       ${fixedLine(FIXED_FAJR, 'alarme 06:00')}
       <path d="${line('maghrib')}" fill="none" stroke="var(--accent)" stroke-width="2.2"
             stroke-linejoin="round" stroke-linecap="round"/>
       <path d="${line('fajr')}" fill="none" stroke="var(--cat-sante)" stroke-width="2.2"
             stroke-linejoin="round" stroke-linecap="round"/>`;

    // Lectures chiffrées
    const amp = (key) => {
      const v = data.map(p => p[key]).filter(h => h !== null);
      if (!v.length) return null;
      const min = Math.min(...v), max = Math.max(...v);
      return { min, max, spread: Math.round((max - min) * 60) };
    };
    const aM = amp('maghrib'), aF = amp('fajr');

    const put = (id, txt) => { document.getElementById(id).textContent = txt; };
    if (aM) {
      put('amp-maghrib', aM.spread + ' min');
      put('amp-maghrib-d', `de ${fmt(aM.min)} à ${fmt(aM.max)} sur l'année, à ${state.city.label}.`);
    }
    if (aF) {
      put('amp-fajr', aF.spread + ' min');
      put('amp-fajr-d', `de ${fmt(aF.min)} à ${fmt(aF.max)} sur l'année, à ${state.city.label}.`);
    }
    const wrong = data.filter(p => p.maghrib !== null
                  && Math.abs(p.maghrib - FIXED_MAGHRIB) * 60 > 15).length;
    put('amp-wrong', String(wrong));
  }

  /* ======================================================================
     6. Simulateur de déclencheur ancré
     ====================================================================== */
  const elSentence = document.getElementById('trigger-sentence');
  const elOffset = document.getElementById('offset');
  const elOffsetVal = document.getElementById('offset-val');

  function anchorLabel(key) { return ANCHORS.find(a => a.key === key).label; }

  function resolveTrigger(date) {
    const t = prayerTimes(state.city, date);
    const base = t[state.anchor];
    if (base === null) return null;
    const delta = (state.dir === 'before' ? -1 : 1) * state.offset / 60;
    return base + delta;
  }

  function addMonths(d, n) {
    return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + n, d.getUTCDate()));
  }

  function renderTrigger() {
    const label = anchorLabel(state.anchor);
    const dirWord = state.dir === 'before' ? 'Avant' : 'Après';
    const off = state.offset;

    elOffsetVal.textContent = off === 0 ? 'pile' : off + ' min';

    const phrase = off === 0
      ? `<b>${dirWord} ${label}</b>, pile.`
      : `<b>${off} minutes ${state.dir === 'before' ? 'avant' : 'après'} ${label}.</b>`;
    elSentence.innerHTML = phrase
      + ` Une seule règle — trois heures différentes, sans que tu y touches.`;

    const cells = [
      ['r-today', today],
      ['r-3m', addMonths(today, 3)],
      ['r-6m', addMonths(today, 6)]
    ];
    for (const [id, d] of cells) {
      document.getElementById(id).textContent = fmt(resolveTrigger(d));
    }
  }

  function bindChips(containerId, attr, key) {
    const box = document.getElementById(containerId);
    box.addEventListener('click', (e) => {
      const btn = e.target.closest('button[' + attr + ']');
      if (!btn) return;
      box.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
      state[key] = btn.getAttribute(attr);
      renderTrigger();
    });
  }
  bindChips('dir-chips', 'data-dir', 'dir');
  bindChips('anchor-chips', 'data-anchor', 'anchor');

  elOffset.addEventListener('input', () => {
    state.offset = Number(elOffset.value);
    renderTrigger();
  });

  /* ======================================================================
     7. Sélecteur de ville
     ====================================================================== */
  document.getElementById('city').addEventListener('change', (e) => {
    state.city = CITIES[e.target.value] || CITIES.dakar;
    renderToday();
    renderTrigger();
    drawChart();
  });

  /* ======================================================================
     8. Cercle : la porte du consentement, démontrée
     ====================================================================== */
  const nudgeDemo = document.getElementById('nudge-demo');
  const nudgeText = document.getElementById('nudge-text');

  const REFUSALS = {
    prayer: "Ton cercle ne peut pas te rappeler une prière : tu n'as pas ouvert ce type de rappel.",
    habit: "Ton cercle ne peut pas te rappeler une habitude : tu n'as pas ouvert ce type de rappel.",
    weekly: "Personne ne peut t'envoyer le récapitulatif du vendredi : tu ne l'as pas ouvert.",
    encouragement: "Même un mot d'encouragement est bloqué : tu ne l'as pas ouvert."
  };

  function renderConsent() {
    const closed = [...document.querySelectorAll('.switch')]
      .filter(s => s.getAttribute('aria-checked') === 'false')
      .map(s => s.getAttribute('data-consent'));

    if (closed.length === 0) {
      nudgeDemo.setAttribute('data-state', 'allowed');
      nudgeText.textContent = "Ton cercle peut te tendre la main sur les quatre motifs. "
        + "Tu peux en refermer un à tout moment — l'effet est immédiat.";
    } else {
      nudgeDemo.setAttribute('data-state', 'blocked');
      nudgeText.textContent = closed.length === 1
        ? REFUSALS[closed[0]]
        : `${closed.length} motifs sont fermés : aucun rappel de ces types ne peut être créé, `
          + `même par un ami bien intentionné.`;
    }
  }

  document.getElementById('consent').addEventListener('click', (e) => {
    const sw = e.target.closest('.switch');
    if (!sw) return;
    sw.setAttribute('aria-checked', sw.getAttribute('aria-checked') === 'true' ? 'false' : 'true');
    renderConsent();
  });

  /* ======================================================================
     9. Grille du mois hégirien (schématique — 30 jours)
     ====================================================================== */
  (() => {
    const box = document.getElementById('month-days');
    if (!box) return;
    const OFFSET = 2;                       // le 1er tombe un mercredi dans ce schéma
    let html = '';
    for (let i = 0; i < OFFSET; i++) html += '<span class="day"></span>';
    for (let d = 1; d <= 30; d++) {
      const dow = (OFFSET + d - 1) % 7;     // 0 = lundi … 4 = vendredi
      const white = d >= 13 && d <= 15;
      html += `<span class="day" data-white="${white}" data-friday="${dow === 4 && !white}">${d}</span>`;
    }
    box.innerHTML = html;
  })();

  /* ======================================================================
     11. En-tête collant + apparitions
     ====================================================================== */
  const header = document.getElementById('header');
  const onScroll = () => header.setAttribute('data-stuck', String(window.scrollY > 8));
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const reveals = document.querySelectorAll('.reveal');
  if (REDUCED.matches || !('IntersectionObserver' in window)) {
    reveals.forEach(el => el.setAttribute('data-shown', 'true'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, n) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.style.transitionDelay = Math.min(n * 60, 240) + 'ms';
        el.setAttribute('data-shown', 'true');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(el => io.observe(el));
  }

  /* ======================================================================
     12. Premier rendu
     ====================================================================== */
  renderToday();
  renderTrigger();
  renderConsent();
  drawChart();

  // La carte d'accueil suit l'heure qui passe.
  setInterval(renderToday, 60000);

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { renderToday(); }, 180);
  });
})();
