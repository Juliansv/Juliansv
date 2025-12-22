import { Experience } from "../types";

export const frontendDeveloper: Experience = {
	id: "2",
	slug: "frontend-developer-tech-startup",
	company: "Tech Startup",
	position: "Frontend Developer",
	startDate: "06/2020",
	endDate: "12/2021",
	description:
		"Developed and maintained user-facing features for a SaaS platform serving thousands of daily active users. Collaborated closely with designers and backend developers to deliver polished, performant interfaces.",
	highlights: [
		"Led the frontend development of a dashboard used by 5,000+ daily active users",
		"Improved page load times by 40% through code splitting and lazy loading optimizations",
		"Implemented a component library that reduced development time for new features by 25%",
		"Mentored junior developers and conducted code reviews to maintain code quality",
	],
	technologies: [
		"React",
		"TypeScript",
		"Redux",
		"Styled Components",
		"Jest",
		"Cypress",
	],
};
