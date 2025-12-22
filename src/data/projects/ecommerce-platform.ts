import { Project } from "../types";

export const ecommercePlatform: Project = {
	id: "1",
	slug: "ecommerce-platform",
	title: "E-Commerce Platform",
	year: 2024,
	featured: true,
	description:
		"A modern e-commerce platform built with Next.js and Stripe, featuring real-time inventory management and seamless checkout experience.",
	longDescription: `
		<p>Built a complete e-commerce solution for a retail client looking to expand their online presence. The platform handles everything from product browsing to secure checkout, with a focus on performance and user experience.</p>
		<p>The admin dashboard allows the client to manage products, track orders, and view analytics without any technical knowledge required.</p>
	`,
	features: [
		"Real-time inventory tracking and low-stock alerts",
		"Secure payment processing with Stripe integration",
		"Responsive design optimized for mobile shopping",
		"Admin dashboard with sales analytics and reporting",
		"SEO-optimized product pages with dynamic meta tags",
	],
	technologies: [
		"Next.js",
		"TypeScript",
		"Tailwind CSS",
		"Stripe",
		"PostgreSQL",
		"Prisma",
		"Vercel",
	],
	stack: ["Next.js", "TypeScript", "Stripe"],
	image: "https://placehold.co/600x400/1e293b/94a3b8?text=E-Commerce",
	url: "https://example.com",
	codeRepository: "https://github.com/juliansv/ecommerce-platform",
};
