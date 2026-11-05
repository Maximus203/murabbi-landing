import { MOTIFS, type MotifName } from './markup'

/**
 * Bibliothèque des rosaces d'horizon, déclarée une seule fois par page sous
 * forme de `<symbol>` ; chaque emplacement la référence avec `<use>`
 * (voir `Rosace`). Géométrie calculée, jamais décalquée : spécification
 * exécutable dans scripts/motifs-spec.cjs.
 */
export function MotifSprite() {
  return (
    <svg className="motif-sprite" width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        {(Object.keys(MOTIFS) as MotifName[]).map((name) => (
          <symbol key={name} id={`m-${name}`} viewBox={MOTIFS[name].tile ? '0 0 200 200' : '-100 -100 200 200'}>
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              dangerouslySetInnerHTML={{ __html: MOTIFS[name].inner }}
            />
          </symbol>
        ))}
      </defs>
    </svg>
  )
}
