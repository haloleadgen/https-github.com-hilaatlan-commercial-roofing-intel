# Changelog — Commercial Roofing Intel

Newest first. Dates are the founder's local dates.

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
