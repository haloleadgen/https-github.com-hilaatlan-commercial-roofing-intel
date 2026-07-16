import { z } from 'astro:content';

/**
 * Structured citations.
 *
 * WHY THIS REPLACED AN INTEGER
 * `sources` used to be a hand-typed number in frontmatter with no connection to the
 * citations actually present in the article. Nothing validated it, and it had drifted
 * in both directions on every page that used it: EPDM rendered "0 sources cited" while
 * citing three real documents; TPO claimed 8 and cited 3; the estimator claimed 12 and
 * cited none.
 *
 * The count is now DERIVED from this array and the visible list is RENDERED from the
 * same array, so the displayed number and the visible entries cannot disagree. That is
 * the acceptance test: every visible source count equals the number of visible,
 * identifiable source entries on that same page.
 *
 * WHAT COUNTS AS A SOURCE
 * A named, identifiable document a reader could go and find. Deliberately excluded:
 *   - planned or aspirational sources
 *   - "remaining verification" lists
 *   - a generic organisation with no named document ("NRCA guidance" alone)
 *   - internal research notes
 *   - standards not checked against their current official catalogue description
 * If it does not have a title AND a publisher, it is not a source. Hence both are
 * required fields — the schema enforces the rule rather than trusting an author.
 */
export const sourceSchema = z.object({
  /** The named document. Not an organisation, not a topic. */
  title: z.string().min(3),
  /** The body that publishes it. */
  publisher: z.string().min(2),
  /** Where the reader can reach it, when it is publicly reachable. */
  url: z.string().url().optional(),
  /** What this source actually supports, and any limitation worth stating. */
  supports: z.string().optional(),
});

export type Source = z.infer<typeof sourceSchema>;

export const sourcesSchema = z.array(sourceSchema).optional();
