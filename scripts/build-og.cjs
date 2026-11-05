/*
 * Image de partage (Open Graph) 1200×630 : rosace dominante du Classique nuit
 * et la phrase du hero. Usage : node scripts/build-og.cjs
 */
const sharp = require('sharp')
const path = require('node:path')
const M = require('./motifs-spec.cjs')

const INK = '#C9A866'
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#1A1814"/>
  <defs><radialGradient id="h"><stop offset="0" stop-color="#312B1F"/><stop offset=".55" stop-color="#312B1F"/><stop offset="1" stop-color="#312B1F" stop-opacity="0"/></radialGradient></defs>
  <g transform="translate(900 330)" color="${INK}">
    <circle r="420" fill="url(#h)" opacity=".8"/>
    <g transform="scale(3.1)"><style>.pl{fill:currentColor;fill-opacity:.10;stroke:none}.fl{fill:currentColor;fill-opacity:.24;stroke:none}.pt{fill:currentColor;fill-opacity:.65;stroke:none}</style>
    <g fill="none" stroke="currentColor" stroke-opacity=".65" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5">${M.inner('khatam8')}</g></g>
  </g>
  <linearGradient id="f" x1="0" x2="1"><stop offset="0" stop-color="#1A1814" stop-opacity=".96"/><stop offset=".72" stop-color="#1A1814" stop-opacity=".9"/><stop offset="1" stop-color="#1A1814" stop-opacity="0"/></linearGradient><rect width="780" height="630" fill="url(#f)"/>
  <text x="72" y="140" font-family="Georgia, 'Times New Roman', serif" font-size="30" fill="#A8998A" letter-spacing="3">MURABBI</text>
  <text x="72" y="300" font-family="Georgia, 'Times New Roman', serif" font-size="84" font-weight="700" fill="#F0EDE8">À l'heure,</text>
  <text x="72" y="396" font-family="Georgia, 'Times New Roman', serif" font-size="84" font-style="italic" font-weight="700" fill="#F0EDE8">là où tu es.</text>
  <text x="72" y="500" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#A8998A">Tes prières, tes habitudes, un trait par jour.</text>
  <text x="72" y="552" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#C9A866">En test fermé · Android et iPhone</text>
</svg>`
sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(path.join(__dirname, '..', 'public', 'og.png')).then((i) => console.log('og.png', i.size, 'octets'))
