import { Newsreader, Noto_Naskh_Arabic, Schibsted_Grotesk } from 'next/font/google'

// Polices auto-hébergées par next/font : aucune requête vers Google côté visiteur.
export const display = Newsreader({
  subsets: ['latin'],
  weight: 'variable',
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--f-display',
  display: 'swap',
})
export const body = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--f-body',
  display: 'swap',
})
export const arabic = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  weight: ['400', '600'],
  variable: '--f-ar',
  display: 'swap',
  preload: false,
})
