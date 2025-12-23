import { Project } from "../types";
import { abogadaPrevisional } from "./abogada-previsional";
import { ekomod } from "./ekomod";
import { elTableroNoticias } from "./el-tablero-noticias";
import { faveCocina } from "./fave-cocina";
import { photoGallery } from "./photo-gallery";
import { sallyPortSuites } from "./sally-port-suites";
import { theBagelHole } from "./the-bagel-hole";

// Add all your projects here
export const projects: Project[] = [
	faveCocina,
	abogadaPrevisional,
	sallyPortSuites,
	theBagelHole,
	ekomod,
	photoGallery,
	elTableroNoticias,
];

// Helper functions
export const featuredProjects = projects.filter((p) => p.featured);

export const sortedProjects = [...projects].sort((a, b) => b.year - a.year);

export const getProjectBySlug = (slug: string): Project | undefined =>
	projects.find((p) => p.slug === slug);

export const getProjectById = (id: string): Project | undefined =>
	projects.find((p) => p.id === id);

export const getAdjacentProjects = (
	slug: string
): { prev: Project | undefined; next: Project | undefined } => {
	const currentIndex = sortedProjects.findIndex((p) => p.slug === slug);
	return {
		prev: currentIndex > 0 ? sortedProjects[currentIndex - 1] : undefined,
		next:
			currentIndex < sortedProjects.length - 1
				? sortedProjects[currentIndex + 1]
				: undefined,
	};
};
