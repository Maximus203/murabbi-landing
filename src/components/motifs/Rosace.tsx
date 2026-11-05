import type { CSSProperties } from 'react'

type Place = { rk: number; cx: number; cy: number }

type Props = {
  /** Dominant de la famille (choisi par CSS) ou secondaire. */
  role?: 'dominant' | 'secondary'
  /** Durée d'un tour en secondes (240 ou 360) ; absent = immobile. */
  turn?: 240 | 360
  /** Placement mobile : rayon (fraction de la largeur), centre (fractions). */
  at: Place
  /** Placement bureau (≥ 1024 px) ; par défaut identique au mobile. */
  atDesktop?: Place
  /** Multiplicateur d'intensité : 1, 0,7 ou 0,5. */
  k?: number
  className?: string
  /** Le motif suit la famille de la carte qui le porte, pas celle de la page. */
  own?: boolean
}

/**
 * Une rosace d'horizon, décorative : ni lue, ni cliquable. Couleurs et
 * opacités viennent des jetons (`--ink`, `--halo`, `--m-plate|fill|stroke`).
 * Le motif dominant change avec la famille d'ambiance (voir globals.css).
 */
export function Rosace({ role = 'dominant', turn, at, atDesktop, k = 1, className = '', own = false }: Props) {
  const style = {
    '--rk': at.rk,
    '--cx': at.cx,
    '--cy': at.cy,
    ...(atDesktop ? { '--rk-d': atDesktop.rk, '--cx-d': atDesktop.cx, '--cy-d': atDesktop.cy } : {}),
    '--k': k,
  } as CSSProperties
  const dominant = role === 'dominant'
  return (
    <div className={`rosace-slot ${className}`.trim()} style={style} aria-hidden="true">
      <div className="halo" />
      <div className={`rosace${own ? ' own' : ''}`} data-turn={turn}>
        <svg viewBox="-100 -100 200 200" focusable="false">
          {dominant ? (
            <>
              <use href="#m-khatam8" data-for="classique" />
              <use href="#m-rosace12" data-for="vert" />
              <use href="#m-fleur16" data-for="rose bleu-clair" />
              <use href="#m-anneaux" data-for="bleu-sombre" />
              <use href="#m-girih10" data-for="mono" />
            </>
          ) : (
            <>
              <use href="#m-girih10" data-for="classique vert bleu-clair bleu-sombre" />
              <use href="#m-khatam8" data-for="rose mono" />
            </>
          )}
          <circle r="99" className="rs-gild" />
        </svg>
      </div>
    </div>
  )
}
