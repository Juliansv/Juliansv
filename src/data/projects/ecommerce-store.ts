import { Project } from "../types";

export const ecommerceStore: Project = {
	id: "8",
	slug: "ecommerce-store",
	title: "Full-Stack E-commerce Platform",
	year: 2023,
	featured: false,
	description:
		"A full-stack e-commerce platform with a storefront and an admin dashboard for managing products, orders, and analytics.",
	longDescription: `
		<p>I built a complete, full-stack e-commerce solution comprised of two main parts: a customer-facing storefront and a comprehensive admin dashboard. This project showcases a modern, monolithic architecture using Next.js for both the frontend and backend functionalities.</p>
		<p>The admin dashboard serves as the operational hub, allowing for management of products, categories, and orders. It features authentication via Clerk, data visualization with Recharts, and uses Prisma as the ORM for database interactions. The storefront provides the public-facing shopping experience, with features for browsing products, managing a shopping cart, and completing purchases through the Mercado pago payment gateway. State is managed efficiently on the client-side with Zustand.</p>
	`,
	features: [
		"Full-stack application using Next.js for both frontend and backend",
		"Admin dashboard to manage products, categories, and orders",
		"Secure admin authentication with Clerk",
		"ORM layer managed by Prisma",
		"Image hosting and management with Cloudinary",
		"Customer-facing storefront with cart and checkout functionality",
		"Payment processing integrated with Mercado pago",
		"Client-side state management with Zustand",
	],
	technologies: [
		"Next.js",
		"TypeScript",
		"Tailwind CSS",
		"Prisma",
		"PostgreSQL",
		"Clerk",
		"Cloudinary",
		"Zustand",
		"Axios",
		"Recharts",
		"Mercado pago",
	],
	stack: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS"],
	image: "https://placehold.co/600x400/1e293b/94a3b8?text=E-commerce%20Store",
	url: "https://github.com/Juliansv/ecommerce-admin", // Link to the GitHub repository
};
