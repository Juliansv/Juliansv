# Featured Hero Project Card Refinement

**Date:** 2026-04-23 **Status:** Design approved, pending implementation plan

## Problem

Two issues with `FeaturedHeroProject` on the home page:

1. **Layout.** The image sits in a 2/5 column and the
   title/tagline/description/stack/CTAs are all stacked in the 3/5 column.
   Because the right column's content is shorter than the image on most
   viewports, there is visible empty space under the image. Stack chips and CTAs
   are cramped in the right column even though they could use the full card
   width.
2. **Hover affordance mismatch.** The grid project cards (`Projects.tsx`) have a
   hover background that extends beyond the parent's padding via an
   absolutely-positioned sibling
   (`absolute -inset-x-4 -inset-y-4 ... lg:-inset-x-6 ... lg:group-hover:bg-slate-800/50 ...`).
   The hero card's hover is contained to the `<section>` (just a
   `hover:bg-slate-800/30` on the element itself), so the two styles feel
   inconsistent side-by-side.

A secondary goal: make the whole card clickable to the project detail page so
the hover affordance has a matching action. Today the title and a trailing "View
TailorSift project" link both navigate there, and the hover effect decorates the
card but doesn't actually make it clickable.

## Approach

Two small changes to `FeaturedHeroProject.tsx`, no data or prop changes:

1. **Restructure into two rows.**
   - Top row (current grid): image left (2/5), title + tagline + description
     right (3/5).
   - Bottom row (new, full card width): stack chips on the left, single "Visit
     site" CTA on the right, same line via `flex items-center justify-between`.
2. **Match grid-card hover behavior** by adding the same absolutely-positioned
   hover-bg sibling the grid cards use. Make the title the primary link and
   extend its hit area to cover the entire card using the existing
   `span.absolute.-inset-*` trick already present in `Projects.tsx`. Drop the
   redundant "View <title> project" link.

**Why a full-width footer row, not just moving chips out:** the chips and the
CTA read as "meta" to the project summary above. Grouping them on one line under
the two-column header block gives the card a clearer hierarchy (visual → summary
→ meta/action) and uses space the image was already reserving.

**Why mirror the grid card's hover pattern rather than invent a new one:** the
hero sits immediately above the grid cards on the home page. They should feel
like the same family — same hover extension, same title color-flip, same
overlay-link pattern.

## Components

### `FeaturedHeroProject.tsx` (modified)

**Markup sketch (Tailwind classes elided where identical to today):**

```tsx
<section className="group relative mb-12 ..." aria-labelledby={...}>
  {/* hover-bg sibling — identical to the one in Projects.tsx */}
  <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

  {/* Top row: image + summary */}
  <div className="relative z-10 grid gap-6 sm:grid-cols-5 sm:gap-8">
    <div className="sm:col-span-2" style={{ viewTransitionName: `project-image-${slug}` }}>
      <ProjectImage … />
    </div>
    <div className="sm:col-span-3">
      <h3 id={...}>
        <ViewTransitionLink href={`/project/${slug}`} className="group/link ...hover:text-sky-400...">
          <span className="absolute -inset-x-4 -inset-y-4 hidden rounded-md lg:-inset-x-6 lg:block" />
          <span style={{ viewTransitionName: `project-title-${slug}` }}>{project.title}</span>
        </ViewTransitionLink>
      </h3>
      <p className="…sky-400">Sift the roles. Tailor the approach.</p>
      <p className="…slate-400">{project.description}</p>
    </div>
  </div>

  {/* Bottom row: chips + CTA, full card width */}
  <div className="relative z-10 mt-5 flex flex-wrap items-center justify-between gap-4">
    <ul className="flex flex-wrap gap-2">
      {project.stack?.map(…)}
    </ul>
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative z-20 inline-flex items-center gap-1 rounded-md bg-sky-400/10 px-3 py-1.5 text-sm font-medium text-sky-400 transition hover:bg-sky-400/20"
      aria-label={`Visit ${project.title} live site (opens in new tab)`}
    >
      Visit site <ArrowUpRight className="h-4 w-4" />
    </a>
  </div>
</section>
```

**Key points:**

- The hover-bg sibling is `z-0`. Content rows are `relative z-10`. The external
  "Visit site" anchor is `z-20` so it stays above the title link's invisible
  hit-area span and remains independently clickable.
- The "View TailorSift project" `ViewTransitionLink` is removed. The title
  `ViewTransitionLink` replaces it as the sole route link; its `span.absolute`
  extends the hit area to the whole card (including under the image and chips
  row).
- The title link gains `hover:text-sky-400 focus-visible:text-sky-400`
  (currently absent) to match the grid cards' color-flip behavior.
