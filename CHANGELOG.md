# Changelog — Commercial Roofing Intel

Newest first. Dates are the founder's local dates.

---

## 2026-07-21 (later) — v2.4-RC2: deployment-readiness session

RC1 frozen as baseline (git tag `v2.4-RC1-recovery` @ `e7b2a04`; zip SHA-256
verified identical on the Mac and in the build environment, contents diffed against
the verified `dist/` — zero differences). Full pre-flight QA run against the exact
artifact via local serve + Playwright + Lighthouse: 25 page checks clean on desktop
and 375px mobile, nav toggle verified, all nav links resolve, search works,
sitemap/canonical/noindex/OG cross-checks 48/48, robots/404/headers correct.

**Two accessibility defects fixed (the only source changes in RC2):**
- `.footer-legal` text was slate-500 on navy-900 — 2.95:1 contrast, a WCAG AA
  failure. Now slate-300 (9.93:1). One CSS declaration.
- The header search link had no accessible name below the mobile breakpoint (its
  visible label is `display: none` there and the SVG is `aria-hidden`). Added
  `aria-label="Search"`. Homepage Lighthouse accessibility 89 → 96.

Deferred (punch list): card-list touch-target size (WCAG 2.5.8) — CSS layout
change, not worth the risk in a frozen RC.

New docs: `DEPLOYMENT-RUNBOOK.md` (every deploy step, forms/email verification,
DNS cutover, live-URL QA), `PUNCH-LIST.md` (ranked Critical→Low),
`LAUNCH-READINESS-REPORT.md` (recommendation: **soft launch**, conditions inside).
Polsia parallel site verified still live — takedown documented as founder action.
Artifact: `website/dist-v2.4-RC2.zip`, SHA-256 `9c37cc92…`. Untestable before
deploy, unchanged: forms end-to-end, email delivery, live CWV, www→apex 301,
rich-result validation.

---

## 2026-07-21 — v2.4-RC1: the editorial publication session — 3 → 24 published pages

The launch bar ("20–30 real cornerstone articles") was the last content blocker Claude
could clear, and this session cleared the bulk of it. **21 drafts were verified and
published; 2 situations drafts were promoted to `technical-review`.** Every new citation
was fetched and read before being added; every `supports` note states what the source
supports *and its limits*. No citation was invented; claims that could not be sourced
were softened, reframed as trade guidance with a named origin, or deleted.

**Published this session (21):**
- Knowledge (7): bur-roofing-systems · metal-roofing-systems ·
  modified-bitumen-roofing-systems · pvc-roofing-systems · roof-coatings ·
  commercial-roof-inspections · commercial-roof-warranties
- Compare (6): 45-mil-vs-60-mil · adhered-vs-mechanically-attached ·
  coating-vs-replacement · modbit-vs-bur · tpo-vs-pvc · white-roof-vs-black-roof
- Glossary (8): flashing · fully-adhered · mechanically-attached · mil-thickness ·
  parapet · scrim · square · wind-uplift

**Promoted to `technical-review` (2):** situations/hurricane-preparation ·
situations/insurance-claims — fully sourced (IBHS, NWS, III, NAIC), Florida-specific
legal claims replaced with national language, adversarial/outcome-claim wording removed.
Both await review by qualified professionals, and say so on the page.

**Integrity corrections en route:**
- `white-roof-vs-black-roof` — the draft's sole source attributed a 236-city model and
  a 2001 Austin field study to an LBNL/ENERGY STAR PDF that contains neither. Rewritten
  to what the document actually says; correction disclosed in the `supports` field.
- `epdm-roofing-systems` (published) carried a leftover "*Draft note*" in its cost
  section — replaced with an honest no-validated-dataset statement.
- `commercial-roof-warranties` — "ponding is the most consequential standard exclusion"
  corrected: neither specimen warranty names it as an exclusion; reframed per the
  actual documents.
- Every "## Sources — none yet" placeholder section deleted from the published set.

