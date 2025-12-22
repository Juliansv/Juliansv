import { Project } from "../types";
import { ecommercePlatform } from "./ecommerce-platform";
import { portfolioWebsite } from "./portfolio-website";
import { taskManagementApp } from "./task-management-app";
import { restaurantWebsite } from "./restaurant-website";
import { fitnessTracker } from "./fitness-tracker";

// Add all your projects here
export const projects: Project[] = [
	ecommercePlatform,
	portfolioWebsite,
	taskManagementApp,
	restaurantWebsite,
	fitnessTracker,
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
