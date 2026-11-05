'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Apparition des blocs et pilotage des rosaces : une section est « vue »
 * quand elle entre à l'écran, et seule la plus visible tourne (jamais hors
 * écran ni dans un onglet masqué).
 */
export function SiteEffects() {
  const path = usePathname()
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const reveals = document.querySelectorAll<HTMLElement>('.reveal')
    const sections = document.querySelectorAll<HTMLElement>('.section')
    if (reduce || !('IntersectionObserver' in window)) {
      reveals.forEach((el) => (el.dataset.shown = 'true'))
      sections.forEach((el) => (el.dataset.seen = 'true'))
      return
    }
    const ioReveal = new IntersectionObserver(
      (entries) =>
        entries.forEach((e, n) => {
          if (!e.isIntersecting) return
          const el = e.target as HTMLElement
          el.style.transitionDelay = `${Math.min(n * 60, 180)}ms`
          el.dataset.shown = 'true'
          ioReveal.unobserve(el)
        }),
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    reveals.forEach((el) => ioReveal.observe(el))

    const ratios = new Map<Element, number>()
    const refresh = () => {
      let best: Element | null = null
      let max = 0
      ratios.forEach((r, el) => {
        if (r > max) {
          max = r
          best = el
        }
      })
      sections.forEach((el) => {
        if (el === best && !document.hidden) el.setAttribute('data-inview', '')
        else el.removeAttribute('data-inview')
      })
    }
    const ioSec = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          ratios.set(e.target, e.isIntersecting ? e.intersectionRatio : 0)
          if (e.isIntersecting) (e.target as HTMLElement).dataset.seen = 'true'
        })
        refresh()
      },
      { threshold: [0, 0.05, 0.25, 0.5, 0.75, 1] },
    )
    sections.forEach((el) => ioSec.observe(el))
    document.addEventListener('visibilitychange', refresh)
    return () => {
      ioReveal.disconnect()
      ioSec.disconnect()
      document.removeEventListener('visibilitychange', refresh)
    }
  }, [path])
  return null
}
