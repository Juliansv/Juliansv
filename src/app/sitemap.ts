import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { sortedProjects } from "@/data/projects";
import { sortedExperiences } from "@/data/experience";

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();

	const staticEntries: MetadataRoute.Sitemap = [
		{
			url: absoluteUrl("/"),
			lastModified: now,
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: absoluteUrl("/archive"),
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.7,
		},
	];

	const projectEntries: MetadataRoute.Sitemap = sortedProjects.map((p) => ({
		url: absoluteUrl(`/project/${p.slug}`),
		lastModified: now,
		changeFrequency: "yearly",
		priority: 0.8,
	}));

	const experienceEntries: MetadataRoute.Sitemap = sortedExperiences.map(
		(e) => ({
			url: absoluteUrl(`/experience/${e.slug}`),
			lastModified: now,
			changeFrequency: "yearly",
			priority: 0.6,
		})
	);

	return [...staticEntries, ...projectEntries, ...experienceEntries];
}
