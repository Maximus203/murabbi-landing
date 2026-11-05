/*
 * Recadre les captures de l'application (900×2004) : retire la barre d'état
 * (133 px) et l'indicateur de geste (52 px) → 900×1819. Idempotent : une
 * capture déjà recadrée est laissée telle quelle. Usage : node scripts/prepare-screens.mjs
 */
import sharp from 'sharp'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const dir = 'public/img/screens'
for (const f of readdirSync(dir).filter((n) => n.endsWith('.webp'))) {
  const p = join(dir, f)
  const input = readFileSync(p)
  const { width, height } = await sharp(input).metadata()
  if (height !== 2004) continue
  const out = await sharp(input).extract({ left: 0, top: 133, width, height: height - 133 - 52 }).webp({ quality: 72 }).toBuffer()
  writeFileSync(p, out)
  console.log('recadré', f)
}
