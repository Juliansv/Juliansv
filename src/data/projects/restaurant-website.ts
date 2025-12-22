import { Project } from "../types";

export const restaurantWebsite: Project = {
	id: "4",
	slug: "restaurant-website",
	title: "Restaurant Website",
	year: 2023,
	featured: false,
	description:
		"A visually stunning restaurant website with online reservations, menu display, and integrated ordering system.",
	longDescription: `
		<p>Created a beautiful website for a local restaurant that wanted to increase their online presence and streamline reservations. The site showcases their menu, atmosphere, and makes it easy for customers to book tables.</p>
		<p>The integrated ordering system allows customers to place takeout orders directly through the website.</p>
	`,
	features: [
		"Online table reservation system",
		"Interactive menu with filtering options",
		"Online ordering for takeout",
		"Photo gallery showcasing the restaurant",
		"Mobile-optimized for on-the-go browsing",
	],
	technologies: ["WordPress", "PHP", "JavaScript", "MySQL", "Elementor"],
	stack: ["WordPress", "PHP", "JavaScript"],
	image: "https://placehold.co/600x400/1e293b/94a3b8?text=Restaurant",
	url: "https://example.com",
};
