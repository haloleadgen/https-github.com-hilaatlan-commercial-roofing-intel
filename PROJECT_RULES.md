# Project Rules — Commercial Roofing Intel

The non-negotiables. Read before changing anything, human or AI.

---

## 1. The site's only asset is that it can be trusted

CRI is an independent knowledge platform **that shares common ownership with a
roofing contractor** (Victory E&I Roofing and Construction LLC) and earns money by
referring readers to that contractor.

That structure is legitimate and it is disclosed. It also means **every claim on this
site is read by a skeptic who suspects it exists to sell roofs.** A single
overstated number is worth more damage here than on an ordinary site, because it
confirms the suspicion the whole governance layer exists to defuse.

This is not an abstract concern. Before this review, all three published articles
displayed a false citation count, including one reading "Evidence-based · 0 sources
cited". That is what the rules below exist to prevent.

## 2. Never fabricate evidence. Ever.

- **Never invent a citation, source, statistic, or study.** Not as a placeholder, not
  "to be replaced later", not to make a count match a badge.
- **Never raise a `sources:` number to match a claim.** Lower the claim, or add a real
  source and cite it.
- If the evidence does not exist, **say so on the page.** The TPO article does this
  well — it states outright that no independent longitudinal field study of TPO
  service life is public, and names it as a gap CRI intends to fill. That paragraph
  is worth more than a fake citation would be.
- Uncertainty is content, not a defect.

## 3. `status` is the safety mechanism. Respect it.

`sample` → `draft` → `published` in frontmatter. Anything not `published` gets
`noindex, follow` **and** is dropped from the sitemap automatically
(`astro.config.mjs`). This machinery is correct — do not route around it.

- **Never set `status: published` to hit a deadline or a page count.** Publishing is
  a claim that the content met the Editorial Standards, not that it is finished being typed.
- `draft` = real content, sources under verification. That is a legitimate, useful
  state. Use it. It is not a failure.
- Before publishing: the `sources:` number must equal the citations actually in the
  article. Count them by hand until the build derives it automatically.

## 4. Do not deploy `dist/` without rebuilding it

There is no Node toolchain on the founder's machine, so `dist/` cannot be regenerated
there and is **tracked in git as the artifact of record**. This makes it easy for
`dist/` to silently drift from source — which is exactly what happened in this review.

- Source change → rebuild → verify → *then* deploy.
- Never hand-edit files in `dist/`. Fix the source and rebuild. A hand-patched
  build looks correct and hides drift you cannot see.
- If you cannot rebuild, **say the fix is unverified.** Do not imply otherwise.

## 5. Privacy — client information is never published

- Never publish names, addresses, emails, phone numbers, contracts, invoices, photos
  of identifiable buildings, or private communications — **without explicit written
  permission, per instance.** Not "we have a general OK".
- Case studies and examples must be **anonymised**: no client name, no address, no
  identifying building detail. "A 40,000 sq ft warehouse in South Florida" is fine.
  "The Smith building on NW 12th" is not.
- This applies to inbound assessment-form submissions too. They are private.
- The business contact details (`hila@victoryroofer.com`, `(954) 634-2028`) are the
  founder's own published business details and are fine to display.

## 6. Single sources of truth — do not duplicate

| Thing | Lives in |
| --- | --- |
| Site name, contact email/phone, domain | `src/data/site.ts` |
| The six pillars + nav | `src/data/site.ts` (`PILLARS`) — names are locked |
| Governance + legal links | `src/data/site.ts` |
| Colors, fonts, spacing | `src/styles/global.css` (tokens at the top) |
| noindex + sitemap rules | `astro.config.mjs` |

Never hard-code a contact detail or a pillar name into a page or component. The
reason 184 email occurrences are consistent is that they all derive from one constant.

## 7. Content structure

- One Markdown file = one page. Adding a page needs no code change. This is the
  scaling mechanism; don't break it.
- Every article needs: real `takeaways`, curated `related` links, and — before
  `published` — a `## Sources` section whose entries are real and reachable.
- Quantitative claims (thresholds, service lives, percentages) **must be cited**, or
  explicitly framed as a rule of thumb with its origin named.

## 8. Scope discipline

- Prefer strengthening what exists to adding new sections. The project's problem is
  not too few features; it is 3 published articles behind a 60-page framework.
- Do not start large new features close to launch.
- Do not refactor what you cannot build and verify.
