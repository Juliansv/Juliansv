import { Experience } from "../types";
import { freelanceDeveloper } from "./freelance-developer";
import { juniorAero } from "./junior-frontend-developer-aero";
import { qaComposable } from "./qa-analyst-composable";
import { qaScaleAI } from "./qa-analyst-scaleai";

// Add all your experiences here
export const experiences: Experience[] = [
	freelanceDeveloper,
	qaComposable,
	qaScaleAI,
	juniorAero,
];

// Helper functions
export const sortedExperiences = [...experiences].sort((a, b) => {
	const parseDate = (dateStr: string) => {
		if (dateStr === "Present") return Date.now();
		const [month, year] = dateStr.split("/").map(Number);
		return new Date(year, month - 1).getTime();
	};
	return parseDate(b.startDate) - parseDate(a.startDate);
});

export const getExperienceBySlug = (slug: string): Experience | undefined =>
	experiences.find((e) => e.slug === slug);

export const getExperienceById = (id: string): Experience | undefined =>
	experiences.find((e) => e.id === id);

export const getAdjacentExperiences = (
	slug: string
): { prev: Experience | undefined; next: Experience | undefined } => {
	const currentIndex = sortedExperiences.findIndex((e) => e.slug === slug);
	return {
		prev: currentIndex > 0 ? sortedExperiences[currentIndex - 1] : undefined,
		next:
			currentIndex < sortedExperiences.length - 1
				? sortedExperiences[currentIndex + 1]
				: undefined,
	};
};