**Build fix:** `sharp` was imported by `scripts/generate-og.mjs` but missing from
`package.json` — the build only worked where sharp happened to be installed globally.
Added to devDependencies (lockfile updated). Without this, a Netlify build from git
would have failed.

**Result:** clean rebuild from `rm -rf dist .astro` → exit 0, 60 pages, **48 indexable**
(was 24), 47 OG cards, `npm run verify` **PASS**. The hubs un-noindexed automatically —
the status machinery worked exactly as designed. Homepage hero claim "Every published
page lists its sources" verified true: minimum source count across all 24 published
pages is 1.

**Citation sourcing notes:** ASTM store pages became robots-blocked mid-session, so some
ASTM designations are supported through verified secondary descriptions (Professional
Roofing, Carlisle's standards summary) rather than direct store URLs. Five sources were
independently re-fetched at the end of the session as an adversarial spot-check
(ARMA PDF, DOE, III, IIBEC, RCMA) — all real, all supporting the attached claims.

---

## 2026-07-18 — Verified ASTM citations, batch 2 (BUR + metal drafts)

Same pattern and guardrails as the entry below: source-only, both pages stay `draft`
(noindexed, out of the sitemap), no publish. Each standard read against its current ASTM
catalogue entry; every `supports` note scoped to material/system facts, never service life.

- **`knowledge/bur-roofing-systems`** — added **ASTM D312/D312M-16a(2023)** (the roofing
  asphalt) and **ASTM D2178/D2178M-15a(2021)** (the asphalt glass ply felt). The pair maps
  onto BUR's "alternating bitumen and felt" construction; D2178 is specified for use with
  D312 in built-up roofs. NRCA, ARMA, and field service-life studies remain outstanding.
- **`knowledge/metal-roofing-systems`** — added **ASTM E1514-98(2023)e1** (structural
  standing seam steel panel systems, incl. the concealed-clip definition) and **ASTM
  A792/A792M-25a** (the Galvalume substrate). MCA/MBMA guides, ASTM E1592/E2140, UL 2218,
  FM approvals, and PVDF paint-warranty terms remain outstanding; the 30–45 yr ranges stay
  editorial synthesis.

Verified: clean rebuild (exit 0, 0 warnings, 60 pages) · `npm run verify` PASS (24
indexable, unchanged) · both pages noindex and absent from the sitemap · one Sources
heading each · all four URLs resolve to live ASTM catalogue entries.

Running total across both 2026-07-18 batches: **8 verified ASTM primary citations across 5
membrane drafts** (PVC, modified-bitumen, roof-coatings, BUR, metal). All still `draft` —
the publish decision remains the founder's, and each page still needs its remaining
non-ASTM sources (NRCA especially) before it is publishable.

---

## 2026-07-18 — Verified ASTM citations added to three membrane drafts

Source-only change to three **draft** (noindexed) knowledge articles. No `status` flipped,
no page published, nothing added to the sitemap — the founder's publish decision is left
untouched (PROJECT_RULES #3, #8). Attacks the documented #1 bottleneck — *citation
verification, not writing* (KNOWN_ISSUES #1) — by converting standards the drafts had
listed as "to obtain" into verified primary sources.

Each ASTM standard was read against its **current official ASTM catalogue entry** before
citing (PROJECT_RULES #2; the `sources.ts` rule "checked against their current official
catalogue description"). Every `supports` note is scoped to what a *material specification*
actually proves — none is allowed to stand behind a service-life figure, which these
standards explicitly exclude.

- **`knowledge/pvc-roofing-systems`** — added **ASTM D4434/D4434M-21** as the primary
  citation. The Carlisle manufacturer summary is retained, now scoped to only the
  Type II/III/IV reinforcement enumeration it actually supports. "Verification still
  outstanding" updated: D4434 verified; NRCA *Roofing Manual*, SPRI bulletins, and
  plasticizer-aging/field research still outstanding.
- **`knowledge/modified-bitumen-roofing-systems`** — added **ASTM D6164/D6164M-26** (SBS)
  and **ASTM D6222/D6222M-16, reapproved 2023** (APP). Body "Sources — none yet" converted
  to "Verification still outstanding" (NRCA, ARMA, NFPA 241 / hot-work, and field-service
  data for the 15–25 yr range remain).
- **`knowledge/roof-coatings`** — added **ASTM D6083/D6083M-24** (acrylic). Note records
  that a silicone/urethane material standard, RCMA bulletins, CRRC reflectivity data, and
  IRS maintenance-vs-capital guidance remain outstanding, and that the ponding/adhesion/
  mil-thickness/cost statements are still editorial synthesis.

Verified: clean rebuild after clearing the content-layer cache (exit 0, **0 warnings**, 60
pages) · `npm run verify` **PASS** (24 indexable, unchanged) · all three pages remain
`noindex` and absent from the sitemap · exactly one Sources heading per page (no duplicate
from the auto-rendered `Sources` component) · every citation URL resolves to a live ASTM
catalogue entry. `dist/` not committed with this change — it is a draft-only, non-shipping
edit; rebuild before any deploy per PROJECT_RULES #4. Left for the founder: whether/when to
promote these drafts (still short of publishable — each needs its remaining sources first).

---

## 2026-07-17 (v2.3-RC1) — Situations page V1

`dist-v2.3-RC1.zip` · 1.43 MB · 120 files · build exit 0 · 60 pages, 24 indexable ·
`npm run verify` PASS. Supersedes v2.2-RC1. Situations hub only — no other page touched.

- **Unfinished work removed from public view.** The hub rendered every entry grouped by
  status, so the site's highest-intent page showed "Templates — not yet written" and
  "Source verification in progress" headings to visitors. Now only reader-ready work
  (published / technical-review) renders; the two drafts are named under "In verification
  now" with one-line notes and **no links**, and three planned guides are listed as titles
  only. Nothing routes a reader into unverified emergency or insurance guidance.
- **Introduction strengthened** — three paragraphs establishing why the pillar is
  organized by decision moment rather than by roofing system, what shape each guide
  follows, and how to read the publication status.
- **Grouped by urgency** (Happening right now / The days that follow / Deciding ahead of
  time), each with an explanatory blurb. Empty groups are omitted rather than shown as
  empty shells.
- **Cards expanded** from a bare title + urgency label to: status badge, full editorial
  description, the guide's own top two takeaways, live source count, and updated date —
  all pulled from the entry's frontmatter, so a card can never drift from its page.
- **"When a situation needs professional eyes"** — new educational section: five specific
  conditions under which reading stops being enough, framed as documentation rather than
  commitment, followed by the assessment CTA carrying the approved Victory E&I disclosure
  verbatim (common ownership named, referral-fee funding model stated, Funding &
  Relationships linked, "CRI performs no roofing work" stated).
- **"Where to go next"** — new cross-pillar section linking Knowledge, Glossary, For Your
  Role, Tools, and Data & Research. Every content link is filtered through `isPromotable`
  at render, so an unfinished target cannot be linked even if added later.

Verified: 26 distinct links on the hub, all resolving to real pages · zero links to the
two drafts whose titles appear · disclosure intact · rendered and checked on staging.

---

## 2026-07-17 (v2.2-RC1) — Homepage completion + Knowledge page V1

`dist-v2.2-RC1.zip` · 1.42 MB · 120 files · build exit 0 · 60 pages, 24 indexable ·
`npm run verify` PASS. Supersedes v2.1-RC2. Material website change (homepage +
Knowledge hub), hence a new RC per the RC rule.

**Homepage (founder-directed completion sprint).**
- Hero: sharper positioning (who it serves, why it is different), three action paths
  (situations / repair-or-replace / assessment), and the assessment CTA carries the
  Victory E&I common-ownership disclosure at the point of offer, in the assessment
  page's own wording.
- New "Featured guidance" section: five cards — every one a real published or
  technical-review page (repair-or-replace, both emergency situation guides, TPO, EPDM).
  Nothing preliminary, draft, or template is featured; all cards pass isPromotable.
- New "In verification now" strip: names forthcoming work (titles only, deliberately
  unlinked) so depth is communicated without routing readers into unverified pages.
- New "For your role" section: ten role cards (owners, PMs, HOA/condo boards, facility
  managers, asset managers, CRE professionals, developers, architects/engineers,
  insurance professionals, financial decision makers) — each with the seat's core
  problem, a characteristic question, and links ONLY to published/technical-review
  work or hubs. Role hub pages remain templates and are not linked; the section says so.
- "What's moving" band: replaced the duplicate editor's-picks column with a plain-prose
  explanation of the publication-status framework.
- New closing assessment section with full disclosure block (Victory E&I named, common
  ownership stated, referral-fee funding model stated, links to Funding & Relationships).

**Knowledge page (founder-directed V1 pass).**
- Draft and template entries no longer render on the public page — reader-ready work
  only (published/technical-review). They remain in the repo and reappear automatically
  when their status earns it. StatusGroupedList untouched (other hubs out of scope).
- New introduction defining the library's purpose; grouped by content type (System
  encyclopedia / Decision guides / Comparisons) with status label + updated date per
  entry; groups with nothing reader-ready are omitted rather than shown empty.
- No filter UI existed to simplify; finding is delegated to /search/ (linked in intro).

**Explicitly NOT done:** no new articles were written. Creating "publishable" content
to fill homepage cards would require citations that have not been verified — the exact
thing this site's governance forbids. The content gap to V1 remains editorial
(KNOWN_ISSUES #1) and is stated honestly on the page instead of papered over.

---

## 2026-07-17 (v2.1-RC2) — Author entity consistency + release hygiene

`dist-v2.1-RC2.zip` · 1.42 MB · 120 files · build exit 0 · 60 pages, 24 indexable ·
`npm run verify` PASS. Supersedes RC1 (same day).

**Trust improvement — one editor, one entity (was improvement #7).** Every editorial
claim on the site now resolves to the same publicly described person:
- `/about/` emits Person JSON-LD for Hila Atlan (name, jobTitle, description, worksFor)
  built only from facts already visible on the page; the "Who is behind CRI" section
  now has a stable anchor (`#who-is-behind-cri`).
- Article schema `editor` and Organization `founder` reference that same entity with
  the same URL, splitting name and jobTitle properly instead of one text blob.
- The visible "Editorial review" fact in every article's Key Facts panel now links to
  the About bio — the claim is one click from the person making it.
- Root cause fixed: the content schema defaulted `reviewed` to a plain string, which
  collapsed the entity to text on every collection page. `reviewed` is now optional
  and means "a different reviewer"; the default editor is attributed by the layouts.
  No credential is claimed anywhere — Hila's described role remains editorial only.

**Release hygiene (QA fix).** All 15 superseded build zips moved to
`website/releases/superseded/` with a DO-NOT-DEPLOY README. The misleadingly named
`dist-v2.0-PRODUCTION.zip` (predates the RC2 citation work) is quarantined there.
Exactly one deployable artifact now sits at `website/` root.

**Verified absent, third session in a row: the Gemini research library.** Searched
this machine, the connected Google Drive (Victory E&I marketing content only), Notion,
and Gmail. It does not exist anywhere reachable. Nothing was invented in its place.

**⚠️ Flagged for founder decision (not integrated, not changed):** Gmail shows a
parallel auto-built site at `commercial-roofing-intel-llc.polsia.app` (July 14–15)
describing CRI as a company that "provides commercial roofing services to businesses
across South Florida." That contradicts the educational-platform mission, blurs the
Victory E&I editorial firewall, and violates the one-production-codebase rule. It
should be shut down or clearly separated before launch; live, it is a reputational
and SEO liability (duplicate brand, contradictory positioning).

**Remaining production pages:** every incomplete page requires editorial content
(citations or subject-matter review), which cannot be manufactured. None were
"completed" by invention. See KNOWN_ISSUES #1–#3.

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
