import { Project } from "../types";

export const tailorsift: Project = {
	id: "9",
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
