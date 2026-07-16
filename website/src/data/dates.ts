/**
 * Date helpers for content dates written as plain 'YYYY-MM-DD' in frontmatter.
 *
 * Why this exists — a real bug this fixes:
 *   new Date('2026-07-01')            // parsed as UTC midnight
 *     .toLocaleDateString('en-US', …) // rendered in the BUILD machine's timezone
 *   => "June 30, 2026" when built anywhere behind UTC (e.g. America/New_York).
 *
 * Two consequences, both bad for a site whose credibility rests on review dates:
 *   1. Every displayed date was one day earlier than the date actually authored,
 *      so <time datetime="2026-07-01"> read "June 30, 2026" — the machine-readable
 *      and human-readable values on the same element disagreed.
 *   2. Output depended on where the build ran. Netlify builds in UTC and produced
 *      correct dates; a local build in EDT produced wrong ones. Same commit, two
 *      different sites — builds were not reproducible.
 *
 * Fix: parse the calendar date into LOCAL midnight, so the rendered date always
 * equals the date written in frontmatter, in every timezone.
 */

/** Parse 'YYYY-MM-DD' as a local calendar date (never UTC). */
export function parseISODate(d: string): Date {
  const [year, month, day] = d.split('-').map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1);
}

/** Format a 'YYYY-MM-DD' frontmatter date for display. */
export function formatDate(
  d: string,
  opts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
): string {
  return parseISODate(d).toLocaleDateString('en-US', opts);
}

/** Calendar year of a 'YYYY-MM-DD' date — used for citation blocks. */
export function yearOf(d: string): number {
  return parseISODate(d).getFullYear();
}
