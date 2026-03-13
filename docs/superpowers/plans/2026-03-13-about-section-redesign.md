# About Section Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 6-card bento grid in the About section with a simpler intro paragraph + 3 compact cards + tech list layout.

**Architecture:** Single component rewrite. The `AboutMe` component gets a full content and markup replacement. One import change in `page.tsx` to match the new named export.

**Tech Stack:** React server component, Tailwind CSS, Next.js App Router

**Spec:** `docs/superpowers/specs/2026-03-13-about-section-redesign-design.md`

---

## Chunk 1: Implementation

### Task 1: Write test for new AboutMe component

**Files:**

- Create: `src/__tests__/about-me.test.tsx`

- [ ] **Step 1: Write test file**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutMe } from "@/features/front/about-me/components/AboutMe";

describe("AboutMe Component", () => {
	it("renders the intro paragraph", () => {
		render(<AboutMe />);
		expect(screen.getByText(/web developer/i)).toBeInTheDocument();
		expect(
			screen.getByText(/clean, responsive experiences/i)
		).toBeInTheDocument();
	});

	it("renders all three service cards", () => {
		render(<AboutMe />);
		expect(screen.getByRole("heading", { name: "Build" })).toBeInTheDocument();
		expect(screen.getByRole("heading", { name: "Launch" })).toBeInTheDocument();
		expect(screen.getByRole("heading", { name: "Manage" })).toBeInTheDocument();
	});

	it("renders the tech list", () => {
		render(<AboutMe />);
		expect(screen.getByText("React")).toBeInTheDocument();
		expect(screen.getByText("Next.js")).toBeInTheDocument();
		expect(screen.getByText("TypeScript")).toBeInTheDocument();
		expect(screen.getByText("Tailwind CSS")).toBeInTheDocument();
		expect(screen.getByText("WordPress")).toBeInTheDocument();
		expect(screen.getByText("Node.js")).toBeInTheDocument();
		expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
	});

	it("renders card descriptions", () => {
		render(<AboutMe />);
		expect(
			screen.getByText(/custom websites and web apps/i)
		).toBeInTheDocument();
		expect(screen.getByText(/end-to-end delivery/i)).toBeInTheDocument();
		expect(screen.getByText(/easy-to-manage websites/i)).toBeInTheDocument();
	});

	it("does not render old bento grid content", () => {
		const { container } = render(<AboutMe />);
		// No numbered labels
		expect(container.textContent).not.toMatch(/\b01\b/);
		expect(container.textContent).not.toMatch(/\b02\b/);
		expect(container.textContent).not.toMatch(/\b03\b/);
		expect(container.textContent).not.toMatch(/\b04\b/);
		expect(container.textContent).not.toMatch(/\b05\b/);
		expect(container.textContent).not.toMatch(/\b06\b/);
		// No old card titles
		expect(
			screen.queryByText("Custom Web Applications")
		).not.toBeInTheDocument();
		expect(screen.queryByText("Who I Work With")).not.toBeInTheDocument();
		expect(
			screen.queryByRole("heading", { name: "Frontend" })
		).not.toBeInTheDocument();
		expect(
			screen.queryByRole("heading", { name: "Backend" })
		).not.toBeInTheDocument();
	});

	it("renders the About heading", () => {
		render(<AboutMe />);
		expect(screen.getByRole("heading", { name: "About" })).toBeInTheDocument();
	});
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run src/__tests__/about-me.test.tsx`
Expected: FAIL — current component uses default export, test imports named export

---

### Task 2: Rewrite AboutMe component

**Files:**

- Modify: `src/features/front/about-me/components/AboutMe.tsx` (full rewrite)

- [ ] **Step 1: Replace AboutMe.tsx with new implementation**

```tsx
const SERVICES = [
	{
		title: "Build",
		description: "Custom websites and web apps from scratch with modern tools",
	},
	{
		title: "Launch",
		description: "End-to-end delivery from planning to deployment",
	},
	{
		title: "Manage",
		description:
			"Easy-to-manage websites and CMS solutions you can control yourself",
	},
] as const;

const TECHNOLOGIES = [
	"React",
	"Next.js",
	"TypeScript",
	"Tailwind CSS",
	"WordPress",
	"Node.js",
	"PostgreSQL",
] as const;

export const AboutMe = (): React.JSX.Element => {
	return (
		<>
			<div className="sticky top-0 -mx-6 mb-4 w-screen bg-transparent px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
				<h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
					About
				</h2>
			</div>

			<div>
				<p className="mb-6 text-sm leading-relaxed text-slate-300 md:text-base">
					I&apos;m a{" "}
					<span className="font-bold text-slate-200">web developer</span>{" "}
					helping businesses build fast, modern, and easy-to-manage websites.
					Whether it&apos;s a full redesign, a new website, or a custom web
					application, I focus on creating clean, responsive experiences that
					drive results.
				</p>

				<div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-3">
					{SERVICES.map((service) => (
						<div
							key={service.title}
							className="rounded-lg border border-slate-800 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-slate-600 hover:shadow-lg md:p-5"
						>
							<h3 className="mb-2 text-sm font-semibold text-slate-200 md:text-base">
								{service.title}
							</h3>
							<p className="text-xs leading-relaxed text-slate-400 md:text-sm">
								{service.description}
							</p>
						</div>
					))}
				</div>

				<div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-800 pt-4">
					{TECHNOLOGIES.map((tech) => (
						<span key={tech} className="text-xs text-sky-400">
							{tech}
						</span>
					))}
				</div>
			</div>
		</>
	);
};
```

Note: removes `"use client"` (no hooks/handlers), uses named export, removes `export const dynamic`.

- [ ] **Step 2: Run tests**

Run: `pnpm vitest run src/__tests__/about-me.test.tsx`
Expected: ALL PASS

---

### Task 3: Update page.tsx import

**Files:**

- Modify: `src/app/page.tsx:2`

- [ ] **Step 1: Change default import to named import**

Change line 2 from:

```tsx
import AboutMe from "@/features/front/about-me/components/AboutMe";
```

To:

```tsx
import { AboutMe } from "@/features/front/about-me/components/AboutMe";
```

- [ ] **Step 2: Run full test suite**

Run: `pnpm vitest run`
Expected: ALL PASS (both test files)

- [ ] **Step 3: Run dev server build check**

Run: `pnpm build`
Expected: Build succeeds with no errors

- [ ] **Step 4: Commit all changes**

```bash
git add src/features/front/about-me/components/AboutMe.tsx src/app/page.tsx src/__tests__/about-me.test.tsx
git commit -m "feat(about): replace bento grid with intro + 3 cards layout"
```
