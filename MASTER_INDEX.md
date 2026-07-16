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

## The two facts that matter most today

1. **No Node.js is installed on this machine.** The site cannot be built or verified
   here. `dist/` is currently **out of sync with source** and must not be deployed
   until someone rebuilds on a machine with Node 22. See KNOWN_ISSUES #1.
2. **The site is engineered well ahead of its content.** 60 pages exist; 23 are
   indexable; only **3** are substantive published articles. The framework is the
   asset. The content is the gap. See CONTENT_INVENTORY.md.

---

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

**`website/dist/` is tracked in git on purpose.** Normally build output is ignored,
but with no Node toolchain on this machine it cannot be regenerated locally — it is
the only deployable artifact, so it is the artifact of record. Once a build
environment exists, consider ignoring it again.

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
| `GO-LIVE.md` | Mostly current. ⚠️ Contains a **contradictory email address** — `victoryeniroofing.com` is wrong; the code correctly uses `hila@victoryroofer.com`. See KNOWN_ISSUES #6. |
| `FOUNDER-LAUNCH-ACTIONS.md` | Current — the founder-side blockers still stand |
| `VERSION-1-REPORT.md` | Superseded. Says "33 pages"; the build is 60. Its *launch rule* still holds. |
| `START HERE.md` | Stale — points at `dist-v1.1.zip` as current; v1.8 exists |
| `DEPLOYMENT-REPORT.md` | Historical — claims engineering blockers "ALL CLEARED"; no longer true (KNOWN_ISSUES #1, #2) |
| `ROUND-1-REVIEW.md`, `SESSION-NOTES.md`, `VERIFICATION-LOG.md`, `MASTER-ROADMAP.md`, `BUSINESS-IMPACT-REPORT.md`, `PAGE-EXPORTS.md`, `ASSESSMENT-PAGE-EXPORT.md`, `POLSIA-HANDOFF-INVENTORY.md` | Historical record. Overlapping and partly superseded — see KNOWN_ISSUES #7. |

**The launch rule from `VERSION-1-REPORT.md` still stands and is still unmet:**
> Don't launch until the governance pages are final, 20–30 real cornerstone articles
> are written, and the estimator's data is validated.

Today: governance pages are strong, **3** cornerstone articles are published, and the
estimator's dataset is still `v0.1 — sample / not for citation`.
