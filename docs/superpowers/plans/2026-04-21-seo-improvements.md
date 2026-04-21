# SEO Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a complete SEO foundation to the portfolio: per-route metadata,
dynamic OG images, sitemap, robots, and JSON-LD structured data.

**Architecture:** A shared `src/lib/seo.ts` module owns URL resolution, host
checks, and small helpers (singleton pattern per the project's `performance.md`
rule). Next.js App Router file conventions provide `sitemap.ts`, `robots.ts`,
and `opengraph-image.tsx` routes. A shared `src/lib/og-template.tsx` renders all
OG images with one visual identity. Per-route `generateMetadata` functions
consume `siteConfig` and the project/experience data modules.

**Tech Stack:** Next.js 15 App Router, TypeScript strict, Vitest, Tailwind v4,
`ImageResponse` (Satori).

**Spec:** `docs/superpowers/specs/2026-04-21-seo-improvements-design.md`

**Important data-model note (correcting spec field names):**

- `Project` exposes `title` (not `name`), plus `description`, `stack`, `image`,
  `url`, `slug`.
- `Experience` exposes `position` (not `role`), plus `company`, `startDate`,
  `endDate`, `description`, `slug`.
- Tasks below use these correct field names.

**JSON-LD injection safety (applies to Tasks 4 and 7):** All JSON-LD blocks are
injected via `dangerouslySetInnerHTML` with `JSON.stringify` output. Input is
sourced exclusively from compile-time modules (`siteConfig`, `projects`) — no
user input, no external data. `JSON.stringify` escapes the characters needed for
safe `<script>` embedding. This is the standard Next.js pattern for structured
data; no sanitizer needed.

**OG-font decision (YAGNI deviation from spec):** The OG template uses Satori's
default sans-serif font. Custom Montserrat loading inside `ImageResponse` adds
fragility (external font fetch, binary parsing) for marginal visual gain.
Dark-purple background + accent bar + left-aligned layout still matches site
identity. Custom font is a follow-up if desired.

---

## Task 1: SEO primitives module with tests

**Files:**

