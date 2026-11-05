'use client'

import { Rosace } from './motifs/Rosace'
import { FAMILIES, motifName, setAmbiance, useAmbiance } from '@/lib/ambiance'
import { AmbiancePicker } from './AmbiancePicker'

/**
 * Les cinq familles côte à côte, chacune avec ses propres jetons (quelle que
 * soit la famille choisie pour la page) ; un clic applique la famille à toute
 * la page : c'est la démonstration.
 */
export function Families() {
  const { family, tier } = useAmbiance()
  return (
    <>
      <div className="fam-grid">
        {FAMILIES.map((f) => (
          <div className="fam-card reveal" key={f.id} data-family={f.id} data-tier={tier} data-active={family === f.id}>
            <Rosace at={{ rk: 0.62, cx: 0.5, cy: 0.3 }} own />
            <div className="fam-body">
              <h3>{f.label}</h3>
              <p className="small">{motifName(f.id, tier)}</p>
              <p className="fam-prayers">Fajr · Dhuhr · Asr · Maghrib · Isha</p>
              <button className="btn btn-secondary btn-sm" type="button" aria-pressed={family === f.id} onClick={() => setAmbiance({ family: f.id })}>
                {family === f.id ? 'Choisie' : 'Choisir'}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="tier-pick reveal">
        <AmbiancePicker idPrefix="sec" />
      </div>
    </>
  )
}
