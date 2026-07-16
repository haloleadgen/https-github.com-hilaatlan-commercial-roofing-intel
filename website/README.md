# CommercialRoofingIntel.com — Version 1

Production-ready framework for Commercial Roofing Intel, built with **Astro** (static site
generation), Pagefind search, and a custom institutional design system.

## Quick start

```bash
npm install
npm run dev        # local preview at http://localhost:4321
npm run build      # production build → dist/ (also generates the search index)
npm run preview    # serve the production build locally
```

Deploy the `dist/` folder to any static host (Cloudflare Pages, Netlify, Vercel).
Set the build command to `npm run build` and the output directory to `dist`.

## Architecture

- **Six-pillar navigation** (locked): Knowledge · Tools · Situations · For Your Role ·
  Data & Research · AI Assistant. Defined once in `src/data/site.ts` — never hard-coded.
- **Content collections** (`src/content/`): knowledge (articles/guides/comparisons),
  glossary, situations, roles, datasets. **Adding a page = adding one Markdown file.**
  This is what scales the site to 10,000+ pages with no code changes.
- **Templates** (`src/pages/**/[...slug].astro` + layouts): encyclopedia article,
  decision guide, comparison, situation page, audience page, dataset, glossary entry,
  decision tool.
- **Design system**: `src/styles/global.css` — all tokens (color, type, spacing) as CSS
  custom properties. Reusable components in `src/components/`.
- **Search**: Pagefind, generated at build time from page content (`data-pagefind-body`).
- **SEO**: canonical URLs, per-page meta, Organization/Article/BreadcrumbList/DefinedTerm
  JSON-LD, XML sitemap (`/sitemap-index.xml`), HTML sitemap (`/sitemap/`), robots.txt.
- **Internal linking**: breadcrumbs on every page + curated `related` frontmatter on every
  content entry, rendered by `RelatedLinks`.

## Adding content

Create a Markdown file in the right collection folder with frontmatter:

```markdown
---
title: "EPDM Roofing Systems"
description: "One-sentence decision-focused summary."
type: article            # knowledge only: article | guide | comparison
status: published        # sample | draft | published (sample shows a review banner)
updated: "2026-08-01"
sources: 7
takeaways:
  - "First key takeaway."
related:
  - title: "Related page"
    href: "/knowledge/some-page/"
    type: "Encyclopedia"
---

## First section...
```

`status: sample` displays the amber "template review" banner. Switch to `published`
when editorial review is complete.

## Pre-launch wiring (documented, not yet configured)

1. Contact form delivery (e.g., a form endpoint or serverless function).
2. Privacy-respecting analytics.
3. Legal review of Privacy Policy and Terms.
4. Funding & Relationships: name actual referral partners.
5. Replace `status: sample` content with reviewed editorial content.