- Create: `src/lib/seo.ts`
- Create: `src/lib/seo.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `src/lib/seo.test.ts`:

```ts
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("seo primitives", () => {
	const ORIGINAL_ENV = { ...process.env };

	beforeEach(() => {
		vi.resetModules();
	});

	afterEach(() => {
		process.env = { ...ORIGINAL_ENV };
	});

	describe("siteUrl", () => {
		it("uses NEXT_PUBLIC_SITE_URL when set", async () => {
			process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
			const { siteUrl } = await import("./seo");
			expect(siteUrl.toString()).toBe("https://example.com/");
		});

		it("falls back to https://VERCEL_URL when only VERCEL_URL is set", async () => {
			delete process.env.NEXT_PUBLIC_SITE_URL;
			process.env.VERCEL_URL = "my-preview.vercel.app";
			const { siteUrl } = await import("./seo");
			expect(siteUrl.toString()).toBe("https://my-preview.vercel.app/");
		});

		it("falls back to https://www.julisv.com when neither env var is set", async () => {
			delete process.env.NEXT_PUBLIC_SITE_URL;
			delete process.env.VERCEL_URL;
			const { siteUrl } = await import("./seo");
			expect(siteUrl.toString()).toBe("https://www.julisv.com/");
		});
	});

	describe("absoluteUrl", () => {
		it("builds an absolute URL from a pathname with leading slash", async () => {
			process.env.NEXT_PUBLIC_SITE_URL = "https://www.julisv.com";
			const { absoluteUrl } = await import("./seo");
			expect(absoluteUrl("/project/tailorsift")).toBe(
				"https://www.julisv.com/project/tailorsift"
			);
		});

		it("handles the root path", async () => {
			process.env.NEXT_PUBLIC_SITE_URL = "https://www.julisv.com";
			const { absoluteUrl } = await import("./seo");
			expect(absoluteUrl("/")).toBe("https://www.julisv.com/");
		});
	});

	describe("isProductionHost", () => {
		it("returns true for www.julisv.com", async () => {
			const { isProductionHost } = await import("./seo");
			expect(isProductionHost(new URL("https://www.julisv.com"))).toBe(true);
		});

		it("returns false for preview host", async () => {
			const { isProductionHost } = await import("./seo");
			expect(isProductionHost(new URL("https://preview.vercel.app"))).toBe(
				false
			);
		});

		it("returns false for localhost", async () => {
			const { isProductionHost } = await import("./seo");
			expect(isProductionHost(new URL("http://localhost:3000"))).toBe(false);
		});

		it("returns false for apex julisv.com (no www)", async () => {
			const { isProductionHost } = await import("./seo");
			expect(isProductionHost(new URL("https://julisv.com"))).toBe(false);
		});
	});

	describe("truncate", () => {
		it("returns the input unchanged when shorter than max", async () => {
			const { truncate } = await import("./seo");
			expect(truncate("short", 160)).toBe("short");
		});

		it("truncates at word boundary and appends ellipsis", async () => {
			const { truncate } = await import("./seo");
			const input =
				"This is a long description that will definitely exceed the limit when we set the limit low enough to see truncation";
			const out = truncate(input, 40);
			expect(out.length).toBeLessThanOrEqual(40);
			expect(out.endsWith("…")).toBe(true);
			expect(out).not.toContain("  ");
		});

		it("handles empty string", async () => {
			const { truncate } = await import("./seo");
			expect(truncate("", 160)).toBe("");
		});
	});

	describe("DEFAULT_OG_SIZE", () => {
		it("is 1200x630", async () => {
			const { DEFAULT_OG_SIZE } = await import("./seo");
			expect(DEFAULT_OG_SIZE).toEqual({ width: 1200, height: 630 });
		});
	});
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/lib/seo.test.ts` Expected: FAIL — "Cannot find module
'./seo'" or similar.

- [ ] **Step 3: Implement `src/lib/seo.ts`**

Create `src/lib/seo.ts`:

```ts
const DEFAULT_SITE_URL = "https://www.julisv.com";

function resolveSiteUrl(): URL {
	const explicit = process.env.NEXT_PUBLIC_SITE_URL;
	if (explicit) return new URL(explicit);

	const vercel = process.env.VERCEL_URL;
	if (vercel) return new URL(`https://${vercel}`);

	return new URL(DEFAULT_SITE_URL);
}

export const siteUrl: URL = resolveSiteUrl();

export const DEFAULT_OG_SIZE = { width: 1200, height: 630 } as const;

export function isProductionHost(url: URL): boolean {
	return url.host === "www.julisv.com";
}

export function absoluteUrl(path: string): string {
	return new URL(path, siteUrl).toString();
}

export function truncate(str: string, max = 160): string {
	if (str.length <= max) return str;
	const sliced = str.slice(0, max - 1);
	const lastSpace = sliced.lastIndexOf(" ");
	const cut = lastSpace > max * 0.6 ? sliced.slice(0, lastSpace) : sliced;
	return `${cut.trimEnd()}…`;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test src/lib/seo.test.ts` Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/seo.ts src/lib/seo.test.ts
git commit -m "feat(seo): add seo primitives module with url resolution helpers"
```

---

## Task 2: Robots route with tests

**Files:**

- Create: `src/app/robots.ts`
- Create: `src/app/robots.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `src/app/robots.test.ts`:

```ts
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("robots()", () => {
	const ORIGINAL_ENV = { ...process.env };

	beforeEach(() => {
		vi.resetModules();
	});

	afterEach(() => {
		process.env = { ...ORIGINAL_ENV };
	});

	it("allows all crawling on production host and includes sitemap", async () => {
		process.env.NEXT_PUBLIC_SITE_URL = "https://www.julisv.com";
		const robots = (await import("./robots")).default;
		const result = robots();
		expect(result.rules).toEqual([{ userAgent: "*", allow: "/" }]);
		expect(result.sitemap).toBe("https://www.julisv.com/sitemap.xml");
		expect(result.host).toBe("www.julisv.com");
	});

	it("disallows all crawling on preview host and omits sitemap", async () => {
		process.env.NEXT_PUBLIC_SITE_URL = "https://preview.vercel.app";
		const robots = (await import("./robots")).default;
		const result = robots();
		expect(result.rules).toEqual([{ userAgent: "*", disallow: "/" }]);
		expect(result.sitemap).toBeUndefined();
	});

	it("disallows all crawling when siteUrl falls back to VERCEL_URL", async () => {
		delete process.env.NEXT_PUBLIC_SITE_URL;
		process.env.VERCEL_URL = "my-preview.vercel.app";
		const robots = (await import("./robots")).default;
		const result = robots();
		expect(result.rules).toEqual([{ userAgent: "*", disallow: "/" }]);
	});
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/app/robots.test.ts` Expected: FAIL — "Cannot find module
'./robots'".

- [ ] **Step 3: Implement `src/app/robots.ts`**

Create `src/app/robots.ts`:

```ts
import type { MetadataRoute } from "next";
import { siteUrl, isProductionHost, absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
	if (isProductionHost(siteUrl)) {
		return {
			rules: [{ userAgent: "*", allow: "/" }],
			sitemap: absoluteUrl("/sitemap.xml"),
			host: "www.julisv.com",
		};
	}
	return {
		rules: [{ userAgent: "*", disallow: "/" }],
	};
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test src/app/robots.test.ts` Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/robots.ts src/app/robots.test.ts
git commit -m "feat(seo): add robots.ts to block preview deploys and allow production"
```

---

## Task 3: Sitemap route with tests

**Files:**

- Create: `src/app/sitemap.ts`
- Create: `src/app/sitemap.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `src/app/sitemap.test.ts`:

```ts
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { sortedProjects } from "@/data/projects";
import { sortedExperiences } from "@/data/experience";

describe("sitemap()", () => {
	const ORIGINAL_ENV = { ...process.env };

	beforeEach(() => {
		vi.resetModules();
		process.env.NEXT_PUBLIC_SITE_URL = "https://www.julisv.com";
	});

	afterEach(() => {
		process.env = { ...ORIGINAL_ENV };
	});

	it("includes home, archive, all projects, and all experiences", async () => {
		const sitemap = (await import("./sitemap")).default;
		const entries = sitemap();

		const urls = entries.map((e) => e.url);
		expect(urls).toContain("https://www.julisv.com/");
		expect(urls).toContain("https://www.julisv.com/archive");
		for (const p of sortedProjects) {
			expect(urls).toContain(`https://www.julisv.com/project/${p.slug}`);
		}
		for (const e of sortedExperiences) {
			expect(urls).toContain(`https://www.julisv.com/experience/${e.slug}`);
		}
	});

	it("has the expected total count", async () => {
		const sitemap = (await import("./sitemap")).default;
		const entries = sitemap();
		expect(entries.length).toBe(
			sortedProjects.length + sortedExperiences.length + 2
		);
	});

	it("all urls start with the configured site url", async () => {
		const sitemap = (await import("./sitemap")).default;
		const entries = sitemap();
		for (const e of entries) {
			expect(e.url.startsWith("https://www.julisv.com/")).toBe(true);
		}
	});

	it("every entry has a lastModified date", async () => {
		const sitemap = (await import("./sitemap")).default;
		const entries = sitemap();
		for (const e of entries) {
			expect(e.lastModified).toBeInstanceOf(Date);
		}
	});
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/app/sitemap.test.ts` Expected: FAIL — "Cannot find module
'./sitemap'".

- [ ] **Step 3: Implement `src/app/sitemap.ts`**

Create `src/app/sitemap.ts`:

```ts
import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { sortedProjects } from "@/data/projects";
import { sortedExperiences } from "@/data/experience";

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();

	const staticEntries: MetadataRoute.Sitemap = [
		{
			url: absoluteUrl("/"),
			lastModified: now,
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: absoluteUrl("/archive"),
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.7,
		},
	];

	const projectEntries: MetadataRoute.Sitemap = sortedProjects.map((p) => ({
		url: absoluteUrl(`/project/${p.slug}`),
		lastModified: now,
		changeFrequency: "yearly",
		priority: 0.8,
	}));

	const experienceEntries: MetadataRoute.Sitemap = sortedExperiences.map(
		(e) => ({
			url: absoluteUrl(`/experience/${e.slug}`),
			lastModified: now,
			changeFrequency: "yearly",
			priority: 0.6,
		})
	);

	return [...staticEntries, ...projectEntries, ...experienceEntries];
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test src/app/sitemap.test.ts` Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/sitemap.ts src/app/sitemap.test.ts
git commit -m "feat(seo): add sitemap covering home, archive, projects, experiences"
```

---

## Task 4: Root layout metadata + Person JSON-LD

**Files:**

- Modify: `src/app/layout.tsx`

No new unit test — metadata is data-plumbing covered by the build and manual
source inspection in Task 12.

- [ ] **Step 1: Rewrite `src/app/layout.tsx`**

Replace the entire file with:

```tsx
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "../providers/ph-provider";
import { siteUrl, absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/data/site";

const DESCRIPTION =
	"Full-stack web developer specializing in Next.js, React, and TypeScript. Building fast, accessible, and well-crafted web experiences.";

export const metadata: Metadata = {
	metadataBase: siteUrl,
	title: {
		default: `${siteConfig.name} — Full-stack web developer`,
		template: `%s · ${siteConfig.name}`,
	},
	description: DESCRIPTION,
	authors: [{ name: siteConfig.name, url: siteUrl.toString() }],
	alternates: { canonical: "/" },
	openGraph: {
		type: "website",
		url: "/",
		siteName: siteConfig.name,
		locale: "en_US",
		title: `${siteConfig.name} — Full-stack web developer`,
		description: DESCRIPTION,
	},
	twitter: {
		card: "summary_large_image",
		title: `${siteConfig.name} — Full-stack web developer`,
		description: DESCRIPTION,
	},
	robots: { index: true, follow: true },
};

const montserrat = Montserrat({
	subsets: ["latin"],
});

const personJsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: siteConfig.name,
	url: absoluteUrl("/"),
	jobTitle: "Full-stack web developer",
	sameAs: [siteConfig.socialLinks.github, siteConfig.socialLinks.linkedin],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`scroll-smooth ` + montserrat.className}>
			<body className="bg-dark-purple leading-relaxed text-slate-400 antialiased selection:bg-sky-400 selection:text-slate-900">
				<script
					type="application/ld+json"
					// JSON-LD content is compile-time (siteConfig); JSON.stringify handles escaping.
					dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
				/>
				<PostHogProvider>{children}</PostHogProvider>
			</body>
		</html>
	);
}
```

- [ ] **Step 2: Typecheck**

Run: `pnpm typecheck` Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(seo): expand root metadata with og, twitter, canonical, and person json-ld"
```

---

## Task 5: Shared OG image template

**Files:**

- Create: `src/lib/og-template.tsx`

No unit test — visual output verified by manual inspection and build success.

- [ ] **Step 1: Create `src/lib/og-template.tsx`**

```tsx
import type { ReactElement } from "react";

interface OgTemplateProps {
	eyebrow: string;
	title: string;
	subtitle: string;
	footer?: string | ReactElement;
}

const DARK_PURPLE = "#0a0a23";
const SKY_400 = "#38bdf8";
const SLATE_100 = "#f1f5f9";
const SLATE_400 = "#94a3b8";

export function renderOgImage({
	eyebrow,
	title,
	subtitle,
	footer,
}: OgTemplateProps): ReactElement {
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				backgroundColor: DARK_PURPLE,
				padding: "80px",
				color: SLATE_100,
				fontFamily: "sans-serif",
			}}
		>
			<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
				<div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
					<div
						style={{ width: "48px", height: "4px", backgroundColor: SKY_400 }}
					/>
					<span
						style={{
							fontSize: "24px",
							textTransform: "uppercase",
							letterSpacing: "4px",
							color: SKY_400,
						}}
					>
						{eyebrow}
					</span>
				</div>
				<h1
					style={{
						fontSize: "84px",
						lineHeight: 1.05,
						fontWeight: 700,
						margin: 0,
						maxWidth: "1000px",
					}}
				>
					{title}
				</h1>
				<p
					style={{
						fontSize: "36px",
						lineHeight: 1.3,
						color: SLATE_400,
						margin: 0,
						maxWidth: "1000px",
					}}
				>
					{subtitle}
				</p>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "flex-end",
					fontSize: "24px",
					color: SLATE_400,
				}}
			>
				<span style={{ display: "flex" }}>julisv.com</span>
				{footer ? <span style={{ display: "flex" }}>{footer}</span> : null}
			</div>
		</div>
	);
}
```

- [ ] **Step 2: Typecheck**

Run: `pnpm typecheck` Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/og-template.tsx
git commit -m "feat(seo): add shared og image template"
```

---

## Task 6: Home OG image

**Files:**

- Create: `src/app/opengraph-image.tsx`

- [ ] **Step 1: Create `src/app/opengraph-image.tsx`**

```tsx
import { ImageResponse } from "next/og";
import { renderOgImage } from "@/lib/og-template";
import { DEFAULT_OG_SIZE } from "@/lib/seo";
import { siteConfig } from "@/data/site";

export const runtime = "nodejs";
export const alt = `${siteConfig.name} — Full-stack web developer`;
export const size = DEFAULT_OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
	return new ImageResponse(
		renderOgImage({
			eyebrow: "Portfolio",
			title: siteConfig.name,
			subtitle: "Full-stack web developer — Next.js, React, TypeScript",
		}),
		{ ...DEFAULT_OG_SIZE }
	);
}
```

- [ ] **Step 2: Typecheck**

Run: `pnpm typecheck` Expected: no errors.

- [ ] **Step 3: Build smoke check**

Run: `pnpm build` Expected: build succeeds, output shows `/opengraph-image`
route generated.

- [ ] **Step 4: Commit**

```bash
git add src/app/opengraph-image.tsx
git commit -m "feat(seo): add home opengraph image"
```

---

## Task 7: Project route metadata + CreativeWork JSON-LD

**Files:**

- Modify: `src/app/(front)/project/[slug]/page.tsx`

- [ ] **Step 1: Rewrite `src/app/(front)/project/[slug]/page.tsx`**

Replace the file with:

```tsx
import type { Metadata } from "next";
import SingleProject from "@/features/front/projects/components/SingleProject";
import { sortedProjects, getProjectBySlug } from "@/data";
import { absoluteUrl, truncate } from "@/lib/seo";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const project = getProjectBySlug(slug);
	if (!project) return {};

	const description = truncate(project.description);
	const canonical = `/project/${project.slug}`;

	return {
		title: project.title,
		description,
		keywords: project.stack,
		alternates: { canonical },
		openGraph: {
			type: "article",
			url: canonical,
			title: project.title,
			description,
		},
		twitter: {
			card: "summary_large_image",
			title: project.title,
			description,
		},
	};
}

const ProjectPage = async (props: PageProps) => {
	const params = await props.params;
	const project = getProjectBySlug(params.slug);

	const jsonLd = project
		? {
				"@context": "https://schema.org",
				"@type": "CreativeWork",
				name: project.title,
				description: project.description,
				url: project.url,
				author: { "@type": "Person", name: "Julian Suarez Vivas" },
				keywords: project.stack.join(", "),
				image: absoluteUrl(project.image),
			}
		: null;

	return (
		<>
			{jsonLd ? (
				<script
					type="application/ld+json"
					// JSON-LD content is compile-time (projects data); JSON.stringify handles escaping.
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			) : null}
			<SingleProject slug={params.slug} />
		</>
	);
};

export default ProjectPage;

export const dynamic = "force-static";

export async function generateStaticParams() {
	return sortedProjects.map((project) => ({
		slug: project.slug,
	}));
}
```

- [ ] **Step 2: Typecheck + existing tests**

Run: `pnpm typecheck && pnpm test` Expected: no errors, all existing tests still
pass.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(front)/project/[slug]/page.tsx"
git commit -m "feat(seo): add project route metadata and creativework json-ld"
```

---

## Task 8: Project OG image

**Files:**

- Create: `src/app/(front)/project/[slug]/opengraph-image.tsx`

- [ ] **Step 1: Create the file**

```tsx
import { ImageResponse } from "next/og";
import { renderOgImage } from "@/lib/og-template";
import { DEFAULT_OG_SIZE, truncate } from "@/lib/seo";
import { getProjectBySlug, sortedProjects } from "@/data";

export const runtime = "nodejs";
export const alt = "Project preview";
export const size = DEFAULT_OG_SIZE;
export const contentType = "image/png";

export async function generateStaticParams() {
	return sortedProjects.map((p) => ({ slug: p.slug }));
}

interface ImageProps {
	params: Promise<{ slug: string }>;
}

export default async function Image({ params }: ImageProps) {
	const { slug } = await params;
	const project = getProjectBySlug(slug);
	const title = project?.title ?? "Project";
	const subtitle = project
		? truncate(project.description, 120)
		: "Portfolio project";
	const stackChips = project ? project.stack.slice(0, 4).join(" · ") : "";

	return new ImageResponse(
		renderOgImage({
			eyebrow: "Project",
			title,
			subtitle,
			footer: stackChips,
		}),
		{ ...DEFAULT_OG_SIZE }
	);
}
```

- [ ] **Step 2: Typecheck**

Run: `pnpm typecheck` Expected: no errors.

- [ ] **Step 3: Build smoke check**

Run: `pnpm build` Expected: build succeeds; output shows one OG image route
generated per project slug.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(front)/project/[slug]/opengraph-image.tsx"
git commit -m "feat(seo): add per-project opengraph image"
```

---

## Task 9: Experience route metadata

**Files:**

- Modify: `src/app/experience/[slug]/page.tsx`

- [ ] **Step 1: Rewrite the file**

```tsx
import type { Metadata } from "next";
import ExperienceDetail from "@/features/front/experience/components/ExperienceDetail";
import { sortedExperiences, getExperienceBySlug } from "@/data";
import { truncate } from "@/lib/seo";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const experience = getExperienceBySlug(slug);
	if (!experience) return {};

	const title = `${experience.position} at ${experience.company}`;
	const description = truncate(experience.description);
	const canonical = `/experience/${experience.slug}`;

	return {
		title,
		description,
		alternates: { canonical },
		openGraph: {
			type: "article",
			url: canonical,
			title,
			description,
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
		},
	};
}

const ExperiencePage = async (props: PageProps) => {
	const params = await props.params;
	return <ExperienceDetail slug={params.slug} />;
};

export default ExperiencePage;

export const dynamic = "force-static";

export async function generateStaticParams() {
	return sortedExperiences.map((exp) => ({
		slug: exp.slug,
	}));
}
```

- [ ] **Step 2: Typecheck + existing tests**

Run: `pnpm typecheck && pnpm test` Expected: no errors, all tests pass.

- [ ] **Step 3: Commit**

```bash
git add "src/app/experience/[slug]/page.tsx"
git commit -m "feat(seo): add experience route metadata"
```

---

## Task 10: Experience OG image

**Files:**

- Create: `src/app/experience/[slug]/opengraph-image.tsx`

- [ ] **Step 1: Create the file**

```tsx
import { ImageResponse } from "next/og";
import { renderOgImage } from "@/lib/og-template";
import { DEFAULT_OG_SIZE } from "@/lib/seo";
import { getExperienceBySlug, sortedExperiences } from "@/data";

export const runtime = "nodejs";
export const alt = "Experience preview";
export const size = DEFAULT_OG_SIZE;
export const contentType = "image/png";

export async function generateStaticParams() {
	return sortedExperiences.map((e) => ({ slug: e.slug }));
}

interface ImageProps {
	params: Promise<{ slug: string }>;
}

export default async function Image({ params }: ImageProps) {
	const { slug } = await params;
	const experience = getExperienceBySlug(slug);
	const title = experience?.position ?? "Experience";
	const subtitle = experience?.company ?? "";
	const dateRange = experience
		? `${experience.startDate} — ${experience.endDate}`
		: "";

	return new ImageResponse(
		renderOgImage({
			eyebrow: "Experience",
			title,
			subtitle,
			footer: dateRange,
		}),
		{ ...DEFAULT_OG_SIZE }
	);
}
```

- [ ] **Step 2: Typecheck**

Run: `pnpm typecheck` Expected: no errors.

- [ ] **Step 3: Build smoke check**

Run: `pnpm build` Expected: build succeeds; OG image route generated per
experience slug.

- [ ] **Step 4: Commit**

```bash
git add "src/app/experience/[slug]/opengraph-image.tsx"
git commit -m "feat(seo): add per-experience opengraph image"
```

---

## Task 11: Archive page metadata

**Files:**

- Modify: `src/app/(front)/archive/page.tsx`

- [ ] **Step 1: Read the current file**

Run: `cat "src/app/(front)/archive/page.tsx"`

- [ ] **Step 2: Add a `metadata` export to the top of the file**

Add this import (if not already present) and this `metadata` export. Do not
remove or alter any existing code in the file.

```tsx
import type { Metadata } from "next";

const ARCHIVE_DESCRIPTION =
	"The complete archive of projects I've built — websites, web apps, and experiments.";

export const metadata: Metadata = {
	title: "Archive",
	description: ARCHIVE_DESCRIPTION,
	alternates: { canonical: "/archive" },
	openGraph: {
		type: "website",
		url: "/archive",
		title: "Archive",
		description: ARCHIVE_DESCRIPTION,
	},
	twitter: {
		card: "summary_large_image",
		title: "Archive",
		description: ARCHIVE_DESCRIPTION,
	},
};
```

- [ ] **Step 3: Typecheck**

Run: `pnpm typecheck` Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(front)/archive/page.tsx"
git commit -m "feat(seo): add metadata to archive page"
```

---

## Task 12: Full-suite verification

**Files:** none (verification only)

- [ ] **Step 1: Full validation suite**

Run: `pnpm validate` Expected: lint + typecheck + format + tests + build all
pass.

- [ ] **Step 2: Run production server and check SEO routes**

Run (background): `pnpm start` Expected: server starts on
`http://localhost:3000`.

Then with `curl` or a browser, confirm:

- `curl -s http://localhost:3000/robots.txt` — shows `User-Agent: *` plus either
  `Allow: /` (if `NEXT_PUBLIC_SITE_URL=https://www.julisv.com`) or `Disallow: /`
  (otherwise).
- `curl -s http://localhost:3000/sitemap.xml | head -20` — XML with `<url>`
  entries for home, archive, projects, experiences.
- `http://localhost:3000/project/tailorsift` → View Source → confirm:
  - `<title>TailorSift · Julian Suarez Vivas</title>` (title template applied).
  - `<meta property="og:image" ...>` pointing to
    `/project/tailorsift/opengraph-image`.
  - `<meta name="twitter:card" content="summary_large_image">`.
  - `<link rel="canonical" href=".../project/tailorsift">`.
  - `<script type="application/ld+json">` containing `"@type":"CreativeWork"`.
- `http://localhost:3000/opengraph-image` → PNG renders with "Portfolio"
  eyebrow, name, subtitle.

Stop the server when done (Ctrl+C or `kill %1`).

- [ ] **Step 3: Configure Vercel env var (manual, no code change)**

In Vercel project settings:

- Production environment: add `NEXT_PUBLIC_SITE_URL=https://www.julisv.com`.
- Preview / development environments: leave unset (so `isProductionHost` is
  false and robots disallow indexing).

This step is an out-of-repo action — no commit.

- [ ] **Step 4: Post-deploy verification (after merge + deploy)**

Once live on `https://www.julisv.com`:

- LinkedIn Post Inspector (`https://www.linkedin.com/post-inspector/`) — paste
  home URL and a project URL; confirm image, title, description render.
- Twitter Card Validator (`https://cards-dev.twitter.com/validator`) — same
  URLs; confirm large-image card.
- Google Rich Results Test (`https://search.google.com/test/rich-results`) —
  home URL should detect `Person`, project URL should detect `CreativeWork`.
- Confirm `https://www.julisv.com/robots.txt` shows `Allow: /` and lists the
  sitemap.
- Confirm a Vercel preview URL's `/robots.txt` shows `Disallow: /`.

Manual checklist — no commit required.

---

## Done

All 12 tasks complete → portfolio has full SEO foundation: per-route metadata,
dynamic OG images, sitemap, robots with preview-deploy blocking, and structured
data.
