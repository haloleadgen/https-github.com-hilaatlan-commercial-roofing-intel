# Founder Review Round 1 — Enhancement Pass Report

CommercialRoofingIntel.com · July 15, 2026
Architecture unchanged. Six pillars, navigation, governance model: locked, as directed.

---

## 1–3. Screenshots

All in the `screenshots/` folder (19 captures from the real production build, taken in a headless browser):

**Desktop (1440px):** home, pillar-knowledge, pillar-situations, pillar-ai-assistant, template-encyclopedia, template-decision-guide, template-comparison, template-tool, template-tool-result (estimator run live: TPO · 18 yrs · coastal · ponding unknown → "0–3 years, Confidence: Low"), template-dataset, template-glossary, template-audience, governance-about, governance-editorial-standards, search-results (live query "TPO" → 3 results, verified working).

**Mobile (390px):** mobile-home, mobile-article, mobile-tool, mobile-menu-open.

## 4. Design improvements

- Hero rebuilt: shorter headline ("Evidence, not sales pressure."), large search box as the visual center, architectural skyline line-art background, trust indicators as links, more breathing room. The three 5-second questions are answered in the first viewport: what (eyebrow + lede), why trust (proof row), where to start (search + situation/role links).
- Section rhythm: larger vertical padding, alternating surfaces (paper → white stats → paper → tinted → paper → navy), section headers with eyebrow + "view all" pattern.
- Cards: hover lift + shadow, per-card "Read →" affordance, whole-card click target, type badges, tightened typography. Reduced-motion respected.
- Stats band with serif numerals; every count computed from the live content collections at build time and the band is visibly flagged **Pre-launch** so placeholder scale can't ship as a claim.
- Visual layer: custom SVG architectural line-art (hero skyline), blueprint grid texture utility, navy featured-tool card. No stock handshakes, no hard hats, no contractor tropes.
- Custom Open Graph share image (1200×630) so links look institutional in Slack/LinkedIn previews.

## 5. UX improvements

- **Navigation:** hover/keyboard dropdown menus under four pillars with curated destinations + descriptions; active-pillar underline; 44px touch targets; mobile menu unchanged (verified in screenshots).
- **Templates (all 8):** sticky sidebar with Key Facts panel (type, updated, reviewer, sources, reading time), auto-generated table of contents, accountability panel (governance link, report an error, print). Reading-progress bar. Estimated reading time in the trust strip. Previous/next pagination within each collection. Print stylesheet (sidebar/nav stripped, URLs printed after external links).
- **Search:** now a product — `/search/?q=` deep links (hero search submits into it), popular-search chips, recent searches (localStorage, device-only), result highlighting, `/` keyboard shortcut site-wide with visible hint, styled empty/fallback states.
- **Homepage "living institution" band:** Latest Research, Recently Updated (real dates from frontmatter), Editor's Picks, Featured Comparison with teaser table, Newest Decision Tool, and an "In the middle of something?" urgency strip — all clearly labeled illustrative pre-launch.
- **Estimator:** input validation with inline error, "Not sure" ponding option, explicit confidence label (Low/Moderate) with reasons, new-roof (age 0) path, beyond-expected-life path, next-step guidance that changes with the result, methodology anchor beside the number.

## 6. Technical improvements

- WebSite schema with SearchAction (Google sitelinks searchbox eligibility); og:image + twitter summary_large_image; theme-color.
- Estimator hardening: age bounds 0–80 enforced, rounding at display only, confidence capped at "Moderate" until benchmarks v1.0 (stated on-page).
- Verified in this pass: 33 pages build clean; 1,970 internal links, 0 broken; search index (19 content pages); estimator math re-verified against the benchmark table; live browser tests of search and the estimator; canonical/robots/sitemap intact.
- Performance posture unchanged and strong: no JS framework, system fonts, one small CSS file, JS only where a feature needs it (menu, progress bar, tool, search page). Core Web Vitals risk is low; confirm with Lighthouse on the production host.

## 7. Remaining weaknesses (honest)

1. **Stats band values are 1s.** Honest and flagged, but visually thin. Recommend hiding the band until the launch library makes the numbers respectable — it's one comment-out.
2. **No photography.** Image generation wasn't available (workspace out of credits), so the visual layer is line-art only. Before launch: license 6–10 photos — aerial/drone roofscape (hero), membrane seam close-up (Knowledge), storm sky over industrial building (Situations), inspection equipment (Tools), skyline (Data & Research), roof assembly detail (encyclopedia headers).
3. **Duplicate titles across homepage columns** (Repair or Replace appears in both Recently Updated and Editor's Picks — with 11 sample pages, overlap is unavoidable; resolves itself as content lands, or dedupe logic can be added).
4. **Prev/next is alphabetical**, not a curated reading order. Fine for now; a `sequence` frontmatter field is the upgrade path.
5. **TOC has no scroll-spy** (current-section highlight) and reading times on sample stubs show "1 min" — accurate but only meaningful once real articles land.
6. **Dropdowns are desktop-only** (hover/keyboard). Mobile shows pillar links only — acceptable, but a tap-to-expand accordion would be richer.
7. Still open from V1: contact form delivery, real partner names on Funding & Relationships, legal review of Privacy/Terms, PNG/apple-touch favicons, CI/CD pipeline.
8. The OG image is programmatically drawn — serviceable, but worth a designed replacement.

## 8. Recommendations before Version 2

1. **Content sprint is the bottleneck, not design.** 20–30 cornerstone articles across the six pillars; everything on the site is ready to receive them (drop Markdown files, flip `status: published`).
2. Set up **GitHub + host with CI** now, so every future change gets a preview URL for founder review and search reindexes automatically.
3. License photography per the shot list above; slot into the hero and pillar headers (image treatments already have homes in the design system).
4. Validate benchmarks v1.0 and lift the estimator's confidence cap.
5. V2 candidates, in value order: scroll-spy TOC + curated reading paths → second decision tool (maintenance budget planner) → topic hub pages ("Trending topics" becomes real once analytics exist) → tap-to-expand mobile nav → newsletter/"industry updates" module if a publishing cadence is committed.

---

*Self-critique standard applied: every claim above was verified against the built output or a live browser test in this pass — nothing is reported "done" on the basis of compiling alone.*
