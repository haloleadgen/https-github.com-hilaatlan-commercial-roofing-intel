/**
 * Single source of truth for site identity and the approved six-pillar
 * information architecture. Navigation everywhere on the site reads from
 * this file — do not hard-code pillar names in components or pages.
 */

export const SITE = {
  name: 'Commercial Roofing Intel',
  shortName: 'CRI',
  domain: 'https://commercialroofingintel.com',
  descriptor: 'Independent commercial roofing knowledge',
  description:
    'Commercial Roofing Intel is an independent knowledge platform for commercial roofing — research, technical guidance, decision tools, and practical resources for commercial property professionals.',
  /** VERIFIED production contact (founder-confirmed July 15, 2026).
   * Victory E&I affiliation is disclosed on Funding & Relationships. */
  contactEmail: 'hila@victoryroofer.com',
  /** VERIFIED Google Voice business line (founder-confirmed July 15, 2026). */
  contactPhone: '(954) 634-2028',
  contactPhoneHref: 'tel:+19546342028',
} as const;

/** The approved six pillars. Names are locked. */
export const PILLARS = [
  {
    name: 'Knowledge',
    href: '/knowledge/',
    summary:
      'Commercial roofing systems, materials, maintenance, replacement, coatings, warranties, and technical fundamentals.',
    icon: 'book',
  },
  {
    name: 'Tools',
    href: '/tools/',
    summary:
      'Decision-support calculators, planners, checklists, estimators, and assessment tools with published methodology.',
    icon: 'calculator',
  },
  {
    name: 'Situations',
    href: '/situations/',
    summary:
      'Guidance organized around real decision moments — leaks, storm damage, insurance claims, repair versus replacement, hurricane preparation, and due diligence.',
    icon: 'compass',
  },
  {
    name: 'For Your Role',
    href: '/for-your-role/',
    summary:
      'Resources tailored to property owners, property managers, facility managers, HOA boards, investors, developers, architects, engineers, and insurance professionals.',
    icon: 'people',
  },
  {
    name: 'Data & Research',
    href: '/data-research/',
    summary:
      'Proprietary datasets, benchmarks, regional cost data, roof-life research, hurricane-performance analysis, and methodology reports.',
    icon: 'chart',
  },
  {
    name: 'AI Assistant',
    href: '/ai-assistant/',
    summary:
      'A citation-disciplined commercial roofing research assistant that answers only from approved sources and clearly acknowledges gaps or uncertainty.',
    icon: 'assistant',
  },
] as const;

/** Governance pages — the trust layer. Linked in the footer and About hub. */
export const GOVERNANCE = [
  { name: 'About CRI', href: '/about/' },
  { name: 'Our Mission', href: '/about/mission/' },
  { name: 'Editorial Standards', href: '/about/editorial-standards/' },
  { name: 'Methodology', href: '/about/methodology/' },
  { name: 'Funding & Relationships', href: '/about/funding-and-relationships/' },
  { name: 'Corrections', href: '/about/corrections/' },
  { name: 'How CRI Works', href: '/about/how-cri-works/' },
] as const;

export const LEGAL = [
  { name: 'Privacy Policy', href: '/privacy/' },
  { name: 'Terms of Use', href: '/terms/' },
  { name: 'Sitemap', href: '/sitemap/' },
  { name: 'Contact', href: '/contact/' },
] as const;
