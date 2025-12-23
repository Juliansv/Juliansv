import { Project } from "../types";

export const faveCocina: Project = {
	id: "1",
	slug: "fave-cocina",
	title: "FaVe Cocina",
	year: 2023,
	featured: true,
	description:
		"Developed an e-commerce website for kitchenware, integrating product galleries, a blog, and mobile stock management.",
	longDescription: `
		<p>I built an extensive e-commerce platform for FaVe Cocina, specializing in kitchenware. The project focused on creating a seamless online shopping experience, from product discovery to purchase. Key features included dynamic product galleries, an integrated blog for content marketing, and robust mobile stock management capabilities for efficient operations.</p>
		<p>The solution was tailored to support a growing online retail business, enabling easy product updates and customer engagement.</p>
	`,
	features: [
		"E-commerce functionality for kitchenware sales",
		"Dynamic product galleries with detailed views",
		"Integrated blog for content marketing and recipes",
		"Mobile-responsive design for optimal viewing on all devices",
		"Efficient mobile stock management system for inventory control",
		"Secure payment gateway integration",
	],
	technologies: ["WordPress", "WooCommerce", "ATUM", "Elementor", "PHP", "MySQL", "JavaScript"],
	stack: ["WordPress", "PHP", "JavaScript"],
	image: "/images/projects/favecocina.webp",
	url: "https://favecocina.com", // Placeholder URL
};
