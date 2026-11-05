import type { ReactNode } from 'react'
import { Toc } from './Toc'

/**
 * Habillage d'une page légale : sommaire ancré (généré depuis les `h2`) puis
 * la feuille de lecture. Tout le texte est dans la feuille, jamais sur le motif.
 */
export function LegalDoc({ children }: { children: ReactNode }) {
  return (
    <div className="legal-layout">
      <Toc target="legal-sheet" />
      <article className="sheet" id="legal-sheet">
        {children}
      </article>
    </div>
  )
}
