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

Les écritures sont limitées par RLS dans la table
`landing_suggestions`. Les migrations préparatoires sont dans
`supabase/pending-migrations/`; elles doivent être appliquées dans le projet
Supabase avant d'activer le formulaire.

## Organisation

- `src/app/page.tsx` : contenu de la landing page.
- `src/app/(legal)/` : pages testeurs, suggestions et pages légales.
- `src/components/` : scène 3D du téléphone et formulaire de suggestions.
- `src/landing-engine.js` : calcul solaire et interactions de la landing.
- `src/app/globals.css` : design system et responsive.
- `public/img/screens/` : captures de l'application mobile.
- `docs/audit/` : rapports d'audit de positionnement et de contenu.

Les horaires affichés sur la landing sont calculés dans le navigateur, selon la
méthode de la Ligue Islamique Mondiale (Sobh −18°, Isha −17°). Ils sont
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

Tester ensuite la landing en largeur mobile et desktop, le changement de thème,
les onglets du téléphone, le sélecteur de ville, les ancres de navigation et
les pages légales.
