import { Project } from "../types";

export const fitnessTracker: Project = {
	id: "5",
	slug: "fitness-tracker",
	title: "Fitness Tracker",
	year: 2022,
	featured: false,
	description:
		"A fitness tracking web app that helps users log workouts, track progress, and achieve their health goals.",
	longDescription: `
		<p>Built a comprehensive fitness tracking application that allows users to log their workouts, track their progress over time, and set personalized fitness goals.</p>
		<p>The app includes workout templates, progress charts, and motivational features to keep users engaged with their fitness journey.</p>
	`,
	features: [
		"Workout logging with exercise library",
		"Progress tracking with visual charts",
		"Goal setting and achievement tracking",
		"Workout templates and routines",
		"Personal records and milestones",
	],
	technologies: ["React", "Firebase", "Chart.js", "Tailwind CSS", "PWA"],
	stack: ["React", "Firebase", "PWA"],
	image: "https://placehold.co/600x400/1e293b/94a3b8?text=Fitness",
	url: "https://example.com",
	codeRepository: "https://github.com/juliansv/fitness-tracker",
};
