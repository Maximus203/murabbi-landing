import type { Metadata, Viewport } from 'next'
import { MotifSprite } from '@/components/motifs/MotifSprite'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SiteEffects } from '@/components/SiteEffects'
import { BOOTSTRAP } from '@/lib/ambiance'
import { arabic, body, display } from './fonts'
import './globals.css'

const TITLE = "Murabbi — tes prières à l'heure, tes habitudes au quotidien"
const DESC =
  "Murabbi connaît la plage de chaque prière là où tu es et te relance avant qu'elle passe. Au rappel, ton téléphone te récite istighfar, tasbih, salawat. Adhkar, Coran et habitudes : un trait par jour. En test fermé sur Android et iPhone."

// Adresse publique du site (ex. https://exemple.org) : sans elle, l'image de partage
// n'est pas déclarée, car une adresse absolue est requise.
const SITE = process.env.NEXT_PUBLIC_SITE_URL

export const metadata: Metadata = {
  ...(SITE ? { metadataBase: new URL(SITE) } : {}),
  title: TITLE,
  description: DESC,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/murabbi-symbole.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: TITLE,
    description: DESC,
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Murabbi',
    ...(SITE ? { images: [{ url: '/og.png', width: 1200, height: 630, alt: "Murabbi : à l'heure, là où tu es." }] } : {}),
  },
  ...(SITE ? { twitter: { card: 'summary_large_image' as const } } : {}),
}

export const viewport: Viewport = {
  themeColor: '#EEE8DC',
  colorScheme: 'light dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      data-family="classique"
      data-tier="clair"
      className={`${display.variable} ${body.variable} ${arabic.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOTSTRAP }} />
      </head>
      <body>
        <a className="skip" href="#contenu">
          Aller au contenu
        </a>
        <MotifSprite />
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <SiteEffects />
      </body>
    </html>
  )
}
