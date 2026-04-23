# Featured Hero Card Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the `FeaturedHeroProject` card into a two-row layout
(image+summary on top, chips+Visit-site CTA on a full-width bottom row), make
the entire card clickable to the project detail page, match the grid cards'
extended hover affordance, and update the Tailorsift description copy.

**Architecture:** One React component is modified in place
(`FeaturedHeroProject.tsx`). A hover-background sibling is added — mirroring the
pattern already used in `Projects.tsx` — so the two card families share visual
behavior. The title `ViewTransitionLink` becomes the single route anchor; its
absolute-span trick extends the click target across the whole card. The external
"Visit site" anchor sits on a higher stacking context so it remains
independently clickable. One data file (`tailorsift.ts`) gets a one-line
description update. Unit tests in `FeaturedHeroProject.test.tsx` are updated to
cover the new markup and prevent regression of the removed "View project" link.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript strict, Tailwind
CSS v4, Vitest + @testing-library/react.

---

## File Structure

**Create:** none

**Modify:**

- `src/features/front/projects/components/FeaturedHeroProject.tsx` — two-row
  layout, extended-hover sibling, title becomes full-card link, drop "View
  <title> project" link.
- `src/features/front/projects/components/FeaturedHeroProject.test.tsx` — update
  existing assertions, add new ones, remove the assertion for the deleted text
  link.
- `src/data/projects/tailorsift.ts` — replace the `description` string.

Each modification is self-contained; the three files can be touched in one TDD
cycle but are split into separate tasks below so each commit stays focused.

---

## Task 1: Update Tailorsift description copy

**Files:**

- Modify: `src/data/projects/tailorsift.ts:10-11`

- [ ] **Step 1: Update the description string**

In `src/data/projects/tailorsift.ts`, replace the `description` value. Exact old
and new strings:

Old:

```ts
description:
    "AI-powered job hunt platform that sifts roles and tailors CVs, cover letters, and interview prep to each listing.",
```

New:

```ts
description:
    "AI-powered job hunt platform that helps individuals sift roles and tailor CVs, cover letters, and interview prep to each opportunity.",
```

Nothing else in that file changes.

- [ ] **Step 2: Run typecheck**

