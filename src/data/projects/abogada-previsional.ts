import { Project } from "../types";

export const abogadaPrevisional: Project = {
	id: "2",
	slug: "abogada-previsional",
	title: "Abogada Previsional",
	year: 2024,
	featured: true,
	description:
		"Developed a professional landing page for a lawyer, focusing on performance, accessibility, and a clean user interface.",
	longDescription: `
		<p>I built a responsive and modern landing page for a legal professional specializing in pension law. The primary goal was to create a strong online presence that conveyed professionalism and trust. The site effectively showcases her services, provides updates on legal news, and includes multiple contact points, such as a WhatsApp integration and a secure contact form.</p>
		<p>Using a modern stack like Next.js and TypeScript, I delivered a high-performance, SEO-friendly site that is both easy to navigate and maintain. The contact form is powered by Resend and React Email, with Zod for robust validation, ensuring reliable communication.</p>
	`,
	features: [
		"Responsive design for optimal viewing on all devices",
		"Display of professional services and legal news",
		"Integrated contact options including WhatsApp",
		"Secure and validated contact form with email notifications",
		"Built with a modern, high-performance tech stack",
		"Optimized for SEO and fast load times",
	],
	technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Resend", "React Email", "Zod", "React Hook Form"],
	stack: ["Next.js", "TypeScript", "Tailwind CSS"],
	image: "https://placehold.co/600x400/1e293b/94a3b8?text=Abogada%20Previsional",
	url: "https://abogada-previsional.com", // Placeholder URL
};
