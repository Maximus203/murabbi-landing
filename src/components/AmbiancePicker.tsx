'use client'

import { FAMILIES, TIERS, setAmbiance, useAmbiance } from '@/lib/ambiance'

/** Famille et intensité : `radiogroup` natif (flèches du clavier). */
export function AmbiancePicker({ idPrefix = 'amb' }: { idPrefix?: string }) {
  const { family, tier } = useAmbiance()
  return (
    <div>
      <fieldset className="amb-set">
        <legend>Famille</legend>
        <div className="radio-row" role="radiogroup" aria-label="Famille d'ambiance">
          {FAMILIES.map((f) => (
            <label className="radio" key={f.id}>
              <input
                type="radio"
                name={`${idPrefix}-fam`}
                value={f.id}
                checked={family === f.id}
                onChange={() => setAmbiance({ family: f.id })}
              />
              {f.label}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="amb-set">
        <legend>Intensité</legend>
        <div className="radio-row" role="radiogroup" aria-label="Intensité">
          {TIERS.map((t) => (
            <label className="radio" key={t.id}>
              <input
                type="radio"
                name={`${idPrefix}-tier`}
                value={t.id}
                checked={tier === t.id}
                onChange={() => setAmbiance({ tier: t.id })}
              />
              {t.label}
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  )
}
