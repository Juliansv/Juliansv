import { Project } from "../types";

export const elTableroNoticias: Project = {
	id: "7",
	slug: "el-tablero-noticias",
	title: "El Tablero Noticias",
	year: 2022,
	featured: false,
	description:
		"A personal project for a news aggregator website, designed to fetch and display articles in a clean, board-style format.",
	longDescription: `
		<p>As a personal project to practice API integration and frontend design, I created the concept for 'El Tablero Noticias' (The News Board). The goal was to build a news aggregator that fetches articles from a third-party source, like the NewsAPI, and presents them in a clean, minimalist, and readable format.</p>
		<p>The design focuses on a card-based layout that is easy to scan and navigate. I planned features like search and category filtering to allow users to customize their news feed. This project was an exercise in data fetching, state management, and creating a user-centric reading experience with a modern JavaScript stack.</p>
	`,
	features: [
		"Integration with a third-party news API to fetch articles",
		"Clean, card-based layout for easy reading",
		"Planned functionality for search and category filtering",
		"Responsive design for a seamless experience on any device",
		"Focus on a minimalist and user-friendly UI/UX",
	],
	technologies: ["React", "TypeScript", "Tailwind CSS", "NewsAPI", "JavaScript"],
	stack: ["React", "TypeScript", "Tailwind CSS"],
	image: "/images/projects/eltableroinfo.webp",
	url: "https://darkgrey-jellyfish-379181.hostingersite.com/", // Temporary URL
};
