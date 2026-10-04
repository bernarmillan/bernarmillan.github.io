// Copia las fuentes (subconjunto latino) desde node_modules a public/fonts
// para que tengan ruta estable y se puedan precargar en <head>.
//
// Uso:  node scripts/copy-fonts.mjs   (o `npm run fonts`)

import { copyFile, mkdir, readdir, stat } from 'node:fs/promises';

const PKG = 'node_modules/@fontsource-variable';
const OUT = 'public/fonts';

/** [paquete, archivo origen, nombre de salida] */
const files = [
  ['syne', 'syne-latin-wght-normal.woff2', 'syne-latin.woff2'],
  ['space-grotesk', 'space-grotesk-latin-wght-normal.woff2', 'space-grotesk-latin.woff2'],
  ['jetbrains-mono', 'jetbrains-mono-latin-wght-normal.woff2', 'jetbrains-mono-latin.woff2'],
];

await mkdir(OUT, { recursive: true });

for (const [pkg, from, to] of files) {
  const src = `${PKG}/${pkg}/files/${from}`;
  const dest = `${OUT}/${to}`;
  await copyFile(src, dest);
  const { size } = await stat(dest);
  console.log(`${to}: ${(size / 1024).toFixed(1)} KB`);
}

const all = await readdir(OUT);
const total = (await Promise.all(all.map((f) => stat(`${OUT}/${f}`)))).reduce((a, s) => a + s.size, 0);
console.log(`--- ${all.length} ficheros, ${(total / 1024).toFixed(1)} KB en total`);
