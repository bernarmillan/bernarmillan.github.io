// Genera el set de iconos a partir de media/logo.png:
//   favicon.ico (16/32/48) · favicon-16x16.png · favicon-32x32.png
//   apple-touch-icon.png (180, opaco, fondo #050505) · brand/bm.png (64, navbar/footer)
//
// Uso:  node scripts/make-icons.mjs   (o `npm run icons`)

import sharp from 'sharp';
import { mkdir, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'media/logo.png';
const PUBLIC = 'public';

/** Fondo de la web (#050505) para el apple-touch-icon: iOS exige PNG opaco. */
const DARK = { r: 5, g: 5, b: 5, alpha: 1 };
const CLEAR = { r: 0, g: 0, b: 0, alpha: 0 };

const kb = (b) => `${(b / 1024).toFixed(1)} KB`;

/** Logo centrado en un lienzo cuadrado de `size`, con `pad` de margen por lado. */
async function makePng(size, { background = CLEAR, padRatio = 0.06, palette } = {}) {
  const pad = Math.round(size * padRatio);
  const inner = Math.max(1, size - pad * 2);

  return sharp(SRC)
    .resize({ width: inner, height: inner, fit: 'contain', background: CLEAR })
    .extend({ top: pad, left: pad, right: pad, bottom: pad, background })
    .png({ compressionLevel: 9, palette, effort: 10 })
    .toBuffer();
}

/** ICO válido con entradas PNG (aceptado por Windows y todos los navegadores). */
function buildIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = icon
  header.writeUInt16LE(entries.length, 4);

  let offset = 6 + entries.length * 16;
  const dirs = [];
  const blobs = [];

  for (const { size, png } of entries) {
    const dir = Buffer.alloc(16);
    dir.writeUInt8(size >= 256 ? 0 : size, 0); // width
    dir.writeUInt8(size >= 256 ? 0 : size, 1); // height
    dir.writeUInt8(0, 2); // palette colors
    dir.writeUInt8(0, 3); // reserved
    dir.writeUInt16LE(1, 4); // color planes
    dir.writeUInt16LE(32, 6); // bits per pixel
    dir.writeUInt32LE(png.length, 8); // tamaño del recurso
    dir.writeUInt32LE(offset, 12); // offset
    offset += png.length;
    dirs.push(dir);
    blobs.push(png);
  }

  return Buffer.concat([header, ...dirs, ...blobs]);
}

const targets = [
  { file: 'favicon-16x16.png', size: 16, palette: true },
  { file: 'favicon-32x32.png', size: 32, palette: true },
  { file: 'favicon-48x48.png', size: 48, palette: true },
  { file: 'apple-touch-icon.png', size: 180, background: DARK, padRatio: 0.16, palette: true },
  { file: path.join('brand', 'bm.png'), size: 64, padRatio: 0.06, palette: true },
];

const made = new Map();

for (const t of targets) {
  const out = path.join(PUBLIC, t.file);
  await mkdir(path.dirname(out), { recursive: true });
  const buf = await makePng(t.size, t);
  await writeFile(out, buf);
  made.set(t.size, buf);
  console.log(`${t.file}: ${t.size}x${t.size}  ${kb(buf.length)}`);
}

const icoEntries = [16, 32, 48].map((size) => ({ size, png: made.get(size) }));
const ico = buildIco(icoEntries);
await writeFile(path.join(PUBLIC, 'favicon.ico'), ico);
console.log(`favicon.ico (16/32/48): ${kb(ico.length)}`);

console.log('---');
console.log(`logo.png fuente: ${kb((await stat(SRC)).size)} (no se publica)`);
