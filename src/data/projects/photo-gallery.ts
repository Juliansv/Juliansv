import { Project } from "../types";

export const photoGallery: Project = {
	id: "6",
	slug: "photo-gallery",
	title: "Photo Gallery",
	year: 2024,
	featured: false,
	description:
		"A responsive photo gallery with a carousel view, connected to the Contentful headless CMS for dynamic content management.",
	longDescription: `
		<p>I developed a simple and responsive photo gallery that dynamically loads images and text from the Contentful headless CMS. This separation of content and presentation allows for easy updates without requiring code changes.</p>
		<p>The gallery is built with Next.js, ensuring excellent performance, image optimization, and SEO benefits. It features a responsive layout that adjusts to different screen sizes and uses a carousel for an intuitive browsing experience. This project demonstrates my ability to integrate modern frontend frameworks with headless CMS platforms to create flexible and maintainable web applications.</p>
	`,
	features: [
		"Integration with Contentful for content management",
		"Responsive design that adjusts columns based on screen size",
		"Carousel view for an intuitive photo browsing experience",
		"Dynamic routing for individual photo pages or categories",
		"Image optimization handled by Next.js",
		"SEO-friendly architecture",
	],
	technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Contentful API", "Embla Carousel", "React"],
	stack: ["Next.js", "TypeScript", "Contentful"],
	image: "https://placehold.co/600x400/1e293b/94a3b8?text=Photo%20Gallery",
	url: "https://example-photo-gallery.com", // Placeholder URL
};
