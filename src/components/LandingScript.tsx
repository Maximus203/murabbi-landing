'use client'

import Script from 'next/script'

/**
 * Le moteur de la page (calcul solaire NOAA, arc/repères, graphe de
 * décalage annuel, simulateur de déclencheur, calendrier, thème,
 * apparitions au défilement) est repris VERBATIM de l'ancienne
 * landing/index.html — cf. src/landing-engine.js. C'est un IIFE qui
 * interroge le DOM par id, exactement comme il le faisait en bas d'une
 * page HTML classique ; le porter en hooks React n'aurait rien apporté
 * et aurait risqué d'introduire une erreur dans des calculs déjà
 * vérifiés à la minute près contre le moteur de l'app Flutter.
 *
 * `next/script` avec `afterInteractive` l'exécute une fois l'hydratation
 * terminée — le DOM que le script interroge existe déjà à ce moment,
 * exactement comme avant.
 */
export function LandingScript({ code }: { code: string }) {
  return <Script id="landing-engine" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: code }} />
}
