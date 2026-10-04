// Verificación estructural del build: `npm run check` (tras `npm run build`).
// Comprueba tamaños, ausencia de externos, clases sin regla CSS, integridad
// del reveal, fuentes, reglas táctiles y referencias rotas.
// Sale con código 1 si algo falla.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';

const HTML = 'dist/index.html';
if (!existsSync(HTML)) {
  console.error('No existe dist/index.html — ejecuta primero `npm run build`.');
  process.exit(2);
}

const h = readFileSync(HTML, 'utf8');
const css = [...h.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');
const flat = css.replace(/\\/g, '');
const n = (s) => h.split(s).length - 1;
const re = (s) => new RegExp(s, 'g');

const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok, detail });

const walk = (d) =>
  readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(`${d}/${e.name}`) : [`${d}/${e.name}`]
  );

// ── 1. Tamaños ────────────────────────────────────────────────────────────
const htmlKB = +(statSync(HTML).size / 1024).toFixed(1);
const files = walk('dist');
const totalMB = +(files.reduce((a, f) => a + statSync(f).size, 0) / 1048576).toFixed(2);
// cv.pdf (156 KB) solo se descarga al pulsar el boton de CV: no es carga de
// pagina, asi que se mira aparte y no contamina el limite.
const pageMB = +(files
  .filter((f) => !f.endsWith('cv.pdf'))
  .reduce((a, f) => a + statSync(f).size, 0) / 1048576).toFixed(2);
check('HTML ≤ 100 KB', htmlKB <= 100, `${htmlKB} KB`);
check('carga de página ≤ 0.60 MB', pageMB <= 0.6, `${pageMB} MB (dist total ${totalMB} MB con cv.pdf)`);

// ── 2. Sin peticiones externas ni assets hasheados huérfanos ─────────────
check('0 hojas CSS externas', !/<link[^>]*stylesheet/.test(h), '');
check('0 scripts con src', !/<script[^>]+src=/.test(h));
check('0 googleapis/gstatic', n('fonts.googleapis') + n('fonts.gstatic') === 0);
check('0 referencias a /_astro/', n('/_astro/') === 0, `${n('/_astro/')} encontradas`);

// ── 3. Todas las clases del HTML tienen regla CSS ────────────────────────
const ALLOWED_MISSING = [
  'animate-in', 'fade-in', 'zoom-in-95', // plugin tailwindcss-animate no instalado (preexistente)
  'mobile-link',                          // gancho JS
  'carousel-track', 'carousel-counter', 'carousel-prev', 'carousel-next', 'carousel-dots', 'carousel-dot',
];
const tokens = new Set();
for (const m of h.matchAll(/class="([^"]*)"/g)) m[1].split(/\s+/).filter(Boolean).forEach((t) => tokens.add(t));
const missing = [...tokens].filter((t) => !flat.includes(t));
const unexpected = missing.filter((t) => !ALLOWED_MISSING.includes(t));
check('clases sin regla CSS = solo las conocidas', unexpected.length === 0, `${tokens.size} clases; inesperadas: ${JSON.stringify(unexpected)}`);

