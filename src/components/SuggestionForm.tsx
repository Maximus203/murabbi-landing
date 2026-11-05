'use client'

import { useState, type FormEvent } from 'react'
import { getSupabase } from '@/lib/supabaseClient'
import { IconAlert } from './Icons'

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
      setErrorMessage(`Le message doit faire entre ${MESSAGE_MIN} et ${MESSAGE_MAX} caractères.`)
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    const supabase = getSupabase()
    if (!supabase) {
      setStatus('error')
      setErrorMessage("Le formulaire n'est pas encore ouvert. Écris-nous directement par email, on te répond.")
      return
    }
    const { error } = await supabase.from('landing_suggestions').insert({
      kind,
      message: message.trim(),
      category: kind === 'habit' && resolvedCategory ? resolvedCategory : null,
      email: email.trim() || null,
    })

    if (error) {
      setStatus('error')
      setErrorMessage("L'envoi a échoué. Réessaie dans un instant, ou écris-nous directement.")
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
      <div className="success" role="status">
        <h2 tabIndex={-1} ref={(el) => el?.focus()}>Merci, ta suggestion est bien arrivée.</h2>
        <p>
          On lit chaque message. S&apos;il ouvre une piste concrète, elle finira dans le catalogue d&apos;habitudes ou dans une prochaine mise à jour.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="form-grid">
      <fieldset className="field">
        <legend className="label">Ta suggestion concerne</legend>
        <div className="radio-row">
          <label className="radio">
            <input type="radio" name="kind" value="habit" checked={kind === 'habit'} onChange={() => setKind('habit')} />
            Une nouvelle habitude
          </label>
          <label className="radio">
            <input type="radio" name="kind" value="improvement" checked={kind === 'improvement'} onChange={() => setKind('improvement')} />
            Une amélioration de l&apos;application
          </label>
        </div>
      </fieldset>

      {kind === 'habit' && (
        <div className="field">
          <label htmlFor="suggestion-category">
            Catégorie <span className="opt">(facultatif)</span>
          </label>
          <select
            id="suggestion-category"
            name="category"
            className="select"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
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
              className="input"
              maxLength={CATEGORY_MAX}
              value={customCategory}
              onChange={(event) => setCustomCategory(event.target.value)}
              aria-label="Nom de la catégorie que tu proposes"
              placeholder="Nom de la catégorie que tu proposes"
            />
          )}
        </div>
      )}

      <div className="field">
        <label htmlFor="suggestion-message">Ton message</label>
        <textarea
          id="suggestion-message"
          name="message"
          className="textarea"
          required
          minLength={MESSAGE_MIN}
          maxLength={MESSAGE_MAX}
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          aria-invalid={messageTooShort || undefined}
          aria-describedby="suggestion-count"
          placeholder="Décris l'habitude que tu aimerais voir dans le catalogue, ou ce qui te manque dans l'application."
        />
        <span id="suggestion-count" className="small">
          {messageLength}/{MESSAGE_MAX} caractères {messageTooShort ? `(minimum ${MESSAGE_MIN})` : ''}
        </span>
      </div>

      <div className="field">
        <label htmlFor="suggestion-email">
          Ton email <span className="opt">(facultatif, pour te répondre)</span>
        </label>
        <input
          id="suggestion-email"
          name="email"
          type="email"
          className="input"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="toi@exemple.com"
        />
      </div>

      {/* Piège à bots : masqué visuellement et aux lecteurs d'écran, jamais rempli par une personne. */}
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
        <p role="alert" className="field-error">
          <IconAlert />
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        className="btn btn-primary btn-block"
        disabled={status === 'submitting' || messageLength < MESSAGE_MIN}
        aria-busy={status === 'submitting'}
      >
        {status === 'submitting' ? 'Envoi…' : 'Envoyer ma suggestion'}
      </button>
    </form>
  )
}
