# Known Issues — Commercial Roofing Intel

Last updated: July 16, 2026 · Source: pre-launch engineering review
Severity: 🔴 launch blocker · 🟠 fix before promoting · 🟡 fix soon · ⚪ backlog

Every issue below was verified against the actual files or the built output in
`website/dist/`. Where something could not be verified on this machine, it says so.

---

## 🔴 1. The built site (`dist/`) no longer matches the source — and cannot be rebuilt here

**No Node.js toolchain is installed on this machine.** No `node`, no `npm`, no
Homebrew, no bundled runtime. `npm run build` cannot run.

Consequence: the source fixes made in this review (issue 2) **are not in `dist/`**.
`dist/` and `dist-v1.8-PRODUCTION.zip` still contain the incorrect citation badges.

**Do not deploy the current `dist/` or the v1.8 zip.** They ship the bug.

To clear this, on a machine with Node 22:

```bash
cd website
npm install
npm run build      # astro build && pagefind --site dist
```

Then re-verify: `grep -ro '[0-9]* sources cited' dist --include="*.html" | sort | uniq -c`
should show `3 sources cited` (×2) and `1 source cited` (×1), and no `0 sources cited`.

Until then, **every source-level fix in this session is unverified.** They are small,
data-only frontmatter edits plus two guarded conditionals, but nothing has been
compiled or rendered. Treat them as reviewed-but-untested.

---

## 🔴 2. The "N sources cited" trust badge was false on all three published pages

This is the most serious issue found. The site's core claim is evidence-based
independence, and the flagship trust signal was wrong on every page carrying it.

`sources:` is a **hand-typed integer in frontmatter with no connection to the
citations actually present in the article.** Nothing validates it. It drifted in
both directions:

| Page | Badge rendered | Real citations | Status |
| --- | --- | --- | --- |
| `/knowledge/epdm-roofing-systems/` | "Evidence-based · **0** sources cited" | 3 real (ASTM D4637, ERA survey, NRCA) | published, indexable |
| `/knowledge/tpo-roofing-systems/` | "**8** sources cited" | 3 (ASTM D6878, NRCA, trade summary) | published, indexable |
| `/knowledge/guides/repair-or-replace/` | "**6** sources cited" | 1 (NRCA reroofing/code) | published, indexable |

"Evidence-based · 0 sources cited" was rendering publicly on a page that in fact
cites three good sources. That is self-refuting, and it is the kind of detail a
skeptical reader screenshots.

**Fixed in source** (data-only, unverified pending rebuild):
- EPDM `sources: 0` → `3`
- TPO `sources: 8` → `3`
- repair-or-replace `sources: 6` → `1`
- Removed unfounded `sources:` from the four sample pages that declared 12/9/4/5
  against **zero** actual citations (`sources` is optional in the schema, so nothing
  renders). This defused a trap: those numbers would have shipped the instant
  someone flipped `status: sample` → `published`.
- `TrustMeta.astro` + `ArticleLayout.astro`: the badge now only renders when
  `sources > 0`, and reads "1 source cited" rather than "1 sources cited".

**Root cause is NOT fixed.** The number is still hand-typed and can drift again.

**Recommended durable fix** (needs a build to verify, so not attempted here):
derive the count from the article body at build time instead of trusting frontmatter
— count the entries in the `## Sources` section, or the distinct external links.
Then the badge cannot lie. Until that lands, treat `sources:` as a manual claim that
must be checked by a human at publish time.

---

## 🟠 3. `repair-or-replace` is published with one citation and an uncited numeric claim

Now truthfully labelled "1 source cited" — but it is a decision guide that drives
six-figure decisions, and it asserts specific thresholds without citation:

- "repair costs approach **25–30%** of replacement cost → replacement deserves analysis"
- "wet insulation around **25%** of roof area → tear-off more economical"

Both are attributed only to "roof consultants commonly treat…". The IBC/NRCA code
point *is* cited; the two numeric thresholds are not.

**This is a judgment call I deliberately left to you**, because it changes launch
scope rather than fixing a defect. Your options:

1. **Source the thresholds** (NRCA, RCI/IIBEC, or a named consultant text) and raise
   the count honestly. Best outcome.
2. **Demote to `status: draft`** until sourced. This is exactly what `draft` is for
   per `SampleNotice.astro` ("real editorial content, sources under verification").
   It auto-noindexes and shows the verification banner. Costs you one of three
   launch articles.
3. Launch as-is with "1 source cited". Truthful, but thin for a flagship guide on a
   site whose pitch is evidence.

My recommendation: **option 1, else option 2.** Publishing quantitative decision
thresholds under an "Evidence-based" badge with no citation is the single biggest
credibility risk on the site — precisely because CRI is contractor-affiliated
(issue 5), so every uncited number that favours replacement invites the inference
that it was written to sell roofs.

