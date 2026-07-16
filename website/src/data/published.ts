import { getCollection } from 'astro:content';

/**
 * Build-time set of every content route CRI is willing to PROMOTE.
 *
 * "Promotable" is deliberately stricter than "indexable":
 *
 *   published        → promotable. Editorially reviewed and sourced.
 *   technical-review → promotable. Editorially complete and sourced; the page itself
 *                      discloses that subject-matter verification is pending.
 *   preliminary      → INDEXABLE BUT NEVER PROMOTED. The estimator and the benchmark
 *                      dataset are published so their method can be examined, not
 *                      because their numbers are trustworthy. Featuring them on the
 *                      homepage would be the site advertising exactly the reliance the
 *                      content tells readers not to place in it.
 *   draft, template  → neither.
 *
 * Why this exists: navigation and homepage modules hard-coded links to specific
 * articles, most of which were placeholders, so a visitor clicking "Comparisons" landed
 * on a "Sample content" banner. Filtering through this set means unfinished work cannot
 * be promoted, and re-appears automatically the moment its status earns it.
 */

/** content collection -> public URL prefix */
const ROUTE_MAP = {
  knowledge: '/knowledge',
  glossary: '/glossary',
  situations: '/situations',
  roles: '/for-your-role',
  datasets: '/data-research',
} as const;

/** Statuses CRI will actively point readers at. See the note above on `preliminary`. */
const PROMOTABLE = new Set(['published', 'technical-review']);

let cache: Set<string> | null = null;

export async function publishedHrefs(): Promise<Set<string>> {
  if (cache) return cache;
  const set = new Set<string>();
  for (const [collection, prefix] of Object.entries(ROUTE_MAP)) {
    const entries = await getCollection(collection as keyof typeof ROUTE_MAP);
    for (const entry of entries) {
      if (PROMOTABLE.has((entry.data as { status?: string }).status ?? '')) {
        set.add(`${prefix}/${entry.id}/`);
      }
    }
  }
  cache = set;
  return set;
}

const CONTENT_PREFIXES = Object.values(ROUTE_MAP);
const HUBS = new Set([
  '/knowledge/',
  '/glossary/',
  '/situations/',
  '/for-your-role/',
  '/data-research/',
]);

/**
 * True if `href` is safe to promote.
 *
 * Non-content routes (hubs, governance, legal) are always allowed — they are .astro
 * pages, not content entries, so they never appear in the promotable set and must not be
 * filtered out by it.
 */
export function isPromotable(href: string, promotable: Set<string>): boolean {
  const isContentRoute =
    CONTENT_PREFIXES.some((p) => href.startsWith(`${p}/`)) && !HUBS.has(href);
  if (!isContentRoute) return true;
  return promotable.has(href);
}
