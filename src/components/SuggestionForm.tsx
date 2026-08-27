'use client'

import { useState, type FormEvent } from 'react'
import { supabase } from '@/lib/supabaseClient'
import styles from '../app/(legal)/legal.module.css'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const MESSAGE_MIN = 10
const MESSAGE_MAX = 2000
const CATEGORY_MAX = 60
const OTHER_CATEGORY = '__autre__'

// Categories systeme du catalogue (public.categories where is_system = true).
// Liste statique : coherente avec l'architecture zero-backend du site, et ces
// categories ne changent pas au point de justifier un appel reseau de plus.
const SYSTEM_CATEGORIES = [
  'Mental',
  'Nutrition',
  'Religion',
  'Santé',
  'Social',
  'Sommeil',
  'Spiritualité',
  'Sport',
  'Suivi',
]

export function SuggestionForm() {
  const [kind, setKind] = useState<'habit' | 'improvement'>('habit')
  const [message, setMessage] = useState('')
  const [category, setCategory] = useState('')
  const [customCategory, setCustomCategory] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('') // piege a bots : jamais rempli par une personne
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const isOtherCategory = category === OTHER_CATEGORY
  const resolvedCategory = (isOtherCategory ? customCategory : category).trim()

  const messageLength = message.trim().length
  const messageTooShort = messageLength > 0 && messageLength < MESSAGE_MIN

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (website) {
      // Champ piege rempli : silencieusement ignore, sans indiquer au bot
      // que sa soumission a ete detectee.
      setStatus('success')
      return
    }

    if (messageLength < MESSAGE_MIN || messageLength > MESSAGE_MAX) {
      setStatus('error')
      setErrorMessage(`Le message doit faire entre ${MESSAGE_MIN} et ${MESSAGE_MAX} caracteres.`)
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    const { error } = await supabase.from('landing_suggestions').insert({
      kind,
      message: message.trim(),
      category: kind === 'habit' && resolvedCategory ? resolvedCategory : null,
      email: email.trim() || null,
    })

    if (error) {
      setStatus('error')
      setErrorMessage("L'envoi a echoue. Reessaie dans un instant, ou ecris-nous directement.")
      return
    }

    setStatus('success')
    setMessage('')
    setCategory('')
    setCustomCategory('')
    setEmail('')
  }

  if (status === 'success') {
    return (
      <div className={styles.card} role="status">
        <p className={styles.lead}>Merci, ta suggestion est bien arrivee.</p>
        <p>On lit chaque message. S&apos;il ouvre une piste concrete, elle finira dans le catalogue d&apos;habitudes ou dans une prochaine mise a jour.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={styles.card} style={{ display: 'grid', gap: 16 }}>
        <div style={{ display: 'grid', gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>Ta suggestion concerne</span>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <label className="btn btn-ghost btn-sm" style={{ cursor: 'pointer' }}>
              <input
                type="radio"
                name="kind"
                value="habit"
                checked={kind === 'habit'}
                onChange={() => setKind('habit')}
                style={{ marginRight: 8 }}
              />
              Une nouvelle habitude
            </label>
            <label className="btn btn-ghost btn-sm" style={{ cursor: 'pointer' }}>
              <input
                type="radio"
                name="kind"
                value="improvement"
                checked={kind === 'improvement'}
                onChange={() => setKind('improvement')}
                style={{ marginRight: 8 }}
              />
              Une amelioration de l&apos;application
            </label>
          </div>
        </div>

        {kind === 'habit' && (
          <div style={{ display: 'grid', gap: 8 }}>
            <label htmlFor="suggestion-category" style={{ fontSize: 14, fontWeight: 600 }}>
              Catégorie <span style={{ fontWeight: 400, color: 'var(--text-3)' }}>(facultatif)</span>
            </label>
            <select
              id="suggestion-category"
              name="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 10,
                border: '1px solid var(--border)',
                background: 'var(--bg)',
                color: 'var(--text)',
                font: 'inherit',
              }}
            >
              <option value="">Choisis une catégorie…</option>
              {SYSTEM_CATEGORIES.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
              <option value={OTHER_CATEGORY}>Autre (précise)</option>
            </select>
            {isOtherCategory && (
              <input
                id="suggestion-category-custom"
                name="customCategory"
                type="text"
                maxLength={CATEGORY_MAX}
                value={customCategory}
                onChange={(event) => setCustomCategory(event.target.value)}
                placeholder="Nom de la catégorie que tu proposes"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 10,
                  border: '1px solid var(--border)',
                  background: 'var(--bg)',
                  color: 'var(--text)',
                  font: 'inherit',
                }}
              />
            )}
          </div>
        )}

        <div style={{ display: 'grid', gap: 8 }}>
          <label htmlFor="suggestion-message" style={{ fontSize: 14, fontWeight: 600 }}>
            Ton message
          </label>
          <textarea
            id="suggestion-message"
            name="message"
            required
            minLength={MESSAGE_MIN}
            maxLength={MESSAGE_MAX}
            rows={5}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Decris l'habitude que tu aimerais voir dans le catalogue, ou ce qui te manque dans l'application."
            style={{
              width: '100%',
              resize: 'vertical',
              padding: '12px 14px',
              borderRadius: 10,
              border: '1px solid var(--border)',
              background: 'var(--bg)',
              color: 'var(--text)',
              font: 'inherit',
            }}
          />
          <span style={{ fontSize: 12, color: messageTooShort ? 'var(--accent-ink)' : 'var(--text-3)' }}>
            {messageLength}/{MESSAGE_MAX} caracteres {messageTooShort ? `(minimum ${MESSAGE_MIN})` : ''}
          </span>
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <label htmlFor="suggestion-email" style={{ fontSize: 14, fontWeight: 600 }}>
            Ton email <span style={{ fontWeight: 400, color: 'var(--text-3)' }}>(facultatif, pour te repondre)</span>
          </label>
          <input
            id="suggestion-email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="toi@exemple.com"
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: 10,
              border: '1px solid var(--border)',
              background: 'var(--bg)',
              color: 'var(--text)',
              font: 'inherit',
            }}
          />
        </div>

        {/* Piege a bots : masque visuellement et aux lecteurs d'ecran, jamais rempli par une personne. */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
          <label htmlFor="suggestion-website">Site web</label>
          <input
            id="suggestion-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </div>

        {status === 'error' && (
          <p role="alert" style={{ color: 'var(--accent-ink)', fontSize: 14, margin: 0 }}>
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === 'submitting' || messageLength < MESSAGE_MIN}
        >
          {status === 'submitting' ? 'Envoi en cours…' : 'Envoyer ma suggestion'}
        </button>
      </div>
    </form>
  )
}
