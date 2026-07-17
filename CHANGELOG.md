# Changelog — Commercial Roofing Intel

Newest first. Dates are the founder's local dates.

---

## 2026-07-17 (v2.1-RC1) — Launch-readiness sprint: per-page OG cards + permanent QA gate

`dist-v2.1-RC1.zip` · 1.42 MB · 120 files · build exit 0 · 60 pages, 24 indexable.
Supersedes v1.9-RC2 **and** the stray `dist-v2.0-PRODUCTION.zip` (which predates RC2's
citation-architecture work and should not be deployed).

**Per-page Open Graph cards (was improvement #3 on the impact list).** Every indexable
page except the homepage now gets its own 1200×630 branded card — CRI navy, section
kicker, page title, tagline — generated post-build by `scripts/generate-og.mjs` from
each page's own `<title>`, so the card set can never drift from the page set (the script
fails the build on any mismatch). Homepage and noindexed pages keep `og-default.png`.
Also added `og:locale` and made `og:image:alt` page-specific. Typographic cards only —
no imagery was invented.

**Permanent QA gate.** The acceptance checks previously run by hand each session are now
`scripts/verify-launch.mjs` (`npm run verify`): 1 h1 per page · canonical/description/
OG/Twitter on every page · no duplicate titles · every internal link resolves · all
JSON-LD parses · sitemap = indexable set exactly · no placeholder text on any indexable
page · every referenced og:image exists · no img without alt · no `http://` URLs ·
robots.txt correct. It caught one real error during this sprint (an interrupted build
missing two OG cards), which is the point of its existence.

**Deliberately NOT done, with reasons:**
- **FAQPage schema** — audited every indexable page: the "?" headings are CTAs
  ("Want eyes on your actual roof?"), not Q&A content. FAQPage markup on non-FAQ
  content is schema spam and a rich-results penalty risk. Add it when a page has a
  real FAQ section.
- **Roofing photography** — the site still has zero photographs, deliberately. Stock
  or AI-generated "project" imagery on an evidence-first, contractor-affiliated site
  would manufacture the appearance of first-hand experience. Real, owned photography
  per the shot list in ROUND-1-REVIEW.md remains the path.
