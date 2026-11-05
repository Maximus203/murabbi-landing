'use client'

import { useSyncExternalStore } from 'react'

export const FAMILIES = [
  { id: 'classique', label: 'Classique', motif: 'Rosace des huit' },
  { id: 'vert', label: 'Vert', motif: 'Couronne de douze' },
  { id: 'bleu', label: 'Bleu', motif: 'Fleur de seize' },
  { id: 'rose', label: 'Rose', motif: 'Fleur de seize' },
  { id: 'mono', label: 'Mono', motif: 'Étoile de dix' },
] as const
export const TIERS = [
  { id: 'clair', label: 'Clair' },
  { id: 'sombre', label: 'Sombre' },
  { id: 'nuit', label: 'Nuit' },
] as const

export type FamilyId = (typeof FAMILIES)[number]['id']
export type TierId = (typeof TIERS)[number]['id']
export type Ambiance = { family: FamilyId; tier: TierId }

const STORE = 'murabbi-ambiance'
const EVENT = 'murabbi-ambiance-change'

/** Le motif dominant de chaque famille (le Bleu change de motif avec l'intensité). */
export function motifName(family: FamilyId, tier: TierId) {
  if (family === 'bleu') return tier === 'clair' ? 'Fleur de seize' : 'Anneaux de lumière'
  return FAMILIES.find((f) => f.id === family)!.motif
}

function read(): string {
  const d = document.documentElement
  return `${d.dataset.family ?? 'classique'}|${d.dataset.tier ?? 'clair'}`
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb)
  return () => window.removeEventListener(EVENT, cb)
}

/** Lit l'ambiance courante (posée par le script d'amorçage, sans scintillement). */
export function useAmbiance(): Ambiance {
  const raw = useSyncExternalStore(subscribe, read, () => 'classique|clair')
  const [family, tier] = raw.split('|') as [FamilyId, TierId]
  return { family, tier }
}

/** Réapplique l'ambiance choisie (si React a réécrit <html> lors d'une hydratation). */
export function restoreAmbiance() {
  try {
    const s = JSON.parse(localStorage.getItem(STORE) || 'null')
    const d = document.documentElement
    const q = new URLSearchParams(location.search)
    const f = q.get('fam') || s?.family
    const t = q.get('tier') || s?.tier
    if (f && FAMILIES.some((x) => x.id === f) && d.dataset.family !== f) d.dataset.family = f
    if (t && TIERS.some((x) => x.id === t) && d.dataset.tier !== t) d.dataset.tier = t
    window.dispatchEvent(new Event(EVENT))
  } catch {
    /* sans stockage : on garde ce qui est affiché */
  }
}

export function setAmbiance(next: Partial<Ambiance>) {
  const d = document.documentElement
  if (next.family) d.dataset.family = next.family
  if (next.tier) d.dataset.tier = next.tier
  try {
    localStorage.setItem(STORE, JSON.stringify({ family: d.dataset.family, tier: d.dataset.tier }))
  } catch {
    /* stockage indisponible : le choix vaut pour cette visite seulement */
  }
  const bg = getComputedStyle(d).getPropertyValue('--bg').trim()
  const meta = document.querySelector('meta[name=theme-color]')
  if (meta && bg) meta.setAttribute('content', bg)
  window.dispatchEvent(new Event(EVENT))
}

/** Script inline : pose l'ambiance avant la première peinture. */
export const BOOTSTRAP = `(function(){var d=document.documentElement;try{var q=new URLSearchParams(location.search),s=null;try{s=JSON.parse(localStorage.getItem('${STORE}')||'null')}catch(e){}var f=q.get('fam')||(s&&s.family)||'classique',t=q.get('tier')||(s&&s.tier)||(matchMedia('(prefers-color-scheme: dark)').matches?'nuit':'clair');if(['classique','vert','bleu','rose','mono'].indexOf(f)<0)f='classique';if(['clair','sombre','nuit'].indexOf(t)<0)t='clair';d.dataset.family=f;d.dataset.tier=t}catch(e){d.dataset.family='classique';d.dataset.tier='clair'}d.classList.add('js')})();`
