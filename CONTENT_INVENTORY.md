# Content Inventory — Commercial Roofing Intel

Generated July 16, 2026 from `website/src/content/` and verified against `website/dist/`.

**Headline:** 60 built pages · 23 indexable · **3 substantive published articles.**

`status` drives everything automatically: anything not `published` gets
`noindex, follow` in the head **and** is excluded from the XML sitemap
(`astro.config.mjs`). That machinery is correct and well built — the content just
hasn't caught up to it.

Legend — P0 = launch blocker · P1 = launch-shaping · P2 = post-launch

---

## Published & indexable (the entire live editorial surface)

| Page | Sources | Needs | Priority |
| --- | --- | --- | --- |
| `/knowledge/tpo-roofing-systems/` | 3 real (ASTM D6878, NRCA, trade) | Badge was "8" → corrected to 3. Honest about the TPO field-study evidence gap — keep that. | P0 rebuild |
| `/knowledge/epdm-roofing-systems/` | 3 real (ASTM D4637, ERA, NRCA) | Badge was "**0**" → corrected to 3. Was actively understating itself. | P0 rebuild |
| `/knowledge/guides/repair-or-replace/` | **1** | Two uncited numeric thresholds (25–30% cost, 25% saturation). Source them or demote to `draft`. See KNOWN_ISSUES #3. | **P0 decision** |

That is the whole of it. Three articles. Everything else a reader can reach is a hub,
a governance page, or a legal page.

## Indexable non-editorial pages (20)

Hubs: `/`, `/knowledge/`, `/glossary/`, `/situations/`, `/for-your-role/`,
`/data-research/`, `/tools/`, `/ai-assistant/`, `/assessment/`
Governance: `/about/`, `/about/mission/`, `/about/editorial-standards/`,
`/about/methodology/`, `/about/funding-and-relationships/`, `/about/corrections/`,
`/about/how-cri-works/`
Legal/utility: `/contact/`, `/privacy/`, `/terms/`, `/sitemap/`

⚠️ **Five of these hubs have zero indexable children** (`/glossary/`, `/situations/`,
`/for-your-role/`, `/data-research/`, `/tools/`). See KNOWN_ISSUES #4 — thin-content
risk at launch. **P1.**

---

## Draft — real content, sources under verification (23, all noindexed)

These carry the "Draft — editorial verification in progress" banner and a prose
`## Sources` section in the honest "Verified so far: … / Remaining verification: …"
form. They declare `sources: 0`, which now renders nothing rather than
"0 sources cited".

**Knowledge (13):** bur-roofing-systems · commercial-roof-inspections ·
commercial-roof-warranties · metal-roofing-systems ·
modified-bitumen-roofing-systems · pvc-roofing-systems · roof-coatings ·
compare/45-mil-vs-60-mil · compare/adhered-vs-mechanically-attached ·
compare/coating-vs-replacement · compare/modbit-vs-bur · compare/tpo-vs-pvc ·
compare/white-roof-vs-black-roof

**Situations (2):** hurricane-preparation · insurance-claims

**Glossary (8):** flashing · fully-adhered · mechanically-attached · mil-thickness ·
parapet · scrim · square · wind-uplift

*Needs:* finish source verification → set real `sources:` count → `status: published`.
**P1** — this is the fastest path to a credible launch surface. Thirteen knowledge
articles are already drafted; they need citations, not writing.

---

## Sample — structural placeholders (8, all noindexed)

Template demos, not editorial content. Carry the amber "Sample content" banner.

| Page | Note |
| --- | --- |
| `/data-research/commercial-roof-life-expectancy-benchmarks/` | **The dataset behind the estimator.** Still `v0.1 — sample`, methodology is a literal "Placeholder:". Declared "12 sources"; had **zero**. Removed. **P0 if the estimator ships.** |
| `/knowledge/compare/tpo-vs-epdm/` | Declared "9 sources"; had zero. Removed. |
| `/situations/my-roof-is-leaking/` | Declared "4 sources"; had zero. Removed. |
| `/situations/storm-damage-first-72-hours/` | Declared "5 sources"; had zero. Removed. |
| `/glossary/ponding-water/`, `/glossary/positive-drainage/`, `/glossary/scupper/` | Sample glossary entries |
| `/for-your-role/property-managers/`, `/for-your-role/hoa-boards/` | Sample audience pages |

⚠️ Those inflated counts were a **trap**: flipping `status` to `published` would have
shipped "12 sources cited" on a page citing nothing. The `sources:` field has been
removed from all four. See KNOWN_ISSUES #2.

---

## Tools (2, both noindexed)

| Tool | State |
| --- | --- |
| `/tools/roof-life-expectancy-estimator/` | Fully functional. **Noindexed** because its underlying benchmark data is still sample-grade. Correct call. |
| `/tools/maintenance-budget-planner/` | Same. |

The estimator is the most differentiated thing on the site and it cannot launch until
the benchmarks reach v1.0. **P1.** Do not un-noindex it before the data is validated —
a tool that outputs confident numbers from placeholder data, on a contractor-affiliated
site, is the worst-case version of this project.

---

## What this inventory says

The engineering is ahead of the content by roughly an order of magnitude. The
templates, status machinery, governance layer, and design system are production-grade.
The editorial pipeline has produced 3 published articles against a stated launch bar
of 20–30.

**The bottleneck is citation verification, not writing.** 23 drafts already exist in
good structural shape. Converting even 10 of them to `published` with real sources
would take the site from "3 articles" to a defensible launch — and would fill the
empty hubs at the same time.
