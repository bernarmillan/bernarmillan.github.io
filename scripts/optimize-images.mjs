// Genera versiones ligeras (WebP) de las fotos de @capsulecorp.3d
// + placeholders borrosos (LQIP) incrustados en src/data/lqip.ts para el
// efecto blur-up: la tarjeta nunca se ve negra mientras carga.
//
// Los originales están en media/capsulecorp/ (NO se sirven; solo fuente).
//
// Uso:  node scripts/optimize-images.mjs   (o `npm run images`)

import sharp from 'sharp';
import { mkdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

/** Originales (fuente, fuera de public/ para que dist no los incluya). */
const SRC_DIR = 'media/capsulecorp';
/** Salida pública: lo único que ve el navegador. */
const OUT_DIR = 'public/images/capsulecorp/opt';
const OUT_TS = path.join('src', 'data', 'lqip.ts');

/** Tamaño máximo de lado. Las tarjetas miden ~366px, así 800px cubre 2x/retina. */
const MAX_SIDE = 800;
const QUALITY = 82;

/** Placeholder borroso: se sirve "gratis" (inline) antes que la foto real. */
const LQIP_WIDTH = 40;
const LQIP_BLUR = 2;
const LQIP_QUALITY = 45;

const FILES = ['part1.jpg', 'part2.jpg', 'part3.jpg', 'part4.jpg', 'part5.jpg'];

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

await mkdir(OUT_DIR, { recursive: true });

let totalBefore = 0;
let totalAfter = 0;
const lqipEntries = [];

for (const file of FILES) {
  const input = path.join(SRC_DIR, file);
  const base = file.replace(/\.jpe?g$/i, '');
  const publicUrl = `/images/capsulecorp/opt/${base}.webp`;
  const output = path.join(OUT_DIR, `${base}.webp`);

  const before = (await stat(input)).size;

  const info = await sharp(input)
    .resize({
      width: MAX_SIDE,
      height: MAX_SIDE,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: QUALITY, effort: 5 })
    .toFile(output);

  const lqipBuffer = await sharp(input)
    .resize({ width: LQIP_WIDTH, height: LQIP_WIDTH, fit: 'inside' })
    .grayscale()
    .blur(LQIP_BLUR)
    .webp({ quality: LQIP_QUALITY, effort: 5 })
    .toBuffer();

  lqipEntries.push(
    `  '${publicUrl}': 'data:image/webp;base64,${lqipBuffer.toString('base64')}',`
  );

  const after = info.size;
  totalBefore += before;
  totalAfter += after;

  const pct = Math.round((1 - after / before) * 100);
  console.log(
    `${file}: ${kb(before)} -> ${kb(after)}  (-${pct}%)  ${info.width}x${info.height}  | LQIP ${kb(lqipBuffer.length)}`
  );
}

const lqipFile = `// ⚠️ GENERADO POR scripts/optimize-images.mjs — no editar a mano.
// Ejecuta \`npm run images\` si añades o cambias fotos.
export const lqip: Record<string, string> = {
${lqipEntries.join('\n')}
};
`;

await writeFile(OUT_TS, lqipFile, 'utf8');

const totalPct = Math.round((1 - totalAfter / totalBefore) * 100);
console.log('---');
console.log(`Total fotos: ${kb(totalBefore)} -> ${kb(totalAfter)}  (-${totalPct}%)`);
console.log(`Salida: ${OUT_DIR}`);
console.log(`Placeholders: ${OUT_TS}`);
