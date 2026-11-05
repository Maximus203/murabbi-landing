'use client'

import { useState } from 'react'
import { IconHand, IconLock } from './Icons'

const ROWS = [
  { id: 'prayer', title: 'Rappel de prière', q: '« J’autorise mon cercle à me rappeler une prière quand son heure est passée. »', on: true, refus: "Ton cercle ne peut pas te rappeler une prière : tu n'as pas ouvert ce type de rappel." },
  { id: 'habit', title: "Rappel d'habitude", q: '« J’autorise mon cercle à me rappeler une habitude que j’avais prévue aujourd’hui. »', on: false, refus: "Ton cercle ne peut pas te rappeler une habitude : tu n'as pas ouvert ce type de rappel." },
  { id: 'weekly', title: 'Récapitulatif du vendredi', q: '« J’autorise mon cercle à m’envoyer le récapitulatif de ma semaine. »', on: true, refus: "Personne ne peut t'envoyer le récapitulatif du vendredi : tu ne l'as pas ouvert." },
  { id: 'encouragement', title: "Mot d'encouragement", q: 'Un message libre, sans motif particulier.', on: true, refus: "Même un mot d'encouragement est bloqué : tu ne l'as pas ouvert." },
] as const

/** La porte du consentement, démontrée : le refus est dans le code, pas dans un réglage. */
export function Consent() {
  const [state, setState] = useState<Record<string, boolean>>(Object.fromEntries(ROWS.map((r) => [r.id, r.on])))
  const closed = ROWS.filter((r) => !state[r.id])
  const msg =
    closed.length === 0
      ? "Ton cercle peut te tendre la main sur les quatre motifs. Tu peux en refermer un à tout moment, l'effet est immédiat."
      : closed.length === 1
        ? closed[0].refus
        : `${closed.length} motifs sont fermés : aucun rappel de ces types ne peut être créé, même par un proche bien intentionné.`
  return (
    <div className="card consent reveal">
      <div className="consent-head">
        <p className="eyebrow">Ce que j&apos;autorise</p>
        <p>Chaque ligne est une permission que tu donnes sur toi, et que tu reprends quand tu veux.</p>
      </div>
      {ROWS.map((r) => (
        <div className="consent-row" key={r.id}>
          <div>
            <p className="consent-title" id={`c-${r.id}`}>{r.title}</p>
            <p className="consent-q">{r.q}</p>
            <p className="consent-state">{state[r.id] ? 'Autorisé' : 'Fermé'}</p>
          </div>
          <button
            className="switch"
            type="button"
            role="switch"
            aria-checked={state[r.id]}
            aria-labelledby={`c-${r.id}`}
            onClick={() => setState((s) => ({ ...s, [r.id]: !s[r.id] }))}
          />
        </div>
      ))}
      <div className="nudge" aria-live="polite">
        {closed.length === 0 ? <IconHand /> : <IconLock />}
        <span>{msg}</span>
      </div>
    </div>
  )
}
