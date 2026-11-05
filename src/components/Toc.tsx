'use client'

import { useEffect, useState } from 'react'
import { IconArrowUp } from './Icons'

type Entry = { id: string; label: string }

const slug = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/^[\d\s.)-]+/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

/** Sommaire des `h2` d'une page longue : `<details>` au mobile, colonne fixe au bureau. */
export function Toc({ target }: { target: string }) {
  const [entries, setEntries] = useState<Entry[]>([])
  const [current, setCurrent] = useState('')
  const [top, setTop] = useState(false)

  useEffect(() => {
    const root = document.getElementById(target)
    if (!root) return
    const heads = Array.from(root.querySelectorAll<HTMLHeadingElement>('h2'))
    const used = new Set<string>()
    const list = heads.map((h, i) => {
      let id = h.id || slug(h.textContent ?? '') || `section-${i + 1}`
      while (used.has(id)) id += '-2'
      used.add(id)
      h.id = id
      return { id, label: (h.textContent ?? '').replace(/^\d+\.\s*/, '') }
    })
    const t0 = setTimeout(() => setEntries(list), 0)

    const io = new IntersectionObserver(
      (items) => {
        const hit = items.filter((i) => i.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (hit) setCurrent(hit.target.id)
      },
      { rootMargin: '-80px 0px -70% 0px' },
    )
    heads.forEach((h) => io.observe(h))
    const onScroll = () => setTop(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(t0)
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [target])

  if (entries.length < 2) return <div className="toc-aside" />
  return (
    <aside className="toc-aside">
      <nav className="toc" aria-label="Sommaire de la page">
        <details open={typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)').matches : false}>
          <summary>Sommaire</summary>
          <ol>
            {entries.map((e) => (
              <li key={e.id}>
                <a href={`#${e.id}`} aria-current={current === e.id ? 'location' : undefined}>
                  {e.label}
                </a>
              </li>
            ))}
          </ol>
        </details>
      </nav>
      {top && (
        <a className="btn btn-secondary btn-sm to-top" href="#contenu" aria-label="Haut de page">
          <IconArrowUp />
        </a>
      )}
    </aside>
  )
}
