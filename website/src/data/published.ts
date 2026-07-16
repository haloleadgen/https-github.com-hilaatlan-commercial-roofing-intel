import { getCollection } from 'astro:content';

/**
 * Build-time set of every content route whose frontmatter status is `published`.
 *
 * Why this exists: navigation and homepage modules used to hard-code links to
 * specific articles. Most of those articles are still `sample`/`draft`, so the nav
 * was promoting placeholder pages — a visitor clicking "Comparisons" landed on an
 * amber "Sample content — template review only" banner.
 *
 * Filtering through this set means unpublished work is unreachable from promotional
 * surfaces, and re-appears automatically the moment its status flips to `published`.
 * Same principle as the sitemap/noindex logic in astro.config.mjs: `status` is the
 * single switch. Do not hard-code around it.
 */

/** content collection -> public URL prefix */
const ROUTE_MAP = {
  knowledge: '/knowledge',
  glossary: '/glossary',
  situations: '/situations',
  roles: '/for-your-role',
  datasets: '/data-research',
} as const;

let cache: Set<string> | null = null;

export async function publishedHrefs(): Promise<Set<string>> {
  if (cache) return cache;
  const set = new Set<string>();
  for (const [collection, prefix] of Object.entries(ROUTE_MAP)) {
    const entries = await getCollection(collection as keyof typeof ROUTE_MAP);
    for (const entry of entries) {
      if ((entry.data as { status?: string }).status === 'published') {
        set.add(`${prefix}/${entry.id}/`);
      }
    }
  }
  cache = set;
  return set;
}

/** Every route that maps to a content entry, published or not. */
const CONTENT_PREFIXES = Object.values(ROUTE_MAP);

/**
 * True if `href` is safe to promote.
 *
 * Non-content routes (hubs like /tools/, governance, legal) are always allowed —
 * they are .astro pages, not content entries, so they never appear in the published
 * set and must not be filtered out by it.
 */
export function isPromotable(href: string, published: Set<string>): boolean {
  const isContentRoute = CONTENT_PREFIXES.some((p) => href.startsWith(`${p}/`)) &&
    href !== '/knowledge/' && href !== '/glossary/' && href !== '/situations/' &&
    href !== '/for-your-role/' && href !== '/data-research/';
  if (!isContentRoute) return true;
  return published.has(href);
}