- **Draft/placeholder content** — all 13 pages containing placeholder text remain
  noindexed drafts/templates with visible status banners. Nothing was invented to
  fill them; that is editorial work (see KNOWN_ISSUES #1).

**Verified this build:** `npm run verify` PASS · 24 = 24 sitemap/indexable agreement ·
0 broken internal links · 0 placeholder text on indexable pages · all 23 OG cards
render correctly (visually spot-checked) · responsive: 21 media queries, mobile-first,
no fixed widths >375px, tables in overflow wrappers · trust: "Reviewed by" only on
published pages, situations pages carry the "Technical review pending" chip, assessment
page discloses Victory E&I + referral fee, funding page noindexed pending counsel.

**Build note:** `sharp` added to devDependencies (OG rendering). Node lockfile updated
accordingly; build remains `npm ci && npm run build`, Netlify config unchanged.

---

## 2026-07-16 (v1.9-RC2) — Citation architecture applied to the draft library

`dist-v1.9-RC2.zip` · 679 KB · 162 files · build exit 0, **0 errors, 0 warnings**, 60 pages.
Supersedes RC1.

⚠️ **The Gemini research library does not exist.** It is not on this machine and not in the
connected Google Drive (which holds Victory E&I marketing content only). Nothing was
invented in its place. This is the second referenced research artifact that has not
materialised — the "Claude Chrome" emergency copy was the first.

**Migrated (4 drafts that already named real documents):** white-roof-vs-black-roof
(LBNL via ENERGY STAR), pvc-roofing-systems (ASTM D4434 via a Carlisle summary),
hurricane-preparation and insurance-claims (Florida SB 4-D via Thornton Tomasetti /
Intertek). Each entry records its limitation — that two are third-party summaries rather
than the standard or statute itself, and that all were carried over rather than
independently re-verified, per the directive.

**Trap defused (11 drafts):** sections reading *"Draft — verification list: NRCA manual,
ASTM D312…"* sat under a `## Sources` heading. Those are documents CRI *intends to obtain*,
and counting planned sources is forbidden — but the heading meant a reviewer, or anyone
flipping `status` to published, would ship a shopping list as a bibliography. The heading is
now **"Sources — none yet"** and the section states the page has no citations and that
nothing listed supports any statement on it.

Coverage: **9 of 35** files. All 15 touched drafts remain `draft` — their sources are not
finished, which is what `draft` means. Counts stay suppressed on them.

**Verified:** acceptance test passes on every page rendering a count · sitemap 24 =
indexable 24, zero disagreement · 3,577 internal links, 0 broken · 0 h1/heading/alt
violations · zero unpublished pages carry an evidence chip, editorial-review claim, or
search entry.

---

## 2026-07-16 (v1.9-RC1) — Editorial remediation implemented

**Release candidate. Not production.** `dist-v1.9-RC1.zip` · 677 KB · 162 files ·
Node v22.23.1 · `npm ci && npm run build` → exit 0, **0 errors, 0 warnings**, 60 pages.

### Editorial status framework
Replaced `sample|draft|published` with `template | draft | technical-review |
preliminary | published` (`src/data/status.ts`). One module decides, per status: the
reader-facing label, indexability, whether a source count may be shown, and whether the
page may name an editorial reviewer. It **separates editorial review from technical
review** — Hila is not a roofing technical expert, and `technical-review` lets
editorially finished work publish honestly while disclosing that gap.

### Citations are now structural, not typed
The `sources` integer is gone. It is a structured array: the visible list renders from
it and the count derives from it, so they cannot disagree. `title` and `publisher` are
required, enforcing "a named document, not a generic organisation".
**Acceptance test passes** — every visible count equals its visible entries (5/5).

**Two cited URLs were dead.** Checked every citation over HTTP rather than trusting it:
- TPO's NRCA ponding link (a third-party rehost) **404s**. No verifiable named NRCA
  document could replace it, so it was removed. **TPO is 2, not the 3 expected** —
  reported rather than padded.
- EPDM's `roofingcontractor.com` link would not resolve; replaced with ERA's own primary
  page for the same survey (verified 200). EPDM remains 3.
- Repair or Replace: NRCA Reroofing and Code Compliance verified 200. Remains 1.

### Emergency pages replaced
Both were literal `Placeholder:` stubs. Rewritten to the 14-section structure, sourced to
**Ready.gov Floods** and **OSHA 3755** (both verified, and Ready.gov's exact wording
fetched and checked). Marked `technical-review`, not `published`.

- **Safety:** no version of "puncture the ceiling from below" appears. Required wording
  present on both pages. The technique is not described at all.
- **Electrical:** power off only when safe from a dry location; never touch wet equipment;
  never cross standing water to a breaker.
- **Roof access:** never access a wet or storm-damaged roof. "No photograph is worth a fall."
- **Insurance:** every absolute removed; nothing promises reimbursement.
- **AOB:** national language only. No Florida claim published — the Florida DFS source
  could not be reached to verify it.
- ⚠️ **The directive stated Ready.gov advises photographing damage. That is not on the
  Floods page, so it is NOT attributed to Ready.gov.**
- ⚠️ **The "editorial copy supplied by Claude Chrome" does not exist on this machine and
  was never supplied.** This copy was written here, from verified sources only.

### Estimator and dataset gated
The estimator's form, result panel and **entire calculation script are removed**, not
hidden — it ran on placeholder modifiers from a dataset marked "not for citation". It now
reads "In development — not yet validated" and points to Repair or Replace. Its
methodology stays published, reframed as a proposal to be audited. Its hardcoded
`sources={12}` (citing nothing) is gone.
The dataset offered a **formatted suggested citation for data it says is not citable**;
that block now renders only for `published` datasets.

### Hubs and homepage
New `StatusGroupedList`: every hub lists its complete pillar grouped by honest status.
Sitemap and page-head noindex agree exactly (**24 = 24**). Homepage features only
published work; EPDM uses the safer heading (not "The 50-Year Track Record") because our
own sourced range is 20–30 years; the estimator was removed from the nav dropdown, which
was advertising a tool that produces nothing.

### Claims removed from rendered output
`"Evidence-based"` → **0 pages** (was the tagline on all 60, a homepage trust-band heading
claiming "published methodology for every number", and a template titled *"Evidence-Based
Comparison"* citing nothing). `"Every claim sourced"` → **0 pages**. Unenforceable
two-business-day SLAs removed. Legal-review warnings **kept** but rewritten for readers.
Funding & Relationships **noindexed** pending founder + counsel sign-off; the proposed
"Items pending final confirmation" paragraph was **not** added.

### Verified
3,577 internal links / **0 broken** · 60/60 canonical, title, description · exactly 1 h1
per page · 0 heading-order violations · 0 images missing alt · no mobile overflow at 375px
across 11 key pages · `/sitemap-index.xml` returns **200** (the audit's 404 predated the
build being fixed) · schema now carries `creativeWorkStatus` and real `citation` entries.

### Not verified
Real-world Core Web Vitals · forms end-to-end (Netlify-dependent) · screen-reader/AT pass.

---

## 2026-07-16 (later) — Build environment + ship-a-trustworthy-V1 session

**Status: HOLD LAUNCH — for editorial/legal reasons, not engineering.** Every
engineering blocker from the earlier review is cleared. Package:
`website/dist-v2.0-PRODUCTION.zip` (646 KB, 160 files).

### Build environment — the blocker is gone
- Installed **Node v22.23.1 LTS** to `~/.local/node` (matches `netlify.toml`
  `NODE_VERSION=22`), checksum-verified against the official nodejs.org SHASUMS256.
  Chose 22 over the newer v24 LTS deliberately: building on a different major than
  Netlify runs would make local verification meaningless.
- `npm install && npm run build` → **exit 0, zero warnings, zero errors, 60 pages.**
  Verified reproducible from a clean `rm -rf dist .astro`.

### The build was broken outright — fixed
`astro.config.mjs` used `new URL('./src/content', import.meta.url).pathname`, which
returns a **URL-encoded** path. The project folder is "Commercial Roofing Intel", so
the spaces arrived as `%20` and every `readdirSync` in the noindex/sitemap logic died
with ENOENT. Switched to `fileURLToPath`. This is very likely why the site had never
been rebuilt locally.

### Trust — claims now appear only where earned
- **"Evidence-based" badge and "Reviewed by Hila Atlan, Editor-in-Chief" rendered
  unconditionally.** 34 of the 37 pages carrying them were unpublished sample/draft
  content — placeholder pages asserted an editorial review that never happened. Both
  are now gated on `status === 'published'`; others show a neutral status chip.
  **Evidence badge: 37 pages → 3.**
- The estimator hardcoded `sources={12}` while listing **zero** external citations and
  stating on the same page that its modifiers are pre-validation placeholders. Removed.
- Removed a public internal note from the **contact page** ("active once deployed to
  Netlify; see GO-LIVE checklist" — naming an internal document).
- Removed a public **"Pre-launch note"** from the assessment lead-gen page.
- Zero staging/internal language remains on any indexable page.

### Search was bypassing every filter
Pagefind indexed **44 pages while 3 were published**. Searching "TPO" returned 9
results, mostly draft/sample pages behind a "Sample content" banner. `data-pagefind-body`
is now gated on publish status. **Index: 44 (34 unpublished) → 10 (0 unpublished).**
Verified in-browser: "TPO" now returns 2 published articles.

### Homepage — stopped promoting placeholders
- Stats band counted **all** content regardless of status: it advertised "9 Encyclopedia
  articles" and "11 Glossary terms" when a reader could open **2** and **0**. Now counts
  published only, drops zero rows, singularises labels ("1 Decision guide").
- "Recently updated" and "Editor's picks" surfaced sample pages — now filtered.
- Removed the "Featured comparison + newest tool" section (both halves unpublished; it
  also reprinted the sample dataset's numbers on the homepage) and the situations strip
  (both emergency pages are `Placeholder:` stubs).
- Nav dropdowns filter through the new `src/data/published.ts`. **Site nav links to zero
  unpublished pages (was 6).**

### Thin-hub guard
Five of six pillar hubs were indexable with **zero** indexable children (`/glossary/`
listed 11 terms, all noindexed). Hubs now noindex themselves while empty, and
`astro.config.mjs` drops them from the sitemap to match. Both reverse automatically on
publish. **Sitemap: 23 → 18 URLs = exactly the 18 indexable pages.**

### Date bug (found via browser verification)
`new Date('2026-07-01')` parses as **UTC midnight**, so in EDT every date rendered a day
early — `<time datetime="2026-07-01">` displayed **"June 30, 2026"**. Output also varied
with the build machine's timezone (Netlify=UTC correct, local=wrong), making builds
non-reproducible. Added `src/data/dates.ts` parsing local calendar dates. Also fixed the
dataset **citation year**, which returned the previous year for Jan-1 dates.

### Accessibility
4 hub pages jumped **h1 → h3** (WCAG 1.3.1); fixed with visually-hidden `h2`s — no visual
change. Now **zero heading-order violations across 60 pages**. Verified: 1 `h1` per page,
0 images missing alt, 0 unlabeled inputs, skip link + landmarks, mobile menu
`aria-expanded`/`aria-controls` working, no horizontal overflow at 375px, no console errors.

### Measured (previously unverifiable)
**3,458 internal links, 0 broken** · 1.8 MB dist · 24 KB CSS · **no JS bundle** · no image
>100 KB · **zero third-party requests** · CLS 0. FCP/LCP ≈124 ms — **localhost, not field
data**; real CWV still needs measuring post-deploy.

### Security — justified non-action
`npm audit`: 1 high + 1 low, all in `astro<=7` plus a dev-only esbuild issue. **Not
reachable here**: static build, no SSR adapter, and zero `define:vars` / server islands /
dynamic slot names / spread props. 5.18.2 is already the newest 5.x; the only fix is
astro@7 (two majors) days before launch. Staying on 5.18.2 deliberately; revisit
post-launch on a branch.

### Still blocking (see KNOWN_ISSUES.md)
Only **3 articles published** against a 20–30 bar · `repair-or-replace` has two uncited
numeric thresholds (your call) · emergency pages are `Placeholder:` stubs needing a
**qualified author — deliberately not written by AI** · "Every claim sourced" on the
homepage is an editorial claim left to you · counsel sign-off on funding/privacy/terms ·
hosting/DNS · the assessment offer must be operational on day one.

---

## 2026-07-16 — Pre-launch engineering review

**Status after this session: NOT launch-ready.** One hard technical blocker (rebuild
required), one content decision outstanding, four founder/counsel items.

### Fixed — content integrity

All three published, indexable pages were displaying a **false citation count** next
to an "Evidence-based" badge. `sources:` is a hand-typed frontmatter integer with no
link to the citations actually in the article, and nothing validated it.

| Page | Was | Now | Actual citations |
| --- | --- | --- | --- |
| `knowledge/epdm-roofing-systems.md` | `sources: 0` → rendered "**0** sources cited" | `sources: 3` | 3 (ASTM D4637, ERA survey, NRCA) |
| `knowledge/tpo-roofing-systems.md` | `sources: 8` | `sources: 3` | 3 (ASTM D6878, NRCA, trade summary) |
| `knowledge/guides/repair-or-replace.md` | `sources: 6` | `sources: 1` | 1 (NRCA reroofing/code) |

Removed the `sources:` field entirely from four **sample** pages that declared
12 / 9 / 4 / 5 against **zero** actual citations — a trap that would have shipped
"12 sources cited" the moment `status` was flipped to `published`
(`datasets/commercial-roof-life-expectancy-benchmarks.md`,
`knowledge/compare/tpo-vs-epdm.md`, `situations/my-roof-is-leaking.md`,
`situations/storm-damage-first-72-hours.md`).

No citation was invented. Counts were lowered to the verified truth — see DECISIONS.md D10.

### Fixed — components

- `components/TrustMeta.astro` — the badge now renders only when `sources > 0`
  (previously `sources: 0` rendered the self-refuting "0 sources cited"), and
  singularises correctly ("1 source cited").
- `layouts/ArticleLayout.astro` — same guard on the sidebar "Sources cited" fact.

⚠️ **All of the above is unverified.** No Node toolchain exists on this machine, so
nothing was compiled or rendered. `dist/` still contains the old, false badges.

### Added — version control

The project was **previously unversioned**. Initialised a git repository with a
baseline commit capturing the pre-review state of all 340 files, so this session's
changes are reviewable and revertable. `website/dist/` is tracked deliberately
(DECISIONS.md D8); superseded `dist-v1.*.zip` archives are ignored.

### Added — documentation

`MASTER_INDEX.md` (entry point) · `KNOWN_ISSUES.md` · `CONTENT_INVENTORY.md` ·
`LAUNCH_CHECKLIST.md` · `PROJECT_RULES.md` · `INFRASTRUCTURE.md` ·
`SEO_CHECKLIST.md` · `DECISIONS.md` · `CHANGELOG.md`

### Found — not fixed

- 🔴 **`dist/` cannot be rebuilt here** (no Node/npm/brew). It is now out of sync with
  source and **must not be deployed**. KNOWN_ISSUES #1.
- 🔴 **`repair-or-replace` publishes two uncited numeric thresholds** (25–30% cost,
  25% saturation). Founder decision — source them or demote to `draft`. KNOWN_ISSUES #3.
- 🟠 **Five of six pillar hubs are indexable with zero indexable children** — thin
  content at launch. KNOWN_ISSUES #4.
- 🟡 **`GO-LIVE.md` contradicts itself on the production email** (`victoryroofer.com`
  vs `victoryeniroofing.com`). The **code is correct**; the doc is wrong. KNOWN_ISSUES #6.
- 🟡 Funding & Relationships still carries a "founder confirmation required" flag;
  privacy + terms still flagged for legal review. KNOWN_ISSUES #5.
- 🟡 13 overlapping root-level docs, several superseded. KNOWN_ISSUES #7.

### Verified as sound (no change needed)

Contact details consistent site-wide (`hila@victoryroofer.com` ×184,
`(954) 634-2028` ×62, single-sourced from `src/data/site.ts`) · security headers in
both `netlify.toml` and `dist/_headers` · www→apex 301 · robots.txt · sitemap = exactly
the 23 indexable URLs · 37/60 pages correctly noindexed · canonical, meta description,
OG, Twitter cards **60/60** · exactly one `h1` per page · **zero** images missing alt ·
Organization / WebSite / BreadcrumbList / Article / DefinedTerm schema present.

### Not verified — no toolchain

Core Web Vitals · Lighthouse · accessibility audit (axe/screen reader) · forms
end-to-end (Netlify-dependent) · Pagefind search · broken-link sweep.
**No performance or accessibility score is claimed.**

---

## 2026-07-15 — v1.8 PRODUCTION build *(from prior docs)*
60 pages. Canonical corrected to apex. Mobile overflow fixed sitewide. Contact
details verified and routed sitewide. Forms browser-tested. 3,807 internal links,
0 broken (per `DEPLOYMENT-REPORT.md` — not re-verified).

## 2026-07-15 and earlier — v1.1 → v1.7 *(from prior docs)*
Iterative launch candidates. See `VERSION-1-REPORT.md`, `ROUND-1-REVIEW.md`,
`DEPLOYMENT-REPORT.md`, `VERIFICATION-LOG.md`. Note these predate this review and
are superseded where they conflict with `KNOWN_ISSUES.md` — see `MASTER_INDEX.md`.
