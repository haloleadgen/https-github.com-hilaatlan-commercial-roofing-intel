import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

// --- Build the exclusion list for the sitemap -------------------------------
// Any content entry whose frontmatter status is not `published` is noindexed
// in the page head (noindex, follow) and must also be excluded from the sitemap.
// When a page is editorially verified, set `status: published` in its frontmatter
// and it automatically re-enters both the index and the sitemap.

const CONTENT_DIR = new URL('./src/content', import.meta.url).pathname;

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
  // tools with draft/sample methodology (noindexed until verified)
  '/tools/maintenance-budget-planner/',
  '/tools/roof-life-expectancy-estimator/',
]);

for (const [collection, prefix] of Object.entries(ROUTE_MAP)) {
  const dir = join(CONTENT_DIR, collection);
  for (const file of walk(dir)) {
    if (!file.endsWith('.md')) continue;
    const src = readFileSync(file, 'utf-8');
    const m = src.match(/^status:\s*(\S+)/m);
    const status = m ? m[1] : 'sample';
    if (status !== 'published') {
      const slug = file
        .slice(join(CONTENT_DIR, collection).length + 1)
        .replace(/\.md$/, '');
      noindexPaths.add(`${prefix}/${slug}/`);
    }
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
