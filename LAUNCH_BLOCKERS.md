# LAUNCH_BLOCKERS — CommercialRoofingIntel.com

July 23, 2026 · Produced by the full production-readiness audit (v2.5 session)
Supersedes PUNCH-LIST.md severity ordering where they conflict. Working branch: `citations/astm-membrane-drafts`.

**Method:** clean build from source in a verified environment (Node 22, `npm ci`, `npm run build` → exit 0, `npm run verify` → PASS, 60 pages / 48 indexable) · independent automated sweep of all 60 built pages (links, metadata, duplicates, placeholders, contact consistency) · axe-core WCAG 2.2-AA scan · touch-target measurement at 375px · four parallel editorial reviews covering every content file and page template, each finding then re-verified against the built HTML before any fix.

---

## Fixed in this audit (committed; see CHANGELOG v2.5)

**Trust-integrity regressions — the important ones:**
1. "Evidence-based" appeared on 3 built pages (About, Mission, Knowledge hub) despite the v2.4 QA claim of zero. Now actually zero; replaced with "source-cited," which the site has earned.
2. **About page said CRI "is operated by Victory E&I Roofing"** — flatly contradicting the funding page's "independently operated" and the platform's core positioning. Rewritten to the accurate formulation: independently operated, common ownership with Victory E&I disclosed, linking the funding page. Also removed an unverified "founded in 2024" claim.
3. **Homepage "In verification now" list was stale** — it named four already-published articles, meaning the homepage misstated the site's own publication status. Now lists only genuinely unpublished work.
4. **Tools hub said "neither [calculator] will give you a number. We removed their output" — false.** The Maintenance Budget Planner had a live calculator emitting dollar ranges from self-described "unvalidated placeholder" rates. The planner is now gated exactly like the estimator (form/output/script removed, methodology kept published for scrutiny); the hub's claim is now true. *Founder may reverse this — it's one git revert — but the previous state had two adjacent pages contradicting each other.*
5. Dataset page takeaway claimed the benchmarks "power the CRI Roof Life Expectancy Estimator" while the same page said "Do not cite them" and the estimator is gated. Fixed, plus a false "Superseded by v1.0" (v1.0 doesn't exist → "Will be superseded").
6. Assessment page cited "when the Estimator returns a low-confidence range" as a trigger — the estimator returns nothing. Thanks page invited users to "Run the Estimator" — same problem. Both fixed.
7. Homepage sidebar credited "Reviewed by Hila Atlan, Founder & Editor-in-Chief" as a *fallback for any page without a named reviewer* — an unearned completed-review claim. Now only shown when frontmatter actually names a reviewer.
8. "Published means editorially reviewed" (homepage) and "Every page is reviewed…" / "Technical pages receive subject-matter review" (Editorial Standards) softened to policy language a one-person operation can honestly stand behind.
9. Human sitemap page linked template pages (ponding-water, role hubs, TPO-vs-EPDM), contradicting the homepage promise that draft work "stays unlinked." Templates now excluded.
10. Sitewide pillar summaries overclaimed: "Proprietary datasets… hurricane-performance analysis" (none exist), present-tense AI assistant, "decision tools" in the default meta description. All moved to honest in-development framing.

**Accessibility:**
11. **Both forms' spam honeypot was keyboard-focusable** — a screen-reader/keyboard user could tab in, fill it, and have Netlify silently discard their submission as a bot. On the assessment form that's the revenue path. Fixed (`tabindex="-1"`, `autocomplete="off"`); axe now reports 0 WCAG-AA violations on all 8 templates scanned.
12. The deferred WCAG 2.5.8 touch-target failure fixed: list/breadcrumb/footer/nav links measured 15–22px tall; now ≥24px. Remaining flags are full-card overlays and inline-prose links, both compliant by design/exception.

**Content accuracy:**
13. BUR service-life takeaway misstated its own cited source (said "20–30 yrs, 4-ply toward the high end"; source: 3-ply 15–20, 4-ply 20–30). Corrected in takeaway and table.
14. Mod-bit absolute overclaim ("damage that would leak through *any* single-ply *immediately*") softened. TPO market-share and formulation-variance claims hedged as trade consensus pending a source. White-vs-black "slows membrane aging" flagged as trade expectation not covered by the page's sources, in takeaway and body.
15. Glossary mil-thickness said 60 mil ≈ "a credit card and a half" — arithmetic wrong (a card ≈ 30 mil); now "two credit cards."
16. The ponding-water template's "NRCA guidance" citation pointed to hinarratives.com, a third-party mirror — removed with an honest note; a primary NRCA source is required before that term publishes.
17. Nine British spellings Americanized on the two emergency pages; EPDM/metal range-notation inconsistencies unified; PVC maintenance cadence contradiction clarified; two related-link titles corrected; grammar fix in metal article; "no pressure standard" → "no-pressure standard"; homepage referral-consequence claim aligned with the written policy ("grounds for removal"); Organization schema phone now derived from site.ts instead of hardcoded.

**Safety re-verified (no changes needed):** no roof-access advice, no puncture-the-ceiling advice in any form, electrical guidance matches Ready.gov, no insurance-outcome promises, no state law stated as national fact. All four situations pages disclose pending professional review via the status machinery.

---

## 🔴 Launch blockers — all founder-side; nothing below is producible by Claude

1. **Hosting + DNS.** No Netlify account confirmed; domain still on the GoDaddy placeholder. *(Deploy is on hold per your instruction — when you lift it, DEPLOYMENT-RUNBOOK.md is current.)*
2. **Polsia parallel site** (`commercial-roofing-intel-llc.polsia.app`) — must be deleted or rebranded **before** DNS cutover. Last verified live July 21.
3. **Finish the GitHub push.** The `citations/astm-membrane-drafts` branch (all current work) is safely on GitHub, but `main` and the three tags still need: `git push origin main` and `git push origin --tags`. Two commands, a few seconds.
4. **Same-hour post-deploy verification** of both forms + email delivery (Runbook Step 2). The assessment form is the revenue path and is untestable before deploy.
5. **Legal-review decision, made consciously.** Counsel review of Privacy, Terms, and the funding-wording — or a recorded founder decision to soft-launch carrying the honestly-disclosed draft status. Deciding *nothing* is the only wrong option.

## 🟠 Before promotion (not before soft launch)

6. **Professional review of the four Situations pages** — roofing professional ×3, commercial-claims professional ×1. The single biggest editorial action left; hold outreach/announcement until at least the two emergency pages clear.
7. **Partner agreement in writing** — referral fees + the no-pressure standard (the site now says pitching is "grounds for removal"; the written agreement should say the same).
8. **CRI-domain email** provisioned and send/receive tested, then swap `site.ts`.

## 🟡 Flagged for editorial judgment — needs a decision, not urgent

9. **Planner gating ratification** — I gated the Maintenance Budget Planner to match the estimator and the Tools hub's stated standard (fix #4 above). If you'd rather run it live with its Low-confidence label, revert the one commit and rewrite the hub copy instead.
10. Five unsourced-but-plausible trade claims left hedged rather than sourced (each noted in the page's verification-outstanding list where one exists): D7635 measurement scope on the 45-mil page; the grease-voids-TPO-warranty claim (tpo-vs-pvc); deck-type fastener suitability (adhered-vs-MA); "mod-bit has largely replaced new BUR" and kettle-crew scarcity (modbit-vs-bur); acrylic-under-ponding implication (coating-vs-replacement).
11. Funding page: "Editorial staff compensation is independent of referral revenue" — under single-principal common ownership this needs counsel's eyes (page is already noindexed pending counsel).
12. Contact/Thanks: "We reply to every message" — an operational promise; keep only if you'll keep it.
13. The tpo-vs-epdm template's boilerplate claims sources it doesn't have — harmless while `template`, must be rewritten before it publishes.
14. Estimator page is deliberately **indexed** while the planner is **noindexed** — both are defensible (the estimator page is pure self-explanation), but pick one policy and note it in DECISIONS.md.

## ⚪ Unchanged from prior audits

Benchmarks v1.0 validation (gates both tools) · remaining template pages · Astro CVE (verified not applicable; revisit post-launch) · photography · Flat Roof Failure Encyclopedia (Month-1 flagship) · root-doc archival · human screen-reader pass · live-URL checks (CWV, rich results, 301) impossible before deploy.

---

**Bottom line:** the build is clean, verified, and *more honest than it was yesterday* — this audit found and fixed ten trust-language regressions that contradicted the site's own standards, including one form-breaking accessibility bug on the revenue path. Nothing new blocks launch. The critical path is unchanged and entirely founder-side: finish the push (2 commands), kill Polsia, get hosting, decide on counsel, deploy, test the forms within the hour.