Run: `pnpm typecheck`

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/projects/tailorsift.ts
git commit -m "feat(projects): refine tailorsift description copy"
```

---

## Task 2: Update the failing tests for the new card markup

**Files:**

- Modify: `src/features/front/projects/components/FeaturedHeroProject.test.tsx`

This task locks in the expected behavior of the new component before any
implementation change. It will leave the test file red until Task 3 makes it
pass.

- [ ] **Step 1: Replace the whole test file with the updated version**

Write this exact content to
`src/features/front/projects/components/FeaturedHeroProject.test.tsx`:

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeaturedHeroProject } from "./FeaturedHeroProject";
import type { Project } from "@/data/types";

vi.mock("next/image", () => ({
	default: ({ src, alt }: { src: string; alt: string }) => (
		<img src={src} alt={alt} />
	),
}));

vi.mock("@/components/ViewTransitionLink", () => ({
	ViewTransitionLink: ({
		children,
		href,
		...props
	}: {
		children: React.ReactNode;
		href: string;
	}) => (
		<a href={href} {...props}>
			{children}
		</a>
	),
}));

const project: Project = {
	id: "9",
	slug: "tailorsift",
	title: "TailorSift",
	year: 2026,
	featured: true,
	hero: true,
	description: "AI-powered job hunt platform.",
	longDescription: "<p>Long.</p>",
	features: ["AI fit analysis"],
	technologies: ["Next.js", "TypeScript"],
	stack: ["Next.js", "TypeScript", "Supabase", "AI"],
	image: "/images/projects/tailorsift.webp",
	url: "https://tailorsift.io",
};

describe("FeaturedHeroProject", () => {
	it("renders the project title", () => {
		render(<FeaturedHeroProject project={project} />);
		expect(screen.getByText("TailorSift")).toBeInTheDocument();
	});

	it("renders the tagline", () => {
		render(<FeaturedHeroProject project={project} />);
		expect(
			screen.getByText("Sift the roles. Tailor the approach.")
		).toBeInTheDocument();
	});

	it("renders the description", () => {
		render(<FeaturedHeroProject project={project} />);
		expect(
			screen.getByText("AI-powered job hunt platform.")
		).toBeInTheDocument();
	});

	it("renders all stack chips", () => {
		render(<FeaturedHeroProject project={project} />);
		project.stack.forEach((chip) => {
			expect(screen.getByText(chip)).toBeInTheDocument();
		});
	});

	it("renders the screenshot with correct src and alt", () => {
		render(<FeaturedHeroProject project={project} />);
		const img = screen.getByRole("img");
		expect(img).toHaveAttribute("src", "/images/projects/tailorsift.webp");
		expect(img.getAttribute("alt")).toMatch(/Screenshot of TailorSift/i);
	});

	it("renders external Visit site link with correct attributes", () => {
		render(<FeaturedHeroProject project={project} />);
		const link = screen.getByRole("link", {
			name: /visit tailorsift live site/i,
		});
		expect(link).toHaveAttribute("href", "https://tailorsift.io");
		expect(link).toHaveAttribute("target", "_blank");
		expect(link).toHaveAttribute("rel", "noopener noreferrer");
	});

	it("links the title to the project detail page", () => {
		render(<FeaturedHeroProject project={project} />);
		const titleLink = screen
			.getByRole("heading", { level: 3, name: /tailorsift/i })
			.querySelector("a");
		expect(titleLink).not.toBeNull();
		expect(titleLink).toHaveAttribute("href", "/project/tailorsift");
	});

	it('does not render the removed "View <title> project" link', () => {
		render(<FeaturedHeroProject project={project} />);
		expect(
			screen.queryByRole("link", { name: /view tailorsift project/i })
		).not.toBeInTheDocument();
	});

	it("renders exactly two links: the title link and the Visit site link", () => {
		render(<FeaturedHeroProject project={project} />);
		const links = screen.getAllByRole("link");
		expect(links).toHaveLength(2);
		const hrefs = links.map((l) => l.getAttribute("href")).sort();
		expect(hrefs).toEqual(["/project/tailorsift", "https://tailorsift.io"]);
	});
});
```

Key changes from the previous file:

- Replaced the assertion that looked for a link with accessible name "view
  tailorsift project" (text link) with an assertion that the **title** is the
  link to `/project/tailorsift`.
- Added an explicit negative assertion that the "View <title> project" text link
  is gone.
- Added an exact-count assertion: two links only (title + Visit site).

- [ ] **Step 2: Run the tests to confirm they fail against the current
      component**

Run:
`pnpm test src/features/front/projects/components/FeaturedHeroProject.test.tsx`

Expected: the new test `does not render the removed "View <title> project" link`
FAILS (the current component still renders that link). The test
`renders exactly two links...` also FAILS for the same reason (it sees 3 links).
The title-link assertion may pass coincidentally since the title is already
wrapped in a link today — that is fine.

Do **not** commit yet — the tree is red on purpose.

---

## Task 3: Restructure the component to match the design

**Files:**

- Modify: `src/features/front/projects/components/FeaturedHeroProject.tsx` (full
  replace)

- [ ] **Step 1: Replace the whole component file**

Write this exact content to
`src/features/front/projects/components/FeaturedHeroProject.tsx`:

```tsx
import { ProjectImage } from "@/components/ProjectImage";
import { ArrowUpRight } from "lucide-react";
import { ViewTransitionLink } from "@/components/ViewTransitionLink";
import type { Project } from "@/data/types";

interface FeaturedHeroProjectProps {
	project: Project;
}

export const FeaturedHeroProject = ({ project }: FeaturedHeroProjectProps) => {
	return (
		<section
			className="group relative mb-12 rounded-lg p-5 ring-1 ring-sky-400/20 transition md:p-6"
			aria-labelledby={`hero-project-${project.slug}-title`}
		>
			<div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

			<div className="relative z-10 grid gap-6 sm:grid-cols-5 sm:gap-8">
				<div
					className="sm:col-span-2"
					style={{ viewTransitionName: `project-image-${project.slug}` }}
				>
					<ProjectImage
						src={project.image}
						alt={`Screenshot of ${project.title} - ${project.description.slice(0, 100)}`}
						width={400}
						height={250}
						className="w-full rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30"
					/>
				</div>
				<div className="sm:col-span-3">
					<h3
						id={`hero-project-${project.slug}-title`}
						className="text-xl font-semibold text-slate-200"
					>
						<ViewTransitionLink
							href={`/project/${project.slug}`}
							className="group/link inline-flex items-baseline text-slate-200 transition hover:text-sky-400 focus-visible:text-sky-400"
						>
							<span className="absolute -inset-x-4 -inset-y-4 hidden rounded-md lg:-inset-x-6 lg:block" />
							<span
								className="inline-block"
								style={{
									viewTransitionName: `project-title-${project.slug}`,
								}}
							>
								{project.title}
							</span>
						</ViewTransitionLink>
					</h3>
					<p className="mt-1 text-sm font-medium text-sky-400">
						Sift the roles. Tailor the approach.
					</p>
					<p className="mt-3 text-sm leading-normal text-slate-400">
						{project.description}
					</p>
				</div>
			</div>

			<div className="relative z-10 mt-5 flex flex-wrap items-center justify-between gap-4">
				{project.stack && (
					<ul className="flex flex-wrap gap-2">
						{project.stack.map((stackName) => (
							<li key={stackName}>
								<div className="flex items-center rounded-full bg-sky-400/10 px-3 py-1 text-xs font-medium leading-5 text-sky-400">
									{stackName}
								</div>
							</li>
						))}
					</ul>
				)}
				<a
					href={project.url}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={`Visit ${project.title} live site (opens in new tab)`}
					className="relative z-20 inline-flex items-center gap-1 rounded-md bg-sky-400/10 px-3 py-1.5 text-sm font-medium text-sky-400 transition hover:bg-sky-400/20"
				>
					Visit site
					<ArrowUpRight className="h-4 w-4" />
				</a>
			</div>
		</section>
	);
};
```

Key differences versus the current component:

- Removed `hover:bg-slate-800/30` from the `<section>` (superseded by the new
  sibling).
- Added the hover-bg sibling `<div>` directly inside the `<section>`, with `z-0`
  and the `lg:group-hover:*` classes copied from `Projects.tsx`.
- Wrapped the top grid and the bottom row in containers with `relative z-10` so
  they sit above the hover-bg sibling.
- Title now wraps in a `ViewTransitionLink`. The inner absolutely-positioned
  `<span>` covers the whole `<section>` on `≥lg`, making the whole card a click
  target on those breakpoints. The original inner `<span>` that carries
  `viewTransitionName` is preserved verbatim.
- Removed the trailing `ViewTransitionLink` whose accessible name was "View
  <title> project".
- Stack chips and the "Visit site" anchor now live in a single bottom flex row
  (`justify-between`), both at `relative z-10`; the anchor is `z-20` to outrank
  the title's hit-area span.

- [ ] **Step 2: Run the component tests**

Run:
`pnpm test src/features/front/projects/components/FeaturedHeroProject.test.tsx`

Expected: all 9 tests pass.

- [ ] **Step 3: Run typecheck**

Run: `pnpm typecheck`

Expected: no errors.

- [ ] **Step 4: Run lint**

Run: `pnpm lint`

Expected: no errors.

- [ ] **Step 5: Commit the component + test changes together**

