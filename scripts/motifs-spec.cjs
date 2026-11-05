/*
 * Murabbi — bibliothèque de motifs « Rosaces d'horizon » (v2, « pleine et ornée »).
 * Constructions géométriques originales, tracées par le calcul (règle et compas),
 * jamais décalquées d'une œuvre. Repère : centre (0,0), rayon utile 100
 * (viewBox -100 -100 200 200), sauf la tuile zellige (0 0 200 200, raccord).
 *
 * Trois couches de ton, toutes dans la couleur d'encre du thème :
 *   .pl  plaque  : disque plein sous la rosace (le sol s'éclaircit ou se fonce)
 *   .fl  aplats  : pétales, bandes, étoiles remplis (ton sur ton)
 *   trait        : contours (stroke = currentColor)
 *   .pt  points  : perles remplies, à l'opacité du trait
 * Les opacités de chaque couche sont des jetons (AppOpacity.motifPlate/Fill/Stroke),
 * pas des valeurs du dessin. Ce fichier est la spécification exécutable que le
 * CustomPainter Flutter reproduit (mêmes rayons, mêmes nombres, même graine).
 */
(function (root) {
  const TAU = Math.PI * 2;
  const r2 = (n) => Math.round(n * 100) / 100;
  const pol = (r, a) => [r2(r * Math.cos(a - Math.PI / 2)), r2(r * Math.sin(a - Math.PI / 2))];
  const P = (p) => p[0] + ' ' + p[1];
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);

  function mulberry32(seed) {
    let t = seed >>> 0;
    return function () {
      t += 0x6d2b79f5;
      let x = t;
      x = Math.imul(x ^ (x >>> 15), x | 1);
      x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
      return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
  }
  function fnv1a(str) {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return h >>> 0;
  }

  // --- primitives (épaisseurs en px écran : 1 = fin, 1.6 = courant, 2.4 = accent)
  const W = { fin: 1, cour: 1.6, acc: 2.4 };
  const circle = (r, w = W.cour) => `<circle r="${r2(r)}" stroke-width="${w}"/>`;
  const path = (d, w = W.cour) => `<path d="${d}" stroke-width="${w}"/>`;
  const fill = (d, cls = 'fl') => `<path class="${cls}" d="${d}" fill-rule="evenodd"/>`;
  const plate = (r) => `<circle class="pl" r="${r2(r)}"/>`;
  const disc = (r) => `M${-r} 0A${r} ${r} 0 1 0 ${r} 0A${r} ${r} 0 1 0 ${-r} 0Z`;
  const annulus = (r1, r2_) => disc(r2_) + disc(r1);

  /** Polygone étoilé {n/k}, en plusieurs polygones si pgcd > 1. */
  function star(n, k, r, rot = 0) {
    const g = gcd(n, k);
    let d = '';
    for (let s = 0; s < g; s++) {
      let i = s;
      const pts = [];
      for (let c = 0; c < n / g; c++) {
        pts.push(pol(r, rot + (TAU * i) / n));
        i = (i + k) % n;
      }
      d += 'M' + pts.map(P).join('L') + 'Z';
    }
    return d;
  }
  /** Étoile « pleine » à n branches (contour extérieur seulement, rentrant à rIn). */
  function starOutline(n, rOut, rIn, rot = 0) {
    const pts = [];
    for (let i = 0; i < n * 2; i++) pts.push(pol(i % 2 ? rIn : rOut, rot + (TAU * i) / (n * 2)));
    return 'M' + pts.map(P).join('L') + 'Z';
  }
  function lensRing(n, r1, r2_, half, rot = 0) {
    const rm = (r1 + r2_) / 2;
    let d = '';
    for (let i = 0; i < n; i++) {
      const a = rot + (TAU * i) / n;
      d += `M${P(pol(r1, a))}Q${P(pol(rm, a - half))} ${P(pol(r2_, a))}Q${P(pol(rm, a + half))} ${P(pol(r1, a))}Z`;
    }
    return d;
  }
  /** Gouttes (pétale arrondi, base étroite) : plus « fleuri » que la lentille. */
  function dropRing(n, r1, r2_, half, rot = 0) {
    let d = '';
    for (let i = 0; i < n; i++) {
      const a = rot + (TAU * i) / n;
      d += `M${P(pol(r1, a))}C${P(pol(r1 + (r2_ - r1) * 0.55, a - half * 1.5))} ${P(pol(r2_, a - half * 0.9))} ${P(pol(r2_, a))}C${P(pol(r2_, a + half * 0.9))} ${P(pol(r1 + (r2_ - r1) * 0.55, a + half * 1.5))} ${P(pol(r1, a))}Z`;
    }
    return d;
  }
  /** Festons fermés (arcades remplies) posés sur r, vers l'extérieur. */
  function scallops(n, r, rot = 0, closed = false) {
    let d = '';
    for (let i = 0; i < n; i++) {
      const p0 = pol(r, rot + (TAU * i) / n);
      const p1 = pol(r, rot + (TAU * (i + 1)) / n);
      const c = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]) / 2;
      d += `M${P(p0)}A${r2(c)} ${r2(c)} 0 0 1 ${P(p1)}${closed ? 'Z' : ''}`;
    }
    return d;
  }
  function zigzagBand(n, rIn, rOut, rot = 0) {
    let d = '';
    for (let i = 0; i < n; i++) {
      const a0 = rot + (TAU * i) / n;
      const a1 = rot + (TAU * (i + 1)) / n;
      d += `M${P(pol(rIn, a0))}L${P(pol(rOut, (a0 + a1) / 2))}L${P(pol(rIn, a1))}Z`;
    }
    return d;
  }
  function dotRing(n, r, size, rot = 0) {
    let s = '';
    for (let i = 0; i < n; i++) {
      const p = pol(r, rot + (TAU * i) / n);
      s += `<circle class="pt" cx="${p[0]}" cy="${p[1]}" r="${size}"/>`;
    }
    return s;
  }
  function chainRing(n, r, k = 1.35, w = W.fin) {
    const rr = r * Math.sin(Math.PI / n) * k;
    let s = '';
    for (let i = 0; i < n; i++) {
      const p = pol(r, (TAU * i) / n);
      s += `<circle cx="${p[0]}" cy="${p[1]}" r="${r2(rr)}" stroke-width="${w}"/>`;
    }
    return s;
  }
  /** Bande de hampes : rythme d'écriture évoqué, aucune lettre. */
  function hampes(n, r, depth, seed) {
    const rnd = mulberry32(seed);
    let d = '';
    let dots = '';
    for (let i = 0; i < n; i++) {
      const a = (TAU * i) / n;
      const len = depth * (0.35 + rnd() * 0.65);
      const inner = r - depth / 2;
      d += `M${P(pol(inner, a))}L${P(pol(inner + len, a))}`;
      if (rnd() < 0.33) {
        const p = pol(inner + len + depth * 0.22, a);
        dots += `<circle class="pt" cx="${p[0]}" cy="${p[1]}" r="0.7"/>`;
      }
    }
    return path(d, W.cour) + dots;
  }

  // --- cadres extérieurs (densité commune, trois variantes) -------------------
  const FRAMES = {
    /** Perles et arcades : bande pleine 96-99, 64 perles, 32 arcades remplies. */
    perles: () => [
      plate(99), fill(annulus(96, 99)), circle(99, W.acc),
      dotRing(64, 93.5, 1.1), circle(91, W.fin),
      fill(scallops(32, 86, 0, true)), path(scallops(32, 86)), circle(86, W.acc),
    ].join(''),
    /** Dents et hampes : dents pleines 90-97, bande de hampes. */
    dents: () => [
      plate(99), circle(99, W.acc), fill(zigzagBand(48, 90, 97)), path(zigzagBand(48, 90, 97), W.fin),
      circle(90), hampes(120, 84, 9, 7), circle(79, W.acc),
    ].join(''),
    /** Entrelacs et amandes : chaîne de 40 cercles, couronne de 48 amandes pleines. */
    entrelacs: () => [
      plate(99), fill(annulus(97, 99)), circle(99, W.acc), chainRing(40, 93),
      circle(88), fill(lensRing(48, 76, 87, 0.05)), path(lensRing(48, 76, 87, 0.05), W.fin), circle(75, W.acc),
    ].join(''),
  };

  // --- motifs ---------------------------------------------------------------
  const MOTIFS = {
    /** Rosace des huit (khatam). Cadre perles ; 16 gouttes ; {8/3} pleine en ruban ;
     *  deux carrés croisés pleins ; 16 perles ; cœur {8/3}. */
    khatam8() {
      return [
        FRAMES.perles(),
        fill(dropRing(16, 62, 83, 0.12)), path(dropRing(16, 62, 83, 0.12), W.fin),
        fill(starOutline(8, 72, 52)), path(star(8, 3, 72), W.acc), path(star(8, 3, 66), W.fin),
        circle(48),
        fill(starOutline(8, 44, 33, Math.PI / 8)), path(star(8, 2, 44, Math.PI / 8)), path(star(8, 2, 39, Math.PI / 8), W.fin),
        dotRing(16, 28, 1.2), circle(24, W.acc),
        fill(starOutline(8, 18, 9)), path(star(8, 3, 18), W.fin), fill(disc(4)),
      ].join('');
    },

    /** Couronne de douze. Cadre perles ; {12/5} pleine en ruban ; 12 amandes longues
     *  pleines + 12 courtes ; rosette centrale. */
    rosace12() {
      return [
        FRAMES.perles(),
        fill(starOutline(12, 84, 62)), path(star(12, 5, 84), W.acc), path(star(12, 5, 78), W.fin),
        circle(60, W.acc),
        fill(lensRing(12, 22, 58, 0.22)), path(lensRing(12, 22, 58, 0.22), W.fin),
        path(lensRing(12, 30, 50, 0.1, TAU / 24), W.fin), dotRing(24, 56, 1),
        circle(20, W.acc), fill(dropRing(12, 6, 18, 0.2)), fill(disc(4)),
      ].join('');
    },

    /** Fleur de seize. Cadre entrelacs ; 16 lobes en accolade pleins ; pétales
     *  intérieurs ; 32 perles ; cœur de 8 gouttes. Végétal stylisé. */
    fleur16() {
      let lobes = '';
      let inner = '';
      const n = 16;
      for (let i = 0; i < n; i++) {
        const a = (TAU * i) / n;
        const w = TAU / n / 2;
        lobes += `M${P(pol(46, a - w))}C${P(pol(60, a - w * 1.2))} ${P(pol(73, a - w * 0.6))} ${P(pol(73, a))}C${P(pol(73, a + w * 0.6))} ${P(pol(60, a + w * 1.2))} ${P(pol(46, a + w))}Z`;
        inner += `M${P(pol(50, a))}Q${P(pol(58, a - w * 0.45))} ${P(pol(66, a))}Q${P(pol(58, a + w * 0.45))} ${P(pol(50, a))}Z`;
      }
      return [
        FRAMES.entrelacs(),
        fill(lobes), path(lobes, W.acc), path(inner, W.fin), circle(46, W.acc),
        dotRing(32, 41, 1, TAU / 64), circle(37),
        fill(dropRing(8, 12, 34, 0.32)), path(dropRing(8, 12, 34, 0.32), W.fin),
        path(lensRing(8, 12, 28, 0.16, TAU / 16), W.fin),
        circle(11, W.acc), fill(disc(4)),
      ].join('');
    },

    /** Anneaux de lumière : plateau gravé, bandes concentriques, aucune lettre. */
    anneaux() {
      return [
        FRAMES.dents(),
        fill(annulus(70, 74)), circle(74, W.fin), circle(70, W.fin),
        fill(lensRing(24, 50, 68, 0.06)), path(lensRing(24, 50, 68, 0.06), W.fin),
        circle(48, W.acc), dotRing(48, 44, 1.1), circle(40),
        chainRing(24, 34, 1.4), circle(27, W.acc),
        fill(starOutline(16, 25, 15)), path(star(16, 7, 25), W.fin),
        circle(10, W.acc), fill(disc(4)),
      ].join('');
    },

    /** Étoile de dix (girih). Cadre entrelacs ; {10/3} pleine en ruban ; {10/4} ;
     *  décagone ; cœur {10/3}. */
    girih10() {
      let rays = '';
      for (let i = 0; i < 10; i++) {
        const a = (TAU * i) / 10 + TAU / 20;
        rays += `M${P(pol(38, a))}L${P(pol(54, a))}`;
      }
      return [
        FRAMES.entrelacs(),
        fill(starOutline(10, 72, 50)), path(star(10, 3, 72), W.acc), path(star(10, 3, 66), W.fin),
        path(star(10, 4, 54, TAU / 20), W.fin), path(rays, W.fin),
        circle(38, W.acc), fill(starOutline(10, 34, 22, TAU / 20)), path(star(10, 1, 34, TAU / 20)),
        path(star(10, 3, 22)), fill(disc(6)), circle(6, W.acc),
      ].join('');
    },

    /** Rinceau (islimi) : cadre dents ; 4 spirales à feuilles fendues pleines. */
    islimi() {
      let s = FRAMES.dents();
      for (let k = 0; k < 4; k++) {
        const base = (TAU * k) / 4;
        const pts = [];
        const leaves = [];
        const steps = 90;
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const th = base + t * TAU * 1.3;
          const r = 74 * Math.exp(-1.85 * t);
          pts.push(pol(r, th));
          if (i > 4 && i < steps - 8 && i % 8 === 0) leaves.push({ r, th, side: (i / 8) % 2 ? 1 : -1 });
        }
        s += path('M' + pts.map(P).join('L'), W.acc);
        for (const l of leaves) {
          const sz = 0.42;
          const o = pol(l.r, l.th);
          const tip = pol(l.r * (1 + l.side * sz), l.th + 0.32);
          const c1 = pol(l.r * (1 + l.side * sz * 0.1), l.th + 0.42);
          const c2 = pol(l.r * (1 + l.side * sz * 1.05), l.th + 0.06);
          const d = `M${P(o)}Q${P(c1)} ${P(tip)}Q${P(c2)} ${P(o)}Z`;
          s += fill(d) + path(d, W.fin);
        }
      }
      return s + fill(disc(7)) + circle(7, W.acc);
    },
  };

  /** Tuile zellige (raccord parfait sur 200×200) : étoiles à huit branches pleines
   *  en ruban aux nœuds, octogones pleins. Bandes uniquement. */
  function zellige8() {
    const nodes = [[0, 0], [200, 0], [0, 200], [200, 200], [100, 100]];
    const sq = (cx, cy, r, rot) => {
      const pts = [];
      for (let i = 0; i < 4; i++) {
        const a = rot + (TAU * i) / 4;
        pts.push([r2(cx + r * Math.cos(a)), r2(cy + r * Math.sin(a))]);
      }
      return 'M' + pts.map(P).join('L') + 'Z';
    };
    let d = '';
    let o = '';
    for (const [x, y] of nodes) {
      d += sq(x, y, 70.71, Math.PI / 4) + sq(x, y, 70.71, 0) + sq(x, y, 62, Math.PI / 4) + sq(x, y, 62, 0);
      const pts = [];
      for (let i = 0; i < 8; i++) {
        const a = (TAU * i) / 8 + TAU / 16;
        pts.push([r2(x + 26 * Math.cos(a)), r2(y + 26 * Math.sin(a))]);
      }
      o += 'M' + pts.map(P).join('L') + 'Z';
    }
    return fill(o) + path(d) + path(o, W.acc);
  }

  const META = {
    khatam8: { nom: 'Rosace des huit', cadre: 'perles' },
    rosace12: { nom: 'Couronne de douze', cadre: 'perles' },
    fleur16: { nom: 'Fleur de seize', cadre: 'entrelacs' },
    anneaux: { nom: 'Anneaux de lumière', cadre: 'dents' },
    girih10: { nom: 'Étoile de dix', cadre: 'entrelacs' },
    islimi: { nom: 'Rinceau', cadre: 'dents' },
    zellige8: { nom: 'Tuile zellige', cadre: '—' },
  };

  function inner(name) {
    return name === 'zellige8' ? zellige8() : MOTIFS[name]();
  }

  /** SVG autonome (fichier livrable). Opacités par défaut = jetons du thème clair. */
  function svgFile(name) {
    const vb = name === 'zellige8' ? '0 0 200 200' : '-100 -100 200 200';
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="800" height="800" color="#7A6035">
  <title>Murabbi — ${META[name].nom}</title>
  <style>
    *{vector-effect:non-scaling-stroke}
    .pl{fill:currentColor;fill-opacity:.10;stroke:none}
    .fl{fill:currentColor;fill-opacity:.22;stroke:none}
    .pt{fill:currentColor;stroke:none}
  </style>
  <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">${inner(name)}</g>
</svg>
`;
  }

  root.MurabbiMotifs = { inner, svgFile, META, mulberry32, fnv1a, names: Object.keys(META) };
  if (typeof module !== 'undefined') module.exports = root.MurabbiMotifs;
})(typeof window !== 'undefined' ? window : globalThis);
