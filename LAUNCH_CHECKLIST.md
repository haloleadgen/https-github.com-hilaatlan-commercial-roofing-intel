# Launch Checklist — CommercialRoofingIntel.com

Updated July 17, 2026 · Release candidate **`dist-v2.1-RC1.zip`** (1.42 MB, 120 files — includes 23 per-page OG cards)
Supersedes `GO-LIVE.md` and the checklist in `VERSION-1-REPORT.md` where they conflict.

**Status: HOLD LAUNCH.** Engineering is done. Every remaining blocker is editorial,
legal, or operational — and none of them can be cleared by Claude.

The site is now *honest*: nothing claims more than it has earned, and the status of every
page is stated on the page. What it is not yet is *finished*, and it does not pretend to be.

---

## 🔴 Blockers — launch cannot happen until these are true

### Legal (counsel required — do not have AI write these)
- [ ] **Privacy Policy** reviewed by a qualified attorney. Currently carries a visible
      "draft, not yet reviewed by counsel" notice, which is honest and must stay until it
      is untrue.
- [ ] **Terms of Use** — same.
- [ ] **Funding & Relationships wording** — confirm the legal entity names and that
      "shares common ownership" is factually accurate, then have counsel review the
      formulation. **The page is noindexed until you do.** It stays reachable for readers.
- [ ] **Partner agreement in writing** — the no-pressure standard and referral fees.

### Editorial
- [ ] **Technical review of both emergency pages** by a qualified roofing professional.
      They are editorially complete and sourced to Ready.gov and OSHA, and the pages say
      openly that technical review is pending. Once reviewed, flip
      `status: technical-review` → `published`.
- [ ] **Decide whether 3 published articles is a launch.** Your own rule says 20–30.
      23 drafts need *citations, not writing*.
- [ ] **Benchmarks v1.0** — validate the dataset, then the estimator can be restored.
      Until then both are correctly gated.

### Operational
- [ ] **Hosting + domain.** No account, DNS, or SSL confirmed.
- [ ] **CRI-domain email provisioning.** `hila@victoryroofer.com` stays until
      `contact@`, `editorial@`, and `corrections@commercialroofingintel.com` are
      provisioned **and send/receive tested**. Do not swap addresses before testing.
- [ ] **The assessment offer must be operational on day one** — its "Pre-launch note" is
      gone, so the page makes an unqualified offer.

## 🟠 Immediately after first deploy — same hour

- [ ] **Submit the contact form for real.** Netlify-dependent; untestable before deploy.
- [ ] **Submit the assessment form for real.** This is the revenue path.
- [ ] **Run Lighthouse against the live URL.** No CWV number has been measured.
- [ ] Verify the **www → apex 301** fires.
- [ ] **Search Console**: verify domain, submit `/sitemap-index.xml` (confirmed 200 locally).
- [ ] **Analytics**: decide whether to run any; reconcile with the Privacy Policy first.
- [ ] Confirm Pagefind search works on the live host.

## ✅ Cleared — verified this session, not assumed

**Build** · Node v22.23.1 (matches `netlify.toml`; no version drift) · `npm ci` with the
existing lockfile, unchanged · `npm run build` → **exit 0, 0 errors, 0 warnings**, 60
pages · reproducible from a clean `rm -rf dist .astro`.

**Citation integrity** · `sources` is a structured array; count is derived, list is
rendered from the same data · **acceptance test passes 5/5** · every cited URL checked
over HTTP — two were dead and were removed or replaced rather than padded.

**Trust claims** · "Evidence-based": **0 pages** · "Every claim sourced": **0 pages** ·
"0 sources cited": **0** · no unpublished page claims editorial review · editorial review
is stated separately from technical review · no page claims Hila holds technical,
contractor, or engineering credentials.

**Safety (emergency pages)** · no "puncture the ceiling" advice in any form · required
wording present on both pages · electrical guidance matches Ready.gov verbatim · roof
access forbidden per OSHA · every insurance absolute removed · AOB uses national language
only.

**Gating** · estimator's form, results and script removed (not hidden) · dataset offers no
citation · both excluded from promotion · funding page noindexed.

**Structure** · sitemap = page-head noindex, exactly 24 = 24 · `/sitemap-index.xml` → 200 ·
3,577 internal links, **0 broken** · 60/60 canonical/title/description, all on the
production domain · 1 h1 per page · 0 heading-order violations · 0 images missing alt ·
no mobile overflow at 375px across 11 key pages · schema carries real `creativeWorkStatus`
and `citation` entries; template pages emit no Article schema.

## ⚠️ Do not claim these — not measured

- **Core Web Vitals / Lighthouse.** Structure is favourable (static, no JS bundle, no
  third-party requests) but nothing has been measured on a real network.
- **Forms end-to-end.** Netlify-dependent.
- **Screen-reader / assistive-technology testing.** Automated checks pass; no human pass.

## 🟡 Known and accepted

- **Astro 5.18.2 has a high-severity advisory.** 5.18.2 is already the newest 5.x; the
  only fix is Astro 7 (two majors). The advisories require SSR or template patterns this
  site does not use (verified: no adapter, no `define:vars`, no server islands, no dynamic
  slots, no spread props). Static build, no request handling. Revisit post-launch on a branch.

---

## Order of operations

1. Counsel: privacy, terms, funding wording.
2. Roofing professional: technical review of the two emergency pages.
3. Editorial: publish drafts with real citations (the fastest path to a real launch).
4. Provision and test CRI-domain email.
5. Confirm the assessment workflow is genuinely live.
6. Deploy `dist-v1.9-RC1.zip` — or better, connect the repo so Netlify builds from source.
7. **Same hour:** both forms, Lighthouse, 301, Search Console.
