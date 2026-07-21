# Launch Readiness Report — CommercialRoofingIntel.com

July 21, 2026 · Artifact: `website/dist-v2.4-RC2.zip` (SHA-256 `9c37cc92…3dfd`… see
DEPLOYMENT-RUNBOOK.md) · Recovery point: git tag `v2.4-RC1-recovery` @ `e7b2a04`

## Completed

- **Content bar met and frozen.** 24 published pages, every one with fetched-and-
  verified sources; 4 sourced pages in honest technical-review; RC1 frozen as
  baseline with a git recovery tag.
- **Artifact verified.** Zip contents byte-identical to the verified build; SHA-256
  matches on the Mac and the build environment; `npm run verify` PASS (60 pages,
  48 indexable, zero broken links, zero placeholder text on indexable pages).
- **Full pre-flight QA on the exact artifact.** 25 browser page-checks clean on
  desktop and 375px mobile (zero console errors, zero overflow, one h1 each); nav
  toggle accessible and working; all nav/footer links resolve; search returns
  results; sitemap/canonical/noindex/OG cross-checks 48/48; robots.txt and 404
  page correct; security headers present in both `netlify.toml` and `_headers`.
- **Two accessibility defects found and fixed** (footer contrast, unnamed search
  link) → RC2. Lighthouse (localhost lab): homepage 100 perf / 96 a11y / 100
  best-practices / 100 SEO; article 100/100.
- **Deployment fully documented** — DEPLOYMENT-RUNBOOK.md covers deploy (git-connect
  preferred, drop alternative), forms + email verification, DNS cutover, live-URL
  QA, and the Polsia takedown.

## Remaining blockers

Founder-side, in order: (1) Netlify access to execute the deploy; (2) same-hour
form + email verification; (3) Polsia site takedown before cutover; (4) counsel
review of Privacy/Terms/funding wording; (5) professional review of the four
Situations pages; (6) CRI-domain email provisioning.

## Risk assessment

- **Technical risk: low.** Static site, no request handling, zero third-party
  requests, headers hardened, clean QA on the exact artifact. The known Astro CVE
  requires SSR patterns this site does not use (verified).
- **Operational risk: moderate, concentrated in the forms.** The revenue path is
  untestable until deployed. Mitigation is procedural: the same-hour test in the
  runbook.
- **Legal risk: moderate and consciously carried.** Legal pages are honest drafts
  with visible notices; counsel review is scheduled work, not a technical gate.
- **Brand risk: real until Polsia is down.** Two public identities, one of them
  quote-driven, undermines the independence claim that the whole platform rests on.
- **Content risk: low.** Every published claim is cited or honestly framed; the
  four review-pending pages say so on the page.

## Recommendation: **SOFT LAUNCH**

Deploy RC2 to Netlify and cut DNS over — conditional on three same-day items:
Polsia takedown first, forms + email verified within the hour, and the founder
consciously accepting (or fast-tracking) the counsel-review gap that the pages
themselves disclose. Hold *promotion* (outreach, link-building, announcement)
until counsel signs off and at least the two emergency pages clear professional
review. An early, honest site is a fine thing to launch — this one no longer
pretends to be anything it isn't, and field data (real CWV, real form flow, real
search behavior) only starts accruing once it is live.

Full Launch criteria: counsel sign-off, professional reviews complete, CRI-domain
email live, Polsia gone. Hold would only be justified if the founder is unwilling
to soft-launch with draft-labeled legal pages.
