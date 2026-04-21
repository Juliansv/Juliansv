# SEO Improvements — Design Spec

- **Date:** 2026-04-21
- **Owner:** Julian Suarez Vivas
- **Status:** Approved (pending user review of this doc)
- **Scope:** Site-wide SEO foundation for the portfolio

## Goal

Give the portfolio a complete SEO foundation so that:

- Google and other search engines can discover and index every route.
- Links shared on LinkedIn / Twitter / Slack render rich previews with per-route
  OG images, titles, and descriptions.
- Structured data (`Person`, `CreativeWork`) helps search engines understand the
  portfolio's content.
- Preview/staging deploys are not indexed.

## Current State

- `src/app/layout.tsx` has only `title` + `description`. No `metadataBase`, no
  title template, no OG, no Twitter cards, no canonical.
- `/project/[slug]` and `/experience/[slug]` export no metadata at all.
- `/archive` exports no metadata.
- No `sitemap.ts` or `robots.ts`.
- No OG images (static or dynamic).
- No JSON-LD structured data.
- `lighthouserc.json` sets `is-crawlable: off`, masking the absence of
  robots/crawl-control logic.
- Production URL: `https://www.julisv.com`.

## Decisions Locked In

- Production canonical: `https://www.julisv.com`.
- Site URL resolution: env-var with fallback (flexible across environments).
- OG images: dynamic per-route via `opengraph-image.tsx` (`ImageResponse`).
- Twitter card: `summary_large_image`, no `creator` handle.

## Architecture

### `src/lib/seo.ts` — SEO primitives (singleton)

Single source of truth. Parsed/constructed once at module init per the
`performance.md` rule.

Exports:

- `siteUrl: URL` —
  `new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.julisv.com")`. If
  `NEXT_PUBLIC_SITE_URL` is unset but `VERCEL_URL` is set (preview deploys), use
  `https://${VERCEL_URL}` so preview OG URLs are absolute and functional.
- `isProductionHost(url: URL): boolean` — true iff
  `url.host === "www.julisv.com"`. Used by `robots.ts` to switch between
  allow/disallow.
- `absoluteUrl(path: string): string` — `new URL(path, siteUrl).toString()`.
- `truncate(str: string, max = 160): string` — clean truncation at word
  boundaries with a trailing ellipsis; used for OG/meta descriptions.
- `DEFAULT_OG_SIZE` — `{ width: 1200, height: 630 }` constant.

No runtime Zod parsing inside any exported function.

### `src/lib/og-template.tsx` — shared OG image template

Exports `renderOgImage({ eyebrow, title, subtitle, footer })` returning a
`ReactElement` consumed by `ImageResponse`. Inline styles only (no Tailwind).
Visual identity matches site:

- 1200×630, dark-purple background.
- Left-aligned layout.
- Thin sky-400 accent bar.
- Montserrat weights loaded from Google Fonts via `fetch(...).arrayBuffer()`
  once per module (Next caches at build time).
- Footer always shows `julisv.com`.

## Root Metadata — `src/app/layout.tsx`

Replace the current 3-field `metadata` export with:

- `metadataBase: siteUrl`
- `title: { default: "Julian Suarez Vivas — Full-stack web developer", template: "%s · Julian Suarez Vivas" }`
- `description`: existing copy retained.
- `authors: [{ name: siteConfig.name, url: siteUrl.toString() }]`
- `alternates: { canonical: "/" }`
- `openGraph`: `type: "website"`, `url: "/"`, `siteName: siteConfig.name`,
  `locale: "en_US"`, title, description.
- `twitter`: `card: "summary_large_image"`, title, description.
- `robots`: `{ index: true, follow: true }`. Preview-deploy blocking lives in
  `robots.ts` globally; no per-page overrides.

OG image for the home route is auto-discovered from
`src/app/opengraph-image.tsx`.

### JSON-LD `Person` schema

Server-rendered `<script type="application/ld+json">` in `layout.tsx` `<body>`.
Pulls from `siteConfig` — no duplication:

