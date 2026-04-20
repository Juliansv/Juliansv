# TailorSift Portfolio Entry — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add TailorSift as the first featured project in the portfolio with an elevated "hero card" treatment above the existing featured project list.

**Architecture:** Add an optional `hero?: boolean` field to the `Project` interface. Register TailorSift with `hero: true` and as the first entry in the `projects` array. Export `heroProject` / `featuredProjectsWithoutHero` helpers from the data index. Build a new `FeaturedHeroProject` component that renders a larger two-column card with external "Visit site" + internal "Read more" CTAs. Modify `Projects.tsx` to render the hero card above the compact row list.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript (strict), Tailwind CSS, Vitest + React Testing Library, Playwright MCP (for screenshot capture).

**Spec:** `docs/superpowers/specs/2026-04-20-tailorsift-project-entry-design.md`

---

## Task 1: Extend Project type and add TailorSift data

**Files:**

- Modify: `src/data/types.ts`
- Create: `src/data/projects/tailorsift.ts`
- Modify: `src/data/projects/index.ts`
- Modify: `src/__tests__/data-integrity.test.ts`

- [ ] **Step 1: Write the failing test**

Append to `src/__tests__/data-integrity.test.ts` inside the `describe("Projects Data", ...)` block (after the existing "all project IDs should be unique" test):

```ts
it("TailorSift project exists, is featured, and is marked as hero", () => {
	const tailorsift = projects.find((p) => p.slug === "tailorsift");
	expect(tailorsift).toBeDefined();
	expect(tailorsift?.featured).toBe(true);
	expect(tailorsift?.hero).toBe(true);
	expect(tailorsift?.url).toBe("https://tailorsift.io");
	expect(tailorsift?.title).toBe("TailorSift");
	expect(tailorsift?.image).toBe("/images/projects/tailorsift.webp");
});

it("TailorSift is the first project in the array", () => {
	expect(projects[0]?.slug).toBe("tailorsift");
});

it("at most one project is marked hero", () => {
	const heroes = projects.filter((p) => p.hero);
	expect(heroes.length).toBeLessThanOrEqual(1);
});
```

- [ ] **Step 2: Run test to verify failure**

