# Content Inventory — Commercial Roofing Intel

Updated July 21, 2026 from `website/src/content/` and verified against a clean rebuild
of `website/dist/` (`npm run verify` → PASS).

**Headline:** 60 built pages · **48 indexable** · **24 published content pages** ·
4 in technical review · 6 templates · 1 preliminary dataset.

`status` drives everything automatically: anything not indexable-grade gets
`noindex, follow` and is excluded from the XML sitemap (`astro.config.mjs`). The
machinery held perfectly through this session's 21 status changes — hubs un-noindexed
themselves the moment they gained published children.

Legend — P0 = launch blocker · P1 = launch-shaping · P2 = post-launch

---

## Published (24) — every page carries fetched-and-verified sources

**Knowledge — systems & guides (10):**
`tpo-roofing-systems` · `epdm-roofing-systems` · `pvc-roofing-systems` ·
`bur-roofing-systems` · `metal-roofing-systems` · `modified-bitumen-roofing-systems` ·
`roof-coatings` · `commercial-roof-inspections` · `commercial-roof-warranties` ·
`guides/repair-or-replace`

**Knowledge — comparisons (6):**
`45-mil-vs-60-mil` · `adhered-vs-mechanically-attached` · `coating-vs-replacement` ·
`modbit-vs-bur` · `tpo-vs-pvc` · `white-roof-vs-black-roof`

**Glossary (8):**
`flashing` · `fully-adhered` · `mechanically-attached` · `mil-thickness` · `parapet` ·
`scrim` · `square` · `wind-uplift`

House rules held throughout: every source fetched and read before citation; `supports`
states each source's limits; service-life figures framed as trade planning ranges with
named origins; evidence gaps stated on-page rather than papered over.

## Technical review (4) — indexed, sourced, honest about pending review

`situations/my-roof-is-leaking` · `situations/storm-damage-first-72-hours`
(await a qualified roofing professional) ·
`situations/hurricane-preparation` (roofing professional) ·
`situations/insurance-claims` (commercial claims professional). **P1 — schedule the
reviews; do not let "pending" become permanent.**

## Preliminary (1)

`datasets/commercial-roof-life-expectancy-benchmarks` — still `v0.1 — sample`, still
gating the two tools. **P1 if the estimator is to ship.**

## Template (6) — noindexed structural placeholders

`glossary/ponding-water` · `glossary/positive-drainage` · `glossary/scupper` ·
`knowledge/compare/tpo-vs-epdm` · `roles/property-managers` · `roles/hoa-boards`

The three glossary terms are quick wins (same verification method as this session).
The role pages and tpo-vs-epdm need drafting. `/for-your-role/` is now the only pillar
hub with zero indexable children. **P2, except the glossary trio (P1-adjacent).**

## Tools (2, both noindexed)

`roof-life-expectancy-estimator` and `maintenance-budget-planner` remain correctly
gated on Benchmarks v1.0.

---

## What this inventory says

The site's own launch rule was "20–30 real cornerstone articles." The published set now
stands at **24 pages, 16 of them substantive knowledge articles/comparisons** — at the
bar by page count, just under it if only long-form knowledge pieces count. The honest
framing: the content surface is now defensible; the remaining editorial work is
professional review of the four Situations pages, the three quick-win glossary terms,
and the role pages — plus counsel and operations, which content cannot fix.
