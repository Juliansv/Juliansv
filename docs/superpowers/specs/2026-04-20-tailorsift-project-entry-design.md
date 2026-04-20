# TailorSift — Portfolio Project Entry (Hero Card)

**Date:** 2026-04-20
**Status:** Approved design, pending implementation

## Goal

Add TailorSift as a new portfolio project and give it elevated visual treatment on the home page to reflect its status as Julio's most important current project.

TailorSift is an AI-powered job application platform (live landing page at https://tailorsift.io, SaaS app in development) that helps job hunters sift roles by fit-checking their CV/experience against job descriptions and generating tailored CVs, cover letters, and interview prep.

## Scope

- Register TailorSift in the existing project data layer.
- Introduce an optional `hero` flag on the `Project` type so one featured project can be rendered with a larger, more prominent card.
- Add a new `FeaturedHeroProject` component to the front projects feature.
- Modify `Projects.tsx` to render the hero card above the existing featured list.
- Capture a landing-page screenshot for the project image.

Non-goals: redesigning the project detail page, reworking the archive page, adding status badges, animations beyond what the existing design language already has.

## Data Model

### Type change — `src/data/types.ts`

Add an optional boolean:

```ts
export interface Project {
	// ... existing fields
	hero?: boolean;
}
```

### New project file — `src/data/projects/tailorsift.ts`

```ts
import { Project } from "../types";

export const tailorsift: Project = {
	id: "8",
	slug: "tailorsift",
	title: "TailorSift",
	year: 2026,
	featured: true,
	hero: true,
	description:
		"AI-powered job hunt platform that sifts roles and tailors CVs, cover letters, and interview prep to each listing.",
	longDescription: `
    <p>TailorSift helps job hunters turn generic applications into role-specific, polished materials in minutes. Users submit a job listing URL and the platform automatically extracts the role details, scores candidate-job fit, identifies skill gaps, and generates tailored CVs, cover letters, and interview prep grounded in the specific company and position.</p>
    <p>The landing page is live at tailorsift.io with a waitlist, while the SaaS app is under active development. It operates on a freemium model with Free and Pro tiers, and supports multiple professional profiles so users can maintain distinct narratives for different career tracks.</p>
  `,
	features: [
		"AI fit analysis with skill-gap detection",
		"Tailored CV and cover letter generation per role",
		"Interview preparation with company-specific questions and talking points",
		"Multiple professional profiles (Pro tier)",
		"Automated job detail extraction from URLs",
	],
	technologies: [
		"Next.js",
		"React",
		"TypeScript",
		"Tailwind CSS",
		"shadcn/ui",
		"Supabase",
		"OpenRouter",
		"Anthropic API",
		"OpenAI API",
		"Gemini API",
	],
	stack: ["Next.js", "TypeScript", "Supabase", "AI"],
	image: "/images/projects/tailorsift.webp",
	url: "https://tailorsift.io",
};
```

Notes:

- `codeRepository` omitted (repo is private).
- `stack` kept to 4 chips to match the visual weight of other featured rows.

### Index — `src/data/projects/index.ts`

- Import `tailorsift` and add it as the **first** element of the `projects` array.
- Add helper exports:
  ```ts
  export const heroProject = projects.find((p) => p.hero);
  export const featuredProjectsWithoutHero = featuredProjects.filter(
  	(p) => !p.hero
  );
  ```
- Leave existing helpers (`sortedProjects`, `getProjectBySlug`, `getProjectById`, `getAdjacentProjects`, `featuredProjects`) untouched.

## UI

### New component — `src/features/front/projects/components/FeaturedHeroProject.tsx`

A tall, wide card rendered above the compact featured list.

Structure:

- Outer `<section>` with subtle accent treatment: persistent `ring-1 ring-sky-400/20` border; on hover, add `bg-slate-800/30`. Matches the existing card language — no loud colors or gradients.
- Two-column layout on `sm:` and up (screenshot left, content right); stacks on mobile.
- Screenshot via `next/image` with `width={400} height={250}` on the element (source asset is larger at ~1200×750 for Retina); `viewTransitionName: project-image-${slug}` preserved for detail-page animation continuity.
- Title rendered at `text-xl font-semibold` (larger than the row cards' `text-base`), with the same `viewTransitionName: project-title-${slug}`.
- Tagline `"Sift the roles. Tailor the approach."` under the title in `text-sky-400 text-sm`.
- Description below tagline.
- Stack chips using the same pill style as row cards (`bg-sky-400/10 text-sky-400` pills).
- Two CTAs in a row:
  - **Primary** — "Visit site" external link to `https://tailorsift.io`, opens in new tab with `rel="noopener noreferrer"`, `aria-label="Visit TailorSift live site (opens in new tab)"`.
  - **Secondary** — "Read more" using `ViewTransitionLink` to `/project/tailorsift`.

The component accepts `{ project: Project }` and renders nothing (or returns `null`) if the project has no `hero` flag — but in practice `Projects.tsx` will only pass it when `heroProject` exists.

### Modification — `src/features/front/projects/components/Projects.tsx`

- Import `heroProject` and `featuredProjectsWithoutHero` from `@/data`.
- If `heroProject` exists, render `<FeaturedHeroProject project={heroProject} />` above the `<ul>`.
- Iterate over `featuredProjectsWithoutHero` instead of `featuredProjects` for the row list.
- When `heroProject` is undefined, behavior is identical to the current file (safe fallback).

### Accessibility

- External CTA `aria-label` as above.
- Screenshot `alt` follows the existing pattern: `"Screenshot of TailorSift - <first 100 chars of description>"`.
- Hero card remains a single link target for the title and image (matching existing row cards).

## Assets

- Capture a screenshot of `https://tailorsift.io` at a desktop viewport (1440×900), cropped to the above-the-fold hero section.
- Convert to WebP at ~85% quality.
- Save to `public/images/projects/tailorsift.webp`.
- Aim for ~1200×750 output and keep file size under ~200KB. This matches the proportions of existing project images (e.g. `favecocina.webp`).

## File changes summary

| File                                                             | Change                                                                      |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `src/data/types.ts`                                              | Add optional `hero?: boolean` to `Project`                                  |
| `src/data/projects/tailorsift.ts`                                | New file — project entry                                                    |
| `src/data/projects/index.ts`                                     | Register project first; export `heroProject`, `featuredProjectsWithoutHero` |
| `src/features/front/projects/components/FeaturedHeroProject.tsx` | New component                                                               |
| `src/features/front/projects/components/Projects.tsx`            | Render hero above list; iterate `featuredProjectsWithoutHero`               |
| `public/images/projects/tailorsift.webp`                         | New asset (screenshot)                                                      |

## Risks / open questions

- **Screenshot quality:** tailorsift.io hero must read well at a small crop. If the captured image feels weak, fall back to a manual screenshot the user supplies.
- **View-transition names:** adding a second path to the same slug (hero + detail) must keep the same `viewTransitionName` values so the existing detail page animation still works. Reusing the existing `project-image-${slug}` / `project-title-${slug}` naming preserves this.
- **Safe fallback:** if `hero` is removed from TailorSift (or set on another project), the layout still degrades gracefully because `Projects.tsx` checks for `heroProject` before rendering.

## Not in scope

- Status badges ("Now building", "Live") — deferred; can be added later if project state changes.
- Animations or scroll effects beyond existing view transitions.
- Case-study page redesign.
- Archive page changes (TailorSift will appear there naturally via `sortedProjects`).
