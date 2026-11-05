/*
 * Génère src/components/motifs/markup.ts depuis la spécification exécutable
 * des rosaces d'horizon (scripts/motifs-spec.cjs, copie de
 * design-refs/direction-motifs/outils/motifs.js de l'application).
 * Usage : node scripts/build-motifs.cjs
 */
const fs = require('node:fs')
const path = require('node:path')
const M = require('./motifs-spec.cjs')

const out = {}
for (const name of M.names) out[name] = { nom: M.META[name].nom, tile: name === 'zellige8', inner: M.inner(name) }

const file = path.join(__dirname, '..', 'src', 'components', 'motifs', 'markup.ts')
fs.writeFileSync(
  file,
  '// Fichier généré par scripts/build-motifs.cjs — ne pas modifier à la main.\n' +
    'export type MotifName = ' + M.names.map((n) => `'${n}'`).join(' | ') + '\n' +
    'export const MOTIFS: Record<MotifName, { nom: string; tile: boolean; inner: string }> = ' +
    JSON.stringify(out) + '\n',
)
console.log('ok', M.names.length, 'motifs,', fs.statSync(file).size, 'octets')
