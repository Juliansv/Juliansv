import { Project } from "../types";

export const sallyPortSuites: Project = {
	id: "3",
	slug: "sally-port-suites",
	title: "Sally Port Suites",
	year: 2023,
	featured: true,
	description:
		"Created a booking website for boutique apartments, integrating a booking system and focusing on SEO and performance.",
	longDescription: `
		<p>I developed a complete website for Sally Port Suites, a provider of boutique apartments in Malta. The key objective was to facilitate direct bookings and showcase the unique properties. The site features an integrated booking system, allowing customers to check availability and reserve apartments seamlessly.</p>
		<p>A significant part of the project involved performance and search engine optimization (SEO) to attract organic traffic and provide a smooth user experience. The site is hosted on Hostinger and leverages Cloudflare for enhanced security and speed.</p>
	`,
	features: [
		"Integration with a third-party booking system",
		"Gallery of apartments with detailed descriptions",
		"SEO-optimized content and structure to improve search rankings",
		"Performance tuning for fast page loads",
		"Mobile-first responsive design for travelers on the go",
		"Contact forms and location maps",
	],
	technologies: [
		"WordPress",
		"PHP",
		"JavaScript",
		"MySQL",
		"Cloudflare",
		"Hostinger",
		"SEO",
	],
	stack: ["WordPress", "PHP", "JavaScript"],
	image: "/images/projects/sallyport.webp",
	url: "https://sallyport.com.mt/", // Placeholder URL
};
