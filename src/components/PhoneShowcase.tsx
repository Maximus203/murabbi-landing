'use client'

import { useEffect, useRef, useState, type PointerEvent, type SyntheticEvent } from 'react'
import styles from './PhoneShowcase.module.css'

type ScreenId = 'accueil' | 'habitudes' | 'catalogue' | 'calendrier'
type ThemeId = 'classic' | 'rose' | 'green' | 'blue' | 'monochrome'

type ScreenMeta = {
  id: ScreenId
  tab: string
  title: string
  blurb: string
}

type ThemeMeta = {
  id: ThemeId
  label: string
  swatch: string
}

const SCREENS: ScreenMeta[] = [
  {
    id: 'accueil',
    tab: 'Accueil',
    title: 'Ta journée, calée sur le soleil',
    blurb: "L'accueil affiche d'un coup d'œil l'intention du jour, les repères de prière et ce qui t'attend — recalculé chaque matin.",
  },
  {
    id: 'habitudes',
    tab: 'Habitudes',
    title: 'Des habitudes qui tiennent',
    blurb: 'Un parcours du jour, pas une liste anxiogène : ce qui est prévu maintenant, ce qui attend son moment.',
  },
  {
    id: 'catalogue',
    tab: 'Catalogue',
    title: 'Un catalogue prêt à l’emploi',
    blurb: "Des dizaines d'habitudes déjà écrites — prière, sport, sommeil, social — à activer en un geste, sans partir d'une page blanche.",
  },
  {
    id: 'calendrier',
    tab: 'Calendrier',
    title: 'Le calendrier hégirien intégré',
    blurb: 'Les jours blancs et les repères du mois hijri apparaissent d’eux-mêmes, à côté du calendrier grégorien.',
  },
]

// Couleurs reprises de lib/presentation/theme/app_colors.dart (AppThemeFamilies) —
// bg + accent réels de chaque famille, pas des teintes inventées pour l'occasion.
const THEMES: ThemeMeta[] = [
  { id: 'classic', label: 'Classique', swatch: 'linear-gradient(135deg, #EEE8DC 50%, #7A6035 50%)' },
  { id: 'rose', label: 'Rosé', swatch: 'linear-gradient(135deg, #F3F1F2 50%, #7D2143 50%)' },
  { id: 'green', label: 'Vert', swatch: 'linear-gradient(135deg, #F1F3F2 50%, #24663C 50%)' },
  { id: 'blue', label: 'Bleu', swatch: 'linear-gradient(135deg, #1E252F 50%, #E4B558 50%)' },
  { id: 'monochrome', label: 'Noir & blanc', swatch: 'linear-gradient(135deg, #EBEBEB 50%, #242424 50%)' },
]

const REST_ROTATION = { x: 6, y: -22 }
const MAX_TILT = 14

function screenSrc(theme: ThemeId, screen: ScreenId) {
  return `/img/screens/${theme}-${screen}.webp`
}

function handleImageFallback(event: SyntheticEvent<HTMLImageElement>, screen: ScreenId) {
  const img = event.currentTarget
  const fallback = screenSrc('classic', screen)
  if (img.src.endsWith(fallback)) return
  img.src = fallback
}

export function PhoneShowcase() {
  const [activeScreen, setActiveScreen] = useState(0)
  const [activeTheme, setActiveTheme] = useState<ThemeId>('classic')
  const [rotation, setRotation] = useState(REST_ROTATION)
  const stageRef = useRef<HTMLDivElement>(null)
  const reducedMotionRef = useRef(false)

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    if (reducedMotionRef.current) return
    const timer = setInterval(() => {
      setActiveScreen((current) => (current + 1) % SCREENS.length)
    }, 4600)
    return () => clearInterval(timer)
  }, [])

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reducedMotionRef.current || !stageRef.current) return
    const rect = stageRef.current.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    setRotation({
      x: REST_ROTATION.x - py * MAX_TILT * 2,
      y: REST_ROTATION.y + px * MAX_TILT * 2,
    })
  }

  function handlePointerLeave() {
    setRotation(REST_ROTATION)
  }

  const current = SCREENS[activeScreen]

  return (
    <div className={styles.stage}>
      <div
        ref={stageRef}
        className={styles.stageVisual}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div className={styles.stageGlow} aria-hidden="true" />
        <div className={styles.groundShadow} aria-hidden="true" />
        <div className={styles.rig}>
          <div
            className={styles.box}
            style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
          >
            <div className={`${styles.face} ${styles.edgeBottom}`} aria-hidden="true" />
            <div className={`${styles.face} ${styles.edgeTop}`} aria-hidden="true" />
            <div className={`${styles.face} ${styles.edgeLeft}`} aria-hidden="true" />
            <div className={`${styles.face} ${styles.edgeRight}`} aria-hidden="true" />
            <div className={`${styles.face} ${styles.back}`} aria-hidden="true" />
            <div className={`${styles.face} ${styles.front}`}>
              <div className={styles.screen}>
                <div className={styles.notch} aria-hidden="true" />
                {SCREENS.map((screen, index) => (
                  <img
                    key={screen.id}
                    src={screenSrc(activeTheme, screen.id)}
                    alt={screen.title}
                    data-active={index === activeScreen}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    onError={(event) => handleImageFallback(event, screen.id)}
                  />
                ))}
                <div className={styles.sheen} aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.stageInfo}>
        <div className={styles.stageGroup}>
          <span className={styles.stageGroupLabel}>Écran</span>
          <div className={styles.stageTabs} role="tablist" aria-label="Écrans de l'application">
            {SCREENS.map((screen, index) => (
              <button
                key={screen.id}
                type="button"
                role="tab"
                className={styles.stageTab}
                data-active={index === activeScreen}
                aria-selected={index === activeScreen}
                onClick={() => setActiveScreen(index)}
              >
                {screen.tab}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.stageGroup}>
          <span className={styles.stageGroupLabel}>Thème</span>
          <div className={styles.themeTabs} role="tablist" aria-label="Thèmes de l'application">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                type="button"
                role="tab"
                className={styles.themeTab}
                data-active={theme.id === activeTheme}
                aria-selected={theme.id === activeTheme}
                onClick={() => setActiveTheme(theme.id)}
              >
                <span className={styles.themeSwatch} style={{ background: theme.swatch }} />
                {theme.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.stageCaption}>
          <h3>{current.title}</h3>
          <p>{current.blurb}</p>
        </div>

        <div className={styles.stageDots}>
          {SCREENS.map((screen, index) => (
            <button
              key={screen.id}
              type="button"
              className={styles.stageDot}
              data-active={index === activeScreen}
              aria-label={`Voir ${screen.title}`}
              onClick={() => setActiveScreen(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
