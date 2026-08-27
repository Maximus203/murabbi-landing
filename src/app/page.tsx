/* eslint-disable react/no-unescaped-entities -- markup converti mecaniquement
   depuis l'ancien index.html (voir le commit de migration) : les apostrophes
   du francais sont litterales et deja verifiees a l'affichage, pas des
   fautes de frappe a corriger une par une. */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { LandingScript } from '@/components/LandingScript'
import { PhoneShowcase } from '@/components/PhoneShowcase'

export default function HomePage() {
  const engineCode = readFileSync(join(process.cwd(), 'src/landing-engine.js'), 'utf-8')

  return (
    <>
<a className="skip" href="#contenu">Aller au contenu</a>

<header className="site-header" id="header">
  <div className="wrap">
    <a className="brand" href="#top" aria-label="Murabbi — accueil">
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <circle cx="13" cy="13" r="11.25" stroke="currentColor" strokeWidth="1.2" opacity=".28"/>
        <path d="M13 1.75v22.5" stroke="currentColor" strokeWidth="1.2" opacity=".18"/>
        <path d="M2.6 18.2A11.25 11.25 0 0 1 23.4 18.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="13" cy="8.4" r="2.6" fill="currentColor"/>
      </svg>
      Murabbi
    </a>
    <div className="header-actions">
      <button className="icon-btn" id="theme-toggle" type="button" aria-label="Basculer le thème clair ou sombre">
        <svg className="sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2"/><path d="M12 2.4v2.2M12 19.4v2.2M4.2 12H2M22 12h-2.2M5.6 5.6 7.2 7.2M16.8 16.8l1.6 1.6M18.4 5.6 16.8 7.2M7.2 16.8l-1.6 1.6"/>
        </svg>
        <svg className="moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5a8.6 8.6 0 1 0 11.1 11.1Z"/>
        </svg>
      </button>
      <a className="btn btn-primary btn-sm" href="/testeurs">Devenir testeur</a>
    </div>
  </div>
</header>

<main id="contenu">

{/* ====================== HÉROS ====================== */}
<section className="hero" id="top">
  <div className="wrap">
    <div className="hero-grid">
      <div>
        <p className="eyebrow">Application mobile · test fermé</p>
        <h1>Ta journée a déjà un rythme.<br />Ton agenda <em>l'ignore.</em></h1>
        <p className="hero-sub">
          Murabbi accroche tes habitudes au rythme du soleil plutôt qu'à des heures
          fixes — et recalcule tout, tous les matins, à ta place.
        </p>
        <div className="hero-cta">
          <a className="btn btn-primary" href="/testeurs">Devenir testeur</a>
          <a className="btn btn-ghost" href="#mecanisme">Voir le mécanisme</a>
        </div>
      </div>

      <PhoneShowcase />
    </div>
  </div>
</section>

<hr className="rule" />

{/* ====================== LE DÉCALAGE ====================== */}
<section id="decalage">
  <div className="wrap">
    <div className="section-head reveal">
      <p className="eyebrow">Le problème</p>
      <h2>Une alarme à 19 h 30 a tort la moitié de l'année.</h2>
      <p>
        Le coucher du soleil se déplace de dizaines de minutes entre décembre et juin —
        et tous tes repères avec lui. Voilà ce que Murabbi calcule pour toi, maintenant.
      </p>
    </div>

    <div className="card today reveal" id="today-card" style={{maxWidth: '440px', marginTop: '32px'}}>
      <div className="today-top">
        <div>
          <span className="today-label">Aujourd'hui</span>
          <p className="today-date" id="today-date">—</p>
        </div>
        <label className="visually-hidden" htmlFor="city" style={{position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap'}}>Ville de référence</label>
        <select className="city-select" id="city" defaultValue="dakar">
          <option value="dakar">Dakar</option>
          <option value="abidjan">Abidjan</option>
          <option value="paris">Paris</option>
          <option value="bruxelles">Bruxelles</option>
          <option value="tunis">Tunis</option>
          <option value="istanbul">Istanbul</option>
          <option value="riyad">Riyad</option>
        </select>
      </div>

      <div className="arc" id="arc" aria-hidden="true"></div>

      <div className="anchors" id="anchors" role="list" aria-label="Repères de la journée"></div>

      <p className="today-foot" id="today-foot">—</p>
    </div>

    <div className="drift reveal">
      <div className="card drift-card">
        <div className="drift-legend">
          <span className="legend-key"><span className="legend-swatch" style={{background: 'var(--cat-sante)'}}></span> Sobh (Fajr)</span>
          <span className="legend-key"><span className="legend-swatch" style={{background: 'var(--accent)'}}></span> Maghrib</span>
          <span className="legend-key"><span className="legend-swatch" style={{background: 'var(--text-3)', opacity: '.6'}}></span> Une alarme fixe</span>
        </div>
        <div className="chart-scroll">
          <svg id="drift-chart" viewBox="0 0 720 300" role="img" aria-labelledby="drift-title drift-desc">
            <title id="drift-title">Déplacement des horaires sur douze mois</title>
            <desc id="drift-desc">Deux courbes montrent l'heure du Sobh et du Maghrib jour après jour sur une année, comparées à deux horaires fixes qui restent plats.</desc>
          </svg>
        </div>
        <div className="drift-readout">
          <div>
            <p className="readout-k">Amplitude du Maghrib</p>
            <p className="readout-v mono" id="amp-maghrib">—</p>
            <p className="readout-d" id="amp-maghrib-d">—</p>
          </div>
          <div>
            <p className="readout-k">Amplitude du Sobh</p>
            <p className="readout-v mono" id="amp-fajr">—</p>
            <p className="readout-d" id="amp-fajr-d">—</p>
          </div>
          <div>
            <p className="readout-k">Jours où l'alarme se trompe</p>
            <p className="readout-v mono" id="amp-wrong">—</p>
            <p className="readout-d">de plus d'un quart d'heure, sur 365.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<hr className="rule" />

{/* ====================== LE DÉCLENCHEUR ANCRÉ ====================== */}
<section id="mecanisme">
  <div className="wrap">
    <div className="section-head reveal">
      <p className="eyebrow">Le mécanisme</p>
      <h2>Tu ne choisis pas une heure. Tu choisis un repère.</h2>
      <p>
        <em>Après le Sobh</em>, <em>avant le Maghrib</em>, <em>vingt minutes après
        l'Asr</em> — l'heure exacte se recalcule chaque jour, pour l'endroit où tu es.
        Compose un déclencheur ci-dessous.
      </p>
    </div>

    <div className="trigger-grid">
      <div className="card builder reveal">
        <div className="builder-row">
          <span className="builder-k" id="k-sens">Sens</span>
          <div className="chips" role="group" aria-labelledby="k-sens" id="dir-chips">
            <button className="chip" type="button" data-dir="before" aria-pressed="false">Avant</button>
            <button className="chip" type="button" data-dir="after" aria-pressed="true">Après</button>
          </div>
        </div>

        <div className="builder-row">
          <span className="builder-k" id="k-ancre">Repère</span>
          <div className="chips" role="group" aria-labelledby="k-ancre" id="anchor-chips">
            <button className="chip" type="button" data-anchor="fajr" aria-pressed="true">Sobh</button>
            <button className="chip" type="button" data-anchor="sunrise" aria-pressed="false">Lever du soleil</button>
            <button className="chip" type="button" data-anchor="dhuhr" aria-pressed="false">Dhuhr</button>
            <button className="chip" type="button" data-anchor="asr" aria-pressed="false">Asr</button>
            <button className="chip" type="button" data-anchor="maghrib" aria-pressed="false">Maghrib</button>
            <button className="chip" type="button" data-anchor="isha" aria-pressed="false">Isha</button>
          </div>
        </div>

        <div className="builder-row">
          <label className="builder-k" htmlFor="offset">Décalage</label>
          <div className="offset-row">
            <input type="range" id="offset" min="0" max="90" step="5" defaultValue="15"
                   aria-describedby="offset-val" />
            <span className="offset-val mono" id="offset-val">15 min</span>
          </div>
        </div>

        <div className="builder-out" aria-live="polite">
          <p className="sentence" id="trigger-sentence">—</p>
          <div className="resolved">
            <div className="resolved-cell">
              <p className="resolved-k">Aujourd'hui</p>
              <p className="resolved-v mono" id="r-today">—</p>
            </div>
            <div className="resolved-cell">
              <p className="resolved-k">Dans 3 mois</p>
              <p className="resolved-v mono" id="r-3m">—</p>
            </div>
            <div className="resolved-cell">
              <p className="resolved-k">Dans 6 mois</p>
              <p className="resolved-v mono" id="r-6m">—</p>
            </div>
          </div>
        </div>
      </div>

      <div className="trigger-points reveal">
        <div className="point">
          <span className="point-num">1</span>
          <div>
            <h3>L'heure te suit, tu ne la suis pas</h3>
            <p>Tu déménages, la saison tourne : l'ancre ne change pas, l'heure s'adapte seule.</p>
          </div>
        </div>
        <div className="point">
          <span className="point-num">2</span>
          <div>
            <h3>Calculé sur ton téléphone</h3>
            <p>Rien n'est téléchargé ni envoyé : les horaires se calculent localement, même sans réseau.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<hr className="rule" />

{/* ====================== CAPACITÉS ====================== */}
<section id="habitudes">
  <div className="wrap">
    <div className="section-head reveal">
      <p className="eyebrow">L'habitude</p>
      <h2>Aussi simple qu'une case à cocher. Aussi précise que nécessaire.</h2>
      <p>
        Murabbi te demande d'abord de quoi <em>cette</em> habitude a besoin, et
        n'affiche que ça — jamais un formulaire de dix champs par défaut.
      </p>
    </div>

    <div className="reveal" style={{marginTop: '28px', display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
      <span className="chip" style={{cursor: 'default'}}>Sous-tâches</span>
      <span className="chip" style={{cursor: 'default'}}>Durée d'exécution</span>
      <span className="chip" style={{cursor: 'default'}}>Déclencheur</span>
      <span className="chip" style={{cursor: 'default'}}>Répétitions</span>
      <span className="chip" style={{cursor: 'default'}}>Contenu pédagogique</span>
      <span className="chip" style={{cursor: 'default'}}>Preuve de réalisation</span>
    </div>
  </div>
</section>

<hr className="rule" />

{/* ====================== CERCLE ====================== */}
<section id="cercle">
  <div className="wrap">
    <div className="section-head reveal">
      <p className="eyebrow">Le cercle</p>
      <h2>Des proches qui te relèvent — uniquement là où tu leur as ouvert la porte.</h2>
      <p>
        Tu ouvres chaque type de rappel séparément, et tu le refermes quand tu veux.
        Essaie sur la carte de droite.
      </p>
    </div>

    <div className="circle-grid">
      <div className="trigger-points reveal">
        <div className="point">
          <span className="point-num">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7"/>
            </svg>
          </span>
          <div>
            <h3>Le refus est dans le code, pas dans un réglage</h3>
            <p>Rien ne peut créer un rappel tant que la personne n'a pas ouvert ce type d'événement précis.</p>
          </div>
        </div>
        <div className="point">
          <span className="point-num">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12h6M14 12h6M12 4v6M12 14v6"/>
            </svg>
          </span>
          <div>
            <h3>Le motif ne dit jamais ce que tu as manqué</h3>
            <p>Ton cercle voit qu'une main est tendue, pas le détail de ta journée.</p>
          </div>
        </div>
      </div>

      <div className="card consent-card reveal" id="consent">
        <div className="consent-head">
          <span className="today-label">Ce que j'autorise</span>
          <p>Chaque ligne est une permission que tu donnes sur toi, et que tu reprends quand tu veux.</p>
        </div>

        <div className="consent-row">
          <div className="consent-txt">
            <p className="consent-title">Rappel de prière</p>
            <p className="consent-q">« J'autorise mon cercle à me rappeler une prière quand son heure est passée. »</p>
          </div>
          <button className="switch" type="button" role="switch" aria-checked="true" aria-label="Autoriser les rappels de prière" data-consent="prayer"></button>
        </div>

        <div className="consent-row">
          <div className="consent-txt">
            <p className="consent-title">Rappel d'habitude</p>
            <p className="consent-q">« J'autorise mon cercle à me rappeler une habitude que j'avais prévue aujourd'hui. »</p>
          </div>
          <button className="switch" type="button" role="switch" aria-checked="false" aria-label="Autoriser les rappels d'habitude" data-consent="habit"></button>
        </div>

        <div className="consent-row">
          <div className="consent-txt">
            <p className="consent-title">Récapitulatif du vendredi</p>
            <p className="consent-q">« J'autorise mon cercle à m'envoyer le récapitulatif de ma semaine. »</p>
          </div>
          <button className="switch" type="button" role="switch" aria-checked="true" aria-label="Autoriser le récapitulatif du vendredi" data-consent="weekly"></button>
        </div>

        <div className="consent-row">
          <div className="consent-txt">
            <p className="consent-title">Mot d'encouragement</p>
            <p className="consent-q">Un message libre, sans motif particulier.</p>
          </div>
          <button className="switch" type="button" role="switch" aria-checked="true" aria-label="Autoriser les mots d'encouragement" data-consent="encouragement"></button>
        </div>

        <div className="nudge-demo" id="nudge-demo" data-state="blocked" aria-live="polite">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7"/>
          </svg>
          <span id="nudge-text">—</span>
        </div>
      </div>
    </div>
  </div>
</section>

<hr className="rule" />

{/* ====================== PALIERS ====================== */}
<section id="paliers">
  <div className="wrap">
    <div className="section-head reveal">
      <p className="eyebrow">La progression</p>
      <h2>Six paliers. Le dernier donne son nom à l'application.</h2>
      <p>Un calibrage volontairement lent — le dernier palier se mérite en années, pas en semaines.</p>
    </div>

    <div className="levels reveal">
      <div className="level-track">
        <div className="level" style={{ '--i': '0' } as React.CSSProperties}>
          <p className="level-name">Aspirant</p>
          <p className="level-th mono">0 pt</p>
          <p className="level-goal">Objectif 30 pts / jour</p>
        </div>
        <div className="level" style={{ '--i': '1' } as React.CSSProperties}>
          <p className="level-name">Murīd</p>
          <p className="level-th mono">10 000 pts</p>
          <p className="level-goal">Objectif 45 pts / jour</p>
        </div>
        <div className="level" style={{ '--i': '2' } as React.CSSProperties}>
          <p className="level-name">Sālik</p>
          <p className="level-th mono">30 000 pts</p>
          <p className="level-goal">Objectif 60 pts / jour</p>
        </div>
        <div className="level" style={{ '--i': '3' } as React.CSSProperties}>
          <p className="level-name">Mujāhid</p>
          <p className="level-th mono">70 000 pts</p>
          <p className="level-goal">Objectif 75 pts / jour</p>
        </div>
        <div className="level" style={{ '--i': '4' } as React.CSSProperties}>
          <p className="level-name">Walī</p>
          <p className="level-th mono">150 000 pts</p>
          <p className="level-goal">Objectif 90 pts / jour</p>
        </div>
        <div className="level" style={{ '--i': '5' } as React.CSSProperties} data-last="true">
          <p className="level-name">Murabbī</p>
          <p className="level-th mono">300 000 pts</p>
          <p className="level-goal">Objectif 105 pts / jour</p>
        </div>
      </div>
      <p className="levels-foot">Au dernier palier, tu guides autant que tu progresses — d'où le nom de l'application.</p>
    </div>
  </div>
</section>

<hr className="rule" />

{/* ====================== THÈMES ====================== */}
<section id="themes">
  <div className="wrap">
    <div className="section-head reveal">
      <p className="eyebrow">L'apparence</p>
      <h2>Cinq ambiances. Trois intensités chacune.</h2>
      <p>Classique, Rosé, Vert, Bleu, Noir &amp; blanc — chacune se décline en clair, sombre et très sombre.</p>
    </div>
    <div className="themes-row reveal">
      <div className="theme-swatch">
        <span className="theme-chip" style={{background: 'linear-gradient(135deg, #EEE8DC 50%, #7A6035 50%)'}}></span>
        <span className="theme-name">Classique</span>
      </div>
      <div className="theme-swatch">
        <span className="theme-chip" style={{background: 'linear-gradient(135deg, #F3F1F2 50%, #7D2143 50%)'}}></span>
        <span className="theme-name">Rosé</span>
      </div>
      <div className="theme-swatch">
        <span className="theme-chip" style={{background: 'linear-gradient(135deg, #F1F3F2 50%, #24663C 50%)'}}></span>
        <span className="theme-name">Vert</span>
      </div>
      <div className="theme-swatch">
        <span className="theme-chip" style={{background: 'linear-gradient(135deg, #1E252F 50%, #E4B558 50%)'}}></span>
        <span className="theme-name">Bleu</span>
      </div>
      <div className="theme-swatch">
        <span className="theme-chip" style={{background: 'linear-gradient(135deg, #EBEBEB 50%, #242424 50%)'}}></span>
        <span className="theme-name">Noir &amp; blanc</span>
      </div>
    </div>
  </div>
</section>

{/* ====================== RESPIRATION ======================
  Unique photographie de la page. Crédit et licence : img/CREDITS.md.
  Aucun visage identifiable — choix documenté (licence Unsplash = droit du
  photographe, pas autorisation de diffusion des personnes).
  ========================================================== */}
<figure className="breath">
  <img src="/img/silhouette-desert.webp"
       width="1600" height="2400"
       loading="lazy" decoding="async"
       alt="Au lever du jour, une personne seule se tient debout sur la crête d'une dune, minuscule dans un désert immense." />
  <figcaption>
    <div className="wrap reveal">
      <p className="breath-k">Le rythme</p>
      <p className="breath-line">
        <span>Le soleil se déplace chaque jour. Tes repères suivent.</span>
        <span>Toi, tu n'as rien à recalculer.</span>
      </p>
    </div>
  </figcaption>
</figure>

{/* ====================== PROMESSE ====================== */}
<section className="promise" id="promesse">
  <div className="wrap">
    <div className="section-head reveal">
      <p className="eyebrow">Ce que ça veut dire</p>
      <h2>« Gérer ta vie » est une grande phrase. Voilà ce qu'elle recouvre ici.</h2>
    </div>
    <div className="promise-lines reveal">
      <div className="promise-line"><span>01</span><span>Tes rappels s'accrochent au rythme réel de ta journée, et se recalculent sans toi.</span></div>
      <div className="promise-line"><span>02</span><span>Une habitude porte exactement ce qu'elle demande : des étapes, une durée, une preuve — ou rien de tout ça.</span></div>
      <div className="promise-line"><span>03</span><span>Des proches peuvent te relever, dans les limites précises que tu as ouvertes toi-même.</span></div>
      <div className="promise-line"><span>04</span><span>Ton calendrier connaît tes jours sans que tu aies à les y inscrire.</span></div>
      <div className="promise-line"><span>05</span><span>Ta progression se mesure sur des années, pas sur une série de sept jours à ne pas casser.</span></div>
    </div>
  </div>
</section>

{/*
  EMPLACEMENT RÉSERVÉ — preuve sociale.
  Volontairement vide : aucun chiffre d'usage, aucun témoignage et aucun logo de presse
  ne sont disponibles à ce jour. À remplir uniquement avec du réel, après la bêta.
*/}

{/* ====================== LISTE D'ATTENTE ====================== */}
<section className="waitlist" id="devenir-testeur">
  <div className="wrap">
    <div className="waitlist-inner reveal">
      <p className="eyebrow">La suite</p>
      <h2 style={{fontSize: 'clamp(28px,4.4vw,40px)'}}>L'application n'est pas encore publiée.</h2>
      <p style={{marginTop: '18px', fontSize: '17px', color: 'var(--text-2)'}}>
        Murabbi est en test fermé avant sa sortie publique. Deviens testeur pour
        l&apos;installer en avant-première sur Android ou iPhone, et pour peser
        directement sur ce qu&apos;elle devient.
      </p>
      <div style={{marginTop: '28px'}}>
        <a className="btn btn-primary" href="/testeurs">Devenir testeur</a>
      </div>
    </div>
  </div>
</section>

</main>

<footer className="site-footer">
  <div className="wrap footer-inner">
    <a className="brand" href="#top">
      <svg width="22" height="22" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <circle cx="13" cy="13" r="11.25" stroke="currentColor" strokeWidth="1.2" opacity=".28"/>
        <path d="M2.6 18.2A11.25 11.25 0 0 1 23.4 18.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="13" cy="8.4" r="2.6" fill="currentColor"/>
      </svg>
      Murabbi
    </a>
    <nav className="footer-legal" aria-label="Pages du site">
      <a href="/testeurs">Devenir testeur</a>
      <a href="/suggestions">Suggestions</a>
    </nav>
    <nav className="footer-legal" aria-label="Pages légales">
      <a href="/confidentialite.html">Confidentialité</a>
      <a href="/cgu.html">Conditions d'utilisation</a>
      <a href="/suppression-compte.html">Supprimer mon compte</a>
    </nav>
    <p className="footer-meta">
      Horaires calculés dans le navigateur (méthode Ligue Islamique Mondiale · Sobh −18°, Isha −17°).
    </p>
  </div>
</footer>

      <LandingScript code={engineCode} />
    </>
  )
}
