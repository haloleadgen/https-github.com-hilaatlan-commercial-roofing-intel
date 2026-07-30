/**
 * Per-page Open Graph card generator.
 *
 * Runs AFTER `astro build`. Scans dist/ for pages whose <meta property="og:image">
 * points at /og/<slug>.png (the convention emitted by Base.astro for indexable pages),
 * and renders exactly those cards from each page's own <title> — so the set of
 * generated images can never drift from the set of referenced images.
 *
 * Design: institutional, evidence-first. CRI deep palm, terracotta rule, page title,
 * domain. No imagery is invented — these are typographic cards only.
 */
import { readFileSync, readdirSync, statSync, mkdirSync, writeFileSync } from 'fs';
import { join, relative } from 'path';
import sharp from 'sharp';

const DIST = 'dist';
const OUT = join(DIST, 'og');

const pages = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    const s = statSync(p);
    if (s.isDirectory()) walk(p);
    else if (f.endsWith('.html')) pages.push(p);
  }
})(DIST);

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Greedy word-wrap to a rough character budget per line. */
function wrap(text, max = 26, maxLines = 3) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > max && line) {
      lines.push(line);
      line = w;
    } else {
      line = (line + ' ' + w).trim();
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, '') + '…';
  }
  return lines;
}

function card(title, kicker) {
  const lines = wrap(title, 24);
  // Fit the longest line inside the 1020px text column (x=90 margin each side).
  // DejaVu Sans Bold averages ≈0.63em advance per character.
  const maxLen = Math.max(...lines.map((l) => l.length));
  const size = Math.max(44, Math.min(76, Math.floor(1020 / (maxLen * 0.63))));
  const lineH = size * 1.18;
  const startY = 315 - ((lines.length - 1) * lineH) / 2;
  const tspans = lines
    .map((l, i) => `<tspan x="90" y="${Math.round(startY + i * lineH)}">${esc(l)}</tspan>`)
    .join('');
  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#1e2a22"/>
  <rect width="1200" height="8" y="0" fill="#c56a3d"/>
  <text x="90" y="120" font-family="DejaVu Sans, Arial, sans-serif" font-size="26" letter-spacing="4" fill="#d8c7a6" font-weight="bold">COMMERCIAL ROOFING INTEL</text>
  ${kicker ? `<text x="90" y="170" font-family="DejaVu Sans, Arial, sans-serif" font-size="24" letter-spacing="2" fill="#cbc4b2">${esc(kicker.toUpperCase())}</text>` : ''}
  <text font-family="DejaVu Sans, Arial, sans-serif" font-size="${size}" font-weight="bold" fill="#fbfcfd">${tspans}</text>
  <rect x="90" y="520" width="64" height="4" fill="#c56a3d"/>
  <text x="90" y="566" font-family="DejaVu Sans, Arial, sans-serif" font-size="26" fill="#cbc4b2">Independent, sourced knowledge for commercial roofing decisions</text>
  <text x="90" y="602" font-family="DejaVu Sans, Arial, sans-serif" font-size="24" fill="#a39c8a">commercialroofingintel.com</text>
</svg>`;
}

const SECTION_NAMES = {
  knowledge: 'Knowledge',
  situations: 'Situations',
  tools: 'Tools',
  glossary: 'Glossary',
  'data-research': 'Data & Research',
  'for-your-role': 'For Your Role',
  about: 'About',
};

mkdirSync(OUT, { recursive: true });
let made = 0;
const referenced = new Set();
for (const p of pages) {
  const html = readFileSync(p, 'utf8');
  const m = html.match(/property="og:image" content="[^"]*\/og\/([^"]+)\.png"/);
  if (!m) continue;
  const slug = m[1];
  referenced.add(slug);
  let title = (html.match(/<title>([^<]*)<\/title>/) || [, slug])[1];
  title = title.replace(/\s*\|\s*Commercial Roofing Intel\s*$/, '').trim();
  const rel = relative(DIST, p).replace(/\/?index\.html$/, '');
  const section = SECTION_NAMES[rel.split('/')[0]] || '';
  const svg = card(title, section && rel.includes('/') ? section : '');
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  writeFileSync(join(OUT, `${slug}.png`), png);
  made++;
}
console.log(`generate-og: ${made} card(s) generated for ${referenced.size} referenced slug(s).`);
if (made !== referenced.size) {
  console.error('generate-og: MISMATCH between referenced and generated cards');
  process.exit(1);
}
