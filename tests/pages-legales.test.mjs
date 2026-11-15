// Garde de véracité des pages légales : ce que le site affirme doit rester vrai
// de l'application publiée. Les phrases interdites ont toutes été fausses un jour
// (relevé du 31/10 et du 15/11/2026) ; les phrases exigées sont les faits que
// l'application a réellement et qu'une politique de confidentialité doit dire.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const lire = (chemin) =>
  readFileSync(new URL(`../src/app/(legal)/${chemin}`, import.meta.url), 'utf8')
    // Les entités JSX (&apos;, &nbsp;) et les balises ne doivent pas masquer une phrase.
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\{' '\}/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')

const politique = lire('confidentialite.html/page.tsx')
const suppression = lire('suppression-compte.html/page.tsx')

test('la politique ne prétend plus que la position reste hors arrière-plan', () => {
  assert.doesNotMatch(politique, /ne lit jamais ta position en arrière-plan/i)
  assert.doesNotMatch(politique, /ne te demande aucune autorisation de plus/i)
})

test('la politique décrit la localisation en arrière-plan et son consentement', () => {
  assert.match(politique, /en arrière-plan/i)
  assert.match(politique, /« Toujours »/)
  assert.match(politique, /aucune coordonnée/i)
})

test('la politique ne dit plus que la pause ou la position ne partent jamais', () => {
  assert.doesNotMatch(politique, /jamais envoyée à nos serveurs/i)
  assert.doesNotMatch(politique, /ne partageons jamais ta donnée de pause menstruelle/i)
  assert.match(politique, /deux nombres/i)
})

test('la politique ne cite plus Google Fonts : les polices sont servies par le site', () => {
  assert.doesNotMatch(politique, /Google Fonts/i)
})

test('la politique nomme chaque service qui reçoit des données', () => {
  for (const nom of ['Supabase', 'Firebase', 'Sentry', 'OpenStreetMap', 'Quran Foundation', 'Shorebird', 'Resend', 'Vercel']) {
    assert.ok(politique.includes(nom), `${nom} absent de la politique`)
  }
})

test('la politique dit ce que voient le classement et le cercle', () => {
  assert.match(politique, /Masquer mon pseudo/)
  assert.match(politique, /récapitulatif/i)
  assert.match(politique, /rappel d'habitude/i)
})

test('la politique dit que favoris et progression du Coran sont sur le compte', () => {
  assert.match(politique, /favoris/i)
  assert.doesNotMatch(politique, /favoris et ta progression de lecture sont gardés sur ton téléphone/i)
})

test('la politique ne promet pas un contrôle d\'âge que le code n\'a pas', () => {
  assert.match(politique, /moins de 13 ans/)
  assert.match(politique, /ne contrôle pas l'âge/i)
})

test('la page de suppression ne prétend pas que la position n\'a jamais quitté le téléphone', () => {
  assert.doesNotMatch(suppression, /n'ont jamais quitté ton téléphone/i)
  assert.doesNotMatch(suppression, /il te suffit de te reconnecter/i)
  assert.match(suppression, /Supprimer le compte/)
})