```json
{
	"@context": "https://schema.org",
	"@type": "Person",
	"name": "Julian Suarez Vivas",
	"url": "https://www.julisv.com",
	"jobTitle": "Full-stack web developer",
	"sameAs": ["<github>", "<linkedin>"]
}
```

**Safety note:** injection uses `dangerouslySetInnerHTML` with
`JSON.stringify()` output. Input is sourced entirely from `src/data/site.ts`
(`siteConfig`) — compile-time constants, no user input, no external fetch.
`JSON.stringify` safely escapes `<`, `>`, and quotes for embedding inside a
`<script>` tag. This is the standard Next.js pattern for JSON-LD; no sanitizer
needed. If the schema ever incorporates user-controlled data in the future,
switch to a sanitizer or escape `</` explicitly.

## Per-Route Metadata

### `src/app/(front)/project/[slug]/page.tsx`

Add `generateMetadata({ params })`:

- `title: project.name` (becomes `"TailorSift · Julian Suarez Vivas"`).
- `description: truncate(project.description)`.
- `keywords: project.stack`.
- `alternates: { canonical: ` /project/${slug} ` }`.
- `openGraph: { type: "article", url: ` /project/${slug}
  `, title, description }`.
- `twitter: { card: "summary_large_image", title, description }`.

If `getProjectBySlug(slug)` returns `undefined`, return `{}`; existing not-found
behavior handles the rest.

Also inject a `CreativeWork` JSON-LD on the page (same safety note as the
`Person` schema — input sourced from `projects` data module, stringified):

```json
{
	"@context": "https://schema.org",
	"@type": "CreativeWork",
	"name": "<project.name>",
	"description": "<project.description>",
	"url": "<project.url>",
	"author": { "@type": "Person", "name": "Julian Suarez Vivas" },
	"keywords": "<project.stack joined by comma>",
	"image": "<absoluteUrl(project.image)>"
}
```

### `src/app/experience/[slug]/page.tsx`

Add `generateMetadata({ params })`:

- `title: ${role} at ${company}`.
- `description: truncate(experience.summary)`.
- `alternates: { canonical: ` /experience/${slug} ` }`.
- `openGraph: { type: "article", url, title, description }`.
- `twitter: { card: "summary_large_image", title, description }`.

No JSON-LD — `Person` on home covers employment history; adding `WorkExperience`
here would be noise.

### `src/app/(front)/archive/page.tsx`

Static `metadata` export:

- `title: "Archive"`.
- `description`: describes the full project list.
- `alternates: { canonical: "/archive" }`.
- OG + Twitter mirroring title/description.

## Dynamic OG Images

Three `opengraph-image.tsx` routes. All use `ImageResponse` and the shared
`renderOgImage` template. Runtime: **Node** (keeps data imports simple; Next
caches output at build time).

Each file exports:

- `alt: string`
- `size = DEFAULT_OG_SIZE`
- `contentType = "image/png"`
- `default async function Image({ params })`

### `src/app/opengraph-image.tsx` — home

- `eyebrow: "Portfolio"`
- `title: "Julian Suarez Vivas"`
- `subtitle: "Full-stack web developer — Next.js, React, TypeScript"`

### `src/app/(front)/project/[slug]/opengraph-image.tsx`

- `eyebrow: "Project"`
- `title: project.name`
- `subtitle: truncate(project.description, 120)`
- Footer shows the first 4 stack items as chips.

### `src/app/experience/[slug]/opengraph-image.tsx`

- `eyebrow: "Experience"`
- `title: role`
- `subtitle: company`
- Footer shows the date range.

Next auto-discovers these files and injects correct `og:image` URLs into each
route's metadata — no manual wiring in the `generateMetadata` objects.

## Sitemap — `src/app/sitemap.ts`

Default export returning `MetadataRoute.Sitemap`:

- `/` — priority `1.0`, `changeFrequency: "monthly"`.
- `/archive` — priority `0.7`, `monthly`.
- Each `/project/{slug}` from `sortedProjects` — priority `0.8`, `yearly`.
- Each `/experience/{slug}` from `sortedExperiences` — priority `0.6`, `yearly`.
- `lastModified: new Date()` at build time (data model has no per-entry modified
  date; adding one is out of scope).
- All URLs built via `absoluteUrl()`.

## Robots — `src/app/robots.ts`

Default export returning `MetadataRoute.Robots`:

- If `isProductionHost(siteUrl)` → allow all, include sitemap + host.
- Else → disallow all, no sitemap pointer.

```ts
if (isProductionHost(siteUrl)) {
	return {
		rules: [{ userAgent: "*", allow: "/" }],
		sitemap: absoluteUrl("/sitemap.xml"),
		host: "www.julisv.com",
	};
}
return { rules: [{ userAgent: "*", disallow: "/" }] };
```

Closes the gap left by `lighthouserc.json`'s `is-crawlable: off` override.

## Testing

Vitest-based, narrow unit coverage on pure logic:

- `src/lib/seo.test.ts`
  - `absoluteUrl()` — builds correct URL from pathname; handles leading slash.
  - `truncate()` — short string unchanged, long string truncated at word
    boundary with ellipsis, empty string handled.
  - `isProductionHost()` — `www.julisv.com` true; `preview.vercel.app`,
    `localhost`, other hosts false.
- `src/app/sitemap.test.ts`
  - Output includes `/`, `/archive`, every project slug, every experience slug.
  - Every URL starts with `https://www.julisv.com`.
  - Count matches `sortedProjects.length + sortedExperiences.length + 2`.
- `src/app/robots.test.ts`
  - With `NEXT_PUBLIC_SITE_URL=https://www.julisv.com` → rules allow.
  - With a preview URL → rules disallow and no sitemap field.
  - Stubs env per test; no cross-test leakage.

No tests for `opengraph-image.tsx` (visual — verify manually) or
`generateMetadata` functions (thin data-plumbing — covered by the build).

## Manual Verification

1. `pnpm build` — surfaces `metadataBase` issues, OG runtime errors, missing
   fonts.
2. `pnpm start` — visit `/sitemap.xml` and `/robots.txt`, confirm shape.
3. `/project/tailorsift` view-source — confirm `og:image`, `twitter:card`,
   canonical, JSON-LD `CreativeWork` all present.
4. Post-deploy: drop `https://www.julisv.com` and
   `https://www.julisv.com/project/tailorsift` into the LinkedIn Post Inspector
   and Twitter Card Validator; confirm OG images render.

## Environment

Set on Vercel:

- **Production:** `NEXT_PUBLIC_SITE_URL=https://www.julisv.com`.
- **Preview / development:** leave unset. `seo.ts` falls back to
  `https://${VERCEL_URL}` on Vercel previews, `https://www.julisv.com` locally.
  `isProductionHost` ensures only the real production host gets indexable
  robots + sitemap.

## Out of Scope

- `lucide-react` `Github` / `Linkedin` deprecation warnings in `Header.tsx`
  (unrelated to SEO).
- Per-entry `lastModified` dates in project/experience data (low value).
- `hreflang` / i18n (site is en-only).
- Changes to PostHog / analytics.

## File Changes Summary

New files:

- `src/lib/seo.ts`
- `src/lib/seo.test.ts`
- `src/lib/og-template.tsx`
- `src/app/opengraph-image.tsx`
- `src/app/(front)/project/[slug]/opengraph-image.tsx`
- `src/app/experience/[slug]/opengraph-image.tsx`
- `src/app/sitemap.ts`
- `src/app/sitemap.test.ts`
- `src/app/robots.ts`
- `src/app/robots.test.ts`

Modified files:

- `src/app/layout.tsx` — full metadata + JSON-LD Person script.
- `src/app/(front)/project/[slug]/page.tsx` — `generateMetadata` +
  `CreativeWork` JSON-LD.
- `src/app/experience/[slug]/page.tsx` — `generateMetadata`.
- `src/app/(front)/archive/page.tsx` — static `metadata` export.