- Stack chips list keeps the existing pill styling; the only change is that it
  lives in the bottom row's flex container.
- The `ring-1 ring-sky-400/20` on the `<section>` stays — it's the resting-state
  "this is the featured one" distinction. Only `hover:bg-slate-800/30` is
  removed (superseded by the extended hover-bg sibling).

### `tailorsift.ts` (data change, bundled with the layout work in the same implementation)

Replace the `description` string:

```ts
description: "AI-powered job hunt platform that helps individuals sift roles and tailor CVs, cover letters, and interview prep to each opportunity.",
```

This is the only data edit. No schema changes.

## Responsive behavior

- `sm` and up: two-column top row, single-line bottom row with chips-left /
  button-right via `justify-between`. If chips overflow the available width they
  wrap within their `flex flex-wrap` container and the CTA stays on the right;
  if the combined row still cannot fit, `flex-wrap` on the outer container drops
  the CTA to its own line below the chips.
- Below `sm`: top row collapses to a single column (image on top, text below,
  same as today). Bottom row stays as `flex flex-wrap justify-between` — chips
  start on one line, button wraps to its own line if needed.
- The extended hover-bg sibling is already gated with `lg:block` in the grid
  cards; we mirror that. Below `lg` there is no extended-hover affordance, which
  is consistent with the rest of the page.

## Accessibility

- Title link is the primary, semantic route anchor. The full-card hit area is
  added via a visually-hidden absolutely-positioned `<span>` inside that anchor
  — no JS click handlers on the container.
- `aria-labelledby` on the `<section>` continues to point at the title id
  (unchanged).
- The external "Visit site" link keeps its `aria-label` and remains
  keyboard-focusable; it is a separate tab stop from the title link.
- Removing "View TailorSift project" loses a text affordance but doesn't lose a
  route (same destination as the title). The title itself reads as a link
  (underline-on-hover via the color flip) and the hover bg reinforces
  clickability on pointer devices.

## Testing

**Unit test updates** — `FeaturedHeroProject.test.tsx`:

- Assert the title renders as a link to `/project/<slug>` (existing assertion
  likely stays).
- Assert "Visit site" anchor points at `project.url` with `target="_blank"`.
- Assert the "View <title> project" text link is **not** present (guards against
  regression).
- Assert stack chips render in the footer row (query by role/text, not DOM
  position).

**Manual verification:**

1. `pnpm dev`, visit `/`. Hover the hero card on `≥lg`: bg extends beyond card
   padding, title flips to sky-400, whole card area is clickable.
2. Click the image, the description gap, or the title: all land on
   `/project/tailorsift`.
3. Click "Visit site": opens `tailorsift.io` in a new tab; page underneath
   unchanged.
4. Narrow viewport: chips + CTA stay on one line when they fit; wrap gracefully
   when they don't.
5. Keyboard: `Tab` gives two stops — title link, then "Visit site". Both have
   visible focus rings.
6. Tailorsift card renders the new description on `/` (hero) and
   `/project/tailorsift` (detail).

**Explicitly out of scope:**

- Refactoring the shared hover-bg markup into a reusable component. Two call
  sites is below the threshold; revisit if a third hero variant appears.
- Changing the grid cards (`Projects.tsx`) — they already work as designed.
- Animation timing / easing changes.
- Changes to the hero tagline (`"Sift the roles. Tailor the approach."`); still
  hardcoded in the component per current design.

## Risks & scope guardrails

- **Nested-link regressions.** The existing grid cards already use this overlay
  pattern, so the z-index layering is known to work in this codebase. Main risk
  is forgetting to bump the "Visit site" anchor above the title's hit-area span
  — covered by a manual click test and a unit test that checks both links route
  to distinct URLs.
- **View transitions.** The `viewTransitionName` on the title's inner span and
  on the image container are preserved verbatim. Moving the chip/CTA block out
  of the right column does not touch any node with a view transition name.
- **Out of scope:** revisiting the hero tagline, extending this layout to
  non-hero featured projects, animation changes, introducing a card-wide focus
  ring.

## Success criteria

- No empty space under the image on the hero card; chips and "Visit site" occupy
  the full card width on one line where they fit.
- Hovering the hero card on `≥lg` produces the same bg-extension effect as the
  grid cards, and the title color-flips to sky-400.
- Clicking anywhere on the card (outside the "Visit site" button) navigates to
  `/project/tailorsift`.
- "Visit site" still opens `tailorsift.io` externally; no regression.
- Tailorsift description reads as specified on both the home hero and the
  project detail page.
- Unit tests for `FeaturedHeroProject` pass; no console errors or Next.js
  warnings.
