import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const SRC = 'Images-template'
const OUT = 'public/images'
await mkdir(OUT, { recursive: true })

// [šaltinis, paskirtis(dest), plotis]
const jobs = [
  ['ROlandas hero.jpg', 'hero.jpg', 1920],
  ['Avariniu medziu pjovimas.jpg', 'avarinis-medziu-pjovimas.jpg', 1200],
  ['vaismedziu pjovimas.jpg', 'vaismedziu-pjovimas.jpg', 1200],
  ['Tuju, gyvatvoriu trumpinimas.jpg', 'tuju-gyvatvoriu-trumpinimas.jpg', 1200],
  ['kelmu naikinimas frezavimas.jpg', 'kelmu-frezavimas.jpg', 1200],
  ['apleistu sklypu tvarkymas.jpg', 'apleistu-sklypu-tvarkymas.jpg', 1200],
  ['Malku skaldymas.jpg', 'malku-skaldymas.jpg', 1200],
  ['Malku pardavimas.jpg', 'malku-pardavimas.jpg', 1200],
  ['vejos trumpinimas.jpg', 'vejos-trumpinimas.jpg', 1200],
]

for (const [src, dest, width] of jobs) {
  const info = await sharp(`${SRC}/${src}`)
    .rotate() // pagal EXIF orientaciją
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(`${OUT}/${dest}`)
  console.log(`${dest.padEnd(34)} ${(info.size / 1024).toFixed(0).padStart(5)} KB  ${info.width}x${info.height}`)
}
console.log('\nViskas optimizuota.')
