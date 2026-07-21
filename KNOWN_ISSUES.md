# Known Issues — Commercial Roofing Intel

Last updated: July 21, 2026 · After the editorial publication session (v2.4-RC1)
Severity: 🔴 launch blocker · 🟠 fix before promoting · 🟡 fix soon · ⚪ backlog

Every issue below was verified against source or the built output in `website/dist/`.
Where something could not be verified, it says so.

**Resolved this session** (previously #1, #2, #5 — see CHANGELOG 2026-07-21): the
content gap is substantially closed (**3 → 24 published pages**, all cited with
fetched-and-verified sources), the `repair-or-replace` uncited thresholds were already
fixed in source (specific figures removed, honest no-citable-source paragraph in their
place), and the homepage hero now claims only what is true ("Every published page lists
its sources" — verified: minimum source count across the published set is 1).

---

## 🔴 1. Founder / counsel items (unchanged — Claude cannot clear these)

- **Legal review** — Privacy Policy, Terms, and the assessment service terms. Both
  legal pages still carry the honest "draft, not yet reviewed by counsel" notice.
- **Funding & Relationships wording** — legal entity names, the Victory E&I
  common-ownership description, and the fee structure need counsel's sign-off. The
  page remains noindexed until then.
- **Hosting + domain cutover** — the GoDaddy domain still serves a placeholder page.
  Netlify staging exists; DNS has not been switched. See INFRASTRUCTURE.md.
- **CRI-domain email provisioning** — `contact@` / `editorial@` / `corrections@`
  still not provisioned; `hila@victoryroofer.com` remains in `site.ts` deliberately.
- **Partner agreement in writing** — the no-pressure standard and referral fees.

## 🔴 2. Four pages await review by qualified professionals

`situations/my-roof-is-leaking` and `situations/storm-damage-first-72-hours`
(roofing professional), plus — new this session —
`situations/hurricane-preparation` (roofing professional) and
`situations/insurance-claims` (someone with commercial claims experience; the
scope-negotiation and professional-representation sections specifically).

All four are `status: technical-review`: indexed, sourced, and honest on-page about
the pending review. This is not a defect — it is the framework working — but the
Situations pillar is not editorially *finished* until the reviews happen, and CRI
should not let "technical review pending" become a permanent state.

## 🟠 3. The assessment offer must be operational on day one

Unchanged. The page makes an unqualified offer of a complimentary assessment; the
form cannot be tested until deployed on Netlify. **Submit it for real immediately
after the first deploy.** Its disclosure (Victory E&I, common ownership, referral fee
on the page carrying the CTA) is strong — do not weaken it.

## 🟡 4. Benchmarks v1.0 gates the estimator

Unchanged. The dataset is still `v0.1 — sample`, so the estimator and the dataset
page stay gated (`preliminary`, not promoted). Do not un-gate before the data is
validated — a tool emitting confident year-ranges from placeholder modifiers, on a
contractor-affiliated site, is the worst-case version of this project.

## 🟡 5. Six template pages remain (correctly noindexed)

`glossary/ponding-water` · `glossary/positive-drainage` · `glossary/scupper` ·
`roles/property-managers` · `roles/hoa-boards` · `knowledge/compare/tpo-vs-epdm`.

The three glossary terms are quick wins by the same verification method used this
session. The two role pages and the TPO-vs-EPDM comparison need real drafting, not
just citations. None block launch (noindexed, honest banners), but `/for-your-role/`
is the one remaining pillar hub with zero indexable children.

## 🟡 6. Astro has a known-high CVE; staying on 5.18.2 deliberately

Unchanged. 5.18.2 is the newest 5.x; the advisories require SSR or template patterns
this static site does not use (verified). Revisit post-launch on a branch.

## 🟡 7. Parallel Polsia site (founder decision)

Unchanged from QA-v2.1-RC2: `commercial-roofing-intel-llc.polsia.app` describes CRI
as a roofing *services company*, contradicting the mission and the editorial firewall.
Shut it down or rename it away from the CRI brand before launch.

## ⚪ 8. Documentation sprawl (root docs)

Reduced but unresolved. MASTER_INDEX marks what is superseded. Consider archiving the
historical reports into `docs/archive/` post-launch.

## ⚪ 9. Citation-sourcing notes for the record

- ASTM's store became robots-blocked to automated fetching mid-session; some ASTM
  designations are therefore supported via verified secondary descriptions
  (Professional Roofing, Carlisle's standards summary) rather than direct store URLs.
  Not a defect — the `supports` fields say exactly what each source covers.
- Several service-life figures site-wide are deliberately framed as *trade planning
  ranges with named origins*, because no independent longitudinal field study is
  public for any major single-ply membrane. That gap is stated on the relevant pages
  and remains CRI's single biggest proprietary-research opportunity.

## ⚪ 10. Still genuinely unverified — do not claim these

- **Real-world Core Web Vitals** — run Lighthouse against the live URL after deploy.
- **Forms end-to-end** — Netlify-dependent; test both immediately after deploy.
- **The www → apex 301** — untestable until DNS exists.
- **Rich-result validity** — run Google's Rich Results Test on live URLs.
- **Screen-reader / assistive-technology pass** — automated checks pass; no human pass.
