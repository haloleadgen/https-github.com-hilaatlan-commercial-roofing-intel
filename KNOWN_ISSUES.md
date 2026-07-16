# Known Issues — Commercial Roofing Intel

Last updated: July 16, 2026 · After the build-and-ship session
Severity: 🔴 launch blocker · 🟠 fix before promoting · 🟡 fix soon · ⚪ backlog

Every issue below was verified against source or the built output in `website/dist/`.
Where something could not be verified, it says so.

**Resolved this session** (previously #1, #2, #4, #6 — see CHANGELOG): the build now
works, `dist/` matches source, citation badges are truthful, trust badges appear only
on published pages, empty hubs are noindexed, and the docs contradiction is fixed.

---

## 🔴 1. Only 3 articles are published — the site's own launch rule is unmet

Not a defect. The central fact about this project.

`VERSION-1-REPORT.md` set the bar: *"Don't launch until … 20–30 real cornerstone
articles are written."* Today: **3 published**, 23 draft, 9 sample.

The engineering is production-grade and the content is roughly an order of magnitude
behind it. A reader arriving from Google can read exactly three articles. Five of six
pillars in the nav lead to pages that are honest but empty of published work.

**The bottleneck is citation verification, not writing.** 23 drafts already exist in
good structural shape, each with a prose "Verified so far / Remaining verification"
section. Converting ~10 to `published` with real sources would clear the launch bar
*and* un-noindex the hubs automatically.

Nothing about this is fixable by engineering. It is editorial work.

---

## 🔴 2. `repair-or-replace` publishes uncited numeric thresholds — your decision

**Unchanged from the last review. This is the last content blocker I cannot clear.**

Now truthfully labelled "1 source cited". But it is a decision guide driving
six-figure decisions and it asserts two specific thresholds with no citation:

- "repair costs approach **25–30%** of replacement cost → replacement deserves analysis"
- "wet insulation around **25%** of roof area → tear-off more economical"

Both are attributed only to "roof consultants commonly treat…". The IBC/NRCA code
point *is* cited; these two numbers are not.

Options, in order of preference:

1. **Source the thresholds** (NRCA, RCI/IIBEC, or a named consultant text) and raise
   the count honestly.
2. **Demote to `status: draft`** until sourced. Auto-noindexes, shows the verification
   banner, removes it from search and the homepage. Costs you one of three articles —
   and would drop `/knowledge/` to 2 published children.
3. Launch as-is with "1 source cited". Truthful, but thin for a flagship guide.

**Why this matters more here than elsewhere:** CRI is commonly owned with a roofing
contractor and monetised by referrals to it. Every uncited number that happens to
favour replacement invites the inference that it was written to sell roofs. That is
the specific attack this site's entire governance layer exists to withstand.

---

## 🔴 3. Emergency pages are `Placeholder:` stubs — needs a qualified author

`situations/my-roof-is-leaking.md` and `situations/storm-damage-first-72-hours.md` are
skeletons. Literally:

> "**Placeholder checklist:** protect occupants and contents, contain water…"
> "1. Signing a full-replacement contract during the emergency. **Placeholder explanation.**"

They are noindexed, excluded from search, and removed from the homepage, so they do no
harm today. But they are the highest-intent pages on a commercial roofing site, and
the Situations pillar cannot launch meaningfully without them.

**I did not write this content deliberately.** Detailed insurance-claim tactics and
contractor-briefing guidance, published under "Reviewed by Hila Atlan,
Editor-in-Chief" with an evidence badge, on a contractor-affiliated site, would be
manufacturing the appearance of expertise — the exact harm this project exists to
avoid. This needs a qualified author and real sources.

---

## 🔴 4. Founder / counsel items (unchanged — Claude cannot clear these)

- **Funding & Relationships wording** — legal entity names, the Victory E&I
  common-ownership description, and the fee structure need counsel's sign-off. The
  page still carries a visible "founder confirmation required" flag.
- **Legal review** — Privacy Policy, Terms, and the assessment service terms.
- **Hosting + domain** — no account, DNS, or SSL confirmed. See INFRASTRUCTURE.md.
- **Partner agreement in writing** — the no-pressure standard and referral fees.

---

## 🟠 5. "Every claim sourced" on the homepage — an editorial claim I did not change

The hero carries three proof bullets, including **"✓ Every claim sourced"**.

Given issue #2 (a published guide with two uncited numeric thresholds), that claim is
not currently true. It is also the kind of absolute a critic tests first.

I left it alone because changing it is an **editorial-policy decision**, which your
directive reserves for you. Three options:

1. Make it true — source the `repair-or-replace` thresholds (fixes #2 as well).
2. Soften to something defensible: "Sources published with every claim" / "Every
   claim traceable".
3. Keep it as a standard you enforce from launch, accepting #2 must be fixed first.

Recommend 1.

## 🟠 6. The assessment page now makes an unqualified offer

I removed its public "Pre-launch note" (internal language on a live lead-gen page).
The page now offers a complimentary assessment with no caveat.

**That means the offer must actually be operational on launch day** — partner coverage
areas, request handling, and a form that delivers. The form cannot work until deployed
on Netlify. **Submit it for real immediately after the first deploy.** A silently
broken lead form on the site's only revenue path is an expensive failure.

Its disclosure is genuinely strong and should not be weakened: it names Victory E&I,
the common ownership, and the referral fee *on the page carrying the CTA*.

## 🟡 7. Benchmarks v1.0 gates the estimator

`/data-research/commercial-roof-life-expectancy-benchmarks/` is still `v0.1 — sample`,
its methodology section is the literal word "Placeholder:", and it is marked "Not for
citation until v1.0". The estimator runs on it and is noindexed and unsearchable as a
result — correct, and it should stay that way until the data is validated.

The estimator is the most differentiated thing on the site. Do not un-noindex it
before the data is real: a tool emitting confident year-ranges from placeholder
modifiers, on a contractor-affiliated site, is the worst-case version of this project.

## 🟡 8. Astro has a known-high CVE; staying on 5.18.2 deliberately

`npm audit` reports 1 high + 1 low. **Justified decision not to fix:**

- 5.18.2 is already the newest 5.x — there is no patched 5.x. The only fix is
  **astro@7**, two majors, days before launch.
- The advisories require SSR or template patterns this site does not use. Verified:
  **zero** `define:vars`, server islands, dynamic slot names, spread props, or SSR
  adapter. The esbuild issue is dev-server-only, on Windows.

This is a static build served from a CDN with no request handling. Not reachable.
**Revisit after launch**, on a branch, with time to test.

## 🟡 9. Documentation sprawl (13 legacy root docs)

Reduced but not resolved. `MASTER_INDEX.md` now marks what is superseded, and
`GO-LIVE.md` / `START HERE.md` carry warnings. The legacy reports still overlap and
some are stale. Consider archiving them into `docs/archive/` post-launch.

---

## ⚪ 10. Verified this session — no longer unknown

For the record, these were previously listed as unverifiable and now are not:

- **Build**: exit 0, zero warnings, zero errors, 60 pages, reproducible from clean.
- **Accessibility**: zero heading-order violations across 60 pages; 1 `h1` each; 0
  images without alt; 0 unlabeled inputs; skip link + landmarks; mobile menu
  `aria-expanded`/`aria-controls` verified working.
- **Links**: **3,458 internal links, 0 broken.**
- **Mobile**: no horizontal overflow at 375px; menu tested.
- **Search**: Pagefind works; returns published pages only.
- **Weight**: 1.8 MB dist, 24 KB CSS, **no JS bundle**, no image >100 KB, **zero
  third-party requests**, CLS 0.

## ⚪ 11. Still genuinely unverified — do not claim these

- **Real-world Core Web Vitals.** Measured FCP/LCP ≈124 ms, but that is **localhost**,
  not field data. The structure (1 request, no JS, no third-party) predicts excellent
  real numbers. **Run Lighthouse against the live URL after deploy.**
- **Forms end-to-end** — Netlify-dependent. Untestable until deployed. Test both.
- **The www → apex 301** — untestable until DNS exists.
- **Rich-result validity** — run Google's Rich Results Test on live URLs.
