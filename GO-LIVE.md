# GO-LIVE Checklist — CommercialRoofingIntel.com

Updated July 15, 2026 · Build: **dist-v1.6-LAUNCH-CANDIDATE.zip** (60 pages)
Engineering-side blockers: ALL CLEARED — see DEPLOYMENT-REPORT.md. Founder path: FOUNDER-LAUNCH-ACTIONS.md.
This session: canonical domain corrected to apex (commercialroofingintel.com), mobile
overflow launch blocker found & fixed on all pages, forms browser-tested, Polsia
noindex action documented.

**VERIFIED production contact (founder-confirmed):**
✅ Email: hila@victoryroofer.com — routed site-wide (contact page, footer, assessment, schema)
✅ Phone: (954) 634-2028 — displayed on contact page, footer, assessment page; tel: links + Organization schema
✅ Final codebase sweep: zero placeholder contact details remain (old addresses, pending-verification notes all removed and QA-verified in the built output)

## ✅ Cleared this session

- [x] Polsia branding: audited — zero references in the production codebase (it never had any; the Polsia site is a separate platform).
- [x] Metadata/schema/canonical/robots/XML sitemap: production-grade and QA-verified.
- [x] Social sharing: OG image (1200×630) + twitter card on every page.
- [x] Favicons: SVG + 32px PNG + 180px apple-touch-icon.
- [x] Production email routed site-wide: hila@victoryeniroofing.com (single source in `src/data/site.ts`).
- [x] Contact form + Assessment request form: built, spam-protected (honeypot), routed to /thanks/ — activate automatically when deployed on Netlify (attributes in place).
- [x] Ownership disclosure: Victory E&I named on Funding & Relationships with common-ownership language (flagged for confirmation, below).
- [x] Production QA: 60 pages, 3,807 internal links, 0 broken; 12/12 launch checks pass.

## 🔴 Blockers requiring YOU (Claude can't clear these)

1. **Confirm the Funding & Relationships wording** — legal entity names, ownership
   description, and fee structure need your + counsel's sign-off. The draft is live on
   the page with a visible "founder confirmation required" flag.
2. ~~Google Voice number~~ — **CLEARED: (954) 634-2028 verified and live site-wide.**
   (Still recommended: editors@commercialroofingintel.com forwarding to your inbox so
   the public editorial contact sits on the CRI domain.)
3. **Legal review** — Privacy Policy, Terms, and the assessment service terms.
4. **Hosting + domain** — create the host account (Netlify recommended: forms work
   instantly), connect the repo or drag `dist`, point CommercialRoofingIntel.com,
   enable HTTPS + www redirect.
5. **Partner agreement** — the no-pressure standard and referral fees in writing.

## 🟡 Blockers Claude can clear (next sessions)

6. **Verification sprint** — flip the 24 draft pages to `published` as sources clear
   (top-10 list in MASTER-ROADMAP). Launch gate: 20–30 published cornerstone pages.
7. **Benchmarks v1.0** — validate life-expectancy + maintenance rates; lift tool
   confidence caps; remove sample flag from the dataset.
8. **Photography** — you license (shot list in ROUND-1-REVIEW.md); I place.
9. **Analytics** — pick privacy-respecting provider (Plausible/Fathom), I wire it.

## Launch-day sequence (when the above is clear)

1. Deploy to host → in Netlify: Forms → notifications → add email notification to
   **hila@victoryroofer.com** for both forms ("contact" and "assessment") → submit a
   real test through each and confirm receipt.
2. Point domain, confirm HTTPS, www canonical redirect, and /sitemap-index.xml.
3. Submit sitemap to Google Search Console + Bing Webmaster.
4. Run Lighthouse on home, one article, one tool (targets: ≥95/100/100).
5. Final grep: zero `status: sample` pages public; drafts either published or noindexed.
6. Announce nothing until search console confirms indexing is clean.
