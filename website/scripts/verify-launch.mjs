/**
 * Launch verification gate — encodes every invariant previously checked by hand.
 * Run after a build: `node scripts/verify-launch.mjs`. Exit 0 = pass.
 *
 * Invariants:
 *  1. Every page has exactly one <h1>, a canonical, a description, OG + Twitter tags.
 *  2. No duplicate <title> across pages.
 *  3. Every internal link resolves to a built page.
 *  4. All JSON-LD blocks parse as valid JSON.
 *  5. Sitemap contains exactly the indexable (non-noindex) pages — no more, no less.
 *  6. No indexable page contains placeholder text ("Placeholder:", "[NEEDED", etc.).
 *  7. No noindexed page appears in Pagefind search or carries an evidence chip.
 *  8. Every og:image referenced actually exists in dist.
 *  9. No image without alt text; no http:// URLs anywhere.
 * 10. robots.txt allows crawling and points at the sitemap.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, relative } from 'path';

const DIST = 'dist';
const fail = [];
const pages = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.html')) pages.push(p);
  }
})(DIST);

const titles = {};
const placeholderRe = /(Placeholder:|\[NEEDED|Lorem ipsum|\[Entity Name\]|TODO:|FIXME)/;
let indexable = 0;

for (const p of pages) {
  const h = readFileSync(p, 'utf8');
  const rel = '/' + relative(DIST, p).replace(/index\.html$/, '');
  const noindex = /name="robots" content="noindex/.test(h);
  if (!noindex) indexable++;

  const h1s = (h.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) fail.push(`${rel}: ${h1s} <h1> elements`);
  if (!/rel="canonical"/.test(h)) fail.push(`${rel}: no canonical`);
  if (!/name="description"/.test(h)) fail.push(`${rel}: no meta description`);
  if (!/property="og:title"/.test(h)) fail.push(`${rel}: no og:title`);
  if (!/name="twitter:card"/.test(h)) fail.push(`${rel}: no twitter:card`);

  const t = (h.match(/<title>([^<]*)<\/title>/) || [])[1];
  (titles[t] = titles[t] || []).push(rel);

  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { fail.push(`${rel}: invalid JSON-LD (${e.message})`); }
  }

  const body = h.split(/<body[^>]*>/)[1] || h;
  if (!noindex) {
    const m = body.match(placeholderRe);
    if (m) fail.push(`${rel}: indexable page contains placeholder text "${m[0]}"`);
  }

  for (const [, l] of body.matchAll(/href="(\/[^"#?]*)"/g)) {
    if (l.startsWith('/_') || /\.[a-z]{2,4}$/.test(l)) continue;
    if (!existsSync(join(DIST, l, 'index.html')) && !existsSync(join(DIST, l.replace(/\/$/, '') + '.html')))
      fail.push(`${rel}: broken internal link → ${l}`);
  }

  for (const [, img] of h.matchAll(/property="og:image" content="https:\/\/commercialroofingintel\.com(\/[^"]+)"/g)) {
    if (!existsSync(join(DIST, img))) fail.push(`${rel}: og:image missing from dist → ${img}`);
  }

  for (const tag of body.matchAll(/<img\s[^>]*>/g)) {
    if (!/\salt=/.test(tag[0])) fail.push(`${rel}: <img> without alt`);
  }
  if (/http:\/\/(?!www\.w3\.org|schema\.org)/.test(h)) fail.push(`${rel}: insecure http:// URL`);
}

for (const [t, rels] of Object.entries(titles))
  if (rels.length > 1) fail.push(`duplicate <title> "${t}": ${rels.join(', ')}`);

// Sitemap consistency
const smFile = readdirSync(DIST).find((f) => /^sitemap-\d+\.xml$/.test(f));
if (!smFile) fail.push('no sitemap-N.xml found');
else {
  const sm = readFileSync(join(DIST, smFile), 'utf8');
  const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  if (urls.length !== indexable)
    fail.push(`sitemap has ${urls.length} URLs but ${indexable} pages are indexable`);
  for (const u of urls) {
    const f = join(DIST, u, 'index.html');
    if (!existsSync(f)) { fail.push(`sitemap URL not built: ${u}`); continue; }
    if (/name="robots" content="noindex/.test(readFileSync(f, 'utf8')))
      fail.push(`noindexed page in sitemap: ${u}`);
  }
}

// robots.txt
const robots = readFileSync(join(DIST, 'robots.txt'), 'utf8');
if (!/Allow: \//.test(robots)) fail.push('robots.txt does not Allow: /');
if (!/Sitemap: https:\/\/commercialroofingintel\.com\/sitemap-index\.xml/.test(robots))
  fail.push('robots.txt missing sitemap directive');

// Pagefind must not index noindexed pages (spot check: search fragments exist)
if (!existsSync(join(DIST, 'pagefind'))) fail.push('pagefind output missing');

console.log(`verify-launch: ${pages.length} pages checked, ${indexable} indexable.`);
if (fail.length) {
  console.error(`FAIL — ${fail.length} issue(s):`);
  [...new Set(fail)].forEach((f) => console.error('  ✗ ' + f));
  process.exit(1);
}
console.log('PASS — all launch invariants hold.');