Run: `pnpm vitest run src/__tests__/data-integrity.test.ts`
Expected: FAIL — TailorSift not found (and TypeScript error on `p.hero` because the field doesn't exist yet).

- [ ] **Step 3: Add `hero?: boolean` to the Project type**

In `src/data/types.ts`, modify the `Project` interface to add the optional field after `codeRepository?: string;`:

```ts
export interface Project {
	id: string;
	slug: string;
	title: string;
	year: number;
	featured: boolean;
	description: string;
	longDescription: string;
	features: string[];
	technologies: string[];
	stack: string[];
	image: string;
	url: string;
	codeRepository?: string;
	hero?: boolean;
}
```

- [ ] **Step 4: Create the TailorSift project data file**

Create `src/data/projects/tailorsift.ts` with this exact content:

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

- [ ] **Step 5: Register TailorSift in the projects array (first position)**

Replace the entire contents of `src/data/projects/index.ts` with:

```ts
import { Project } from "../types";
import { abogadaPrevisional } from "./abogada-previsional";
import { ekomod } from "./ekomod";
import { elTableroNoticias } from "./el-tablero-noticias";
import { faveCocina } from "./fave-cocina";
import { photoGallery } from "./photo-gallery";
import { sallyPortSuites } from "./sally-port-suites";
import { tailorsift } from "./tailorsift";
import { theBagelHole } from "./the-bagel-hole";

// Add all your projects here
export const projects: Project[] = [
	tailorsift,
	faveCocina,
	abogadaPrevisional,
	sallyPortSuites,
	theBagelHole,
	ekomod,
	photoGallery,
	elTableroNoticias,
];

// Helper functions
export const featuredProjects = projects.filter((p) => p.featured);

export const sortedProjects = [...projects].sort((a, b) => b.year - a.year);

export const getProjectBySlug = (slug: string): Project | undefined =>
	projects.find((p) => p.slug === slug);

export const getProjectById = (id: string): Project | undefined =>
	projects.find((p) => p.id === id);

export const getAdjacentProjects = (
	slug: string
): { prev: Project | undefined; next: Project | undefined } => {
	const currentIndex = sortedProjects.findIndex((p) => p.slug === slug);
	return {
		prev: currentIndex > 0 ? sortedProjects[currentIndex - 1] : undefined,
		next:
			currentIndex < sortedProjects.length - 1
				? sortedProjects[currentIndex + 1]
				: undefined,
	};
};
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `pnpm vitest run src/__tests__/data-integrity.test.ts`
Expected: PASS — all existing + new tests green.

- [ ] **Step 7: Run typecheck**

Run: `pnpm typecheck`
Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add src/data/types.ts src/data/projects/tailorsift.ts src/data/projects/index.ts src/__tests__/data-integrity.test.ts
git commit -m "feat(projects): add tailorsift project entry with hero flag"
```

---

## Task 2: Add heroProject and featuredProjectsWithoutHero helpers

**Files:**

- Modify: `src/data/projects/index.ts`
- Modify: `src/__tests__/data-integrity.test.ts`

- [ ] **Step 1: Write the failing test**

Append to `src/__tests__/data-integrity.test.ts` at the bottom of the file (before the closing `});` of the outer `describe("Data Integrity", ...)`):

```ts
describe("Project Helpers", () => {
	it("heroProject returns the project marked hero", async () => {
		const { heroProject } = await import("@/data/projects");
		expect(heroProject).toBeDefined();
		expect(heroProject?.slug).toBe("tailorsift");
		expect(heroProject?.hero).toBe(true);
	});

	it("featuredProjectsWithoutHero excludes the hero project", async () => {
		const { featuredProjectsWithoutHero, heroProject } =
			await import("@/data/projects");
		expect(
			featuredProjectsWithoutHero.some((p) => p.slug === heroProject?.slug)
		).toBe(false);
	});

	it("featuredProjectsWithoutHero contains only featured projects", async () => {
		const { featuredProjectsWithoutHero } = await import("@/data/projects");
		featuredProjectsWithoutHero.forEach((p) => {
			expect(p.featured).toBe(true);
		});
	});
});
```

- [ ] **Step 2: Run test to verify failure**

Run: `pnpm vitest run src/__tests__/data-integrity.test.ts`
Expected: FAIL — `heroProject` and `featuredProjectsWithoutHero` are undefined.

- [ ] **Step 3: Add the helpers to `src/data/projects/index.ts`**

After the existing `featuredProjects` export and before `sortedProjects`, add:

```ts
export const heroProject: Project | undefined = projects.find((p) => p.hero);

export const featuredProjectsWithoutHero: Project[] = featuredProjects.filter(
	(p) => !p.hero
);
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run src/__tests__/data-integrity.test.ts`
Expected: PASS — all tests green.

- [ ] **Step 5: Commit**

```bash
git add src/data/projects/index.ts src/__tests__/data-integrity.test.ts
git commit -m "feat(projects): add hero and featured-without-hero helpers"
```

---

## Task 3: Capture landing-page screenshot asset

**Files:**

- Create: `public/images/projects/tailorsift.webp`

Prerequisite tool: `cwebp` (WebP encoder). If not installed, fallback path is in Step 3.

- [ ] **Step 1: Capture PNG screenshot via Playwright MCP**

Use the Playwright MCP to capture the hero area of tailorsift.io:

1. Call `mcp__plugin_playwright_playwright__browser_resize` with `{ width: 1440, height: 900 }`.
2. Call `mcp__plugin_playwright_playwright__browser_navigate` with `{ url: "https://tailorsift.io" }`.
3. Call `mcp__plugin_playwright_playwright__browser_wait_for` with `{ time: 2 }` so fonts, hero animations, and lazy images settle.
4. Call `mcp__plugin_playwright_playwright__browser_take_screenshot` with `{ filename: "tailorsift.png", type: "png", fullPage: false }` to capture only the viewport (above-the-fold).

Note the absolute path returned by the tool — you'll use it in Step 3.

- [ ] **Step 2: Verify the PNG looks good**

Open the captured PNG and confirm the hero headline (e.g. "Sift the roles. Tailor the approach.") is visible and readable. If the image is cropped oddly, re-run Step 1 after adjusting viewport.

- [ ] **Step 3: Convert PNG to WebP and save to public assets**

First check if `cwebp` is installed:

```bash
which cwebp
```

**If `cwebp` is available** (expected output: a path):

```bash
cwebp -q 85 -resize 1200 0 <absolute/path/to/tailorsift.png> -o public/images/projects/tailorsift.webp
```

(`-resize 1200 0` resizes to 1200px width, height auto; `-q 85` is the quality target.)

**If `cwebp` is not available**, use a transient `sharp` install:

```bash
pnpm add -D sharp
node -e "require('sharp')('<absolute/path/to/tailorsift.png>').resize({ width: 1200 }).webp({ quality: 85 }).toFile('public/images/projects/tailorsift.webp').then(() => console.log('ok'))"
pnpm remove sharp
```

- [ ] **Step 4: Verify the WebP file exists and is reasonably sized**

```bash
ls -lh public/images/projects/tailorsift.webp
```

Expected: file exists, size roughly 30–200 KB. If it's over 300 KB, rerun the conversion with `-q 75`. If under 10 KB, something went wrong — re-capture.

- [ ] **Step 5: Clean up the temporary PNG**

Delete the temporary PNG returned by the MCP tool (the path from Step 1).

- [ ] **Step 6: Commit**

```bash
git add public/images/projects/tailorsift.webp
git commit -m "feat(projects): add tailorsift hero screenshot"
```

---

## Task 4: Build the FeaturedHeroProject component

**Files:**

- Create: `src/features/front/projects/components/FeaturedHeroProject.tsx`
- Create: `src/features/front/projects/components/FeaturedHeroProject.test.tsx`

- [ ] **Step 1: Write the failing component test**

Create `src/features/front/projects/components/FeaturedHeroProject.test.tsx`:

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
	id: "8",
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

	it("renders Read more link to the project detail page", () => {
		render(<FeaturedHeroProject project={project} />);
		const link = screen.getByRole("link", { name: /read more/i });
		expect(link).toHaveAttribute("href", "/project/tailorsift");
	});
});
```

- [ ] **Step 2: Run test to verify failure**

Run: `pnpm vitest run src/features/front/projects/components/FeaturedHeroProject.test.tsx`
Expected: FAIL — `FeaturedHeroProject` does not exist.

- [ ] **Step 3: Create the FeaturedHeroProject component**

Create `src/features/front/projects/components/FeaturedHeroProject.tsx`:

```tsx
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ViewTransitionLink } from "@/components/ViewTransitionLink";
import type { Project } from "@/data/types";

