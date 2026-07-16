import type { Source } from '../sources';
import volume01 from './volume-01.json';

/**
 * THE EVIDENCE LIBRARY — a staging area, not a source of truth.
 *
 * Volumes here are research submissions. They are stored verbatim and are NOT published.
 * Nothing in this directory reaches a rendered page unless a human moves it into a
 * content file's `sources:` frontmatter, and that is deliberately a manual act.
 *
 * WHY THIS IS NOT WIRED INTO THE SITE
 * It would be easy to auto-populate article citations from this library. That is exactly
 * the failure this project has already had twice: a number typed in one place, trusted
 * everywhere, wrong. An unreviewed claim that flows automatically onto a page is worse
 * than no claim, because the page then carries CRI's trust chrome around it.
 *
 * So the library is a queue with a gate:
 *   1. An entry arrives as `Pending Editorial & Technical Review`.
 *   2. Editorial review checks the claim is stated accurately and is actually needed.
 *   3. Technical review — by someone qualified in roofing, which is nobody on the CRI
 *      masthead today — checks the claim is TRUE and current.
 *   4. Only then may a human hand-copy it into an article's `sources:` array.
 *
 * `toSource()` below is the only bridge, and it refuses to convert anything unapproved.
 */

export type ReviewStatus =
  | 'Pending Editorial & Technical Review'
  | 'Editorial review passed — technical review pending'
  | 'Approved for use'
  | 'Rejected';

/** An entry exactly as submitted, plus CRI's review status. Fields are preserved verbatim. */
export interface EvidenceEntry {
  claim: string;
  source: string;
  publication: string;
  publication_date: string;
  url: string;
  confidence_level: string;
  /** As submitted. NOTE: this is the submitter's self-assessment, not CRI's finding. */
  source_type: string;
  quote_legality: string;
  verification_flag: string;
  review_status: ReviewStatus;
}

export interface EvidenceSection {
  id: string;
  number: number;
  title: string;
  summary: string;
  entries: EvidenceEntry[];
}

export interface EvidenceVolume {
  volume: number;
  title: string;
  received: string;
  provenance: Record<string, string>;
  review_status: string;
  sections: EvidenceSection[];
}

export const VOLUMES: EvidenceVolume[] = [volume01 as EvidenceVolume];

export const allEntries = (): EvidenceEntry[] =>
  VOLUMES.flatMap((v) => v.sections.flatMap((s) => s.entries));

/**
 * A URL that only identifies an organisation — "https://www.gaf.com/" — does not locate a
 * document. The citation architecture requires a named, reachable document (see
 * src/data/sources.ts), so an entry like this cannot satisfy the acceptance test as
 * submitted: a reader could not go and check it. Such entries need a deep link before
 * they can ever be approved, regardless of whether the underlying claim is true.
 */
export function isBareDomain(url: string): boolean {
  try {
    const u = new URL(url);
    return u.pathname === '/' || u.pathname === '';
  } catch {
    return true;
  }
}

/**
 * The ONLY bridge from the staging library into the published citation architecture.
 *
 * Returns null unless the entry is `Approved for use` — an unapproved entry cannot be
 * rendered even by mistake. Also refuses bare-domain URLs, because a citation a reader
 * cannot follow is not a citation.
 */
export function toSource(entry: EvidenceEntry): Source | null {
  if (entry.review_status !== 'Approved for use') return null;
  if (isBareDomain(entry.url)) return null;
  return {
    title: entry.publication,
    publisher: entry.source,
    url: entry.url,
    supports: entry.claim,
  };
}

/** Queue triage: what is ready, and what is blocked on what. */
export function reviewQueue() {
  const entries = allEntries();
  return {
    total: entries.length,
    pending: entries.filter((e) => e.review_status === 'Pending Editorial & Technical Review').length,
    approved: entries.filter((e) => e.review_status === 'Approved for use').length,
    blockedOnDeepLink: entries.filter((e) => isBareDomain(e.url)).length,
    usableToday: entries.filter((e) => toSource(e) !== null).length,
  };
}
