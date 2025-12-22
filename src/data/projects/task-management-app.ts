import { Project } from "../types";

export const taskManagementApp: Project = {
	id: "3",
	slug: "task-management-app",
	title: "Task Management App",
	year: 2023,
	featured: true,
	description:
		"A collaborative task management application with real-time updates, team workspaces, and intuitive drag-and-drop interface.",
	longDescription: `
		<p>Developed a full-featured task management application for teams to organize their work efficiently. The app supports multiple workspaces, real-time collaboration, and customizable workflows.</p>
		<p>Users can create boards, organize tasks with drag-and-drop, assign team members, set due dates, and track progress through visual dashboards.</p>
	`,
	features: [
		"Real-time collaboration with live updates",
		"Drag-and-drop task organization",
		"Multiple workspaces and team management",
		"Due date tracking with notifications",
		"Progress dashboards and reporting",
	],
	technologies: [
		"React",
		"Node.js",
		"Socket.io",
		"MongoDB",
		"Express",
		"Tailwind CSS",
	],
	stack: ["React", "Node.js", "MongoDB"],
	image: "https://placehold.co/600x400/1e293b/94a3b8?text=Task+App",
	url: "https://example.com",
};
