# Decisions — Commercial Roofing Intel

Why the project is built the way it is. Newest last. Decisions reconstructed from the
codebase and prior reports are marked *(inferred)* — correct them if the history differs.

---

## D1. Static site generation (Astro 5), no client framework *(inferred)*
Content-heavy reference site with no per-user state. Static HTML is faster, cheaper,
more crawlable, and has almost no attack surface. Zero client-side framework weight.
**Consequence:** everything is a build step. With no Node on the founder's machine,
that has become a real bottleneck — see D8.

## D2. One Markdown file = one page *(inferred)*
Adding a page requires no code change. This is the mechanism for scaling to thousands
of pages, and it means editorial work never blocks on engineering. **Do not break it.**

## D3. Pagefind for search, self-hosted *(inferred)*
Static, fast, private, no third-party service and no tracking — consistent with the
site's privacy posture. Cost: needs a real server, so it can't be tested locally.

## D4. `status` frontmatter gates indexing *(inferred)*
`sample` → `draft` → `published`. Anything not `published` gets `noindex, follow` and
is auto-excluded from the sitemap by a custom filter in `astro.config.mjs`.

This is the single best decision in the project. It means unfinished content is
physically incapable of reaching Google by accident, and publishing is one frontmatter
word. It is why the sample content was never an SEO liability.

## D5. Governance as a first-class layer *(inferred)*
Seven governance pages (Mission, Editorial Standards, Methodology, Funding &
Relationships, Corrections, How CRI Works, About), linked in the footer sitewide and
declared in Organization schema via `publishingPrinciples` / `correctionsPolicy` /
`ownershipFundingInfo`.

**Rationale:** CRI shares ownership with a roofing contractor and monetises via
referrals to it. Without a visible, structural independence claim, the site is just
contractor marketing wearing a reference-site costume. The governance layer is the
product.

## D6. Disclose the Victory E&I relationship rather than obscure it *(inferred)*
Funding & Relationships names the common ownership and the referral model, and states
that partners get no pre-publication access and no ability to request changes.
The honest call. Still needs counsel's sign-off on wording — see KNOWN_ISSUES #5.

## D7. Canonical on the apex domain, not www *(inferred, July 15)*
`commercialroofingintel.com`. Set consistently in `astro.config.mjs` and
`src/data/site.ts`; www → apex 301 in `netlify.toml`. Verified consistent.

## D8. `website/dist/` is tracked in git *(this session, July 16)*
Normally build output is ignored. Here there is **no Node toolchain on the founder's
machine**, so `dist/` cannot be regenerated locally — it is the only deployable
artifact. Losing it would mean losing the ability to deploy at all.

**Trade-off accepted:** noisy diffs and a real risk of dist/source drift (which has
already happened — KNOWN_ISSUES #1). **Revisit once Netlify builds from git**; then
ignore `dist/` again and let the runner produce it.

## D9. Initialise version control *(this session, July 16)*
The project was **entirely unversioned** — 340 files of work with no history and no
undo, about to be modified. A baseline commit was made before any edit, so this
session's changes are individually reviewable and revertable.

## D10. Correct the citation counts rather than fabricate sources *(this session)*
All three published pages displayed false `sources:` counts (0/8/6 against actual
3/3/1). Two ways to make a badge true: raise the evidence, or lower the claim.

**Lowering the claim was the only honest option available** — inventing citations to
match a number is the exact failure this site exists to stand against, and I had no
way to verify new sources. Counts were set to the verified truth; the `sources:` field
was removed entirely from sample pages that cited nothing (rather than set to `0`,
which rendered a self-refuting "0 sources cited").

## D11. Do not hand-patch `dist/` *(this session)*
The source fixes are not in `dist/`, and `dist/` cannot be rebuilt here. Hand-editing
the built HTML would have made the artifact *look* correct while hiding drift I could
not verify (Pagefind index, sidebar facts, and layout output would all diverge from
what a real build produces).

**Chose instead:** leave `dist/` untouched, and make "rebuild before deploy" a hard,
top-of-checklist blocker. A known-stale artifact is safer than a plausibly-wrong one.

## D12. Leave the `repair-or-replace` publish/demote call to the founder *(this session)*
Its two numeric thresholds are uncited. Fixing the false badge (6 → 1) was a defect
fix and was done. Demoting the page to `draft` would change **launch scope** — a
business decision, made while the founder was away. Flagged with options instead.
See KNOWN_ISSUES #3.

## D13. Do not refactor what cannot be built *(this session)*
The brief asked for a broad refactor, performance, and accessibility pass. With no
Node, no change can be compiled, rendered, or measured. Sweeping edits to an
unbuildable, previously-unversioned codebase days before launch would have traded a
working site for unverifiable churn.

**Chose instead:** data-only fixes plus two minimal guarded conditionals; everything
else reviewed statically and written down with its evidence. Findings you can act on
beat edits nobody can test. The brief's own instruction — *"only implement
improvements that are safe and production ready"* — points the same way.
