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
  "Murabbi connaît la plage de chaque prière là où tu es et te relance avant qu'elle passe. Invocations récitées au rappel, adhkar, Coran et habitudes : un trait par jour. En test fermé sur Android et iPhone."

export const metadata: Metadata = {
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
  openGraph: { title: TITLE, description: DESC, type: 'website', locale: 'fr_FR', siteName: 'Murabbi' },
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
