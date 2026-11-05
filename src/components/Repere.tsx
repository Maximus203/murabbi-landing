'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ANCHORS,
  CITIES,
  PRAYERS,
  addMonths,
  fmt,
  midnightUTC,
  nowLocal,
  prayerTimes,
  type AnchorKey,
  type CityKey,
  type DayTimes,
} from '@/lib/prayer'
import { IconCheck } from './Icons'

/** Arc du jour : de l'aube à la nuit, les repères posés dessus. */
function Arc({ t, now, next }: { t: DayTimes; now: number; next: AnchorKey | null }) {
  const W = 480
  const H = 132
  const PAD = 22
  const start = t.fajr !== null ? t.fajr - 0.6 : 4
  const end = t.isha !== null ? t.isha + 0.6 : 22
  const span = end - start
  const x = (h: number) => PAD + ((h - start) / span) * (W - PAD * 2)
  const y = (h: number) => {
    const u = ((h - start) / span) * 2 - 1
    return H - 26 - (1 - u * u) * (H - 58)
  }
  let d = ''
  for (let i = 0; i <= 60; i++) {
    const h = start + (span * i) / 60
    d += (i === 0 ? 'M' : 'L') + x(h).toFixed(1) + ' ' + y(h).toFixed(1)
  }
  const marks = ANCHORS.filter((a) => t[a.key] !== null && t[a.key]! >= start && t[a.key]! <= end)
  const inRange = now >= start && now <= end
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Arc du soleil sur la journée, avec les cinq repères">
      <line x1={PAD} y1={H - 20} x2={W - PAD} y2={H - 20} stroke="var(--hairline)" strokeWidth="1" />
      <path d={d} fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" opacity=".5" />
      {inRange && (
        <line x1={x(now)} y1="14" x2={x(now)} y2={H - 20} stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 4" opacity=".6" />
      )}
      {marks.map((a) => {
        const h = t[a.key]!
        const isNext = a.key === next
        const r = isNext ? 6 : a.key === 'sunrise' ? 2.6 : 4
        return (
          <g key={a.key}>
            {isNext && <circle cx={x(h)} cy={y(h)} r="11" fill="var(--accent)" opacity=".16" />}
            <circle cx={x(h)} cy={y(h)} r={r} fill={isNext ? 'var(--accent)' : 'var(--text-2)'} />
          </g>
        )
      })}
    </svg>
  )
}

function anchorLabel(k: AnchorKey) {
  return ANCHORS.find((a) => a.key === k)!.label
}

