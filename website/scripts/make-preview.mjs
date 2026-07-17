/**
 * Regenerates website/preview/ — a file://-browsable copy of dist/ for machines
 * with no local server (the founder's Mac has no Node toolchain).
 *
 * Transformations: directory links -> explicit index.html, absolute internal
 * URLs -> relative paths. Content is otherwise byte-identical to dist/.
 * Pagefind search will not function over file:// (requires fetch); this is a
 * visual/content QA surface, not the deployment environment. Headers, forms,
 * and redirects can only be QA'd on the hosting platform.
 *
 * Run after a build: node scripts/make-preview.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, cpSync, rmSync } from 'fs';
import { join, relative, dirname } from 'path';

const DIST = 'dist';
const OUT = 'preview';

rmSync(OUT, { recursive: true, force: true });
cpSync(DIST, OUT, { recursive: true });

const pages = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.html')) pages.push(p);
  }
})(OUT);

for (const p of pages) {
  const depth = relative(OUT, dirname(p)).split('/').filter(Boolean).length;
  const prefix = depth === 0 ? './' : '../'.repeat(depth);
  let h = readFileSync(p, 'utf8');
  // Internal links and assets: href="/..." src="/..." (skip protocol-relative "//")
  h = h.replace(/(href|src)="\/(?!\/)([^"]*)"/g, (m, attr, path) => {
    if (path === '') return `${attr}="${prefix}index.html"`;
    if (path.endsWith('/')) return `${attr}="${prefix}${path}index.html"`;
    return `${attr}="${prefix}${path}"`;
  });
  writeFileSync(p, h);
}
console.log(`make-preview: ${pages.length} pages rewritten into ${OUT}/.`);
