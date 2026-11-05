import { Rosace } from './motifs/Rosace'

/**
 * Fond des pages internes : deux rosaces immobiles en coins opposés, en
 * murmure (intensité 0,5). Fixe : il ne se redessine pas au défilement.
 */
export function PageBackdrop() {
  return (
    <div className="page-backdrop" aria-hidden="true">
      <Rosace at={{ rk: 0.55, cx: 1.02, cy: 0.02 }} atDesktop={{ rk: 0.3, cx: 1.02, cy: 0.02 }} k={0.5} />
      <Rosace at={{ rk: 0.5, cx: -0.02, cy: 0.98 }} atDesktop={{ rk: 0.3, cx: -0.02, cy: 0.98 }} k={0.5} />
      <Rosace role="secondary" at={{ rk: 0.1, cx: 0.78, cy: 0.1 }} k={0.4} />
    </div>
  )
}
