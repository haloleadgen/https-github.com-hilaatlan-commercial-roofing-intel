# Commercial Roofing Intel — your website folder

Everything for CommercialRoofingIntel.com lives here.

> 📍 **New (July 16, 2026): [MASTER_INDEX.md](MASTER_INDEX.md) is now the entry point**
> for the whole project — it maps every document and marks which are out of date.
> If you're about to launch, read [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md) and
> [KNOWN_ISSUES.md](KNOWN_ISSUES.md) first. **The site is not ready to deploy** —
> `dist/` must be rebuilt on a computer with Node.js first, and the table below is
> out of date (v1.8 is the latest build, not v1.1).

## Want to look at the site?

Open **website → preview → index.html** (double-click it).
The whole site works in your browser — all pages, navigation, and the
Roof Life Expectancy Estimator. Only search is disabled in this preview
(it needs a real web server; it works once the site is hosted).

## Want to change something?

- **Words on a page:** the content files are in `website/src/content/` —
  plain text (Markdown) files you can open in any text editor. One file = one page.
- **Colors, fonts, spacing:** one file controls everything —
  `website/src/styles/global.css` (the settings are listed at the top).
- **Navigation and pillar names:** `website/src/data/site.ts`.
- **Homepage:** `website/src/pages/index.astro`.

After changing source files, the site needs to be rebuilt to show the changes
(ask Claude, or a developer runs `npm install` then `npm run build` in the
`website` folder). The preview folder shows the site as of the last build.

## What's what

| Item | What it is |
| --- | --- |
| `website/preview/` | Click-through copy of the site — safe to open anytime |
| `website/src/` | The source — content, design, templates |
| `website/dist-v1.1.zip` | The current built site, ready to upload to a host (or drag onto app.netlify.com/drop for an instant live URL). `dist.zip` is the older V1 build. |
| `screenshots/` | Desktop + mobile captures of every major page (Round 1) |
| `VERSION-1-REPORT.md` | What's built, what's left before launch, launch checklist, risks |
| `ROUND-1-REVIEW.md` | The enhancement-pass report: improvements, weaknesses, next steps |
| `website/README.md` | Technical instructions for developers |

## The launch rule (from the Version 1 report)

Don't launch until: the governance pages are final, 20–30 real cornerstone
articles are written, and the estimator's data is validated. The framework is
ready — the content comes next.
