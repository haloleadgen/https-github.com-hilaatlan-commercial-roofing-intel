# Deployment Runbook — CommercialRoofingIntel.com

July 21, 2026 · Deploy artifact: **`website/dist-v2.4-RC2.zip`**
SHA-256 `9c37cc9287db55c5671dea81ed42f038de75592849381ae17d1f9783d81dfb0c`

RC2 = RC1 + two surgical accessibility fixes (footer contrast 2.95:1 → 9.93:1;
`aria-label` on the header search link). No content changes. RC1 remains the frozen
baseline: git tag **`v2.4-RC1-recovery`** at commit `e7b2a04`, zip SHA-256
`a880b451…4bf16`. To roll back anything: `git checkout v2.4-RC1-recovery -- <path>`.

---

## Step 0 — Pre-flight (already done, July 21)

- Clean rebuild → exit 0 · 60 pages · 48 indexable · `npm run verify` PASS.
- Zip contents diffed against the verified `dist/` → identical.
- Browser QA on the exact artifact (Playwright, desktop 1366px + mobile 375px):
  25 page checks — all 200, zero console errors, zero horizontal overflow, one h1
  each; mobile nav toggle works (`aria-expanded` toggles); all 24 header/nav/footer
  links resolve; Pagefind search returns results ("TPO" → 24 result links).
- Sitemap ↔ files ↔ canonicals ↔ noindex cross-checked: 48/48 consistent.
- Both forms carry `data-netlify="true"`, `netlify-honeypot`, `name=`, and
  `action="/thanks/"` (the `/thanks/` page exists in the artifact).
- Lighthouse (localhost lab, not field data): homepage 100 perf / 96 a11y /
  100 best-practices / 100 SEO; article page 100/100.

## Step 1 — Deploy to Netlify (founder or Claude-with-access)

**Path A — connect the git repo (preferred).**
1. Push the repo to a **private** GitHub repository (it currently exists only on
   this Mac — that is a single point of failure regardless of deployment).
2. Netlify → Add new site → Import an existing project → pick the repo.
3. Set **base directory** to `website/`. Build command and publish dir are read
   automatically from `netlify.toml` (`npm run build`, `dist`, Node 22).
   `sharp` is now a tracked devDependency, so the OG-card step builds cleanly.
4. Deploy. Netlify builds from source — the artifact of record becomes the commit.

**Path B — drag-and-drop (fastest, no git hosting needed).**
1. Unzip `dist-v2.4-RC2.zip` locally.
2. app.netlify.com/drop → drag the **`dist` folder itself** (not the zip — the zip
   nests everything under `dist/` and would break all paths).
3. Headers still apply (duplicated in `dist/_headers`); the `www→apex` redirect in
   `netlify.toml` does NOT apply to drop deploys — Netlify's domain settings handle
   it once the apex is set primary.

## Step 2 — Forms + email (same hour as deploy)

1. Netlify dashboard → Forms → confirm `assessment` and `contact` were detected.
2. Forms → Form notifications → add **email notification** for each form →
   deliver to `hila@victoryroofer.com` (until CRI-domain email exists).
3. Submit BOTH forms for real from the live site (use a real reachable email).
4. Verify: submission appears in Netlify Forms UI **and** the notification email
   arrives. The assessment form is the revenue path — a silently broken form is
   the single most expensive possible failure.
5. Check the spam folder for the notification; whitelist the sender.

## Step 3 — Domain cutover (GoDaddy → Netlify)

1. Netlify → Domain settings → add `commercialroofingintel.com` and
   `www.commercialroofingintel.com`; set the **apex as primary**.
2. In GoDaddy DNS: point the apex per Netlify's instructions (A record to
   Netlify's load-balancer IP, or ALIAS/ANAME if offered) and CNAME `www` to the
   Netlify site.
3. Wait for propagation; Netlify auto-provisions Let's Encrypt SSL. Confirm the
   padlock and that `http://` redirects to `https://`.
4. Verify `www.commercialroofingintel.com/anything` 301s to the apex.
5. Retire the GoDaddy "coming soon" site so it can never resurface.

## Step 4 — Live-URL QA (same day; none of this is testable before DNS)

- Lighthouse against `https://commercialroofingintel.com/` (homepage + one
  article) — first real field-adjacent numbers.
- Google Rich Results Test on the homepage, one article, one glossary page.
- Search Console: verify the domain property, submit `/sitemap-index.xml`.
- Confirm `robots.txt` serves and references the sitemap (it does in-artifact).
- Confirm Pagefind search works on the live host.
- Re-run both form submissions on the production domain (Step 2 tested the
  netlify.app URL if done pre-cutover).

## Step 5 — Single public identity

Shut down or fully rebrand `commercial-roofing-intel-llc.polsia.app` (verified
still live July 21, presenting a "Get a Quote"/Services hybrid under the CRI
name). This requires the founder's Polsia account: polsia.com → project settings
→ delete/unpublish, or rename away from "Commercial Roofing Intel". Do this
**before** DNS cutover so no crawler ever indexes two CRIs.

## Step 6 — Post-launch holds (do not skip)

- Counsel review of Privacy, Terms, Funding & Relationships (pages honestly carry
  draft notices until then; funding page stays noindexed).
- Professional review of the four `technical-review` Situations pages.
- Keep the estimator and benchmarks gated until dataset v1.0.
- Analytics decision — reconcile with the Privacy Policy BEFORE adding any script.
