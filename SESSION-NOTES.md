# Session Notes — Phase 2, Session 1

July 15, 2026 · Site now 56 pages (was 33)

## Completed

**Cornerstone encyclopedia (6 new, all `draft` status):** EPDM, PVC, Modified Bitumen,
BUR, Metal Roofing, Roof Coatings. Each follows the directive structure: explanation,
commercial context, decision framework, common mistakes, cost considerations,
maintenance guidance, related systems, FAQ, internal links, and a sources-to-verify list.
Analyst tone throughout — no selling.

**Comparison library (5 new):** TPO vs PVC, Coating vs Replacement, White vs Black Roof,
Mod-Bit vs BUR, Fully Adhered vs Mechanically Attached, 45 vs 60 Mil. (TPO vs EPDM and
Repair vs Replace already existed — comparison set from the directive is complete.)

**Situations (2 new, imported as ideas from Polsia, written fresh to CRI standards):**
Hurricane Preparation (96-hour sequence, documentation-first framing) and Insurance
Claims Playbook (evaluation sequence, wind-vs-wear dispute, ordinance coverage,
state-specific notes flagged).

**Glossary (8 new, 11 total):** fully adhered, mechanically attached, mil, scrim,
flashing, parapet, wind uplift, square. Short entries live to support knowledge-graph
links; marked draft for expansion.

**Second decision tool:** Maintenance Budget Planner — system/age/size inputs,
planning-grade ranges, first-year catch-up logic for reactive roofs, published
methodology with placeholder rates explicitly flagged v0.1. Tested live: math verified.

**Platform decision recorded (founder):** Astro codebase = production; Polsia = idea
engine only; imports must pass CRI standards; no architecture drift; site stays portable.

**Editorial mechanics:** new `draft` status distinct from `sample` — drafts show
"editorial verification in progress" instead of the template-review banner. All new
content ships as draft, never as verified fact.

## What changed and why

Content is the product now (Phase 2 directive). Every page above targets a real decision
and interlinks into the knowledge graph (related-panel + inline links + glossary).
Homepage "Recently updated" pulls the new pages automatically; stats band now shows
7 encyclopedia / 2 guides / 7 comparisons / 2 tools / 1 dataset / 11 glossary terms.

## Verification status — important

Every new page is `status: draft`: structure and reasoning are final-quality, but
figures, standards citations, and statutory references are **not yet verified**. Each
page carries its own sources-to-verify list (ASTM standards, NRCA, FM, state statutes,
etc.). Nothing should flip to `published` until those checks happen. This is the honest
version of "capable of becoming the best page on the internet" — claims get verified
before we assert them.

## Recommended next actions (in value order)

1. **Verification sprint:** work through the sources-to-verify lists, add citations,
   flip pages to `published`. This unlocks the launch gate (20–30 cornerstone pages).
2. **Remaining cornerstone drafts:** inspections, warranties, drainage, preventive
   maintenance programs, roof due diligence for buyers, reading a roofing proposal.
3. **Florida research layer** (imported concept from Polsia): a Data & Research page
   with statutory citations (SB 4-D milestone inspections, HVHZ code, claim deadlines) —
   high search value, must be citation-perfect before publishing.
4. **Benchmarks v1.0:** validate the life-expectancy and maintenance-rate data; both
   tools are capped at "Low/Moderate confidence" until then.
5. **Hosting + CI** so publishing becomes push-to-deploy.

## Housekeeping

- Current built site: `website/dist-v1.2.zip` (56 pages). Preview folder refreshed —
  double-click `website/preview/index.html`.
- Older zips (`dist.zip`, `dist-v1.1.zip`) can be deleted.
