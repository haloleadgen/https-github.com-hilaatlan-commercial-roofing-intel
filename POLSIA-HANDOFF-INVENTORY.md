# POLSIA HANDOFF INVENTORY

July 15, 2026 · Status: Polsia = idea engine only; Astro = sole production site (locked)

## What Polsia has built

Next.js 16 site at https://commercial-roofing-intel-llc.polsia.app (mirror: …polsia.io),
"editorially reviewed encyclopedia of commercial-roofing decisions for South Florida."
Sections: /knowledge · /situations · /datasets · /methodology · /for (roles). Plus
workspace documents (in the Polsia dashboard, not public URLs): Goals, Brand Voice,
Vision, Mission, Market Research. Phase 5 build (per its task log): hurricane prep,
Hurricane Performance Dataset v1, insurance claim playbook, post-storm assessment,
Florida Building Code reference. Subscription: $20/mo. Note: pages are client-rendered,
so only titles/descriptions are machine-readable from outside; full text must be read in
a browser or exported from the Polsia dashboard.

## Useful ideas — import status and priority

| Item | Polsia URL | Status | Priority | Difficulty |
| --- | --- | --- | --- | --- |
| Hurricane prep guidance | …/situations (hurricane-prep) | ✅ Imported — rewritten to CRI standards (/situations/hurricane-preparation/) | done | — |
| Insurance claim playbook (SB 4-D, Citizens, paper-trail) | …/situations/insurance-claims | ✅ Imported — rewritten (/situations/insurance-claims/); SB 4-D verified w/ sources | done | — |
| Post-storm assessment guide (wind vs. pre-existing, RICOWI/IBHS framing) | …/situations/post-storm-assessment | ❌ Not yet imported — good fit for a 5th Situations page | **1 — high value** | Low (draft from outline; verify RICOWI/IBHS refs) |
| Florida Building Code reference (compatibility-only, version-dated) | …/situations/florida-building-code | ❌ Not imported — fits Data & Research "Florida research layer" already on roadmap | **2** | Medium (citation-heavy; must be statute-accurate before publish) |
| Hurricane Performance Dataset v1 | …/datasets | ❌ Not imported — validate methodology before anything enters CRI | **3** | High (unknown data provenance; CRI methodology bar applies) |
| Market Research doc | Polsia dashboard → Documents | Worth exporting and saving to this folder | 4 | Low (founder: copy/paste or download from dashboard) |
| Brand Voice / Goals / Vision / Mission docs | Polsia dashboard → Documents | Compare against locked CRI Brand Bible; keep as reference only | 5 | Low |

## Conflicts with CRI locked standards (do NOT import)

- Nav items **Services / Why Us / Areas Served / "Get a Quote"** — contractor-site
  patterns explicitly forbidden by the Brand Bible.
- **South Florida-only positioning** — CRI is national with a Florida research layer.
- Orange contractor theme (#c4560a), "LLC" in the public brand name, quote-request
  mailto as primary CTA.
- Stripe/payments module — not part of CRI's model (per founder priority correction).

## Duplicates of the Astro production build (no action)

Knowledge/Situations/Datasets/Methodology/roles sections all exist in production Astro
with more depth and governance. Polsia's methodology page duplicates
/about/methodology/ + /about/editorial-standards/.

## ⚠️ Launch-critical founder action (I cannot do this from here)

The Polsia site is a public near-duplicate of the CRI brand. Before production launch,
in the Polsia dashboard do ONE of: (a) unpublish/pause the app, (b) enable password
protection, or (c) ask Polsia's agent to add `noindex` meta + robots disallow site-wide.
Also confirm no custom domain points at it. Keep the $20/mo only if you're actively
using it as a sandbox — otherwise cancel after exporting the Documents listed above.
