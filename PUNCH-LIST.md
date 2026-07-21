# Production Punch List — v2.4-RC2 pre-flight

July 21, 2026 · From full QA of the exact deploy artifact (local serve + Playwright
+ Lighthouse). Live-URL items are marked — they cannot be tested before DNS exists.

## Critical

1. **Polsia parallel site is still live** (`commercial-roofing-intel-llc.polsia.app`,
   verified July 21) presenting a "Get a Quote"/Services hybrid under the CRI name.
   Two public identities at launch is a trust defect. *Founder action: delete or
   rebrand before DNS cutover.*
2. **Assessment + contact forms and email notifications are unverified end-to-end**
   (Netlify-dependent; untestable pre-deploy). Both forms are correctly built
   (`data-netlify`, honeypot, named, `/thanks/` exists). *Test within the same hour
   as deploy — Runbook Step 2.*
3. **Repo exists only on this Mac.** No remote copy of the git history. *Push to a
   private GitHub repo (Runbook Step 1A) — this is also the preferred deploy path.*

## High

4. **Legal pages not counsel-reviewed** (Privacy, Terms; funding page noindexed).
   Honest draft notices are in place; the risk is legal, not technical. *Founder/
   counsel; can be accepted consciously for a soft launch.*
5. **Four Situations pages await professional review** (roofer ×3, claims pro ×1).
   Honest on-page; don't let it become permanent.

## Medium

6. **Touch-target size** on card list links (~16px tall; WCAG 2.5.8 wants 24px).
   Lighthouse `target-size` fails on the homepage. Fix is a CSS padding change —
   deferred to avoid layout risk in a frozen RC. Post-launch.
7. **No field performance data.** Localhost Lighthouse is 100/96/100/100 (homepage)
   and 100/100 (article), but nothing has been measured on a real network. *Run
   Lighthouse on the live URL — Runbook Step 4.*
8. **Rich-result validity unverified** (schema is well-formed JSON-LD in the
   artifact; Google's tester needs live URLs).

## Low

9. Six template pages remain noindexed by design; `/for-your-role/` is the one
   pillar hub with zero indexable children.
10. Root-doc sprawl (historical reports) — archive post-launch.
11. Screen-reader human pass never done (automated checks clean).

## Fixed during this pre-flight (in RC2)

- Footer legal text contrast 2.95:1 → 9.93:1 (WCAG AA failure → pass).
- Header search link had no accessible name below the mobile breakpoint →
  `aria-label="Search"`. Homepage accessibility 89 → 96.
- (RC1, earlier today) `sharp` missing from package.json — would have failed any
  Netlify build from git.
