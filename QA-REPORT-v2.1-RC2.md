# QA Report — v2.1-RC2

July 17, 2026 · Deploy artifact: **`website/dist-v2.1-RC2.zip`** (1.42 MB, 120 files)
Supersedes RC1 (same day). All superseded zips quarantined in `website/releases/superseded/`.

## Verification (this build)

`npm run build` exit 0 · `npm run verify` **PASS**: 60 pages, 24 indexable, one h1
each, full metadata coverage, zero broken internal links, all JSON-LD valid, sitemap =
indexable set exactly, zero placeholder text on indexable pages, all 23 OG cards
present, zero missing alt attributes, zero `http://` URLs, robots.txt correct.

New schema spot-checked in built output: Person entity on `/about/` with the
`#who-is-behind-cri` anchor; Article `editor` and Organization `founder` reference the
identical entity and URL; the visible "Editorial review" fact links to the bio.

## What changed

Author-entity consistency across visible text and structured data (trust improvement
#7 from the impact-ranked list), plus release hygiene: one deployable artifact at
`website/` root, everything else quarantined with a DO-NOT-DEPLOY README. One real
defect fixed en route: the content schema's string default for `reviewed` was
silently degrading the editor entity on every collection page.

## Verified missing / flagged — founder decisions required

1. **Gemini research library: does not exist** — searched this machine, Google Drive,
   Notion, Gmail. Third consecutive session. Nothing was fabricated in its place.
   If it exists somewhere, put it in the project folder or Drive and rerun integration.
2. **Parallel Polsia site** — `commercial-roofing-intel-llc.polsia.app` (built July
   14–15 by polsia.com, see Gmail) describes CRI as a roofing **services company**.
   This contradicts the mission, the editorial firewall with Victory E&I, and the
   one-codebase rule. Recommend shutting it down or fully renaming it away from the
   CRI brand before launch. Not integrated; not touched.
3. Everything in KNOWN_ISSUES #1–#4 stands: 3 of 20–30 articles published; two
   uncited thresholds in repair-or-replace; emergency pages await technical review;
   counsel items (privacy, terms, funding wording, partner agreement).

## Launch blockers (unchanged, none engineering)

Legal review · editorial publication gate (drafts need citations) · technical review
of emergency pages · hosting/DNS/SSL · CRI-domain email · operational assessment
workflow · plus the new Polsia-site decision above.

## Completion estimate

Engineering ~98% (unchanged — only live-URL checks remain untestable before deploy).
Product ~40–50%, bounded by content verification, not code.
