'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { AmbiancePicker } from './AmbiancePicker'
import { IconChevron, IconClose, IconMenu, IconRosette, Symbol } from './Icons'

const LEGAL = [
  { href: '/confidentialite.html', label: 'Confidentialité' },
  { href: '/cgu.html', label: "Conditions d'utilisation" },
  { href: '/suppression-compte.html', label: 'Supprimer mon compte' },
]

/** En-tête de toutes les pages : navigation, ambiance, menu mobile (`<dialog>`). */
export function Header() {
  const path = usePathname()
  const menu = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState<{ name: 'ambiance' | 'legal'; path: string } | null>(null)
  // Un panneau ne survit pas à un changement de page.
  const panel = open && open.path === path ? open.name : ''
  const setPanel = (name: '' | 'ambiance' | 'legal') => setOpen(name ? { name, path } : null)
  const wrap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    menu.current?.close()
  }, [path])

  useEffect(() => {
    if (!panel) return
    const onDown = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(null)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [panel])

  const tester = path === '/testeurs'
  const cur = (href: string) => (path === href ? 'page' : undefined)

  return (
    <header className="site-header">
      <div className="wrap header-in" ref={wrap}>
        <Link className="brand" href="/" aria-label="Murabbi — accueil">
          <Symbol />
          Murabbi
        </Link>

        <nav className="nav-desktop" aria-label="Navigation principale">
          <Link className="nav-link" href="/#repere">
            L&apos;application
          </Link>
          <Link className={`nav-link${tester ? '' : ' nav-extra'}`} href="/testeurs" aria-current={cur('/testeurs')}>
            Devenir testeur
          </Link>
          <Link className="nav-link" href="/suggestions" aria-current={cur('/suggestions')}>
            Suggestions
          </Link>
          <div className="popover">
            <button
              className="nav-link"
              type="button"
              aria-expanded={panel === 'legal'}
              aria-controls="legal-panel"
              onClick={() => setPanel(panel === 'legal' ? '' : 'legal')}
            >
              Informations légales <IconChevron />
            </button>
            {panel === 'legal' && (
              <div className="popover-panel" id="legal-panel">
                {LEGAL.map((l) => (
                  <Link key={l.href} href={l.href} aria-current={cur(l.href)}>
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="popover">
          <button
            className="icon-btn"
            type="button"
            aria-expanded={panel === 'ambiance'}
            aria-controls="ambiance-panel"
            onClick={() => setPanel(panel === 'ambiance' ? '' : 'ambiance')}
          >
            <IconRosette />
            <span className="btn-label">Ambiance</span>
          </button>
          {panel === 'ambiance' && (
            <div className="popover-panel ambiance-panel" id="ambiance-panel" role="group" aria-label="Ambiance de la page">
              <AmbiancePicker idPrefix="hd" />
            </div>
          )}
        </div>

        {!tester && (
          <Link className="btn btn-primary btn-sm only-desktop" href="/testeurs">
            Devenir testeur
          </Link>
        )}

        <button
          className="icon-btn only-mobile"
          type="button"
          aria-haspopup="dialog"
          aria-controls="menu"
          onClick={() => menu.current?.showModal()}
        >
          <IconMenu />
          <span className="btn-label">Menu</span>
        </button>
      </div>

      <dialog
        className="menu"
        id="menu"
        ref={menu}
        aria-label="Menu"
        onClick={(e) => e.target === menu.current && menu.current?.close()}
      >
        <div className="menu-top">
          <span className="brand">
            <Symbol />
            Murabbi
          </span>
          <button className="icon-btn" type="button" onClick={() => menu.current?.close()}>
            <IconClose />
            <span className="btn-label">Fermer</span>
          </button>
        </div>
        <nav className="menu-list" aria-label="Menu principal">
          <Link href="/" aria-current={cur('/')}>
            Accueil
          </Link>
          <Link href="/testeurs" aria-current={cur('/testeurs')}>
            Devenir testeur
          </Link>
          <Link href="/suggestions" aria-current={cur('/suggestions')}>
            Suggestions
          </Link>
          <p className="sub">Légal</p>
          {LEGAL.map((l) => (
            <Link className="legal" key={l.href} href={l.href} aria-current={cur(l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="menu-bottom">
          <AmbiancePicker idPrefix="mn" />
          <Link className="btn btn-primary btn-block" href="/testeurs">
            Devenir testeur
          </Link>
        </div>
      </dialog>
    </header>
  )
}
