import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Murabbi — tes habitudes, ancrées sur le rythme de ta journée',
  description:
    "Murabbi accroche tes habitudes aux cinq repères qui structurent réellement ta journée. Prières, habitudes avancées, cercle bienveillant, calendrier hégirien. Application mobile — bêta à venir.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/murabbi-symbole.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Murabbi — tes habitudes, ancrées sur le rythme de ta journée',
    description: "Tu ne choisis pas une heure. Tu choisis un repère. Murabbi recalcule le reste, chaque jour.",
    type: 'website',
    locale: 'fr_FR',
  },
}

export function generateViewport() {
  return {
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#F5F2ED' },
      { media: '(prefers-color-scheme: dark)', color: '#1A1814' },
    ],
  }
}

/**
 * Polices chargees exactement comme dans l'ancienne page statique — deux
 * <link> plutot que next/font/google — pour ne rien changer au rendu
 * (auto-hebergement via next/font resubdiviserait/re-servirait les fichiers
 * de police, un risque de micro-diff visuel qu'il n'y avait aucune raison de
 * prendre pour cette migration). Voir le commentaire d'origine dans
 * l'ancien index.html sur l'italique de Newsreader, indispensable a l'accent
 * du titre principal.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,600;1,6..72,600&family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
