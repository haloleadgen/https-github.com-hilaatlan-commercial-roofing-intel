# SEO Checklist — Commercial Roofing Intel

Updated July 16, 2026. Every ✅ below was verified by inspecting `website/dist/`
this session — not assumed. Counts are out of the 60 built HTML pages.

**Summary: the technical SEO layer is production-grade. The problem is not SEO
mechanics — it is that only 3 substantive pages are indexable.**

---

## ✅ Verified in the built output

| Item | Result |
| --- | --- |
| Canonical URLs | **60/60** — apex domain, consistent with `astro.config.mjs` |
| Meta descriptions | **60/60** |
| Open Graph tags | **60/60** (`og:title` present on every page) |
| Twitter cards | **60/60** |
| OG image | 1200×630 `og-default.png` present |
| Heading hierarchy | **Exactly one `<h1>` on every page.** Zero violations. |
| Image alt text | **Zero** `<img>` without `alt` |
| `robots.txt` | Allows all, points to `sitemap-index.xml` |
| XML sitemap | 23 URLs = exactly the 23 indexable pages |
| noindex discipline | 37/60 correctly noindexed (all non-`published`) |
| URL consistency | Trailing-slash directory format throughout; no mixed forms |
| Favicons | SVG + 32px PNG + 180px apple-touch-icon |

### Structured data — verified present

| Schema | Count | Notes |
| --- | --- | --- |
| `Organization` | 108 | With `publishingPrinciples`, `correctionsPolicy`, `ownershipFundingInfo` — genuinely good for a trust-dependent site |
| `WebSite` + `SearchAction` | 60 | Sitelinks search box |
| `BreadcrumbList` | 57 | Matches on-page breadcrumbs |
| `Article` | 24 | |
| `DefinedTerm` | 11 | Glossary |

The Organization schema explicitly declaring publishing principles, a corrections
policy, and ownership/funding info is exactly right for this site's positioning.

---

## 🟠 Issues

### 1. Five of six pillar hubs are indexable with zero indexable children
`/glossary/` (11 children, 0 indexable), `/situations/` (4, 0), `/for-your-role/`
(2, 0), `/data-research/` (1, 0), `/tools/` (2, 0). Only `/knowledge/` has any (3 of 17).

An indexable hub whose every link is noindexed is a thin-content, crawl-dead-end
pattern — and five of them at launch, on a domain with no authority, is a poor first
crawl. Either noindex the empty hubs until each has a published child, or hold launch
for content. **Do not fix this by publishing unverified drafts.** *(KNOWN_ISSUES #4)*

### 2. Internal linking is dense but mostly points at noindexed pages
`related` frontmatter and inline links are well curated — but from the 3 published
articles, most outbound internal links go to draft/sample pages. Link equity has
almost nowhere to flow. This resolves itself as drafts get published.

### 3. `Article` schema is emitted on 24 pages, but only 3 are published
Harmless (noindex means it won't be indexed), but it means placeholder pages carry
Article markup. Consider gating the schema on `status === 'published'` alongside the
existing noindex logic. Low priority.

### 4. No FAQ schema anywhere
Zero `FAQPage`. Legitimately appropriate on the Situations pages
(`my-roof-is-leaking`, `storm-damage-first-72-hours`, `insurance-claims`), which are
already written in question-shaped sections. Worthwhile — but **only after those
pages are published with real sources.** Adding rich-result markup to placeholder
content would be actively harmful.

### 5. `Article` schema is missing `datePublished`
Only `dateModified` is emitted. `author` is the Organization rather than a Person —
defensible for an institutional publisher, and arguably better than attributing to a
Person who is also the contractor's owner. Leave as-is; add `datePublished`.

---

## ❓ Not verified — do not claim these

- **Core Web Vitals / Lighthouse** — no Node, no build, no browser. The architecture
  is strongly favourable (static HTML, zero client framework, system fonts, no CDN
  calls, hashed assets, 2.1 MB total) but **no score has been measured.** Run it after
  the first deploy.
- **Google Search Console** — domain not verified, sitemap not submitted. Post-deploy.
- **Broken links** — prior docs claim 3,807 internal links with 0 broken. Not
  re-verified this session.
- **Rendered SERP appearance / rich-result validity** — run the Rich Results Test on
  the live URLs after deploy.

---

## Post-launch order

1. Verify domain in Search Console, submit `/sitemap-index.xml`.
2. Run Lighthouse + Rich Results Test against live URLs.
3. Publish drafts with real citations — un-noindex each hub as its children land.
4. Add FAQ schema to Situations pages *once published*.
5. Add `datePublished`; consider gating Article schema on published status.
6. Consider a CSP (trivial here — no third-party scripts). See INFRASTRUCTURE.md.
