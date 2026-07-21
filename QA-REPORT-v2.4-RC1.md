# QA Report — v2.4-RC1

July 21, 2026 · Deploy artifact: **`website/dist-v2.4-RC1.zip`**
Supersedes v2.1-RC2 and the unreleased v2.3-RC1. Prior zips belong in
`website/releases/superseded/`.

## Verification (this build)

Clean rebuild from `rm -rf dist .astro`: `npm run build` exit 0 · `npm run verify`
**PASS** — 60 pages checked, **48 indexable** (was 24), one h1 each, full metadata
coverage, zero broken internal links, all JSON-LD valid, sitemap = indexable set
exactly, zero placeholder text on indexable pages, all 47 OG cards present, zero
missing alt attributes, zero `http://` URLs, robots.txt correct.

## What changed (see CHANGELOG 2026-07-21 for the full record)

**The editorial publication session.** 21 drafts verified and published (7 knowledge
articles, 6 comparisons, 8 glossary terms); 2 situations drafts promoted to
`technical-review` with full sourcing (IBHS, NWS, III, NAIC) and national-only
language. Every citation fetched and read before being added; claims that could not
be sourced were softened, attributed as trade guidance, or deleted. Five sources
independently re-fetched at session end as an adversarial spot-check — all real.

**Integrity corrections:** a fabricated-attribution in white-roof-vs-black-roof's
inherited source note (claims attributed to an LBNL PDF that contains neither) was
caught and corrected; a leftover "Draft note" on the published EPDM page removed;
the warranties article's ponding-exclusion claim corrected against actual specimen
warranty documents.

**Build integrity:** `sharp` added to devDependencies — `generate-og.mjs` imports it,
but it was never declared, so any fresh environment (including Netlify building from
git) would have failed the build.

## Verified missing / flagged — founder decisions required

1. All of KNOWN_ISSUES #1: counsel review (privacy, terms, funding wording), hosting/
   DNS cutover from the GoDaddy placeholder, CRI-domain email, partner agreement.
2. KNOWN_ISSUES #2: four Situations pages now await professional review (roofer ×3,
   commercial-claims professional ×1). Scheduling these reviews is the single biggest
   remaining *editorial* action.
3. Polsia parallel site decision (KNOWN_ISSUES #7) still open.

## Completion estimate

Engineering ~98% (unchanged; live-URL checks remain untestable before deploy).
**Product ~75%** — up from ~40–50%: the content surface is now at the site's own
launch bar and every published claim is cited. What remains is professional review,
counsel, and operations — none of it producible by this toolchain.
