/**
 * The editorial publication-status framework.
 *
 * `status` is the single switch that governs indexing, search, promotion, and every
 * trust claim on a page. Nothing may route around it.
 *
 * A page may only claim what it has actually earned. Before this framework existed the
 * site rendered "Evidence-based" and "Reviewed by Hila Atlan, Founder & Editor-in-Chief"
 * unconditionally, so placeholder pages asserted an editorial review that never happened.
 *
 * Note the deliberate separation of EDITORIAL review (Hila: standards, sourcing,
 * structure, publication quality) from TECHNICAL review (subject-matter verification of
 * roofing claims). Hila is not a roofing technical expert, a licensed contractor, or an
 * engineer, and no page may imply otherwise. `technical-review` exists precisely so that
 * editorially finished work can be published honestly while that gap is disclosed.
 */

export type Status =
  | 'template'          // structural placeholder — never presented as content
  | 'draft'             // real content, sources still being verified
  | 'technical-review'  // editorially complete; awaiting subject-matter verification
  | 'preliminary'       // tool/dataset published with explicit limitations
  | 'published';        // editorially reviewed and fully sourced

export const EDITOR = 'Hila Atlan, Founder & Editor-in-Chief';

interface StatusMeta {
  /** Short chip shown in the trust strip. */
  label: string;
  /** The full, honest sentence. */
  detail: string;
  /** May this page be indexed and surfaced to crawlers/search/promotion? */
  indexable: boolean;
  /** May a numeric source count be displayed? */
  showSourceCount: boolean;
  /** May the page name Hila as having editorially reviewed it? */
  showEditorialReview: boolean;
  /** Chip tone class. */
  tone: 'evidence' | 'neutral' | 'caution';
}

export const STATUS: Record<Status, StatusMeta> = {
  published: {
    label: 'Editorially reviewed',
    detail: `Reviewed by ${EDITOR}`,
    indexable: true,
    showSourceCount: true,
    showEditorialReview: true,
    tone: 'evidence',
  },
  'technical-review': {
    label: 'Technical review pending',
    detail:
      'Editorially complete; awaiting subject-matter verification of technical claims',
    indexable: true,
    showSourceCount: true,
    showEditorialReview: true,
    tone: 'neutral',
  },
  preliminary: {
    label: 'Published with limitations',
    detail: 'Preliminary data, not yet validated',
    indexable: true,
    showSourceCount: false,
    showEditorialReview: false,
    tone: 'caution',
  },
  draft: {
    label: 'Source verification in progress',
    detail: 'Sources for this page are still being verified. Details may change.',
    indexable: false,
    showSourceCount: false,
    showEditorialReview: false,
    tone: 'caution',
  },
  template: {
    label: 'Template — not yet published',
    detail:
      'This page demonstrates a template structure. It is not editorial content and must not be read as guidance.',
    indexable: false,
    showSourceCount: false,
    showEditorialReview: false,
    tone: 'caution',
  },
};

export const isIndexable = (s: Status = 'template') => STATUS[s]?.indexable ?? false;
