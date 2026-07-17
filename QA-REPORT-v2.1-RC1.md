# QA Report — Launch-Readiness Sprint · v2.1-RC1

July 17, 2026 · Deploy artifact: **`website/dist-v2.1-RC1.zip`** (1.42 MB, 120 files)
⚠️ Do not deploy `dist-v2.0-PRODUCTION.zip` — it predates the RC2 citation work.

## What shipped this sprint

Per-page Open Graph cards for all 23 indexable pages (branded, typographic, generated
from each page's own title — see CHANGELOG for why no photography was added), plus a
permanent QA gate (`npm run verify`) that machine-checks every launch invariant that was
previously verified by hand. The gate already earned its keep: it caught an interrupted
build missing two OG cards before packaging.

## Verification results (this build, not assumed)

`npm run verify` → **PASS.** 60 pages, 24 indexable. Specifically: exactly one h1 per
page; canonical, meta description, OG and Twitter tags on all 60; zero duplicate titles;
zero broken internal links; all JSON-LD valid; sitemap contains exactly the 24 indexable
pages; zero placeholder text on any indexable page; all 23 referenced OG cards exist and
render correctly; zero images without alt; zero `http://` URLs; robots.txt correct.

Schema coverage: Organization + WebSite/SearchAction on all 60 · BreadcrumbList on 57
(absent only on home, 404, thanks — correct) · Article on 6 · Person on 5 · DefinedTerm
on 11 glossary entries. FAQPage was deliberately not added: no page currently contains
real FAQ content, and marking CTAs as FAQs is a rich-results penalty risk.

Responsiveness: mobile-first CSS, 21 media queries (26–62em), no fixed widths above
375px, tables in horizontal-scroll wrappers, reduced-motion and print styles present.
Prior session's 375px overflow test (11 key pages, zero overflow) still applies — no
layout CSS changed this sprint.

Trust: "Reviewed by Hila Atlan" appears only on published pages; both emergency pages
carry the visible "Technical review pending" chip; the assessment page names Victory
E&I and the referral fee on the page carrying the CTA; the funding page is noindexed
pending counsel; the "Every claim sourced" absolute is gone from the homepage.

## Remaining issues (none introduced this sprint)

Carried from KNOWN_ISSUES.md, still accurate: **(1)** only 3 articles published against
the site's own 20–30 rule — 23 drafts need citations, not writing; **(2)**
repair-or-replace has two uncited numeric thresholds (founder decision pending);
**(3)** both emergency pages await subject-matter technical review; **(4)** counsel
items — privacy, terms, funding wording, partner agreement; **(5)** Benchmarks v0.1
gates the estimator (correctly); **(6)** Astro 5.18.2 CVE accepted with documented
justification (static build, vulnerable patterns unused).

## Launch blockers (unchanged — none are engineering)

1. **Legal:** counsel review of Privacy, Terms, funding wording; partner agreement in writing.
2. **Editorial:** decide whether 3 published articles is a launch; technical review of emergency pages.
3. **Operational:** hosting account + DNS + SSL; CRI-domain email provisioned and tested; assessment workflow genuinely operational on day one.
4. **Same hour as deploy:** submit both forms for real, run Lighthouse on the live URL, verify the www→apex 301, submit sitemap to Search Console.

## Recommended improvements (impact-ranked, post-launch)

1. Publish ~10 drafts with real citations — clears the launch bar and un-noindexes the hubs automatically.
2. Real project photography per the ROUND-1-REVIEW shot list (site has zero photos, deliberately — nothing fabricated).
3. FAQPage schema once real FAQ sections exist.
4. Connect the git repo to Netlify CI (drag-and-drop deploys are error-prone; `netlify.toml` is ready) and run `npm run verify` in CI.
5. Benchmarks v1.0 validation → restore the estimator.
6. Privacy-respecting analytics + Search Console immediately post-launch.

## Estimated completion

**Engineering: ~98%.** Everything buildable, testable, and verifiable from this seat is
done and machine-checked; the remaining 2% (live-URL Lighthouse, form round-trips, 301)
is physically untestable before deploy. **Site as a product: ~40–50%**, bounded by
content — 3 of a target 20–30 articles published. The bottleneck is citation
verification, which no amount of engineering removes.