/** La carte « Aujourd'hui » et le composeur de repère : calculés dans le navigateur. */
export function Repere() {
  const [cityKey, setCityKey] = useState<CityKey>('dakar')
  const [dir, setDir] = useState<'before' | 'after'>('after')
  const [anchor, setAnchor] = useState<AnchorKey>('fajr')
  const [offset, setOffset] = useState(15)
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    const first = setTimeout(() => setNow(new Date()), 0)
    const id = setInterval(() => setNow(new Date()), 60000)
    return () => {
      clearTimeout(first)
      clearInterval(id)
    }
  }, [])

  const city = CITIES[cityKey]
  // Avant l'hydratation, on garde une date stable (rendu serveur identique).
  const today = useMemo(() => midnightUTC(now ?? new Date(Date.UTC(2026, 10, 5))), [now])
  const t = useMemo(() => prayerTimes(city, today), [city, today])
  const local = now ? nowLocal(city, now) : null

  let next: AnchorKey | null = null
  if (local !== null) {
    for (const p of PRAYERS) {
      if (t[p.key] !== null && t[p.key]! > local) {
        next = p.key
        break
      }
    }
  }
  const dateLabel = (() => {
    const s = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(today)
    return s.charAt(0).toUpperCase() + s.slice(1)
  })()

  let foot = 'Demain, les cinq repères ne tomberont pas aux mêmes minutes.'
  if (local !== null) {
    if (next) {
      const mins = Math.max(0, Math.round((t[next]! - local) * 60))
      const h = Math.floor(mins / 60)
      const delay = h > 0 ? `${h} h ${String(mins % 60).padStart(2, '0')}` : `${mins} min`
      foot = `Prochain repère à ${city.label} : ${anchorLabel(next)}, dans ${delay}. Demain, il ne tombera pas à la même minute.`
    } else {
      foot = `La journée est passée à ${city.label}. Demain, les cinq repères ne tomberont pas aux mêmes minutes.`
    }
  }

  const resolve = (d: Date) => {
    const base = prayerTimes(city, d)[anchor]
    if (base === null) return null
    return base + ((dir === 'before' ? -1 : 1) * offset) / 60
  }
  const label = anchor === 'sunrise' ? 'le lever du soleil' : anchorLabel(anchor)
  const dirWord = dir === 'before' ? 'avant' : 'après'
  const sentence = offset === 0 ? `À l'heure exacte : ${label}.` : `${offset} minutes ${dirWord} ${label}.`

  return (
    <div className="repere-grid">
      <div className="card today reveal" id="aujourdhui">
        <div className="today-top">
          <div>
            <p className="eyebrow">Aujourd&apos;hui</p>
            <p className="today-date">{dateLabel}</p>
          </div>
          <div className="field">
            <label className="sr-only" htmlFor="city">
              Ville de référence
            </label>
            <select className="select" id="city" value={cityKey} onChange={(e) => setCityKey(e.target.value as CityKey)} style={{ minHeight: 44, width: 'auto' }}>
              {(Object.keys(CITIES) as CityKey[]).map((k) => (
                <option key={k} value={k}>
                  {CITIES[k].label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="arc">
          <Arc t={t} now={local ?? -1} next={next} />
        </div>
        <ul className="anchors" aria-label="Les cinq prières du jour">
          {PRAYERS.map((p) => (
            <li className="anchor" key={p.key} data-next={p.key === next} data-past={local !== null && t[p.key] !== null && t[p.key]! <= local}>
              <p className="anchor-name">{p.label}</p>
              <p className="anchor-time">{fmt(t[p.key])}</p>
            </li>
          ))}
        </ul>
        <p className="small" aria-live="polite">
          {foot}
        </p>
      </div>

      <div className="card builder reveal">
        <div className="builder-row">
          <span className="builder-k" id="k-sens">Sens</span>
          <div className="chips" role="group" aria-labelledby="k-sens">
            {(['before', 'after'] as const).map((d) => (
              <button key={d} className="chip" type="button" aria-pressed={dir === d} onClick={() => setDir(d)}>
                {dir === d && <IconCheck />}
                {d === 'before' ? 'Avant' : 'Après'}
              </button>
            ))}
          </div>
        </div>
        <div className="builder-row">
          <span className="builder-k" id="k-repere">Repère</span>
          <div className="chips" role="group" aria-labelledby="k-repere">
            {ANCHORS.map((a) => (
              <button key={a.key} className="chip" type="button" aria-pressed={anchor === a.key} onClick={() => setAnchor(a.key)}>
                {anchor === a.key && <IconCheck />}
                {a.label}
              </button>
            ))}
          </div>
        </div>
        <div className="builder-row">
          <label className="builder-k" htmlFor="offset">Décalage</label>
          <div className="offset-row">
            <input className="range" type="range" id="offset" min={0} max={90} step={5} value={offset} onChange={(e) => setOffset(Number(e.target.value))} aria-describedby="offset-val" />
            <span className="offset-val" id="offset-val">{offset === 0 ? 'pile' : `${offset} min`}</span>
          </div>
        </div>
        <div aria-live="polite">
          <p className="sentence">
            <strong>{sentence}</strong> Une seule règle, trois heures différentes, sans que tu y touches.
          </p>
          <div className="resolved">
            {([['Aujourd’hui', 0], ['Dans 3 mois', 3], ['Dans 6 mois', 6]] as const).map(([k, m]) => (
              <div key={k}>
                <p className="resolved-k">{k}</p>
                <p className="resolved-v">{fmt(resolve(m === 0 ? today : addMonths(today, m)))}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
