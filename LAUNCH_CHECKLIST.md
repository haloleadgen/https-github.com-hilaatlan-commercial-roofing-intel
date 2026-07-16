# Launch Checklist — CommercialRoofingIntel.com

Updated July 16, 2026 · Supersedes the checklist sections of `GO-LIVE.md` and
`VERSION-1-REPORT.md` where they conflict.

**Launch readiness: NOT READY.** One hard technical blocker, one content decision,
and four items only you can clear.

---

## 🔴 Hard blockers — the site must not go live until these are done

- [ ] **Rebuild `dist/` on a machine with Node 22.** The current `dist/` and
      `dist-v1.8-PRODUCTION.zip` contain the false citation badges. The fixes are in
      source only. Nothing in this session has been compiled or rendered.
      ```bash
      cd website && npm install && npm run build
      ```
      Verify: `grep -ro '[0-9]* sources cited' dist --include="*.html" | sort | uniq -c`
      → expect `3 sources cited` ×2, `1 source cited` ×1, **no** `0 sources cited`.
      *(KNOWN_ISSUES #1)*

- [ ] **Decide on `repair-or-replace`.** Source its two numeric thresholds, or set
      `status: draft`. Do not launch a quantitative decision guide with an
      "Evidence-based" badge and one citation. *(KNOWN_ISSUES #3 — your call, options listed there)*

- [ ] **Confirm the Funding & Relationships wording with counsel.** Legal entity
      names, the Victory E&I common-ownership description, and the fee structure.
      The page still carries a visible "founder confirmation required" flag.

- [ ] **Legal review** — Privacy Policy, Terms, and the assessment service terms.
      Both pages carry a "legal review required" flag.

## 🟠 Strongly recommended before you promote the site anywhere

- [ ] **Fix the empty pillar hubs.** Five of six hubs are indexable with zero
      indexable children. Either noindex them until each has a published child, or
      publish content first. *(KNOWN_ISSUES #4)*

- [ ] **Get past 3 articles.** The project's own launch rule says 20–30. There are 23
      drafts that need citations, not writing. Ten published would change the picture.
      *(CONTENT_INVENTORY.md)*

- [ ] **Correct the email contradiction in `GO-LIVE.md`** — it lists both
      `victoryroofer.com` and `victoryeniroofing.com`. The code is right; the doc is
      wrong. Fix the doc before someone "fixes" the code. *(KNOWN_ISSUES #6)*

- [ ] **Benchmarks v1.0** before the estimator is indexed. Its methodology section is
      still the literal word "Placeholder:". *(CONTENT_INVENTORY.md → Tools)*

## 🔵 Only you can do these (Claude cannot)

- [ ] **Hosting + domain** — create the Netlify account, connect the repo (now that
      one exists) or drag the *rebuilt* `dist/`, point commercialroofingintel.com,
      enable HTTPS, confirm the www → apex redirect fires.
- [ ] **Partner agreement in writing** — the no-pressure standard and referral fees.
- [ ] **Google Search Console** — verify the domain, submit `/sitemap-index.xml`.
- [ ] **Analytics** — decide whether to run any, and reconcile with the Privacy Policy.
- [ ] **`editors@commercialroofingintel.com`** — recommended so the public editorial
      contact sits on the CRI domain rather than the contractor's.

## ✅ Verified as done

- [x] Contact details consistent site-wide — `hila@victoryroofer.com` (184×),
      `(954) 634-2028` (62×), single-sourced from `src/data/site.ts`. No placeholders remain.
- [x] Security headers — X-Frame-Options, X-Content-Type-Options, Referrer-Policy,
      Permissions-Policy, HSTS. In **both** `netlify.toml` and `dist/_headers`, so they
      apply to git deploys and drag-drop deploys alike.
- [x] www → apex 301 redirect configured.
- [x] `robots.txt` — allows all, points at `sitemap-index.xml`. Correct.
- [x] Sitemap contains exactly the 23 indexable URLs; every draft/sample page is
      excluded automatically by status. Logic verified in `astro.config.mjs`.
- [x] noindex discipline — 37 of 60 pages correctly noindexed.
- [x] Favicons, OG image, Twitter cards present.
- [x] Version control — the project is now a git repo with a baseline commit. It was
      previously unversioned.
- [x] Cache headers for `/pagefind/*`, PNG, SVG.

## ⚠️ Cannot be verified on this machine — do not claim these are done

No Node, no browser automation against a real server. **Do not report a score you
have not run.**

- [ ] Lighthouse / Core Web Vitals — architecture is favourable (static, no client
      framework, system fonts, 2.1 MB dist) but **nothing has been measured**.
- [ ] Accessibility audit — the code reads well (skip link, landmarks, single h1,
      `aria-expanded`, `aria-live`, focus rings, reduced-motion) but no axe or
      screen-reader pass was run. Static reading is not an audit.
- [ ] Contact + assessment forms — Netlify-dependent, untestable until deployed.
      **Test both immediately after first deploy.**
- [ ] Search (Pagefind) — needs a real server.
- [ ] Broken-link sweep — prior docs claim 3,807 links / 0 broken; not re-verified.

---

## Suggested order

1. Rebuild on a Node machine → confirms the badge fixes landed.
2. Decide `repair-or-replace`; fix the empty hubs.
3. Counsel: funding page, privacy, terms.
4. Deploy to Netlify → **immediately test both forms** and search.
5. Search Console + sitemap.
6. Then publish drafts steadily, un-noindexing hubs as their children land.