interface FeaturedHeroProjectProps {
	project: Project;
}

export const FeaturedHeroProject = ({ project }: FeaturedHeroProjectProps) => {
	return (
		<section
			className="group relative mb-12 rounded-lg p-5 ring-1 ring-sky-400/20 transition hover:bg-slate-800/30 md:p-6"
			aria-labelledby={`hero-project-${project.slug}-title`}
		>
			<div className="grid gap-6 sm:grid-cols-5 sm:gap-8">
				<div
					className="sm:col-span-2"
					style={{ viewTransitionName: `project-image-${project.slug}` }}
				>
					<Image
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
						style={{ viewTransitionName: `project-title-${project.slug}` }}
					>
						{project.title}
					</h3>
					<p className="mt-1 text-sm font-medium text-sky-400">
						Sift the roles. Tailor the approach.
					</p>
					<p className="mt-3 text-sm leading-normal text-slate-400">
						{project.description}
					</p>
					{project.stack && (
						<ul className="mt-3 flex flex-wrap">
							{project.stack.map((stackName, index) => (
								<li key={index} className="mr-1.5 mt-2">
									<div className="flex items-center rounded-full bg-sky-400/10 px-3 py-1 text-xs font-medium leading-5 text-sky-400">
										{stackName}
									</div>
								</li>
							))}
						</ul>
					)}
					<div className="mt-5 flex flex-wrap items-center gap-4">
						<a
							href={project.url}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={`Visit ${project.title} live site (opens in new tab)`}
							className="inline-flex items-center gap-1 rounded-md bg-sky-400/10 px-3 py-1.5 text-sm font-medium text-sky-400 transition hover:bg-sky-400/20"
						>
							Visit site
							<ArrowUpRight className="h-4 w-4" />
						</a>
						<ViewTransitionLink
							href={`/project/${project.slug}`}
							className="text-sm font-medium text-slate-200 underline decoration-slate-500 underline-offset-4 transition hover:text-sky-400 hover:decoration-sky-400"
						>
							Read more
						</ViewTransitionLink>
					</div>
				</div>
			</div>
		</section>
	);
};
```

- [ ] **Step 4: Run test to verify pass**

Run: `pnpm vitest run src/features/front/projects/components/FeaturedHeroProject.test.tsx`
Expected: PASS — all 7 tests green.

- [ ] **Step 5: Run typecheck**

Run: `pnpm typecheck`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/features/front/projects/components/FeaturedHeroProject.tsx src/features/front/projects/components/FeaturedHeroProject.test.tsx
git commit -m "feat(projects): add featured hero project component"
```

