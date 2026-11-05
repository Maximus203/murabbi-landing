# Murabbi landing

Landing page publique et pages légales de Murabbi, construite avec Next.js 16,
React 19 et TypeScript. Le site présente l'application mobile, explique les
repères horaires liés au soleil et permet aux testeurs d'envoyer des
suggestions.

## Pré-requis

- Node.js 20 ou plus récent
- pnpm 10.33.2 (déclaré dans `package.json`)
- Pour le formulaire de suggestions : un projet Supabase et ses variables
  publiques

## Installation et commandes

```bash
pnpm install
pnpm dev
```

Le site est disponible sur `http://localhost:3000`.

| Commande | Usage |
| --- | --- |
| `pnpm dev` | serveur de développement |
| `pnpm lint` | lint ESLint |
| `pnpm typecheck` | vérification TypeScript |
| `pnpm build` | build de production |
| `pnpm start` | servir le build de production |

## Variables d'environnement

Le formulaire `/suggestions` utilise uniquement la clé publique Supabase :

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<projet>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<clé anon>
```

Variable facultative `NEXT_PUBLIC_SITE_URL` (adresse publique, sans barre finale) :
elle active l'image de partage `public/og.png` (régénérée par `node scripts/build-og.cjs`).

Les écritures sont limitées par RLS dans la table
`landing_suggestions`. Les migrations préparatoires sont dans
`supabase/pending-migrations/`; elles doivent être appliquées dans le projet
Supabase avant d'activer le formulaire.

## Organisation

La direction artistique complète est dans `docs/design/DIRECTION-LANDING.md`
(prolongement de « Rosaces d'horizon » de l'application).

- `src/app/page.tsx` : l'accueil, en dix sections (À l'heure, repère, voix,
  constance, lire et rattraper, respect, cercle, paliers, ambiances, test fermé).
- `src/app/(legal)/` : pages testeurs, suggestions et pages légales ; les
  longues pages légales reçoivent un sommaire généré depuis leurs `h2`.
- `src/components/` : en-tête (menu mobile en `<dialog>`), pied de page, démos
  (`Repere`, `Consent`), sélecteur d'ambiance, cadre téléphone, rosaces.
- `src/lib/prayer.ts` : calcul solaire des horaires (illustratif, voir plus bas).
- `src/lib/ambiance.ts` : famille et intensité d'ambiance (`localStorage`).
- `src/app/globals.css` : jetons des 15 palettes de l'application et composants.
- `scripts/` : `build-motifs.cjs` régénère `src/components/motifs/markup.ts` depuis
  `motifs-spec.cjs` (copie de la spécification exécutable de l'application) ;
  `prepare-screens.mjs` recadre les captures (barre d'état et indicateur retirés).
- `public/img/screens/` : captures de l'application mobile.
- `docs/audit/` : rapports d'audit de positionnement et de contenu.

Ambiance : `?fam=bleu&tier=nuit` dans l'URL force une combinaison (utile pour
capturer les 15 rendus) ; le choix du visiteur est mémorisé dans `localStorage`.

Les horaires affichés sur la landing sont calculés dans le navigateur, selon la
méthode de la Ligue Islamique Mondiale (Fajr −18°, Isha −17°). Ils sont
illustratifs et ne remplacent pas la configuration de l'application mobile.

## Déploiement

Le dépôt est configuré pour Vercel (`vercel.json`). Le workflow GitHub Actions
`.github/workflows/deploy.yml` déclenche le déploiement à partir de la branche
principale. Vérifier les variables Supabase dans l'environnement Vercel avant
de publier la page `/suggestions`.

Avant une mise en ligne :

```bash
pnpm lint
pnpm typecheck
pnpm build
```

Tester ensuite la landing en largeur mobile (320, 375, 412) et bureau, les 15
ambiances, le menu, le sélecteur de ville, le composeur de repère, les ancres
de navigation et les pages légales (sommaire compris).
