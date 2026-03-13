# About Section Redesign

## Problem

The current About section uses a 6-card bento grid with numbered labels (01–06), multiple accent colors (sky, emerald, violet, amber), and generic corporate-feeling content. It feels busy, impersonal, and doesn't represent the developer's identity well.

## Solution

Replace the bento grid with a simpler, more personal layout: one intro paragraph, 3 compact action-oriented cards, and a tech list.

## Design

### Layout Structure

```
┌─────────────────────────────────────────────┐
│ [About sticky header - mobile only]         │
├─────────────────────────────────────────────┤
│                                             │
│ Intro paragraph (1 paragraph, ~2 lines)     │
│                                             │
├──────────────┬──────────────┬───────────────┤
│    Build     │    Launch    │    Manage     │
│  description │  description │  description  │
├──────────────┴──────────────┴───────────────┤
│ React · Next.js · TypeScript · Tailwind ... │
└─────────────────────────────────────────────┘
```

### Content

**Intro paragraph:**

> I'm a **web developer** helping businesses build fast, modern, and easy-to-manage websites. Whether it's a full redesign, a new website, or a custom web application, I focus on creating clean, responsive experiences that drive results.

**Cards (3, in order):**

| Card | Title  | Description                                                        |
| ---- | ------ | ------------------------------------------------------------------ |
| 1    | Build  | Custom websites and web apps from scratch with modern tools        |
| 2    | Launch | End-to-end delivery from planning to deployment                    |
| 3    | Manage | Easy-to-manage websites and CMS solutions you can control yourself |

**Tech list:**
React, Next.js, TypeScript, Tailwind CSS, WordPress, Node.js, PostgreSQL

### Styling

- **Color palette:** Monochrome (slate tones) for cards, single sky-blue (`sky-400`) accent only on the tech list
- **No numbered labels** — removed entirely
- **Card borders:** `border-slate-800` (subtle), brighten on hover
- **Card hover:** `-translate-y-1` lift + border color shift to `slate-600` + `shadow-lg`
- **Tech list separator:** thin `border-t border-slate-800` above the tech row
- **Tech text color:** `text-sky-400`
- **Bold highlight:** "web developer" in intro uses `font-bold text-slate-200`

### Semantic HTML

- Card titles use `<h3>` tags (consistent with the section's `<h2>` heading)
- Tech list uses inline `<span>` elements separated by gaps (flexbox), not a `<ul>`
- Intro paragraph is a standard `<p>` tag

### Responsive Behavior

- **Mobile:** Cards stack vertically (1 column), full width
- **md+:** 3-column grid for cards
- **lg:** Sticky "About" header becomes `sr-only` (same as current behavior)
- **No viewport-height constraints** — removes the current `max-h-[calc(...)]` that forces content into a fixed area

### Component Changes

- **Remove `"use client"`** — new component has no hooks or event handlers, so it should be a server component
- **Switch to named export** — replace `export default AboutMe` with `export const AboutMe`
- **Remove `export const dynamic = "force-static"`** — this is a route segment config and has no effect in a component file

### What Gets Removed

- The entire 6-card bento grid (Hero, WordPress, Custom Apps, Who I Work With, Frontend, Backend cards)
- All numbered labels (01–06)
- Multi-color accent system (emerald, violet, amber)
- Viewport-height clamping on the grid
- PHP and REST APIs from the tech list (intentionally dropped — focusing on primary stack)

### What Stays

- The sticky mobile "About" header (with `lg:sr-only` behavior)
- The overall section wrapper and positioning in the page
- Content hardcoded in the component (no data file changes needed)

## Files to Modify

| File                                                 | Change                                                                                                             |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `src/features/front/about-me/components/AboutMe.tsx` | Replace bento grid with new layout, remove `"use client"`, switch to named export, remove invalid `dynamic` export |
| `src/app/page.tsx`                                   | Update import to use named import `{ AboutMe }`                                                                    |

## Out of Scope

- Data extraction (keeping content in the component, same as current)
- Changes to other sections (Projects, Experience)
- New types or data files
- Animations beyond the existing hover effects