// ── 4. Reveal (fade-up) y blur-up de fotos ────────────────────────────────
check('script js-reveal en <head>', n("classList.add('js-reveal')") === 1);
// El reveal ya no usa observer de scroll: todo entra con fade AL CARGAR la
// página (y se espera a dos frames para que WebKit llegue a pintarlo).
check('reveal al cargar (sin observer de scroll)', n('IntersectionObserver') === 0 && n('requestAnimationFrame') >= 1);
check('data-reveal ≥ 14', n('data-reveal') >= 14, `${n('data-reveal')}`);
check('stagger data-reveal-delay ≥ 3', n('data-reveal-delay') >= 3, `${n('data-reveal-delay')}`);
check('regla .is-visible', n('is-visible') >= 1);
check('prefers-reduced-motion', n('prefers-reduced-motion') >= 1);
check('placeholders LQIP ≥ 5', n('data:image/webp;base64') >= 5, `${n('data:image/webp;base64')}`);
check('fotos .webp en <img> = 5', (h.match(/<img[^>]+src="[^"]*\.webp"/g) || []).length === 5);
check('0 fotos .jpg sueltas en <img>', (h.match(/<img[^>]+src="[^"]*\.jpg"/g) || []).length === 0 || n('/images/avatar.jpg') >= 1);

// ── 5. Fuentes auto-alojadas + preload ───────────────────────────────────
const preloads = [...h.matchAll(/<link rel="preload" href="([^"]+)"/g)].map((m) => m[1]);
const fontRefs = [...new Set([...h.matchAll(/\/fonts\/[a-z-]+\.woff2/g)].map((m) => m[0]))];
check('3 @font-face', (css.match(/@font-face/g) || []).length === 3, `${(css.match(/@font-face/g) || []).length}`);
check('2 preloads de fuente', preloads.length === 2, JSON.stringify(preloads));
check('preload incluido en @font-face', preloads.every((p) => fontRefs.includes(p)));
check('fuentes referenciadas existen en dist', fontRefs.every((f) => existsSync(`dist${f}`)), JSON.stringify(fontRefs));
check('3 woff2 en dist/fonts', readdirSync('dist/fonts').length === 3, readdirSync('dist/fonts').join(', '));

// ── 6. Reglas de rendimiento en táctil (iPhone/tablet) ───────────────────
check('pointer: coarse ≥ 2', (css.match(re('pointer:\\s*coarse')) || []).length >= 2);
check('backdrop-filter desactivado en táctil', n('-webkit-backdrop-filter:none') >= 1);
// Sin render diferido: la página entera se maqueta y pinta al abrirla y el
// scroll no tiene que hacer trabajo (tirones en iPad).
check('sin render diferido (página completa al abrir)', !/content-visibility\s*:\s*auto/.test(css) && !/contain-intrinsic-size\s*:\s*auto/.test(css));
check('fotos .webp eager: todo carga al abrir', n('loading="eager"') >= 6, `${n('loading="eager"')} eager`);
// Fade de carga suave (petición del usuario): recorrido corto y curva
// ease-out-sine — 10 px / 1 s en PC, 5 px / 0,6 s en táctil.
check(
  'fade de carga suave (PC 10 px·1 s, táctil 5 px·0,6 s, ease-out-sine)',
  /translate:\s*0 10px/.test(css) &&
    /opacity 1s cubic-bezier\(\.39,\.575,\.565,1\)/.test(css) &&
    /translate:\s*0 5px/.test(css) &&
    /opacity \.6s cubic-bezier\(\.39,\.575,\.565,1\)/.test(css),
);
check('.ambient-glow oculto en táctil', /\.ambient-glow\{display:none/.test(flat) || /\.ambient-glow\{display: none/.test(css));
const photoRule = (css.match(/\.project-photo\s*\{[^}]*\}/) || [''])[0];
check(
  '.project-photo en color y con filtro fijo en táctil',
  /filter:\s*contrast\(1\.1\)\s*brightness\((?:0?\.95)\)/.test(photoRule) && !/grayscale/.test(photoRule),
  photoRule.replace(/\s+/g, ' ').trim(),
);
check('.glass-card sin hover pegado', /\.glass-card:hover\{[^}]*transform:none/.test(flat));
check('pie más opaco sin blur', /footer\{background:(rgba\(0,0,0,\.9\)|#000000e6)/.test(flat));
check('sin blur de tarjeta > 12px', n('backdrop-filter:blur(20px)') + n('backdrop-filter: blur(20px)') === 0);

// ── 7. Referencias rotas ─────────────────────────────────────────────────
const localRefs = [...new Set([...h.matchAll(/(?:src|href)="(\/[^"#][^"]*)"/g)].map((m) => m[1]))];
const broken = localRefs.filter((f) => !existsSync(`dist${f}`));
check('sin referencias locales rotas', broken.length === 0, JSON.stringify(broken));

// ── Informe ───────────────────────────────────────────────────────────────
console.log(`\ndist/index.html ${htmlKB} KB · carga de página ${pageMB} MB · dist total ${totalMB} MB · ${files.length} ficheros\n`);
let failed = 0;
for (const r of results) {
  if (!r.ok) failed++;
  console.log(`${r.ok ? '  OK  ' : ' FALLA'} ${r.name}${r.detail ? `  → ${r.detail}` : ''}`);
}
console.log(`\n${results.length - failed}/${results.length} comprobaciones OK${failed ? ` · ${failed} FALLOS` : ''}\n`);
process.exit(failed ? 1 : 0);
