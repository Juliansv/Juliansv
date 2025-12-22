import { Project } from "../types";

export const portfolioWebsite: Project = {
	id: "2",
	slug: "portfolio-website",
	title: "Portfolio Website",
	year: 2024,
	featured: true,
	description:
		"A minimalist portfolio website showcasing projects and experience with smooth page transitions and modern design.",
	longDescription: `
		<p>Designed and developed a personal portfolio website to showcase my work and professional experience. The site features a clean, two-column layout with smooth view transitions between pages.</p>
		<p>Built with performance in mind, achieving perfect Lighthouse scores across all metrics while maintaining a visually engaging experience.</p>
	`,
	features: [
		"Smooth view transitions between pages",
		"Two-column responsive layout",
		"Static site generation for optimal performance",
		"Dark theme with teal accent colors",
		"Accessible navigation with keyboard support",
	],
	technologies: [
		"Next.js",
		"React",
		"TypeScript",
		"Tailwind CSS",
		"Radix UI",
		"Vercel",
	],
	stack: ["Next.js", "TypeScript", "Tailwind CSS"],
	image: "https://placehold.co/600x400/1e293b/94a3b8?text=Portfolio",
	url: "https://juliansuarezvivas.com",
	codeRepository: "https://github.com/juliansv/portfolio",
};
