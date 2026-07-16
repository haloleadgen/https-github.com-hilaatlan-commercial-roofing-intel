# Infrastructure — Commercial Roofing Intel

Updated July 16, 2026. **Verified** = checked in a file this session.
**UNKNOWN** = cannot be determined from this machine. Nothing here is guessed.

---

## Stack

| Layer | What | Status |
| --- | --- | --- |
| Generator | Astro 5 (static), `format: 'directory'` | Verified — `astro.config.mjs` |
| Search | Pagefind 1.3 (static, self-hosted, no third party) | Verified in `package.json` |
| Client JS | None. No framework. | Verified — no framework deps |
| Fonts | System stack, no CDN, no tracking | Verified — per V1 report + no font links |
| Build | `astro build && pagefind --site dist` | Verified — `package.json` |
| Node | **22** (declared) | Declared in `netlify.toml` |
| Output | 60 HTML pages, ~2.1 MB `dist/` | Verified |

## 🔴 Build environment — the blocker

**No Node.js on this machine.** No `node`, `npm`, Homebrew, nvm, volta, asdf, or
bundled runtime. `npm run build` cannot run here. `node_modules/` is not installed.

Consequence: `dist/` cannot be regenerated locally, is **tracked in git as the
artifact of record**, and is **currently out of sync with source.**

To fix, on any machine with Node 22:
```bash
cd website
npm install
npm run build
```

Recommended long-term: connect the git repo to Netlify so builds happen on Netlify's
runners and this machine never needs Node. That also makes `dist/` ignorable again.

## Hosting — UNKNOWN

`netlify.toml` is configured and Netlify is the intended host, **but no account,
site ID, or deploy has been confirmed.** Treat hosting as not yet existing.

```toml
[build]  command = "npm run build"   publish = "dist"
[build.environment]  NODE_VERSION = "22"
```

Two deploy paths, both supported:
- **Git-connected** (recommended) — Netlify builds on push. Requires a remote; the
  repo is currently local-only with no remote configured.
- **Drag-and-drop** — upload the contents of a freshly built `dist/` to
  app.netlify.com/drop. Headers still apply because they are duplicated in
  `dist/_headers`. **Only ever drop a rebuilt dist.**

## Domain / DNS / SSL — UNKNOWN

- `commercialroofingintel.com` — registrar, nameservers, and whether it is even
  registered: **not verifiable from here.**
- Canonical is the **apex** (`https://commercialroofingintel.com`), set in
  `astro.config.mjs` (`site:`) and `src/data/site.ts` (`domain:`). Consistent. Verified.
- www → apex 301 configured in `netlify.toml`. **Untested** — verify after DNS.
- HTTPS/SSL — Netlify provisions Let's Encrypt automatically. Confirm after DNS.

## Security headers — Verified, and correctly duplicated

Present in **both** `netlify.toml` and `dist/_headers`, so they apply to git-connected
*and* drag-drop deploys. This is a good catch by whoever set it up.

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

Not present: **Content-Security-Policy**. Worth adding — the site has no third-party
scripts, so a strict CSP would be unusually easy here. Post-launch; verify it doesn't
break Pagefind.

## Caching — Verified

| Path | Cache-Control |
| --- | --- |
| `/pagefind/*` | `public, max-age=604800` (7d) |
| `/*.png`, `/*.svg` | `public, max-age=31536000, immutable` |

Astro's hashed `_astro/` assets get Netlify's defaults. Fine.

## robots.txt — Verified

```
User-agent: *
Allow: /
Sitemap: https://commercialroofingintel.com/sitemap-index.xml
```
Correct. Per-page `noindex` does the real work — see SEO_CHECKLIST.md.

## Sitemap — Verified

`@astrojs/sitemap` with a custom filter in `astro.config.mjs` that reads each content
file's `status` frontmatter and excludes anything not `published`, plus `/search/`,
`/thanks/`, `/404/`, and both tools. Output: `sitemap-index.xml` → `sitemap-0.xml`,
**23 URLs**, matching the 23 indexable pages exactly. The logic is sound.

## 404 — Verified

`dist/404.html` exists; Netlify serves it automatically.

## Redirects — one, unverified

www → apex only. No legacy URLs to preserve (new domain), so nothing else is needed.

## Forms — built, UNTESTABLE here

Contact + assessment forms use Netlify form attributes with a honeypot, routing to
`/thanks/`. They **only work once deployed on Netlify**. Cannot be tested locally.
**Submit both for real immediately after the first deploy** — a silently broken
contact form on a lead-generating site is an expensive failure.

## Analytics — none, by omission

No analytics of any kind is present. This appears deliberate (it fits the
no-third-party, privacy-forward posture). If you add any, reconcile it with the
Privacy Policy first, and prefer a cookieless option.

## Version control — new this session

Previously **unversioned**. Now a local git repo with a baseline commit.
No remote configured. Add one (private) to enable Netlify git deploys and offsite backup.

## Verification summary

| Item | State |
| --- | --- |
| Build config, headers, redirects, robots, sitemap, 404, caching | ✅ Verified in-file |
| Contact details consistent site-wide | ✅ Verified (184 + 62 occurrences) |
| Hosting account, DNS, SSL, domain registration | ❓ UNKNOWN |
| Forms end-to-end, search, CWV, a11y audit, link sweep | ❓ Untestable here |
| `dist/` matches source | ❌ **No — rebuild required** |