---

## 🟠 4. Five of six pillar hubs are indexable but lead to nothing indexable

The nav presents six pillars. At launch, a crawler finds this:

| Hub | Indexable? | Children | Indexable children |
| --- | --- | --- | --- |
| `/knowledge/` | yes | 17 | **3** |
| `/glossary/` | yes | 11 | **0** |
| `/situations/` | yes | 4 | **0** |
| `/for-your-role/` | yes | 2 | **0** |
| `/data-research/` | yes | 1 | **0** |
| `/tools/` | yes | 2 | **0** |

`/glossary/` is an indexable page listing 11 terms, every one of which is noindexed.
That is a thin-content, crawl-dead-end pattern — a hub whose entire value is links
that go nowhere Google can follow. Five such hubs at launch is a weak first
impression for a domain with no authority yet.

Note this is a *side effect of doing the right thing*: the noindex-until-published
discipline is correct and well built (see `astro.config.mjs`). The hubs just
outpaced the content.

**Options:** noindex the empty hubs until each has ≥1 published child (mirrors the
existing status logic), or hold launch until each pillar has content. Do not
"solve" it by publishing unverified drafts.

---

## 🟡 5. Contractor affiliation is disclosed — verify the disclosure is sufficient

`/about/funding-and-relationships/` discloses that CRI and **Victory E&I Roofing and
Construction LLC** share common ownership, and that referrals go to a commercial
contractor. The editorial-independence language is present and reads well
(no pre-publication access, no content created to benefit partners, compensation
independent of referral revenue).

This is correct and honest as far as it goes. Two things to confirm with counsel,
not with me:

- The page still carries a "founder confirmation required" flag on the legal entity
  names and fee structure (per `GO-LIVE.md`). Unresolved.
- An "independent knowledge platform" that is commonly owned with a roofing
  contractor and monetised by referrals to that contractor is a structure the FTC
  cares about. The disclosure exists; whether its **placement and prominence** are
  adequate (it currently lives on a governance page, not on the articles that carry
  referral CTAs) is a question for your attorney.

I am flagging this, not resolving it. Do not treat this file as legal advice.

---

## 🟡 6. Documentation contradicts itself on the production email

`GO-LIVE.md` states **both**:
- line ~9: `hila@victoryroofer.com` ✅
- line ~22: `hila@victoryeniroofing.com` ✅

**The code is correct and consistent** — `hila@victoryroofer.com`, 184 occurrences
across `dist/`, single-sourced from `src/data/site.ts`. Phone `(954) 634-2028`
appears 62 times, consistent.

So this is a **stale documentation error, not a site bug.** But it is the exact kind
of thing that causes someone to "fix" the working code to match a wrong doc. The
contradictory line should be corrected in `GO-LIVE.md`.

---

## 🟡 7. Root-level documentation sprawl (13 files, overlapping, some superseded)

`ASSESSMENT-PAGE-EXPORT.md`, `BUSINESS-IMPACT-REPORT.md`, `DEPLOYMENT-REPORT.md`,
`FOUNDER-LAUNCH-ACTIONS.md`, `GO-LIVE.md`, `MASTER-ROADMAP.md`, `PAGE-EXPORTS.md`,
`POLSIA-HANDOFF-INVENTORY.md`, `ROUND-1-REVIEW.md`, `SESSION-NOTES.md`,
`START HERE.md`, `VERIFICATION-LOG.md`, `VERSION-1-REPORT.md`.

Several describe the same launch state at different points in time, and at least one
(`START HERE.md`) still points at `dist-v1.1.zip` as "the current built site" when
v1.8 exists. `VERSION-1-REPORT.md` claims "33 pages"; the build is 60.

See `MASTER_INDEX.md` for which of these is still authoritative.

---

## ⚪ 8. Unverified on this machine (no toolchain, no network testing)

Not claims of correctness — claims of *ignorance*. Someone must check these:

- **Performance / Core Web Vitals** — no build, no Lighthouse. The architecture is
  strongly favourable (static Astro, zero client framework, system fonts, ~2.1 MB
  dist), but no number has been measured. Do not report a score you have not run.
- **Accessibility** — the code shows good practice (skip link, landmarks, one h1,
  `aria-expanded` menu, `aria-live` tool results, focus styles, reduced-motion). No
  axe/screen-reader pass was run. Static reading is not an a11y audit.
- **Forms** — contact + assessment forms rely on Netlify form attributes. They
  cannot work until deployed on Netlify. Untested end-to-end.
- **Search** — Pagefind needs a real server; disabled in the local `preview/` folder.
- **Links** — prior docs claim "3,807 internal links, 0 broken". Not re-verified
  this session.