```bash
git add \
  src/features/front/projects/components/FeaturedHeroProject.tsx \
  src/features/front/projects/components/FeaturedHeroProject.test.tsx
git commit -m "feat(projects): restructure featured hero card layout and hover"
```

---

## Task 4: Manual verification in the browser

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server**

Run: `pnpm dev`

Expected: server listening on `http://localhost:3000` (or next free port up to
3003).

- [ ] **Step 2: Verify the home page hero card on `≥lg`**

Open `http://localhost:3000/` in a browser window at least 1024px wide. Check,
in order:

1. Hero card shows image (left), title + tagline + description (right), chips +
   "Visit site" (full-width row underneath, one line).
2. Hovering anywhere on the card produces a background tint that visually
   extends beyond the card's padding (same effect as the project grid cards
   below it).
3. Hovering the title turns it sky-400.
4. Clicking empty space on the card (e.g., below the description) navigates to
   `/project/tailorsift`.
5. Clicking "Visit site" opens `https://tailorsift.io` in a new tab, and does
   **not** navigate the underlying page.
6. Tab key: focus moves through two stops on the hero card — first the title
   link, then "Visit site". Both show a visible focus ring.

- [ ] **Step 3: Verify narrow viewport behavior**

Resize the window to ~400px wide (or toggle mobile preview in DevTools). Check:

1. Image stacks on top, summary below (existing behavior, unchanged).
2. Chips row and "Visit site" still live in one flex container — if they don't
   fit, the button wraps to its own line cleanly (no overflow).
3. No horizontal scrollbar appears.
4. Hover extension is absent below `lg` (by design — consistent with grid
   cards).

- [ ] **Step 4: Verify the description copy**

Still on `/`, confirm the hero card reads:

> "AI-powered job hunt platform that helps individuals sift roles and tailor
> CVs, cover letters, and interview prep to each opportunity."

Navigate to `/project/tailorsift`. The same description should appear there.

- [ ] **Step 5: Console check**

Open DevTools → Console. Expected: no red errors and no Next.js warnings about
`priority`/`loading`, missing keys, or invalid `<a>` nesting.

- [ ] **Step 6: Stop the dev server**

Stop the `pnpm dev` process (Ctrl+C in the terminal running it).

---

## Task 5: Full validation and push

**Files:** none

- [ ] **Step 1: Run the full validation suite**

Run: `pnpm validate`

This runs `lint`, `typecheck`, `format:check`, `test:ci`, and `build` in
sequence. Expected: every step passes. The `build` step will invoke the prebuild
placeholder generator — it should succeed with no missing-image errors (this
work does not touch any image).

- [ ] **Step 2: Push develop**

Run: `git push`

Expected: the three new commits (Task 1, Task 3, and any follow-up) are pushed
to `origin/develop`. They will auto-attach to the existing PR #55.

---

## Self-review notes (author)

- **Spec coverage.** Problem (1) empty space / cramped chips → Task 3 moves
  chips+CTA into a full-width row. Problem (2) hover mismatch → Task 3 adds the
  hover-bg sibling and title color-flip. "Whole card clickable" → Task 3 wraps
  the title in `ViewTransitionLink` with the absolute hit-area span. "Drop
  redundant link" → Task 3 deletes the trailing `ViewTransitionLink` and Task 2
  adds a regression test. Description copy → Task 1. All covered.
- **Placeholder scan.** No TBDs, no "add error handling", no skipped code
  blocks. Each step shows either exact file content or an exact command.
- **Type consistency.** `ViewTransitionLink`, `ProjectImage`, and `Project` are
  imported with the same names used today. The new test file uses
  `querySelector("a")` on the `<h3>` to find the title link — matches the fact
  that `ViewTransitionLink` is mocked as a plain `<a>` in the test's `vi.mock`.
- **Risk the spec flagged.** "Forgetting to bump Visit-site above the title
  hit-area span." Task 2 encodes this implicitly via the two-link count
  assertion and the distinct-href assertion, and Task 4 step 2.5 exercises it
  manually.
