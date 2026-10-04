// Genera public/images/og.png (1200x630) para Open Graph / Twitter Card.
// Es la imagen que ven WhatsApp, LinkedIn, Telegram y Twitter al pegar el enlace.
// No se descarga al cargar la web: solo la piden los rastreadores sociales.
//
// Uso:  node scripts/make-og.mjs   (o `npm run og`)

import sharp from 'sharp';
import { mkdir, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'media/logo.png';
const OUT = path.join('public', 'images', 'og.png');

const W = 1200;
const H = 630;
const FONTS = 'Arial, Helvetica, sans-serif';
const MONO = 'Consolas, Courier New, monospace';

const kb = (b) => `${(b / 1024).toFixed(1)} KB`;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <!-- Fondo del sitio (#060606) -->
  <rect width="${W}" height="${H}" fill="#060606"/>

  <!-- Brillo ambiente, igual que los glows del hero -->
  <defs>
    <radialGradient id="glow" cx="78%" cy="30%" r="55%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="50%" stop-color="#ffffff" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- Texto -->
  <text x="330" y="232" font-family="${FONTS}" font-size="74" font-weight="bold" fill="#ffffff">Bernardo Mill&#225;n</text>
  <text x="334" y="292" font-family="${MONO}" font-size="30" letter-spacing="3" fill="#a1a1aa">IT &amp; 3D SYSTEMS</text>

  <rect x="334" y="336" width="530" height="1" fill="url(#rule)"/>

  <text x="334" y="392" font-family="${FONTS}" font-size="27" fill="#d4d4d8">Portfolio &#183; T&#233;cnico SMR &#183; Redes</text>
  <text x="334" y="434" font-family="${FONTS}" font-size="27" fill="#d4d4d8">y Dise&#241;o 3D (@capsulecorp.3d)</text>

  <!-- Punto verde de disponibilidad + etiqueta -->
  <circle cx="346" cy="514" r="9" fill="#10b981"/>
  <text x="372" y="524" font-family="${MONO}" font-size="26" letter-spacing="2" fill="#10b981">DISPONIBLE // B&#205;SQUEDA ACTIVA EN IT</text>
</svg>`;

await mkdir(path.dirname(OUT), { recursive: true });

// 1. SVG (fondo + textos) sobre lienzo 1200x630
const base = await sharp(Buffer.from(svg)).png({ compressionLevel: 9, effort: 10 }).toBuffer();

// 2. Logo encima, a la izquierda, con el mismo padding que el resto
const logo = await sharp(SRC)
  .resize({ width: 200, height: 173, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

const out = await sharp(base)
  .composite([{ input: logo, top: 200, left: 90 }])
  .png({ compressionLevel: 9, effort: 10 })
  .toBuffer();

await writeFile(OUT, out);

const meta = await sharp(out).metadata();
console.log(`${OUT}: ${meta.width}x${meta.height}  ${kb(out.length)}`);
console.log(`logo fuente: ${kb((await stat(SRC)).size)} (no se publica)`);
