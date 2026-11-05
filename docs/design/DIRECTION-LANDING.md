# Direction artistique : refonte de la landing Murabbi

Auteur : Sofia (DA), 5 novembre 2026. Statut : **brief prêt à coder, sans validation intermédiaire**.
Prolonge `design-refs/direction-motifs/DIRECTION.md` (Rosaces d'horizon, v2). Base des jetons : `origin/develop` de `murabbi-mobile` (`app_colors.dart`, lu le 05/11).
Registre des directions : aucune note « landing » n'existait ; seule la note de l'app existe (« Rosaces d'horizon », statut Proposée). Une note landing est créée avec ce brief.

Ce que cette refonte remplace : le site actuel (CSS à jetons Classique seulement, Geist, téléphone 3D `three.js`, photo de silhouette, graphique de dérive, démos mêlées). Ce qu'elle garde : l'esprit des deux démos qui prouvent le produit (composeur de repère, permissions du cercle) et le moteur de calcul des horaires (`src/landing-engine.js`).

---

## 0. Décisions prises seule (réversibles)

| # | Choix | Pourquoi | Alternative |
|---|---|---|---|
| D1 | Classique clair par défaut ; en sombre : **Classique nuit** (#1A1814), pas « sombre » | reco du PO ; accent #A68655 + anneau or #C9A866 | tier « sombre » reste dispo au sélecteur |
| D2 | Le tier suit le système (clair/nuit) tant que le visiteur n'a rien choisi ; ensuite `localStorage` | respect du réglage de l'appareil | tier fixe |
| D3 | Placement des rosaces **fixe et déterministe** (tableau § 1.3), pas de graine par jour | rendu SSR identique, QA reproductible, aucune hydratation divergente | graine `fnv1a` comme l'app |
| D4 | Corps de texte : **Schibsted Grotesk** (OFL) à la place de Geist (interdit par la doctrine DA) | voir § 3 | maintenir Geist : refusé, la landing n'a aucune raison d'hériter de la dette de l'app |
| D5 | **Plus de `three.js`** : téléphone en cadre CSS + capture WebP | 3D = ~600 Ko JS, WebGL, a11y nulle, incohérent avec « fond à rosaces » | garder la 3D : non |
| D6 | « Sobh » devient **« Fajr »** partout | l'app écrit Fajr/Dhuhr/Asr/Maghrib/Isha | |
| D7 | Une seule démo calculée (composeur) + une démo de permissions ; **le graphique de dérive sur 12 mois disparaît** | « peu de mots », le gain de temps se dit en une phrase | le garder en `<details>` sous le composeur |
| D8 | Sélecteur d'ambiance : 5 familles × 3 tiers, aussi bien dans l'en-tête que dans la section 9 | prouve les 5 ambiances en direct | |
| D9 | Aucune image raster d'ambiance ; les « images réelles » sont les **captures de l'app** (cadre téléphone) et les rosaces | décision PO du jour (l'app a supprimé ses 13 webp) | |
| D10 | Pas de preuve sociale, pas de chiffre, pas de logo presse, pas de note d'avis | test fermé : rien de réel à montrer | emplacement réservé commenté dans le code |

**Écart à signaler.** Le coordinateur cite une « §15 » de `DIRECTION.md` qui fixerait les translucidités. Le fichier lu s'arrête à la §14. Je fixe donc les valeurs ici (§ 2.3) et propose de les reporter dans la direction de l'app.

---

## 1. Concept directeur et fil de l'accueil

### 1.1 Idée unique

**Le soleil fait l'heure ; la page est un horizon.** Chaque section est une position du soleil sur sa course : la rosace se lève d'un bord (hero, voix), passe derrière les cartes comme un vrai fond (repère, constance), s'efface sur les pages de lecture (légal), et la page tourne si lentement qu'on la sent plus qu'on ne la voit. Le fond ne dit rien : aucune lettre, aucune architecture, aucune personne. Le texte dit l'essentiel en peu de mots, à un musulman, avec le gain de temps comme fil : *tu ne calcules plus, tu ne te souviens plus, tu ne culpabilises plus.*

Ce que la page ne doit jamais faire croire : que l'application est publiée, qu'elle a des utilisateurs, qu'elle récite « toutes » les invocations, que l'adhan est un argument.

### 1.2 Benchmark (pages ouvertes le 05/11) et provenance

| Référence | URL | Geste retenu | Statut |
|---|---|---|---|
| Pillars | https://thepillarsapp.com/ | structure « promesse courte, puis journée en blocs », FAQ repliable, CTA final unique. **Refusé** : bandeau de chiffres, logos presse, avis (on n'a rien de réel) | adaptation |
| Hallow | https://hallow.com/ | un titre court orienté bénéfice, une action, un pied de page très complet. **Refusé** : image plein fond, promesse « n°1 », figures publiques | adaptation |
| App de Murabbi (notre direction) | `design-refs/direction-motifs/captures/comparaison-refs.png`, `bleu-night.png` | rosace qui se lève d'un bord, diagonale en coins opposés, bouton or sur nuit bleue | continuité |
| Contre-exemple (déjà consigné) | https://dribbble.com/shots/27086567-Quran-Islamic-Companion-App-UI | trame plein écran + silhouette de mosquée = papier peint | anti-référence |

Copie interdite : aucun tracé pris à une œuvre ; `pinterest-art-islamique/` n'est jamais copié, ni cité dans le site. Les 6 motifs viennent de `motifs/*.svg` (calculés, originaux).

### 1.3 Fil narratif, section par section

Lecture à 375 px d'abord. Les décisions de contenu viennent de `prelude_copy.dart` (messages imposés). Ordre : on se met à l'heure, on règle un repère, on entend, on tient, on lit et on rattrape, on est respecté, on s'entoure, on progresse, on choisit son ambiance, on s'inscrit.

**Convention de fond.** `r` = rayon en fraction de la largeur du bloc (`rk`) ; `cx`, `cy` = centre en fraction de la largeur et de la hauteur du bloc ; `Int.` = multiplicateur 1 / 0,7 / 0,5 ; `Rot.` = durée d'un tour ou « fixe ». Une seule rosace tourne à la fois (celle de la section la plus visible).

| # | Section (id) | Titre | Phrase | Élément visuel | Fond, mobile (375) | Fond, bureau (≥1024) | Int. | Rot. | Zone voilée (plancher 0,03) |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Hero (`#haut`) | **À l'heure, là où tu es.** | Murabbi connaît la plage de chaque prière, là où tu es. Si elle va se refermer et que tu n'as pas prié, il te relance avant. | Bismillah en tête (fixe), pastille « Test fermé · Android et iPhone », 2 boutons, capture « Accueil » en cadre téléphone | `horizon`, motif dominant, `rk` 0,95, `cx` 0,5, `cy` 0,90 : le disque se lève derrière la moitié basse du téléphone | `flanc` droit, `rk` 0,42 (plafond 590 px de rayon), `cx` 0,76, `cy` 0,5, derrière le téléphone | 1 | 240 s | mobile : du haut jusqu'à 48 % de la hauteur, plein à 62 % ; bureau : colonne gauche jusqu'à 50 % de la largeur, plein à 66 % |
| 2 | Repère (`#repere`) | **Un repère, pas une heure.** | Après le Fajr, avant le Maghrib : tu règles une fois, l'heure se recalcule chaque jour. | Carte « Aujourd'hui » (ville, 5 prières et leurs heures, arc du soleil) puis carte composeur (Avant/Après, repère, décalage, résultat aujourd'hui / dans 3 mois / dans 6 mois) | `flanc` droit, motif secondaire, `rk` 0,62, `cx` 1,05, `cy` 0,55 : visible dans les marges et derrière les cartes | `flanc` gauche, `rk` 0,34, `cx` 0,08, `cy` 0,5 | 1 | fixe | titre et phrase (0 à 24 %) |
| 3 | Voix (`#voix`) | **Une voix.** | Au rappel, ton téléphone te récite l'invocation : istighfar, tasbih, salawat. Tu écoutes, tu n'ouvres rien. | Trois puces « Istighfar · Tasbih · Salawat » (étiquette : « Récitées au rappel »), carte « Lecture d'invocation » avec arabe (ligature lam-alef), traduction, source. Bureau : capture « Lecture » à côté | `horizon`, dominant, `rk` 0,90, `cx` 0,5, `cy` 1,0 | `horizon`, `rk` 0,55, `cx` 0,5, `cy` 1,12 | 1 | 360 s | titre et puces (0 à 38 %) ; l'arabe est sur une carte, jamais sur le motif |
| 4 | Constance (`#constance`) | **Un trait par jour.** | Adhkar, Coran, habitudes. Murabbi tient le compte, tu coches. | Carrousel à accroche de 3 captures : Habitudes, Catalogue, Calendrier, légende d'une ligne chacune | `diagonale` : deux rosaces fixes, A (−0,05 ; 0,04 ; 0,50), B (1,05 ; 0,96 ; 0,50), satellite `rk` 0,09 à ×0,75 | idem, `rk` 0,26 | 0,7 | fixe | titre (0 à 20 %) |
| 5 | Lire, rattraper (`#lire`) | **Lire, puis rattraper.** | Le Coran en écriture uthmanienne, page par page. Les prières à rattraper se comptent selon ton école. | 2 cartes-captures : Lecteur du Coran, Rattrapage | `coin` bas gauche, secondaire, `rk` 0,60, `cx` −0,10, `cy` 0,90 | `rk` 0,30, `cx` 0,08, `cy` 0,85 | 0,7 | fixe | titre ; le lecteur est une capture : rien à voiler dedans |
| 6 | Respect (`#respect`) | **Rien ne compte contre toi.** | Pendant tes règles, les prières se mettent en pause. Pas de réseau ? Murabbi continue. | 2 cartes d'une ligne chacune, icônes SVG dessinées (voir § 4.7) | `flanc` droit, secondaire, `rk` 0,50, `cx` 1,10, `cy` 0,30 | `rk` 0,28, `cx` 0,95, `cy` 0,4 | 0,5 | fixe | titre et phrase |
| 7 | Cercle (`#cercle`) | **Un cercle qui te relève, si tu le veux.** | Chaque ligne est une permission que tu donnes sur toi, et que tu reprends quand tu veux. | Carte de permissions interactive (4 interrupteurs) + ligne d'effet | `flanc` gauche, dominant, `rk` 0,62, `cx` −0,10, `cy` 0,60 | `rk` 0,32, `cx` 0,06, `cy` 0,5 | 0,7 | fixe | titre (0 à 22 %) |
| 8 | Paliers (`#paliers`) | **Six paliers, au rythme des années.** | Le dernier se mérite en années, pas en semaines. Il donne son nom à l'application. | Piste de 6 jalons (Aspirant, Murīd, Sālik, Mujāhid, Walī, Murabbī) ; le dernier jalon est une rosace miniature | `horizon` bas, secondaire, `rk` 0,75, `cx` 0,5, `cy` 1,05 | `rk` 0,40, `cy` 1,1 | 0,5 | fixe | titre ; la piste est dans une carte |
| 9 | Ambiances (`#ambiances`) | **Cinq ambiances, trois intensités.** | Classique, Vert, Bleu, Rose, Mono. Clair, sombre, nuit. Essaie : cette page change avec toi. | 5 cartes à jetons **propres** (chacune montre sa famille, quel que soit le choix courant) + sélecteur de tier | pas de rosace de section : chaque carte porte la sienne (`rk` 0,85, `cx` 0,5, `cy` 0,85, clippée) | idem | 1 par carte | fixe | texte des cartes sur bandeau opaque en bas de carte |
| 10 | Test fermé (`#testeur`) | **L'application n'est pas encore publiée.** | Murabbi est en test fermé. Deviens testeur pour l'installer en avant-première sur Android ou iPhone. | Une carte centrée, un bouton « Devenir testeur » | `horizon` derrière la carte, dominant, `rk` 0,90, `cx` 0,5, `cy` 1,08 | `rk` 0,45 | 1 | fixe | la carte est opaque à 0,92 (texte dedans) |
| F | Pied de page | | | voir § 4.2 | aucune rosace : fond `--surface` plein | | | | |

**Rôle de chaque section dans la décision** (Cléa UX : la landing organise une décision, elle n'empile pas) : 1 cadre (à qui, quel problème) ; 2 preuve par l'usage (je vois mes heures) ; 3 et 4 la valeur au quotidien ; 5 profondeur religieuse ; 6 et 7 confiance et respect ; 8 et 9 envie de rester ; 10 action. Le CTA principal est le même partout : **Devenir testeur** (`/testeurs`).

### 1.4 Les rosaces, techniquement sur le web

**Source.** Copier les 6 motifs utiles dans le dépôt, hors `public/` : `murabbi-landing/src/design/motifs/{khatam8,rosace12,fleur16,anneaux,girih10,islimi}.svg` (depuis `design-refs/direction-motifs/motifs/`). Pas de `zellige8` (réservé aux bandes, non utilisé ici). Un script `scripts/build-motifs.mjs` (lancé avant `next build`) :

1. lit chaque SVG, retire `<style>` et l'attribut `color`, renomme les classes `pl` / `fl` / `pt` en `rs-pl` / `rs-fl` / `rs-pt` ;
2. écrit `src/components/rosace/Sprite.generated.tsx` : un `<svg hidden aria-hidden>` unique contenant `<symbol id="m-khatam8" viewBox="-100 -100 200 200">…</symbol>` pour chaque motif (≈ 85 Ko bruts, ≈ 20 Ko gzip, une fois par page).

**Composant** `<Rosace role="dominant|secondary" comp="horizon|flanc|coin" turn="240|360|0" k={1}>` :

```html
<div class="rosace-slot" style="--rk:.95; --cx:.5; --cy:.9; --k:1">   <!-- absolu, clippé par la section -->
  <div class="rosace" data-turn="240">                                 <!-- porte la rotation -->
    <svg viewBox="-100 -100 200 200" aria-hidden="true" focusable="false">
      <use href="#m-khatam8" data-for="classique"/>
      <use href="#m-rosace12" data-for="vert"/>
      <use href="#m-fleur16" data-for="rose bleu-clair"/>
      <use href="#m-anneaux" data-for="bleu-sombre"/>
      <use href="#m-girih10" data-for="mono"/>
      <circle r="99" class="rs-gild"/>
    </svg>
  </div>
</div>
```

Le dominant est choisi **par CSS** (un seul `<use>` visible) ; le rôle « secondaire » liste d'autres `data-for` : Classique, Vert, Bleu clair et sombre → `girih10` ; Rose, Mono → `khatam8`. Règles :

```css
.rosace use{display:none}
[data-family="classique"] .rosace use[data-for~="classique"],
[data-family="vert"]      .rosace use[data-for~="vert"],
[data-family="rose"]      .rosace use[data-for~="rose"],
[data-family="mono"]      .rosace use[data-for~="mono"],
[data-family="bleu"][data-tier="clair"]  .rosace use[data-for~="bleu-clair"],
[data-family="bleu"]:not([data-tier="clair"]) .rosace use[data-for~="bleu-sombre"]{display:inline}

/* classes dessinées dans le sprite (hors de .rosace : pas de préfixe d'ancêtre) */
.rs-pl{fill:currentColor;fill-opacity:var(--m-plate);stroke:none}
.rs-fl{fill:currentColor;fill-opacity:var(--m-fill);stroke:none}
.rs-pt{fill:currentColor;fill-opacity:var(--m-stroke);stroke:none}
.rs-sprite g{stroke-opacity:var(--m-stroke)}
.rs-sprite *{vector-effect:non-scaling-stroke}
.rs-gild{fill:none;stroke:var(--gild);stroke-width:2.4}

.rosace-slot{
  position:absolute; pointer-events:none; z-index:0;
  width:min(calc(var(--rk) * 200cqw), 1180px); aspect-ratio:1;
  left:calc(var(--cx) * 100%); top:calc(var(--cy) * 100%);
  transform:translate(-50%,-50%); opacity:var(--k);
  color:var(--ink);
}
.rosace{width:100%;height:100%}
.rosace[data-turn]{animation:rosace-turn var(--turn,240s) linear infinite; will-change:transform}
@keyframes rosace-turn{to{transform:rotate(360deg)}}
```

`cqw` : poser `container-type:inline-size` sur chaque section. Mobile Safari ≥ 16 le gère ; repli : `width:min(calc(var(--rk) * 200vw),1180px)`.

**Voile** : chaque section déclare ses arrêts en variables, appliqués en `mask-image` du slot :
`--veil-y1`, `--veil-y2` (mobile, vertical) ou `--veil-x1`, `--veil-x2` (bureau, horizontal) ;
`mask-image:linear-gradient(var(--veil-dir), rgb(0 0 0 / .03) var(--veil-1), #000 var(--veil-2))` (le masque s'applique au **slot**, pas au disque, donc coordonnées de la section).
Valeurs du tableau 1.3 (colonne « Zone voilée »). Toute section qui ajoute du texte hors carte doit mettre à jour son voile : c'est un critère QA.

**Rotation** : `animation-play-state:paused` tant que le slot est hors écran (`IntersectionObserver`, seuil 0,05) ; un seul `[data-turn]` actif à la fois (celui du plus grand `intersectionRatio`) ; arrêt total sous `prefers-reduced-motion: reduce` (voir § 6) ; aucune rotation sur les pages internes.

**Entrée** : fondu + échelle 0,985 → 1 en 600 ms (`--dur-slow`), courbe `--ease-out`, à l'apparition de la section, une fois.

**Verrous** : `aria-hidden`, `pointer-events:none`, aucun texte, aucune lettre ; `@media (forced-colors:active){.rosace-slot{display:none}}`.

---

## 2. Jetons CSS

### 2.1 Structure

Trois attributs sur `<html>` (et sur tout conteneur pour une prévisualisation scopée) : `data-family` (`classique|vert|bleu|rose|mono`), `data-tier` (`clair|sombre|nuit`). Les jetons de palette sont déclarés sur `[data-family][data-tier]`, **pas sur `:root`**, pour que les 5 cartes de la section 9 portent leurs propres jetons. Correspondance avec l'app : `sombre` = *Dusk*, `nuit` = *plus sombre / Night*. Valeurs lues sur `origin/develop` (`app_colors.dart`) ; à relire si le PO a remanié une palette depuis.

Premier rendu sans scintillement : script **inline** dans `<head>`, avant la peinture :

```js
(function(){try{var d=document.documentElement,s=localStorage.getItem('murabbi-ambiance'),a=s?JSON.parse(s):{};
var f=a.family||'classique',t=a.tier||(matchMedia('(prefers-color-scheme: dark)').matches?'nuit':'clair');
d.dataset.family=f;d.dataset.tier=t;d.classList.add('js');
var m=document.querySelector('meta[name=theme-color]');}catch(e){var d=document.documentElement;d.dataset.family='classique';d.dataset.tier='clair';}})();
```

`<meta name="theme-color">` unique, mise à jour par le composant du sélecteur avec la valeur de `--bg`. `color-scheme: light` pour `clair`, `dark` pour `sombre` et `nuit` (déclaré dans les blocs ci-dessous).

### 2.2 Les 15 palettes

```css
/* — Communs — */
:root{
  --font-display:'Newsreader',ui-serif,Georgia,'Times New Roman',serif;
  --font-body:'Schibsted Grotesk',ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif;
  --font-ar:'Noto Naskh Arabic','Geeza Pro','Scheherazade New',serif;
  --card-a:.92;                         /* translucidité des cartes, § 2.3 */
  --r-card:16px; --r-btn:10px; --r-chip:6px; --r-pill:100px;
  --veil-floor:.03;
}
[data-tier="clair"]{--m-plate:.08;--m-fill:.20;--m-stroke:.55;--danger:#9B2C2C;color-scheme:light}
[data-tier="sombre"]{--m-plate:.09;--m-fill:.22;--m-stroke:.60;--danger:#F2A5A5;color-scheme:dark}
[data-tier="nuit"]{--m-plate:.10;--m-fill:.24;--m-stroke:.65;--danger:#F2A5A5;color-scheme:dark}

/* — Classique — */
[data-family="classique"][data-tier="clair"] {--bg:#EEE8DC;--surface:#F9F5EB;--text:#241F17;--text-2:#5F5546;--text-3:#776C58;--accent:#7A6035;--on-accent:#F9F5EB;--ink:#7A6035;--halo:#DED5C5;--gild:none}
[data-family="classique"][data-tier="sombre"]{--bg:#2B2821;--surface:#393532;--text:#F0EDE8;--text-2:#BCB0A4;--text-3:#B9AEA3;--accent:#C5AF8D;--on-accent:#252220;--ink:#C5AF8D;--halo:#443E32;--gild:none}
[data-family="classique"][data-tier="nuit"]  {--bg:#1A1814;--surface:#252220;--text:#F0EDE8;--text-2:#A8998A;--text-3:#9A8B7A;--accent:#A68655;--on-accent:#252220;--ink:#C9A866;--halo:#312B1F;--gild:#C9A866}
/* — Vert — */
[data-family="vert"][data-tier="clair"] {--bg:#F1F3F2;--surface:#FCFDFC;--text:#1A281A;--text-2:#486148;--text-3:#546D54;--accent:#24663C;--on-accent:#FCFDFC;--ink:#24663C;--halo:#D6E1DA;--gild:none}
[data-family="vert"][data-tier="sombre"]{--bg:#202D23;--surface:#2F3C32;--text:#EAF1EA;--text-2:#A5BBA5;--text-3:#A9BCA9;--accent:#76C793;--on-accent:#1F2821;--ink:#8FD3A6;--halo:#304435;--gild:none}
[data-family="vert"][data-tier="nuit"]  {--bg:#131B15;--surface:#1F2821;--text:#EAF1EA;--text-2:#8EA98E;--text-3:#7E9A7E;--accent:#60BE82;--on-accent:#1F2821;--ink:#7CC99A;--halo:#233529;--gild:none}
/* — Bleu — */
[data-family="bleu"][data-tier="clair"] {--bg:#F1F2F3;--surface:#FCFCFD;--text:#18222F;--text-2:#475466;--text-3:#627084;--accent:#916418;--on-accent:#FCFCFD;--ink:#2F5C95;--halo:#C8D2DF;--gild:none}
[data-family="bleu"][data-tier="sombre"]{--bg:#1E252F;--surface:#2D353E;--text:#E9EDF2;--text-2:#A4B0BC;--text-3:#A5B0BB;--accent:#E4B558;--on-accent:#1E2329;--ink:#7AABE9;--halo:#2E3C4F;--gild:#E4B558}
[data-family="bleu"][data-tier="nuit"]  {--bg:#12161C;--surface:#1E2329;--text:#E9EDF2;--text-2:#8C9CAB;--text-3:#8594A3;--accent:#E4B558;--on-accent:#1E2329;--ink:#6E9FE0;--halo:#212C3B;--gild:#E4B558}
/* — Rose — */
[data-family="rose"][data-tier="clair"] {--bg:#F3F1F2;--surface:#FDFCFC;--text:#311725;--text-2:#6A4458;--text-3:#8A6077;--accent:#7D2143;--on-accent:#FDFCFC;--ink:#7D2143;--halo:#DBC7CF;--gild:none}
[data-family="rose"][data-tier="sombre"]{--bg:#2E1E22;--surface:#3E2D33;--text:#F3E8ED;--text-2:#BFA2B0;--text-3:#BCA4B0;--accent:#E095AD;--on-accent:#2C2024;--ink:#E8A9BD;--halo:#483138;--gild:none}
[data-family="rose"][data-tier="nuit"]  {--bg:#1F1417;--surface:#2C2024;--text:#F3E8ED;--text-2:#B08D9E;--text-3:#A48494;--accent:#D87998;--on-accent:#2C2024;--ink:#E08FA8;--halo:#362328;--gild:none}
/* — Mono — */
[data-family="mono"][data-tier="clair"] {--bg:#EBEBEB;--surface:#FCFCFC;--text:#141414;--text-2:#4C4C4C;--text-3:#707070;--accent:#242424;--on-accent:#FCFCFC;--ink:#242424;--halo:#C7C7C7;--gild:none}
[data-family="mono"][data-tier="sombre"]{--bg:#262626;--surface:#363636;--text:#F7F7F7;--text-2:#B0B0B0;--text-3:#B0B0B0;--accent:#EBEBEB;--on-accent:#292929;--ink:#EBEBEB;--halo:#3C3C3C;--gild:none}
[data-family="mono"][data-tier="nuit"]  {--bg:#0F0F0F;--surface:#292929;--text:#F7F7F7;--text-2:#A8A8A8;--text-3:#949494;--accent:#EBEBEB;--on-accent:#292929;--ink:#D9D9D9;--halo:#353535;--gild:none}

/* — Dérivés (identiques pour les 15) — */
[data-family][data-tier]{
  --hairline:color-mix(in srgb,var(--text) 8%,transparent);
  --border:color-mix(in srgb,var(--text) 16%,transparent);
  --card:color-mix(in srgb,var(--surface) calc(var(--card-a) * 100%),transparent);
}
html{background:var(--bg);color:var(--text)}
```

Le Bleu clair garde `--accent:#916418` (or) pour les boutons, comme l'app ; son encre de motif est le cobalt `#2F5C95`.

### 2.3 Cartes translucides : valeurs et garantie de contraste

| Jeton | Valeur | Rôle |
|---|---|---|
| `--card-a` | **0,92** | opacité de la surface d'une carte posée sur un motif |
| bordure de carte | `1px solid var(--hairline)` (8 %) | pas d'ombre, aucune (l'app n'en pose presque pas) |
| `backdrop-filter` | **aucun** | coût GPU mobile, et inutile à 0,92 |
| sous `prefers-reduced-transparency: reduce` | `--card-a:1` | cartes opaques |
| sous `prefers-contrast: more` | `--card-a:1`, `--k` des rosaces ×0,5, bordures `--border` | |

**Calcul exécuté (05/11)** : pire cas = encre à 75 % de couverture derrière la carte (plaque + aplat + trait superposés, intensité 1), halo au plus teinté, carte à 0,92. Rapports de contraste sur la carte, 15 palettes :

| Texte | Minimum mesuré | Règle |
|---|---|---|
| `--text` | **8,84:1** (Vert sombre) | corps et titres |
| `--text-2` | **4,71:1** (Mono sombre) | texte courant secondaire : autorisé |
| `--accent` en texte | 4,16:1 (Classique nuit) | **interdit en texte courant** : liens = `--text` + soulignement `--accent` ; accent réservé aux boutons et filets |
| `--text-3` | 4,12:1 (Mono nuit) | **jamais de texte** (réservé aux icônes et filets décoratifs) |
| `--on-accent` sur `--accent` | **4,64:1** (Classique nuit) | libellés de boutons |
| `--danger` sur carte | **5,18:1** | messages d'erreur (rouge `#9B2C2C` clair, `#F2A5A5` sombre et nuit) |

Texte secondaire hors carte (sur le sol nu, voile 0,03) : `--text-2` sur `--bg` ≥ 5,99:1 sur les 15 palettes.
Script de calcul conservé pour la QA : `calc.py` est reproductible en 10 lignes (moyenne pondérée halo / encre à 75 %, mélange carte 0,92, formule WCAG) ; Cherif QA refait le calcul à partir des hex ci-dessus.

### 2.4 Espacement, rayons, bordures

| Jeton | Valeur |
|---|---|
| espacement (base 4) | `--s1:4px --s2:8 --s3:12 --s4:16 --s5:20 --s6:24 --s8:32 --s10:40 --s12:48 --s16:64 --s20:80 --s26:104` |
| gouttière de page | 16 px (< 480), 24 px (480-1023), 32 px (≥ 1024) |
| largeur max du contenu | 1120 px ; texte courant 62 ch ; pages internes 720 px (+ sommaire 240 px au bureau) |
| rayons | carte 16, bouton 10, puce 6, pilule 100, cadre téléphone 40 (extérieur), 32 (écran) |
| bordure | `1px` hairline ; focus `2px` |
| padding de section | `64px` (< 720), `104px` (≥ 720) |
| ombre | aucune ; seul le cadre téléphone a `0 1px 0 var(--hairline)` |
| points de rupture | 480, 720, 1024, 1280 |

### 2.5 Comment la page reflète les familles (preuve des 5 ambiances)

1. **L'en-tête** porte un bouton « Ambiance » (44 px, icône : rosace miniature de la famille courante) qui ouvre une feuille : 5 pastilles-familles (radio) + 3 tiers (radio). Choisir change `data-family` / `data-tier` sur `<html>`, mémorise (`localStorage`, `try/catch`), met à jour `theme-color`. **Ce qui se re-teinte** : sol, surface, texte, accent, encre, halo, anneau or, motif dominant (khatam8 → rosace12 → fleur16 → anneaux → girih10), capture du téléphone (voir § 7).
2. **La section 9** montre les 5 familles **côte à côte**, chacune dans une carte à `data-family="x"` + `data-tier` = tier courant : sol, rosace dominante clippée, titre de famille (Newsreader), nom du motif (« Rosace des huit », « Couronne de douze », « Fleur de seize » / « Anneaux de lumière » en Bleu sombre et nuit, « Étoile de dix »), une mini-carte (rangée « Fajr Dhuhr Asr Maghrib Isha » sans heures) et un bouton « Choisir ». Un clic applique la famille à toute la page : c'est la démonstration.
3. Sélecteur = `role="radiogroup"` ; chaque option `role="radio"`, flèches du clavier, `aria-checked`, étiquette visible (pas d'icône seule). Libellés : Classique, Vert, Bleu, Rose, Mono ; Clair, Sombre, Nuit.
4. Un mini-bloc de test (`/?fam=bleu&tier=nuit`) lit les paramètres d'URL pour permettre à la QA de capturer chaque combinaison sans clic (n'écrit pas dans `localStorage`).

---

## 3. Typographie

### 3.1 Polices

| Rôle | Police | Source et licence | Chargement |
|---|---|---|---|
| Titres, chiffres d'heures, noms de paliers | **Newsreader** 600 + 600 italique (axe `opsz`) | Google Fonts, OFL ; déjà dans l'app | `next/font/google` |
| Texte et interface | **Schibsted Grotesk** 400 / 500 / 600 | Google Fonts, OFL | `next/font/google` |
| Arabe | **Noto Naskh Arabic** 400 / 600 (sous-ensemble `arabic`) | Google Fonts, OFL ; déjà dans l'app (repli de la police Uthmanic Hafs) | `next/font/google`, `preload:false`, `display:'swap'` |
| Chiffres tabulaires | pas de police mono : `font-variant-numeric: tabular-nums lining-nums` sur Newsreader et Schibsted | | à vérifier au rendu (QA) |

**Pourquoi Schibsted Grotesk plutôt que Geist.** Geist est sur la liste interdite de la doctrine DA ; l'app le garde provisoirement (« passe typographique séparée »). Sur le web rien ne force à reconduire la dette : Schibsted est un grotesque à chasse un peu large, ouvertures franches, bon accent français, hors liste, OFL, variable (poids 400-600 suffisent). Il se tient à côté de Newsreader (serif à contraste doux) sans le concurrencer, et reste assez proche de Geist pour que les captures de l'app (en Geist) ne jurent pas à côté. Le jour où l'app change, la landing est déjà alignée. **Si Schibsted ne rend pas bien les chiffres tabulaires**, repli sur Newsreader pour toutes les heures (déjà son rôle dans l'app) : décision QA, 10 minutes.

**Hors liste, vérifié** : pas Inter, Roboto, Poppins, Geist, Satoshi, Space Grotesk. `Geist Mono` disparaît (la landing n'a pas de mono).

**Chargement (code, charge utile)** : remplacer les `<link>` Google par l'auto-hébergement (aucune IP du visiteur envoyée à Google : sujet RGPD, et un aller-retour de moins) :

```ts
// src/app/fonts.ts
import { Newsreader, Schibsted_Grotesk, Noto_Naskh_Arabic } from 'next/font/google'
export const display = Newsreader({ subsets:['latin'], weight:['600'], style:['normal','italic'], axes:['opsz'], variable:'--f-display', display:'swap' })
export const body = Schibsted_Grotesk({ subsets:['latin'], weight:['400','500','600'], variable:'--f-body', display:'swap' })
export const arabic = Noto_Naskh_Arabic({ subsets:['arabic'], weight:['400','600'], variable:'--f-ar', display:'swap', preload:false })
// <html lang="fr" className={`${display.variable} ${body.variable} ${arabic.variable}`}>
```

Le texte de repli tient les métriques (`adjustFontFallback` par défaut de `next/font`) : zéro saut de mise en page.

### 3.2 Échelle (fluide, mobile d'abord)

| Rôle | Police | Taille | Interligne | Graisse | Césure |
|---|---|---|---|---|---|
| Titre hero (h1) | Newsreader | `clamp(2.25rem, 1.2rem + 5.2vw, 4.25rem)` : 36 px à 375, 68 px max | 1,04 | 600 | `text-wrap:balance`, `letter-spacing:-0.02em` |
| Titre de section (h2) | Newsreader | `clamp(1.75rem, 1.2rem + 2.6vw, 2.75rem)` : 28 à 375, 44 max | 1,1 | 600 | balance, -0,015em |
| Titre de carte (h3) | Newsreader | 20 px (22 ≥ 720) | 1,2 | 600 | |
| Chapeau | Schibsted | `clamp(1.0625rem, 1rem + .4vw, 1.25rem)` : 17 à 20 | 1,5 | 400 | `text-wrap:pretty`, max 56 ch |
| Corps | Schibsted | 16 | 1,6 | 400 | max 62 ch |
| Petit | Schibsted | 14 | 1,5 | 400 | métadonnées, légendes |
| Étiquette (eyebrow) | Schibsted | 12 | 1,3 | 600 | majuscules, `letter-spacing:.12em`, couleur `--text-2` |
| Heure (« 16:10 ») | Newsreader | 28 (mobile), 36 (bureau) | 1 | 600 | tabulaire |
| Bouton | Schibsted | 16 | 1 | 600 | jamais en dessous de 16 |
| Champ de formulaire | Schibsted | **16 minimum** (évite le zoom iOS) | | 400 | |

Poids maximum : 600. Jamais de texte en dégradé. Jamais d'italique hors Newsreader (l'italique sert l'accent d'un mot du h1, voir 3.4).

### 3.3 Arabe

```css
.ar{
  font-family:var(--font-ar);
  direction:rtl; unicode-bidi:isolate; text-align:center;
  font-size:clamp(1.75rem,1.3rem + 2vw,2.5rem); line-height:2.1; font-weight:400;
  font-feature-settings:'liga' 1,'rlig' 1,'calt' 1,'mark' 1,'mkmk' 1;
  font-variant-ligatures:common-ligatures contextual;
  letter-spacing:0; word-spacing:.04em; text-transform:none;
}
```

Balisage : `<p class="ar" lang="ar" dir="rtl" translate="no">…</p>`. Règles :

- **Ligature lam-alef croisée obligatoire** sur tout l'arabe (règle T-1 du PO). Saisir lam (U+0644) + alif (U+0627) ; **ne jamais** coller U+FEFB. Contrôle : la forme croisée de « لَا إِلَٰهَ إِلَّا » doit ressembler à `docs/typographie_arabe/02_cible_ligature-croisee.png` (dépôt mobile), pas à `01`.
- Jamais de `letter-spacing` sur l'arabe (casse la jonction), jamais d'`opacity` inférieure à celle du texte courant, jamais un motif sous l'arabe (il est toujours sur une carte).
- Taille minimale de lecture de l'arabe : 28 px ; le Bismillah du hero : 28 px, couleur `--text-2`, contraste ≥ 4,5:1.
- Textes arabes de la page, **à copier depuis les sources de l'app (jamais de ce document)** : Bismillah ; invocation du matin (celle de la capture de lecture : « أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ… », source Muslim 2723) avec sa traduction française de l'app ; aucune autre. Pas de verset coranique sur la landing (le lecteur est montré par capture), pas de calligraphie inventée.
- **Police uthmanienne** : le lecteur de l'app utilise Uthmanic Hafs (décision U-11). La landing ne l'embarque pas (licence à vérifier avant toute redistribution web) ; la mention « écriture uthmanienne » repose sur la capture réelle du lecteur.

### 3.4 Mise en voix

Un seul mot par h1 peut passer en italique Newsreader, couleur `--text` (jamais l'accent) : « À l'heure, *là où tu es.* ». Ponctuation française : espace insécable avant `:` `;` `?` `!` et dans « 16 h 30 » ; guillemets « » avec insécables. Tutoiement partout, comme l'app. Aucune mention de l'IA, aucune promesse d'usage (« des milliers », « rejoins »), aucun « n° 1 ».

---

## 4. Composants

### 4.1 En-tête (toutes les pages)

- Hauteur 56 px (< 720), 64 px (≥ 720), collé en haut (`position:sticky; top:0; z-index:40`), fond `color-mix(in srgb, var(--bg) 94%, transparent)` + filet `--hairline` en bas ; pas de flou. `padding-top: env(safe-area-inset-top)`.
- Gauche : symbole (`murabbi-symbole.svg`, 26 px) + « Murabbi » (Newsreader 600, 22 px) → `/`.
- **Navigation bureau (≥ 900 px)**, de gauche à droite : `L'application` (`/#repere`, sur la page d'accueil défile jusqu'au repère) · `Devenir testeur` (`/testeurs`) · `Suggestions` (`/suggestions`) · `Informations légales` (bouton à disclosure : Confidentialité `/confidentialite.html`, Conditions d'utilisation `/cgu.html`, Supprimer mon compte `/suppression-compte.html`) · bouton `Ambiance` · bouton principal `Devenir testeur` (masqué sur `/testeurs`, où le lien est `aria-current="page"`).
  Le lien « Devenir testeur » apparaît deux fois (lien + bouton) : le bouton remplace le lien à ≥ 1100 px pour éviter le doublon visible ; à 900-1099 px, seul le lien reste.
- **Mobile (< 900 px)** : brand, bouton « Ambiance » (44×44), bouton menu (44×44, libellé visible « Menu » ≥ 400 px, `aria-expanded`, `aria-controls="menu"`). Le menu est un `<dialog>` modal (`showModal()` : piège de focus natif, `Esc` ferme, retour du focus au bouton) plein écran `100dvh`, `padding-bottom: env(safe-area-inset-bottom)` :
  1. Haut : brand + bouton « Fermer ».
  2. Liste verticale, lignes de 56 px, Newsreader 24 px : Accueil · Devenir testeur · Suggestions · puis sous-titre « Légal » avec les 3 pages en Schibsted 17 px.
  3. Bas fixe : la feuille d'ambiance (familles + tiers) puis le bouton « Devenir testeur » pleine largeur (48 px).
  Fond du dialog : `--bg` + une rosace secondaire `coin` bas à intensité 0,5, voile sous la liste (0,03).
- États : lien `hover` (bureau seulement, `@media (hover:hover)`) : soulignement 2 px `--accent` ; `focus-visible` : anneau 2 px `--text`, décalage 3 px, rayon 6 ; `active` : `opacity .7` 80 ms ; page courante : `aria-current="page"` + soulignement permanent.
- Lien d'évitement « Aller au contenu » en premier élément focalisable, visible au focus.
- Cas limite : en `font-size` système 200 %, la navigation bureau passe en menu à partir de 1100 px (pas d'ellipse sur les libellés).

### 4.2 Pied de page (toutes les pages)

Fond `--surface` plein, filet haut `--hairline`, padding `64 / 80`. Contenu, 4 colonnes au bureau, 1 colonne (accordéon non requis : liste simple) au mobile :

| Colonne | Contenu |
|---|---|
| Marque | symbole + « Murabbi » ; une phrase : « En test fermé. Pour Android et iPhone. » ; bouton « Devenir testeur » |
| L'application | À l'heure (`/#haut`) · Le repère (`/#repere`) · Une voix (`/#voix`) · Constance (`/#constance`) · Lire et rattraper (`/#lire`) · Respect (`/#respect`) · Le cercle (`/#cercle`) · Paliers (`/#paliers`) · Ambiances (`/#ambiances`) |
| Participer | Devenir testeur (`/testeurs`) · Suggestions (`/suggestions`) · Nous écrire (mailto, adresse actuelle de `legal/layout.tsx` ; à remplacer par une adresse dédiée dès qu'elle existe) |
| Légal | Politique de confidentialité (`/confidentialite.html`) · Conditions d'utilisation (`/cgu.html`) · Supprimer mon compte (`/suppression-compte.html`) |

Bas de pied : « © 2026 Murabbi » et la note de méthode actuelle (« Horaires calculés dans le navigateur, méthode Ligue islamique mondiale, Fajr −18°, Isha −17° »), 14 px `--text-2`. Chaque lien : zone ≥ 44 px de haut, `--text-2` → `--text` au survol. Les mêmes liens sur **toutes** les pages (composant unique, plus de pied minimal sur le légal).

### 4.3 Boutons

| Variante | Fond | Texte | Bordure | Usage |
|---|---|---|---|---|
| Primaire | `--accent` | `--on-accent` | aucune | une action principale par vue : « Devenir testeur » |
| Secondaire | `--card` | `--text` | `1px --border` | « Voir comment ça marche », « Choisir » |
| Fantôme | transparent | `--text`, souligné `--accent` | aucune | liens d'action discrets |
| Désactivé (liens Play Store / TestFlight à venir) | transparent | `--text-2` | `1px dashed --border` | `aria-disabled="true"`, libellé « Bientôt disponible », jamais `opacity` réduite (contraste) |

Dimensions : hauteur 48 (44 mini en compact), rayon 10, padding horizontal 22, `font-weight:600`, 16 px. Largeur : pleine largeur < 480 px dans le hero et les cartes, automatique au-delà. Au bureau, 2 boutons côte à côte, écart 12. États : `hover` (bureau) : `color-mix(in srgb, var(--accent) 90%, var(--text))` ; `active` : `transform:scale(.98)` 80 ms, immédiat ; `focus-visible` : anneau 2 px `--text` + 3 px de décalage ; `disabled` : curseur par défaut, aucune réaction. Règle globale : `button,[role="button"],a,label[for],summary,[role="radio"],[role="switch"]{cursor:pointer}`.

### 4.4 Cartes

`background:var(--card); border:1px solid var(--hairline); border-radius:16px; padding:20px` (24 à partir de 720). Aucune ombre. Carte-titre : eyebrow (12 px) puis h3. Carte capture : voir § 7. Carte cliquable (aucune sur l'accueil) : le lien est le titre, pas la carte entière. Espacement entre cartes : 16 (mobile), 24 (bureau). Cas limite : titres de 60 caractères sur 2-3 lignes, `overflow-wrap:anywhere` sur les nombres et URL.

### 4.5 Puces (chips)

Hauteur visuelle 36, **zone cliquable 44** (`::before` de 44 px), rayon 6, `padding:0 14px`, bordure `1px --border`, fond `--card`, texte `--text` 15 px 500. Sélectionnée (`aria-pressed="true"`) : fond `--accent`, texte `--on-accent`, bordure transparente, plus une coche SVG (le sens ne dépend pas de la couleur). Rangée : `flex-wrap`, écart 8. Les puces **informatives** (non interactives : Istighfar, Tasbih, Salawat) : fond transparent, bordure `--hairline`, `cursor:default`, rôle « liste » (`<ul>` + `<li>`).
Pilule « Test fermé » : rayon 100, 14 px, `--card`, bordure `--border`, point de 8 px `--accent` devant.

### 4.6 Champs et interrupteurs

- Champ : hauteur 48, rayon 10, bordure `1px --border`, fond `--surface`, texte 16 px ; focus : bordure 2 px `--text` ; erreur : bordure `--danger`, message sous le champ avec icône (jamais couleur seule), `aria-describedby`, `aria-invalid`. Étiquette au-dessus, jamais un `placeholder` seul.
- `<select>` de ville : mêmes dimensions, flèche SVG dessinée.
- Curseur de décalage (`input[type=range]`) : piste 4 px `--hairline`, remplissage `--accent`, poignée 28 px `--surface` + bordure 2 px `--accent` ; valeur affichée en Newsreader tabulaire à droite.
- Interrupteur (`role="switch"`) : 52×32, poignée 24, `aria-checked`, libellé visible à gauche ; zone 44 de haut mini ; état dit aussi en texte (« Autorisé » / « Fermé ») pour ne pas dépendre de la couleur.

### 4.7 Icônes

Aucun paquet (lucide, heroicons, etc. interdits). Jeu **dessiné pour la landing**, trait 1,6 px, extrémités rondes, 24 px : soleil, lune (thème), cadenas (permission), main tendue (cercle), pause (deux traits), ondes (réseau absent, trois arcs barrés), coche, chevron, menu (deux traits), croix. Le symbole Murabbi existant est conservé. Chaque icône décorative `aria-hidden`, sinon `role="img"` + `<title>`.

---

## 5. Pages internes

Habillage commun : en-tête et pied de page de l'accueil ; **rosaces en murmure** ; contenu dans une « feuille ».

**Fond commun (`PageBackdrop`)** : calque `position:fixed; inset:0; z-index:-1` (fixe : il ne se redessine pas au défilement), composition `diagonale` : rosace A en haut à droite (`rk` 0,55, `cx` 1,02, `cy` 0,02), rosace B en bas à gauche (`rk` 0,50, `cx` −0,02, `cy` 0,98), dominant de la famille, **fixes**, intensité 0,5 (murmure), plus un satellite par coin à ×0,75. Au bureau, `rk` 0,30 : les rosaces vivent dans les marges autour de la colonne de 720 px. Texte hors feuille (eyebrow, h1, chapeau) : posé sur le sol nu, le haut de la page porte un voile (plancher 0,03 de 0 à 320 px de profondeur) ; le reste du texte est **dans la feuille**.

**Feuille (`.sheet`)** : carte (`--card`, 0,92) de largeur 720 px max, rayon 16, padding 20 (mobile) / 40 (bureau), marges latérales 12 (mobile) pour garder un liseré de motif visible. Texte courant `--text-2` ; titres `--text` ; liens en `--text` soulignés `--accent` 2 px, 3 px sous la ligne.

### 5.1 `/testeurs`

Mobile : eyebrow « Test fermé » → h1 « Deviens testeur » → chapeau (« Murabbi est en test fermé. Les testeurs l'installent en avant-première et nous disent ce qui marche, ou pas, via la page suggestions. ») → capture « Accueil » en cadre (pastille 220 px, centrée, rosace derrière, **image réelle de la page**) → deux cartes empilées **Android** et **iPhone** (h3, une phrase, bouton désactivé « Bientôt disponible » : le lien d'ouverture n'existe pas) → bloc « En attendant » (une phrase + bouton primaire « Demander à devenir testeur », `mailto:`) → liste ordonnée « Une fois testeur » en trois jalons (1 Installe, 2 Utilise une semaine, 3 Envoie tes remarques) avec numéros Newsreader 32 px et filet vertical de 2 px `--accent`, pas de puces par défaut.
Bureau : deux colonnes (texte 7/12, capture 5/12 sticky), cartes Android et iPhone côte à côte.
Stress : bouton désactivé à libellé long sur deux lignes sans coupure ; mail du bouton en `mailto` avec sujet encodé.

### 5.2 `/suggestions`

Eyebrow « Ton avis compte » → h1 « Suggère une habitude ou une amélioration » → chapeau → feuille avec le formulaire (champs existants de `SuggestionForm.tsx`, mises en forme § 4.6) → note de confidentialité (14 px) avec lien vers la page. **Image réelle** : capture « Catalogue » en cadre, **tronquée à 55 % de sa hauteur** en haut à droite du bloc d'en-tête (180 px de large mobile, 240 px bureau) : « une fenêtre sur ce que tu proposes ».
États à dessiner : vide, saisie, envoi (bouton en `aria-busy`, libellé « Envoi… », pas de spinner animé requis), succès (carte de confirmation, focus déplacé sur son titre), erreur réseau (message en français clair, conserve la saisie), champ trop long (compteur à 80 %). Zones tactiles 48 px, champs ≥ 16 px.

### 5.3 Pages légales : `/confidentialite.html`, `/cgu.html`, `/suppression-compte.html`

Structure : eyebrow (« Légal ») → h1 → date de mise à jour (14 px `--text-2`, « Dernière mise à jour : … ») → chapeau d'une ou deux phrases → **sommaire** → contenu en feuille.

- **Sommaire ancré**, généré depuis les `h2` de la page (ids stables : slug du titre sans numéro, ex. `donnees-enregistrees`, `droits`, `age-minimum`) :
  - Mobile : `<details class="toc">` en tête de feuille, résumé « Sommaire » (44 px), liste de liens à lignes de 44 px ; fermé par défaut sur > 6 sections. Bouton flottant « Haut de page » (44 px, bas droite, `bottom:calc(16px + env(safe-area-inset-bottom))`) après 600 px de défilement.
  - Bureau (≥ 1024 px) : colonne gauche **sticky** (`top: 88px`, largeur 240 px, titre « Sur cette page »), lien courant mis en avant par `IntersectionObserver` (`aria-current="location"`, filet 2 px `--accent` à gauche). La feuille reste à 720 px ; l'ensemble est centré (240 + 48 + 720).
  - `h2` : `scroll-margin-top:88px`, lien d'ancre `#` au survol/focus (visible au clavier). `html{scroll-padding-top:88px}`.
- **Hiérarchie** : h1 Newsreader (échelle 3.2), h2 Newsreader 24-28 px avec filet haut `--hairline` et 48 px d'espace avant, h3 Schibsted 17 px 600, texte 16/1,65, 62 ch, listes avec puces SVG de 6 px `--accent`, `strong` 600 `--text`.
- **Tableaux** (`confidentialite` : données, durées) : `overflow-x:auto` dans un conteneur à `tabindex="0"` + `role="region"` + `aria-label`, jamais de défilement horizontal de la page ; au mobile, bascule en cartes empilées (libellé de colonne répété avant chaque valeur).
- **Encarts** (« Ce que nous ne faisons jamais ») : carte `--surface` pleine, filet gauche 3 px `--accent`, jamais d'icône d'alerte rouge ; ton calme.
- `suppression-compte` : les deux voies (« Depuis l'application », « Par email ») en deux cartes numérotées ; bouton primaire « Écrire pour supprimer mon compte » (`mailto:` avec sujet), délai en dernier, en clair.
- Impression : `@media print` : fond blanc, pas de rosace, pas d'en-tête sticky, URL après les liens.
- **Image réelle de la page** : sur le légal, c'est la rosace (motif calculé) qui tient lieu d'image, par décision (aucune photo, aucune capture utile) ; à consigner dans `CREDITS.md`.

### 5.4 Erreurs et vide

404 : h1 « Cette page n'existe pas. », une phrase, bouton « Retour à l'accueil », rosace `horizon` à 0,5. Chargement : aucun spinner global ; squelettes uniquement pour les captures (même ratio 900/2004).

---

## 6. Mouvement

Principe : la page est lue, pas jouée. On anime peu et on l'explique.

### 6.1 Jetons

```css
:root{
  --ease-out:cubic-bezier(.215,.61,.355,1);   /* easeOutCubic, courbe standard de l'app */
  --dur-press:80ms;   /* retour à l'appui */
  --dur-fast:150ms;   /* survol, soulignement, bascule d'une puce */
  --dur-base:250ms;   /* ouverture du menu, de la feuille d'ambiance, du sommaire */
  --dur-slow:600ms;   /* apparition de section, entrée de rosace */
  --turn:240s; --turn-slow:360s;   /* un tour de rosace */
}
```

Jamais `ease-in` sur une interface ; la rotation est **linéaire**. Aucune valeur de durée ou de courbe en dur dans un composant.

### 6.2 Inventaire, avec le pourquoi et la fréquence

| Mouvement | Propriété | Durée | Pourquoi | Fréquence | Décision |
|---|---|---|---|---|---|
| Apparition de section (`.reveal`) | `opacity`, `translateY(12px→0)` | `--dur-slow` | installer le rythme de lecture | une fois par visite et par bloc | oui, titre + cartes de la section, décalage 60 ms, 3 éléments max |
| Entrée de rosace | `opacity`, `scale(.985→1)` | `--dur-slow` | « le soleil se lève » | une fois par section | oui |
| Rotation | `transform:rotate` | 240 s (hero) / 360 s (voix) | « le soleil tourne », presque imperceptible | continue, une seule couche | oui, **hero et voix seulement** |
| Retour à l'appui des boutons, puces, interrupteurs | `transform:scale(.98)` | `--dur-press` | accusé de réception immédiat | élevée | oui, jamais retardé |
| Soulignement des liens | `background-size` | `--dur-fast` | survol (bureau) | élevée | oui, derrière `(hover:hover)` |
| Menu mobile, feuille d'ambiance, sommaire | `opacity`, `translateY(8px→0)` | `--dur-base` | situer l'ouverture | faible | oui |
| Changement d'ambiance | `background-color`, `color`, `border-color` | `--dur-base` | le geste doit se voir ; le motif change net | rare | oui ; le motif dominant fait un fondu de 250 ms |
| Mise à jour du résultat du composeur | rien (le texte change) | 0 | le visiteur règle un curseur des dizaines de fois : aucune animation | élevée | **non** |
| Barre de défilement du carrousel de captures | `scroll-snap` natif | natif | geste du doigt | moyenne | oui, pas de JS d'animation |
| Défilement vers une ancre | `scroll-behavior:smooth` | natif | contexte conservé | faible | oui, désactivé en réduit |

### 6.3 États

- `.reveal` n'existe qu'avec la classe `js` sur `<html>` (posée par le script d'amorçage) : sans JS, tout est visible. Observer : `IntersectionObserver`, seuil 0,15, `rootMargin:'0px 0px -8% 0px'`, déconnexion après l'apparition.
- Hover : uniquement sous `@media (hover:hover) and (pointer:fine)`.
- **`prefers-reduced-motion: reduce`** : `animation:none` partout, `.reveal` visible d'emblée, rosaces à l'angle 0 sans entrée, `scroll-behavior:auto`, transitions de couleur à 0 ms. `prefers-reduced-transparency` et `prefers-contrast` : § 2.3.
- Onglet masqué (`visibilitychange`) : `animation-play-state:paused`. Sortie de l'écran : idem (voir § 1.4).
- Budget : `will-change:transform` seulement sur la rosace qui tourne ; **une couche** composée par écran ; aucune animation de `width`, `top`, `box-shadow`, `filter`.

---

## 7. Présenter les captures de l'app

### 7.1 Cadre téléphone (CSS pur)

```
.phone{ --w:clamp(220px,62vw,300px); width:var(--w); aspect-ratio:900/1819; position:relative;
  background:#0E0D0B;                 /* matière du boîtier : constante, identique dans les 15 thèmes */
  border-radius:40px; padding:9px; box-shadow:0 1px 0 var(--hairline); }
.phone > img{ width:100%; height:100%; object-fit:cover; border-radius:32px; display:block; }
```

Pas de capsule d'îlot, pas de boutons latéraux, pas de reflet : un boîtier, un écran. Largeurs : 280-300 px dans le hero (mobile : 72 % de la largeur), 240 px en galerie, 220 px sur `/testeurs`. `<img>` avec `width="900" height="1819"`, `decoding="async"`, `alt` descriptif en français (« Écran d'accueil de Murabbi : prochaine prière et horaires du jour »), AVIF puis WebP via `next/image` (`sizes` renseigné), **hero `priority`**, le reste `loading="lazy"`.

### 7.2 Préparation des captures (obligatoire avant publication)

Les 12 captures actuelles (`public/img/screens/*.webp`, 900×2004) contiennent : la **barre d'état réelle** (heure, batterie), un **pseudonyme personnel** (« Cherif#4021 »), une date réelle, et une **photo d'ambiance** que l'app a retirée (donc périmées). À faire :

1. Recapturer sur l'émulateur privé (application ordinaire, **jamais** « Murabbi R ») depuis `origin/develop`, avec un compte de test au pseudonyme neutre (par exemple « Aminata »), à l'heure 9:41 forcée par le mode démo d'Android (`adb shell settings put global sysui_demo_allowed 1` puis la diffusion `com.android.systemui.demo`), 900×2004.
2. Recadrer par `sharp` (script `scripts/prepare-screens.mjs`) : retirer 133 px en haut (barre d'état) et 52 px en bas (indicateur), soit 900×1819. Export AVIF (qualité 55) et WebP (72), ≤ 60 Ko chacun.
3. Jusqu'à recapture, les captures existantes peuvent servir **en test fermé interne uniquement** (elles montrent une fenêtre, aucune personne) ; **blocant avant diffusion publique** (pseudonyme + photo périmée).

### 7.3 Quelle capture où

| Lieu | Capture | Écran de l'app | Famille/tier |
|---|---|---|---|
| Hero (§ 1) | `accueil` | Accueil : prochaine prière + 5 horaires | suit la famille courante (voir 7.4) |
| Voix (§ 3), bureau seulement | `lecture` | Lecture d'invocation (arabe + traduction) | Classique nuit |
| Constance (§ 4), carrousel | `habitudes`, `catalogue`, `calendrier` | Habitudes du jour ; Catalogue ; Calendrier hégirien | suit la famille |
| Lire (§ 5) | `coran`, `rattrapage` | Lecteur du Coran (page de Mushaf nue, **sans rosace**) ; Prières à rattraper | Classique clair |
| `/testeurs` | `accueil` | idem hero | famille courante |
| `/suggestions` | `catalogue` tronquée | idem | famille courante |

À recapturer en plus de l'existant : `lecture`, `coran`, `rattrapage`, et pour **Bleu** et **Mono** les écrans `accueil`, `habitudes`, `catalogue`, `calendrier` (l'existant ne couvre que Classique, Vert, Rose). **Ne jamais retoucher une capture** (pas de fausses heures, pas de fausses données) : si l'app montre un état vide, on recapture avec un état réaliste produit par l'app.

### 7.4 Lien entre capture et ambiance

Les captures de chaque famille s'empilent (`<img>` ×5, `display:none` sauf celui de la famille courante ; `loading="lazy"` fait que seuls les visibles sont téléchargés). Tant que Bleu et Mono manquent, ils affichent la capture Classique : règle CSS `[data-family="bleu"] .shot-classique, [data-family="mono"] .shot-classique{display:block}`. Le tier de la capture est celui de la prise de vue (le cadre ne ment pas) ; la légende ne dit pas « thème Vert » quand la capture est « Classique ».

### 7.5 Interdits sur les visuels

Aucun avatar, aucune personne, aucun animal, aucune photo d'ambiance, aucune architecture figurée (mosquée), aucune lettre dans les motifs, aucune calligraphie inventée, aucun placeholder. `public/img/silhouette-desert.webp` (silhouette humaine) est **retirée** et ses lignes supprimées de `CREDITS.md`, de même que `RECALE-*` (non publiés, à archiver hors `public/`). `CREDITS.md` ajoute : motifs (originaux, calculés par Sofia, `design-refs/direction-motifs`), polices (OFL, Google Fonts), captures (app Murabbi).

---

## 8. Critères de contrôle (Cherif QA)

Chaque ligne est vérifiable sans jugement. Preuve = capture à 320, 375 et 412 px + sortie d'outil.

**Contraste et lisibilité**
1. Pour chaque combinaison famille × tier (15), sur l'accueil : texte `--text` et `--text-2` sur carte ≥ 4,5:1 (mesure sur le pixel le plus défavorable, pas sur le hex). Valeurs de référence § 2.3.
2. Aucun texte en `--text-3` ; aucun texte en `--accent` dans le corps ; libellés de bouton `--on-accent` / `--accent` ≥ 4,5:1.
3. Aucun texte hors carte à moins de 0,03 de voile : à chaque section, `getComputedStyle` du masque du slot confirme que le motif au droit du texte ≤ 0,03.
4. Arabe : 28 px minimum, ligature lam-alef **croisée** visible dans « لَا إِلَٰهَ إِلَّا » (comparer à `02_cible_ligature-croisee.png`), aucun `letter-spacing`, aucun motif dessous.
5. Zoom du texte à 200 % et police système maximale : aucun texte coupé, aucun chevauchement, navigation en menu.

**Responsive**
6. 320, 375, 412, 768, 1024, 1440 : aucun défilement horizontal (`document.scrollingElement.scrollWidth === clientWidth`), aucune cible tactile < 44×44, hero entièrement lisible avec le téléphone sous le texte.
7. Mobile : `100dvh` pour le menu ; zones sûres (encoche, barre de geste) respectées ; champs ≥ 16 px (aucun zoom iOS).
8. Données extrêmes : titre de 60 caractères, nom de ville de 25 caractères dans le `select`, libellé de bouton long en français, 7 villes, heure 00:05 et 23:59, jour sans lever du soleil (≥ 65° de latitude : message prévu, pas de NaN).

**Accessibilité**
9. Navigation clavier complète : ordre logique, lien d'évitement, anneau de focus visible (2 px, ≥ 3:1) sur tout contrôle, menu en `<dialog>` avec piège de focus et retour du focus, `Esc` ferme ; interrupteurs `role="switch"`, puces `aria-pressed`, sélecteur d'ambiance `radiogroup`.
10. Lecteur d'écran (NVDA ou VoiceOver) : un seul `h1` par page, hiérarchie sans saut, landmarks (`header`, `nav` ×2 nommées, `main`, `footer`), rosaces et captures décoratives masquées ou décrites, états des démos annoncés (`aria-live="polite"` sur résultat du composeur et sur la ligne d'effet du cercle).
11. Aucune information portée par la couleur seule (puces, interrupteurs, erreurs, boutons désactivés).
12. `prefers-reduced-motion`, `prefers-reduced-transparency`, `prefers-contrast: more`, `forced-colors` : comportements du § 6.3 et § 1.4 observés.
13. `lang="fr"` sur `<html>`, `lang="ar" dir="rtl" translate="no"` sur l'arabe.

**Mouvement**
14. Un tour de rosace = 240 s (hero) et 360 s (voix), vérifiés par la valeur calculée de `animation-duration` ; **une seule** rotation active à l'écran ; arrêt hors écran, onglet masqué et en réduit.
15. Aucune animation sur les mises à jour du composeur ; aucune `ease-in` ; toutes les durées et courbes viennent de jetons (`grep` : aucune durée en dur hors `:root`).
16. Pas de saut de mise en page (CLS ≤ 0,02) à l'arrivée des polices, des captures, des rosaces et du changement d'ambiance.

**Ambiances**
17. Les 15 combinaisons (`/?fam=…&tier=…`) : hex de `--bg`, `--surface`, `--text`, `--accent`, `--ink`, `--halo` conformes au § 2.2 ; motif dominant conforme (Classique khatam8, Vert rosace12, Bleu clair fleur16, Bleu sombre et nuit anneaux, Rose fleur16, Mono girih10) ; anneau or présent seulement pour Classique nuit et Bleu sombre et nuit.
18. Le choix d'ambiance survit au rechargement et à la navigation vers les pages internes ; sans `localStorage` (navigation privée) la page s'affiche correctement.
19. Aucun scintillement du premier rendu (capture à 0 ms et à 500 ms identiques en couleur).

**Contenu et conformité**
20. Aucune image de personne, d'animal, de mosquée ; aucune lettre dans les motifs ; aucune photo d'ambiance (`img` de la page = captures de l'app uniquement) ; `CREDITS.md` à jour.
21. Aucune mention de l'IA ; aucun chiffre d'usage, aucun témoignage, aucune étoile ; la page dit « test fermé » dans le hero et dans la section 10.
22. « Toutes les invocations » n'apparaît nulle part ; l'adhan n'apparaît pas comme argument ; seules « istighfar, tasbih, salawat » sont dites récitées.
23. Chaque capture : aucune barre d'état réelle, aucun pseudonyme personnel, aucune donnée réelle ; ratio 900/1819 ; ≤ 60 Ko.
24. Textes arabes strictement identiques à ceux de l'application (comparaison de chaînes avec les sources du dépôt mobile).
25. Liens : toutes les routes du pied de page répondent 200 ; liens d'en-tête présents sur les 6 pages ; ancres du sommaire légal fonctionnelles (toutes les `h2` ont un `id`, chaque entrée du sommaire y mène).
26. `three`, `@react-three/fiber`, `@react-three/drei` retirés de `package.json` ; plus de lecture de fichier au rendu dans `page.tsx` (`landing-engine.js` chargé comme module client) ; polices auto-hébergées (aucune requête vers `fonts.googleapis.com`).

**Performance** (Lighthouse mobile, profil 4G lent, appareil moyen)
27. LCP ≤ 2,5 s ; TBT ≤ 200 ms ; poids de la première vue ≤ 350 Ko (HTML + CSS + JS + polices latines + capture du hero) ; JS initial ≤ 120 Ko gzip.
28. Rotation : sur Android milieu de gamme, aucune image > 16 ms sur 10 s de défilement et de rotation (outil Performance), pas de repeinture de la couche en rotation.

**Provenance**
29. Motifs : générés depuis `design-refs/direction-motifs/motifs/*.svg` (aucun tracé externe) ; polices : OFL ; aucun fichier de `pinterest-art-islamique/` dans le dépôt ni dans le build.

### Stress test (liste, à jouer en plus)
Famille Mono × nuit (encre presque blanche, le plus risqué) ; 200 % de police ; 320 px de large ; réseau coupé après chargement (la page reste utilisable : démos locales) ; JavaScript désactivé (contenu lisible, démos remplacées par leur description, aucun `.reveal` masqué) ; `Ctrl+P` sur une page légale.

---

## 9. Points ouverts

| # | Sujet | Qui | Effet |
|---|---|---|---|
| O1 | Recapture des écrans (§ 7.2-7.3) : pseudonyme neutre, sans photo, Bleu et Mono, `lecture`, `coran`, `rattrapage` | Ibrahima + Cherif QA | blocant pour la diffusion publique, pas pour le test fermé |
| O2 | Licence web de la police Uthmanic Hafs | PO | si autorisée, utilisable dans la capture du lecteur à plus grande taille ; sinon inchangé |
| O3 | « §15 translucidités » absente de `DIRECTION.md` : reporter § 2.3 dans la direction de l'app | Sofia | cohérence app / landing |
| O4 | Adresse de contact (actuellement une adresse personnelle dans le pied légal) | PO | remplacement par une adresse dédiée |
| O5 | Seuils de points des paliers (existants sur la page actuelle) à confirmer avec l'app avant reprise | QA | la section 8 reprend noms et seuils actuels |
| O6 | Tableau de prières : durées de rattrapage « selon ton école » non chiffrées volontairement (durées Q5 non confirmées) | PO | aucun nombre affiché |
| O7 | Image de partage (Open Graph) : produire `public/og.png` 1200×630 : rosace dominante Classique nuit + « À l'heure, là où tu es. » | Sofia / Ibrahima | à faire après le build du hero |

## 10. Livraison à Ibrahima, ordre conseillé (PR petites)

1. Jetons, polices `next/font`, base CSS (focus, `cursor:pointer`, skip link, reduced-motion) : § 2, § 3, § 6.1.
2. Sprite de rosaces + composant `Rosace` + `PageBackdrop` + voile : § 1.4.
3. En-tête, menu `<dialog>`, pied de page, sélecteur d'ambiance : § 4, § 2.5.
4. Accueil sections 1 à 4, cadre téléphone, nettoyage de `three.js` : § 1.3, § 7.
5. Accueil sections 5 à 10 (composeur et cercle repris, graphique supprimé).
6. Pages internes : `/testeurs`, `/suggestions`, sommaire légal.
7. Passe craft : stress test, Lighthouse, § 8. Chaque PR : captures avant/après à 375 px, SHA sur `origin/develop` cité.
