import type { NextConfig } from 'next'

/**
 * Export statique : ce site n'a ni backend ni logique serveur (le
 * formulaire de liste d'attente est volontairement non relie, cf.
 * app/page.tsx). Next.js sert ici d'outillage (React, TypeScript,
 * routage par fichiers) sur un site qui reste, au final, un tas de
 * fichiers statiques — meme deploiement Vercel qu'avant, sans fonction
 * serverless a faire tourner.
 */
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
