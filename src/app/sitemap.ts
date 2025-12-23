import { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = siteConfig.url;

	const staticPages: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: `${baseUrl}/archive`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
	];

	const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
		url: `${baseUrl}/project/${project.slug}`,
		lastModified: new Date(),
		changeFrequency: "monthly" as const,
		priority: 0.7,
	}));

	const experiencePages: MetadataRoute.Sitemap = experiences.map(
		(experience) => ({
			url: `${baseUrl}/experience/${experience.slug}`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.6,
		})
	);

	return [...staticPages, ...projectPages, ...experiencePages];
}
