import { Project } from "../types";

export const ekomod: Project = {
	id: "5",
	slug: "ekomod",
	title: "Ekomod",
	year: 2023,
	featured: false,
	description:
		"Developed a fast, modern landing page for a construction company specializing in modular homes, using Astro and Tailwind CSS.",
	longDescription: `
		<p>I built a high-performance landing page for Ekomod, a construction company focused on modular homes. The goal was to create a visually appealing and fast-loading site to serve as the company's digital storefront. I chose Astro for its excellent performance and content-focused architecture, which is ideal for this type of project.</p>
		<p>The site showcases their modular home models, explains their construction process, and provides clear calls-to-action for potential clients to get in touch. The design is clean and modern, reflecting the innovative nature of the business.</p>
	`,
	features: [
		"High-performance static site built with Astro",
		"Responsive design using Tailwind CSS",
		"Showcase of modular home models",
		"Information about the company and construction process",
		"Contact forms for lead generation",
		"Optimized for fast loading and a great user experience",
	],
	technologies: ["Astro", "Tailwind CSS", "JavaScript", "HTML", "CSS", "Vite"],
	stack: ["Astro", "Tailwind CSS", "JavaScript"],
	image: "https://placehold.co/600x400/1e293b/94a3b8?text=Ekomod",
	url: "https://www.ekomod.com.co/",
};
