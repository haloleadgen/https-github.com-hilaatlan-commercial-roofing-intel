import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// --- Build the exclusion list for the sitemap -------------------------------
// A content entry is indexable when its editorial status says a reader may rely on the
// page being real: `published`, `technical-review` (editorially complete, awaiting
// subject-matter verification) and `preliminary` (published with explicit limitations).
// `draft` and `template` are noindexed in the page head (noindex, follow) and excluded
// from the sitemap. Changing frontmatter status re-enters a page into both automatically.
// This list MUST agree with isIndexable() in src/data/status.ts — the sitemap and the
// page head must never disagree about the same URL.
const INDEXABLE = new Set(['published', 'technical-review', 'preliminary']);

// Use fileURLToPath, not URL.pathname: .pathname returns a URL-ENCODED path, so any
// space in a parent directory name arrives as '%20' and every fs call below fails
// with ENOENT. This project's folder is "Commercial Roofing Intel" — spaces included —
// which broke the build outright. fileURLToPath decodes to a real filesystem path.
const CONTENT_DIR = fileURLToPath(new URL('./src/content', import.meta.url));

// content collection directory -> public URL prefix
const ROUTE_MAP = {
  knowledge: '/knowledge',
  glossary: '/glossary',
  situations: '/situations',
  roles: '/for-your-role',
  datasets: '/data-research',
};

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const noindexPaths = new Set([
  // utility pages (already noindexed in head)
  '/search/',
  '/thanks/',
  '/404/',
  // the maintenance planner remains draft: placeholder cost rates, no validated data
  '/tools/maintenance-budget-planner/',
  // governance pages held out of the index pending founder confirmation + counsel review
  '/about/funding-and-relationships/',
]);

for (const [collection, prefix] of Object.entries(ROUTE_MAP)) {
  const dir = join(CONTENT_DIR, collection);
  let indexableInCollection = 0;
  for (const file of walk(dir)) {
    if (!file.endsWith('.md')) continue;
    const src = readFileSync(file, 'utf-8');
    const m = src.match(/^status:\s*(\S+)/m);
    const status = m ? m[1] : 'template';
    if (!INDEXABLE.has(status)) {
      const slug = file
        .slice(join(CONTENT_DIR, collection).length + 1)
        .replace(/\.md$/, '');
      noindexPaths.add(`${prefix}/${slug}/`);
    } else {
      indexableInCollection += 1;
    }
  }
  // Keep the sitemap in step with the hub pages themselves: a hub with no reachable
  // children is noindexed in its <head>, so it must not be advertised in the sitemap
  // either. It returns automatically once a child becomes indexable.
  if (indexableInCollection === 0) {
    noindexPaths.add(`${prefix}/`);
  }
}

// https://astro.build/config
export default defineConfig({
  site: 'https://commercialroofingintel.com',
  integrations: [
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        return !noindexPaths.has(path);
      },
    }),
  ],
  build: {
    format: 'directory',
  },
});