---

## Task 5: Wire hero card into the Projects component

**Files:**

- Modify: `src/features/front/projects/components/Projects.tsx`
- Create: `src/features/front/projects/components/Projects.test.tsx`

- [ ] **Step 1: Write the failing integration test**

Create `src/features/front/projects/components/Projects.test.tsx`:

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Projects from "./Projects";

vi.mock("next/image", () => ({
	default: ({ src, alt }: { src: string; alt: string }) => (
		<img src={src} alt={alt} />
	),
}));

vi.mock("next/link", () => ({
	default: ({
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

describe("Projects", () => {
	it("renders the hero card for TailorSift", () => {
		render(<Projects />);
		expect(
			screen.getByText("Sift the roles. Tailor the approach.")
		).toBeInTheDocument();
	});

	it("renders TailorSift before the other featured projects in the DOM", () => {
		render(<Projects />);
		const titles = screen
			.getAllByRole("link")
			.map((a) => a.textContent?.trim() || "")
			.filter((t) => t.length > 0);
		const tailorsiftIdx = titles.findIndex((t) => /TailorSift/i.test(t));
		const faveIdx = titles.findIndex((t) => /FaVe Cocina/i.test(t));
		expect(tailorsiftIdx).toBeGreaterThanOrEqual(0);
		expect(faveIdx).toBeGreaterThanOrEqual(0);
		expect(tailorsiftIdx).toBeLessThan(faveIdx);
	});

	it("links to the archive at the bottom", () => {
		render(<Projects />);
		expect(
			screen.getByText(/view full project/i, { exact: false })
		).toBeInTheDocument();
	});
});
```

- [ ] **Step 2: Run test to verify failure**

Run: `pnpm vitest run src/features/front/projects/components/Projects.test.tsx`
Expected: FAIL — "Sift the roles. Tailor the approach." tagline not found (the hero card is not wired up yet).

- [ ] **Step 3: Modify Projects.tsx to render the hero card above the list**

Replace the entire contents of `src/features/front/projects/components/Projects.tsx` with:

```tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { featuredProjectsWithoutHero, heroProject } from "@/data/projects";
import { ViewTransitionLink } from "@/components/ViewTransitionLink";
import { FeaturedHeroProject } from "./FeaturedHeroProject";

const Projects = () => {
	const projects = featuredProjectsWithoutHero;

	return (
		<>
			<div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-transparent px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
				<h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
					Projects
				</h2>
			</div>
			<div>
				{heroProject && <FeaturedHeroProject project={heroProject} />}
				<ul className="group/list">
					{projects.map((project, index) => (
						<li key={index} className="mb-12">
							<div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
								<div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
								{/* image */}
								<div
									className="sm:order-1 sm:col-span-2"
									style={{
										viewTransitionName: `project-image-${project.slug}`,
									}}
								>
									<Image
										src={project.image}
										alt={`Screenshot of ${project.title} - ${project.description.slice(0, 100)}`}
										width={150}
										height={150}
										className="rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:translate-y-1"
									/>
								</div>
								<div className="z-10 sm:order-2 sm:col-span-6">
									<h3>
										<ViewTransitionLink
											href={`/project/${project.slug}`}
											className="group/link inline-flex items-baseline text-base font-medium leading-tight text-slate-200 hover:text-sky-400 focus-visible:text-sky-400"
										>
											<span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
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
									<p className="mt-2 text-sm leading-normal">
										{project.description}
									</p>
									{project.stack && (
										<ul className="mt-2 flex flex-wrap">
											{project.stack.map((stackName, index) => (
												<li key={index} className="mr-1.5 mt-2">
													<div className="flex items-center rounded-full bg-sky-400/10 px-3 py-1 text-xs font-medium leading-5 text-sky-400">
														{stackName}
													</div>
												</li>
											))}
										</ul>
									)}
								</div>
							</div>
						</li>
					))}
				</ul>
				<div>
					<Link
						href="/archive"
						className="group inline-flex items-baseline text-base font-medium leading-tight text-slate-200 hover:text-sky-400 focus-visible:text-sky-400"
					>
						<span>
							<span className="border-b border-transparent pb-px transition group-hover:border-sky-400 motion-reduce:transition-none">
								View Full Project {""}
							</span>
							<span>
								<span className="border-b border-transparent pb-px transition group-hover:border-sky-400 motion-reduce:transition-none">
									Archive
								</span>
								<ArrowRight className="ml-1 inline-block h-4 w-4 shrink-0 transition-transform group-hover:translate-x-2 group-focus-visible:-translate-x-2" />
							</span>
						</span>
					</Link>
				</div>
			</div>
		</>
	);
};

export default Projects;

export const dynamic = "force-static";

export const revalidate = 3600;
```

- [ ] **Step 4: Run test to verify pass**

Run: `pnpm vitest run src/features/front/projects/components/Projects.test.tsx`
Expected: PASS — all 3 tests green.

- [ ] **Step 5: Run the full test suite**

Run: `pnpm test:ci`
Expected: all tests pass. If any existing test fails, fix the cause before continuing.

- [ ] **Step 6: Commit**

```bash
git add src/features/front/projects/components/Projects.tsx src/features/front/projects/components/Projects.test.tsx
git commit -m "feat(projects): render tailorsift hero card above featured list"
```

---

## Task 6: Full verification

**Files:** none modified; this task only runs checks.

- [ ] **Step 1: Run the project's validate script**

Run: `pnpm validate`
Expected: lint, typecheck, format check, test suite with coverage, and production build all succeed.

If `pnpm validate` fails:

- Typecheck/lint issues: fix inline, re-commit under `chore: ...` or `fix: ...`.
- Test failures: return to the failing task.
- Build failures: most likely a missing image path or a server/client component boundary issue (the new `FeaturedHeroProject` is a server component — confirm it does not import any `"use client"` hook).

- [ ] **Step 2: Run the dev server and verify in the browser**

Run: `pnpm dev` (in one terminal).

Open http://localhost:3000 and visually confirm:

- TailorSift hero card renders at the top of the projects section with a larger screenshot, the tagline "Sift the roles. Tailor the approach.", the Visit site and Read more CTAs, and the four stack chips.
- The existing featured projects (FaVe Cocina, Abogada Previsional, etc.) render below the hero in their previous compact row layout.
- Clicking the hero title/image navigates to `/project/tailorsift` and the detail page renders without 404 (the existing `[slug]` route picks up the new project via `getProjectBySlug`).
- Clicking "Visit site" opens tailorsift.io in a new tab.
- The `/archive` page still lists TailorSift.

Stop the dev server (`Ctrl+C`) when done.

- [ ] **Step 3: Nothing to commit**

No additional commits needed if Step 1 and Step 2 passed with no issues.

---

## Notes for the implementer

- **Server components:** the existing `Projects.tsx` is a server component (no `"use client"`). `FeaturedHeroProject.tsx` must also be a server component — it uses `ViewTransitionLink`, which is already a client component internally. Do not add `"use client"` to the hero component.
- **Alt text:** all images must include explicit `alt` text per the project's accessibility conventions, and `next/image` with explicit dimensions is mandatory.
- **Named exports:** the user's project conventions require named exports only for new files. The existing `Projects.tsx` uses a default export — preserve it as-is to avoid breaking the import in `src/app/...`. The new `FeaturedHeroProject.tsx` uses a named export.
- **View transitions:** reuse the same `viewTransitionName` pattern (`project-image-${slug}`, `project-title-${slug}`) so navigation to `/project/tailorsift` animates smoothly.
- **Screenshot fallback:** if `cwebp` and `sharp` both fail, request a manual screenshot from Julio rather than checking in a PNG.
