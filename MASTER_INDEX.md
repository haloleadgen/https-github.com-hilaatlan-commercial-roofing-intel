# Master Index — Commercial Roofing Intel

**Start here.** This is the single entry point for the project. Last updated July 16, 2026.

CommercialRoofingIntel.com — an independent commercial roofing knowledge platform.
Static site, Astro 5 + Pagefind. Source in `website/src/`, built output in `website/dist/`.

---

## Read these first

| Doc | What it is |
| --- | --- |
| **[KNOWN_ISSUES.md](KNOWN_ISSUES.md)** | Everything wrong right now, by severity. **Read before deploying.** |
| **[LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md)** | What must be true before go-live, and who can do it |
| **[CONTENT_INVENTORY.md](CONTENT_INVENTORY.md)** | Every page, its status, and what it needs |
| **[PROJECT_RULES.md](PROJECT_RULES.md)** | The non-negotiables. Read before changing anything. |
| **[INFRASTRUCTURE.md](INFRASTRUCTURE.md)** | Hosting, DNS, headers, deploy process, unknowns |
| **[SEO_CHECKLIST.md](SEO_CHECKLIST.md)** | Technical SEO state, verified vs unverified |
| **[DECISIONS.md](DECISIONS.md)** | Why the project is built the way it is |
| **[CHANGELOG.md](CHANGELOG.md)** | What changed, when |

## Release artifact

| | |
| --- | --- |
| **Package** | `website/dist-v1.9-RC2.zip` (679 KB, 162 files) — supersedes RC1 |
| **Build date** | 2026-07-16 |
| **Node** | v22.23.1 (matches `netlify.toml`) |
| **Status** | **Release candidate — not production.** Legal, DNS, and email gates are open. |

`dist-v1.9-RC1.zip` and `dist-v2.0-PRODUCTION.zip` are retained but **superseded**. RC1
predates the citation migration; v2.0-PRODUCTION predates the status framework entirely
and still carries the old trust badges. Deploy neither.

**Citation coverage:** structured citations are in **9 of 35** content files — every file
that has a real citation to structure. The other 26 have none, and now say so on the page
("Sources — none yet"). There is no hidden backlog of unstructured citations.

## The three facts that matter most today

1. **The build is clean and the site is honest.** `npm ci && npm run build` → exit 0,
   zero errors, zero warnings, 60 pages. Every trust claim is now gated on publication
   status, and the acceptance test passes: every visible source count equals the visible
   source entries on that page.
2. **Launch is still held — on editorial, legal and operational gates, not engineering.**
   3 pages are fully published; 2 emergency pages are editorially complete but await
   technical review by a qualified roofer; counsel has not reviewed privacy, terms, or the
   funding page; no hosting, DNS, or CRI-domain email exists.
3. **`status` is the only switch.** Indexing, search, sitemap, nav, homepage promotion and
   every badge derive from it. Change one word of frontmatter and the whole site updates
   consistently. Never route around it — see [PROJECT_RULES.md](PROJECT_RULES.md).

## The editorial status framework

| Status | Reader sees | Indexed | Searchable | Promoted |
| --- | --- | --- | --- | --- |
| `published` | Editorially reviewed · *N* sources cited | yes | yes | yes |
| `technical-review` | Technical review pending · *N* sources cited | yes | yes | yes |
| `preliminary` | Published with limitations — preliminary data | yes | yes | **no** |
| `draft` | Source verification in progress | no | no | no |
| `template` | Template — not yet published | no | no | no |

## Build and deploy, in one place

```bash
export PATH="$HOME/.local/node/bin:$PATH"   # Node v22.23.1 lives in ~/.local/node
cd website
npm install
npm run build        # astro build && pagefind --site dist
```
Deploy: connect the git repo to Netlify (**preferred** — it builds in UTC, which the
date logic is now immune to anyway, and the git history is a real audit trail), or drag
the contents of `website/dist/` to app.netlify.com/drop.

## Where things live

```
Commercial Roofing Intel/
├── MASTER_INDEX.md          ← you are here
├── KNOWN_ISSUES.md          ← the honest state
├── website/
│   ├── src/
│   │   ├── content/         ← the articles (Markdown). One file = one page.
│   │   ├── pages/           ← routes + governance pages (.astro)
│   │   ├── components/      ← 17 reusable pieces (TrustMeta, Card, Callout…)
│   │   ├── layouts/         ← Base, ArticleLayout, GovernanceLayout
│   │   ├── data/site.ts     ← SINGLE SOURCE for name, contact, pillars, nav
│   │   └── styles/global.css ← the whole design system, tokens at the top
│   ├── astro.config.mjs     ← build + the noindex/sitemap status logic
│   ├── netlify.toml         ← headers, redirects, build command
│   ├── dist/                ← built site (TRACKED in git — see below)
│   └── preview/             ← click-through copy, opens without a server
└── screenshots/             ← desktop + mobile captures
```

**`website/dist/` is tracked in git.** This was originally because no Node toolchain
existed and `dist/` could not be regenerated. **Node 22 is now installed**, so that
rationale is gone — the reason to keep tracking it is now only that it gives a visible
diff of what actually ships. Once Netlify builds from git, ignore it again
(DECISIONS.md D8).

---

## Version control

The project **was previously unversioned.** A git repository was initialised during
this review, with a baseline commit capturing the pre-review state. To undo anything
from this session:

```bash
cd "Commercial Roofing Intel"
git log --oneline          # find the baseline commit
git diff <baseline> HEAD   # see exactly what changed
git revert <commit>        # or restore a single file:
git checkout <baseline> -- path/to/file
```

---

## Status of the older documents

These predate this review. Useful as history; **not authoritative where they
conflict with KNOWN_ISSUES.md.**

| Doc | Standing |
| --- | --- |
| `GO-LIVE.md` | ⚠️ **Superseded in part** — carries a warning banner. Its "engineering blockers ALL CLEARED" claim was wrong and its contradictory email (`victoryeniroofing.com`) is now fixed. Use LAUNCH_CHECKLIST.md instead. |
| `FOUNDER-LAUNCH-ACTIONS.md` | Current — the founder-side blockers still stand |
| `VERSION-1-REPORT.md` | Superseded. Says "33 pages"; the build is 60. Its *launch rule* still holds. |
| `START HERE.md` | Stale — points at `dist-v1.1.zip`; the current package is `dist-v2.0-PRODUCTION.zip`. Carries a pointer banner. |
| `DEPLOYMENT-REPORT.md` | Historical. Its "3,807 internal links, 0 broken" is superseded: the current build measures **3,458 links, 0 broken**. |
| `ROUND-1-REVIEW.md`, `SESSION-NOTES.md`, `VERIFICATION-LOG.md`, `MASTER-ROADMAP.md`, `BUSINESS-IMPACT-REPORT.md`, `PAGE-EXPORTS.md`, `ASSESSMENT-PAGE-EXPORT.md`, `POLSIA-HANDOFF-INVENTORY.md` | Historical record. Overlapping and partly superseded — see KNOWN_ISSUES #9. |

**The launch rule from `VERSION-1-REPORT.md` still stands and is still unmet:**
> Don't launch until the governance pages are final, 20–30 real cornerstone articles
> are written, and the estimator's data is validated.

Today: governance pages are strong, **3** cornerstone articles are published, and the
estimator's dataset is still `v0.1 — sample / not for citation`. Two of those three
conditions are unmet, which is why the recommendation is **hold launch**.

The difference after this session: nothing on the site *claims* otherwise any more.
An early, honest site is a fine thing to launch. An early site wearing the costume of
a mature one is not — and that is what was fixed.
