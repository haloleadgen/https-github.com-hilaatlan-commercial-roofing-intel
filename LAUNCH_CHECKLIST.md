# Launch Checklist — CommercialRoofingIntel.com

Updated July 16, 2026 · Supersedes the checklist sections of `GO-LIVE.md` and
`VERSION-1-REPORT.md` where they conflict.

**Status: HOLD LAUNCH.** Not for engineering reasons — the build is production-ready
and every engineering blocker from the last review is cleared. The remaining blockers
are **editorial, legal, and operational.**

Deployable package: **`website/dist-v2.0-PRODUCTION.zip`** (646 KB, 160 files) — built
clean from source, verified to contain the fixes.

---

## 🔴 Blockers — do not launch until these are true

### Editorial
- [ ] **Publish more than 3 articles.** Your own rule says 20–30. There are 23 drafts
      that need *citations, not writing*. Ten published clears the bar and un-noindexes
      the hubs automatically. *(KNOWN_ISSUES #1)*
- [ ] **Decide `repair-or-replace`** — source its two uncited numeric thresholds, or
      set `status: draft`. *(KNOWN_ISSUES #2)*
- [ ] **Emergency pages need a qualified author.** `my-roof-is-leaking` and
      `storm-damage-first-72-hours` are literal `Placeholder:` stubs. They are safely
      hidden today, but the Situations pillar cannot launch without them.
      **Do not have an AI write these.** *(KNOWN_ISSUES #3)*
- [ ] **Decide "Every claim sourced"** on the homepage hero — currently not true while
      #2 stands. *(KNOWN_ISSUES #5)*

### Legal / founder
- [ ] **Funding & Relationships wording** — counsel sign-off on entity names, the
      Victory E&I common-ownership language, and the fee structure. The page still
      carries a visible "founder confirmation required" flag.
- [ ] **Legal review** — Privacy Policy, Terms, assessment service terms.
- [ ] **Partner agreement in writing** — no-pressure standard + referral fees.

### Operational
- [ ] **The assessment offer must be real on day one.** Its "Pre-launch note" is gone,
      so the page now makes an unqualified offer: partner coverage and request handling
      must actually work. *(KNOWN_ISSUES #6)*
- [ ] **Hosting + domain** — create the Netlify account, connect the repo (one exists
      now) or drag the *rebuilt* `dist/`, point commercialroofingintel.com, enable
      HTTPS, confirm www → apex.

## 🟠 Immediately after first deploy — do these the same hour

- [ ] **Submit the contact form for real.** Netlify-dependent; cannot be tested before
      deploy. Confirm it arrives at hila@victoryroofer.com.
- [ ] **Submit the assessment form for real.** Same. This is your revenue path.
- [ ] **Run Lighthouse against the live URL.** Local numbers are not field data.
- [ ] **Verify the www → apex 301** actually fires.
- [ ] **Search Console** — verify the domain, submit `/sitemap-index.xml`.
- [ ] **Rich Results Test** on the three published articles.
- [ ] Confirm search works on the live host (Pagefind needs a real server).

## ✅ Cleared this session — verified, not assumed

**Build**
- [x] Node v22.23.1 installed (matches `netlify.toml`), checksum-verified from nodejs.org.
- [x] `npm install && npm run build` → **exit 0, zero warnings, zero errors, 60 pages.**
- [x] Fixed the build being broken outright: `astro.config.mjs` used `URL.pathname`
      (URL-encoded), so the space in "Commercial Roofing Intel" became `%20` and every
      fs call failed with ENOENT. Now `fileURLToPath`.
- [x] Clean-from-scratch build reproduces output identically.

**Trust**
- [x] Citation badges match real sources exactly: TPO 3, EPDM 3, repair-or-replace 1.
- [x] "0 sources cited" eliminated (EPDM was advertising it while citing 3 sources).
- [x] Evidence badge: 37 pages → **3** (34 were unpublished placeholders).
- [x] "Reviewed by Hila Atlan, Editor-in-Chief": **0** unpublished pages now claim it.
- [x] Estimator's fabricated `sources={12}` removed (it listed zero citations).
- [x] Zero staging/internal language on any indexable page.
- [x] Contact page: removed a public note naming an internal doc ("see GO-LIVE checklist").
- [x] Assessment page: removed public "Pre-launch note".

**Discovery**
- [x] Search indexed 44 pages (34 unpublished) → **10 (0 unpublished)**.
- [x] Site nav links to **zero** unpublished pages (was 6).
- [x] Homepage promotes only published work; stats count published only (was
      advertising "9 Encyclopedia articles" against 2 readable).
- [x] Empty hubs noindex themselves; sitemap matches. Reverses automatically on publish.
- [x] Sitemap = 18 URLs = exactly the 18 indexable pages.

**Quality**
- [x] **3,458 internal links, 0 broken.**
- [x] Zero heading-order violations across 60 pages (4 hubs jumped h1→h3; fixed with
      visually-hidden h2s, no visual change).
- [x] 1 `h1` per page · 0 images missing alt · 0 unlabeled inputs · skip link ·
      landmarks · mobile menu `aria-expanded` verified.
- [x] No horizontal overflow at 375px. No console errors.
- [x] Fixed a sitewide date bug: `new Date('2026-07-01')` parsed as UTC rendered
      "June 30, 2026" in EDT, and output varied by build machine timezone.
- [x] 1.8 MB dist · 24 KB CSS · **no JS bundle** · zero third-party requests · CLS 0.
- [x] Security headers in both `netlify.toml` and `dist/_headers`; robots; 404.
- [x] Canonical / description / OG / Twitter: **60/60**.

## ⚠️ Do not claim these — not measured

- **Real-world Core Web Vitals.** FCP/LCP ≈124 ms is **localhost**. Structure predicts
  excellent field numbers; nothing is proven until measured on the live URL.
- **Forms** — untestable pre-deploy.
- **Screen-reader testing** — automated checks pass; no human/AT pass was run.

---

## Order of operations

1. Editorial: publish drafts with real citations; resolve #2 and #3.
2. Counsel: funding page, privacy, terms.
3. Confirm the assessment workflow is genuinely operational.
4. Deploy `dist-v2.0-PRODUCTION.zip` (or connect the repo — preferred; Netlify builds
   in UTC and the git history is now a real audit trail).
5. **Same hour:** test both forms, Lighthouse, 301, Search Console.
6. Publish steadily. Hubs and search re-open themselves as content lands.
