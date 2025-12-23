import { Project } from "../types";

export const theBagelHole: Project = {
	id: "4",
	slug: "the-bagel-hole",
	title: "The Bagel Hole",
	year: 2023,
	featured: true,
	description:
		"Modernized a WordPress site for a coffee shop by containerizing the stack, migrating the server, and improving the frontend.",
	longDescription: `
		<p>I led the technical modernization of the website for The Bagel Hole, a local bagel and coffee shop. The project involved a full server migration to Digital Ocean, where I containerized the entire WordPress stack using Docker and Nginx. This approach significantly improved the development workflow, scalability, and security of the site.</p>
		<p>In addition to the infrastructure overhaul, I implemented several frontend improvements to enhance the user experience and refresh the site's look and feel. I managed the full migration process, including DNS changes and setting up security protocols to protect the new server environment.</p>
	`,
	features: [
		"Containerized the WordPress stack using Docker and Nginx",
		"Full server migration to Digital Ocean",
		"Improved frontend elements and user experience",
		"Updated and modernized the technology stack",
		"Implemented security enhancements on the new server",
		"Managed DNS and deployment pipeline",
	],
	technologies: ["WordPress", "Docker", "Nginx", "Digital Ocean", "PHP", "MySQL", "JavaScript"],
	stack: ["WordPress", "Docker", "Nginx"],
	image: "/images/projects/thebagelhole.webp",
	url: "https://itsthebagelhole.com/",
};
