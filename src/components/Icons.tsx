import type { SVGProps } from 'react'

/** Jeu d'icônes dessiné pour la landing : trait 1,6, extrémités rondes, 24 px. */
const base: SVGProps<SVGSVGElement> = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
}

export const IconMenu = () => (
  <svg {...base}>
    <path d="M4 8h16M4 16h16" />
  </svg>
)
export const IconClose = () => (
  <svg {...base}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)
export const IconChevron = () => (
  <svg {...base} width={16} height={16}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)
export const IconCheck = () => (
  <svg {...base} width={14} height={14} strokeWidth={2.2}>
    <path d="m5 12 5 5 9-10" />
  </svg>
)
export const IconLock = () => (
  <svg {...base}>
    <rect x="5" y="10.5" width="14" height="9.5" rx="2.5" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
  </svg>
)
export const IconHand = () => (
  <svg {...base}>
    <path d="M4 16c3 0 4-1 6-1.5l4-1c1 0 1.7 1 .8 1.7L12 17.5c-1.5 1.2-3 2-5.5 2H4" />
    <path d="M14 13.5 18.5 9a1.7 1.7 0 0 0-2.4-2.4L12 10.7" />
  </svg>
)
export const IconPause = () => (
  <svg {...base}>
    <path d="M9 6v12M15 6v12" />
  </svg>
)
export const IconWaves = () => (
  <svg {...base}>
    <path d="M3 10a13 13 0 0 1 18 0M6 13.5a8.5 8.5 0 0 1 12 0M9.2 17a4 4 0 0 1 5.6 0" />
    <path d="M4 4l16 16" />
  </svg>
)
export const IconArrowUp = () => (
  <svg {...base}>
    <path d="M12 19V6M6 11l6-6 6 6" />
  </svg>
)
export const IconAlert = () => (
  <svg {...base} width={18} height={18}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5M12 16.2v.1" />
  </svg>
)
/** Rosace miniature (bouton d'ambiance). */
export const IconRosette = () => (
  <svg {...base}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" opacity=".5" />
    <circle cx="12" cy="12" r="3.2" />
  </svg>
)
export function Symbol({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" fill="none" aria-hidden="true" focusable="false">
      <circle cx="13" cy="13" r="11.25" stroke="currentColor" strokeWidth="1.2" opacity=".28" />
      <path d="M13 1.75v22.5" stroke="currentColor" strokeWidth="1.2" opacity=".18" />
      <path d="M2.6 18.2A11.25 11.25 0 0 1 23.4 18.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="13" cy="8.4" r="2.6" fill="currentColor" />
    </svg>
  )
}
