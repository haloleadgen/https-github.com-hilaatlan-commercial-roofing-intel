# CommercialRoofingIntel.com — Version 1 Report

Prepared for founder review · July 15, 2026

---

## 1. What was built

**Stack:** Astro 5 (static site generation) · Pagefind search · custom design system · zero client-side framework weight. Built output is 1.4 MB total for 33 pages, verified with 1,430 internal links checked and zero broken.

**Framework**

- Design system (`src/styles/global.css`): full token set — institutional navy/slate palette, serif-display/sans-body typography (system fonts, no tracking or font CDNs), spacing scale, focus states, print styles. Communicates reference institution, not contractor marketing.
- Global navigation: utility bar (About, Editorial Standards, Contact) + masthead + the six approved pillars, exact names, defined once in `src/data/site.ts`. Accessible mobile menu (aria-expanded toggle).
- Footer: mission statement, pillar links, full governance links, legal links, independence disclosure.
- Search: Pagefind — static, fast, private (no external service). Indexes all content pages; type filters wired via `data-pagefind-filter`.
- Internal linking system: breadcrumbs (with BreadcrumbList schema) + curated `related` frontmatter on every content entry, rendered as a consistent "Related resources" band.
- Reusable components: Card, PillarIcon, TrustMeta (evidence badge, review date, sources count, corrections link), KeyTakeaways, Callout (info/evidence/caution/alert), SampleNotice, RelatedLinks, PageHero, Breadcrumbs.

**Pages (all 12 requested)**

Home · About · Mission · Editorial Standards · Methodology · Funding & Relationships · Corrections · How CRI Works · Contact · Privacy Policy · Terms · HTML Sitemap (+ Search, 404, XML sitemap, robots.txt).

**Templates (all 8 requested), each with working sample pages**

| Template | Route pattern | Sample |
| --- | --- | --- |
| Encyclopedia article | `/knowledge/{slug}/` | TPO Roofing Systems |
| Decision guide | `/knowledge/guides/{slug}/` | Repair or Replace? |
| Comparison | `/knowledge/compare/{slug}/` | TPO vs. EPDM |
| Decision tool | `/tools/{slug}/` | **Roof Life Expectancy Estimator — fully functional**, with on-page methodology and limitations |
| Dataset | `/data-research/{slug}/` | Roof Life Expectancy Benchmarks (with citation block + version history) |
| Glossary entry | `/glossary/{slug}/` | Ponding water, Positive drainage, Scupper |
| Audience page | `/for-your-role/{slug}/` | Property Managers, HOA Boards |
| Situation page | `/situations/{slug}/` | Roof Is Leaking, Storm Damage: First 72 Hours |

Adding a page = adding one Markdown file. No code changes. That is the 10,000-page scaling mechanism.

**SEO layer:** canonical URLs, per-page meta + Open Graph, JSON-LD (Organization with publishingPrinciples/correctionsPolicy/ownershipFundingInfo, Article, BreadcrumbList, DefinedTerm), XML sitemap, semantic HTML throughout.

**Accessibility:** skip link, landmark structure, one h1 per page, labeled forms, aria-live tool results, visible focus rings, reduced-motion support, color contrast designed to WCAG AA.

## 2. Remaining work before launch

1. **Content.** 20–30 cornerstone articles written and reviewed to Editorial Standards (current samples are structural placeholders, all marked with the amber banner; flip `status: sample` → `published` as each clears review).
2. **Funding & Relationships page** — name the actual referral partner(s) and compensation structure. The placeholder is flagged on-page.
3. **Legal review** of Privacy Policy and Terms (both carry a "legal review required" flag).
4. **Contact form delivery** — wire to a form endpoint or serverless function at deployment (form UI is built; email fallback shown until wired).
5. **Benchmarks v1.0** — validate the dataset and estimator modifier values, then remove sample flags; the estimator's methodology page copy is already structured for this.
6. **Hosting + domain** — deploy to Cloudflare Pages/Netlify/Vercel, point commercialroofingintel.com, enable HTTPS, set `www` canonical redirect.
7. **Analytics** — privacy-respecting analytics (e.g., Plausible/Fathom) consistent with the Privacy Policy.
8. Favicon set (PNG/apple-touch) and a real OG share image.

## 3. Recommended launch checklist

**Content gate**
- [ ] 20–30 cornerstone pages `status: published` (spread across all six pillars)
- [ ] Every governance page final (no placeholder callouts remain)
- [ ] First decision tool validated against benchmarks v1.0
- [ ] All sample banners gone from public pages

**Technical gate**
- [ ] `npm run build` clean; link check passes (script in report §1)
- [ ] Lighthouse ≥ 95 performance / 100 accessibility / 100 SEO on home, one article, the tool
- [ ] Search returns sensible results for 10 test queries
- [ ] Mobile walkthrough on real devices (nav, search, tool, tables)
- [ ] 404 page, robots.txt, sitemap-index.xml verified on production domain
- [ ] Redirects: apex → www (or reverse), http → https

**Trust gate**
- [ ] Funding & Relationships names real partners
- [ ] Legal sign-off on Privacy + Terms
- [ ] Corrections inbox monitored; 2-business-day acknowledgment achievable
- [ ] Contact form delivers + spam protection

## 4. Technical risks to address before launch

1. **Search index staleness** — Pagefind rebuilds only at build time. Mitigation: CI pipeline (GitHub → host) so every content merge rebuilds; never hand-upload `dist/`.
2. **Placeholder leakage** — the biggest reputational risk is launching with sample content indexed by Google. Mitigation already built: sample banner is automatic; before launch, grep for `status: sample` as a release gate. Consider `noindex` on any page still sampled.
3. **Estimator numbers are unvalidated (v0.1)** — shipping a tool with placeholder modifiers contradicts the Methodology page. Gate the tool on benchmarks v1.0.
4. **Contact form is UI-only** until wired — currently labeled as such on-page; must be wired or the label kept.
5. **No CI/CD or staging yet** — set up repo + host preview deploys so founder review of future changes happens on staging URLs, not production.
6. **Governance dates** — governance pages carry effective dates; establish the annual re-review calendar now so dates don't silently age.
7. **AI Assistant expectations** — the pillar page clearly states "in development"; keep that until the citation-disciplined corpus exists. Do not ship a generic chatbot under this brand.

## 5. How to preview

```bash
cd commercialroofingintel
npm install
npm run build     # builds site + search index
npm run preview   # opens the production build locally
```

Or unzip `dist.zip` and drag the `dist` folder onto Netlify Drop (app.netlify.com/drop) for an instant shareable review URL. (Opening `dist/index.html` directly from the file system won't load styles/search — the site expects a web server, even a trivial one.)

## 6. Launch timing recommendation

Concur with the founder guidance: the framework is ready, the institution is not. Launch when the five conditions hold — homepage clarity (✅ built), complete navigation (✅ built), 20–30 real cornerstone articles (❌ in production), first tool validated (🟡 tool works; data needs v1.0), governance pages live (🟡 built; two placeholders + legal review). The differentiating asset is trust, and trust cannot be retrofitted after a thin launch.
