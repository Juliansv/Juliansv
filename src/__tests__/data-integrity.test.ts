import { describe, it, expect } from "vitest";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";
import { aboutContent } from "@/data/about";
import { siteConfig } from "@/data/site";

describe("Data Integrity", () => {
	describe("Projects Data", () => {
		it("should have at least one project", () => {
			expect(projects).toBeDefined();
			expect(projects.length).toBeGreaterThan(0);
		});

		it("all projects should have required fields", () => {
			projects.forEach((project) => {
				expect(project.id).toBeDefined();
				expect(project.title).toBeDefined();
				expect(project.description).toBeDefined();
				expect(project.slug).toBeDefined();
				expect(typeof project.id).toBe("string");
				expect(typeof project.title).toBe("string");
				expect(typeof project.slug).toBe("string");
			});
		});

		it("all project slugs should be unique", () => {
			const slugs = projects.map((p) => p.slug);
			const uniqueSlugs = new Set(slugs);
			expect(slugs.length).toBe(uniqueSlugs.size);
		});

		it("all project IDs should be unique", () => {
			const ids = projects.map((p) => p.id);
			const uniqueIds = new Set(ids);
			expect(ids.length).toBe(uniqueIds.size);
		});
	});

	describe("Experience Data", () => {
		it("should have at least one experience", () => {
			expect(experiences).toBeDefined();
			expect(experiences.length).toBeGreaterThan(0);
		});

		it("all experiences should have required fields", () => {
			experiences.forEach((experience) => {
				expect(experience.id).toBeDefined();
				expect(experience.company).toBeDefined();
				expect(experience.position).toBeDefined();
				expect(experience.slug).toBeDefined();
				expect(typeof experience.id).toBe("string");
				expect(typeof experience.company).toBe("string");
				expect(typeof experience.position).toBe("string");
				expect(typeof experience.slug).toBe("string");
			});
		});

		it("all experience slugs should be unique", () => {
			const slugs = experiences.map((e) => e.slug);
			const uniqueSlugs = new Set(slugs);
			expect(slugs.length).toBe(uniqueSlugs.size);
		});
	});

	describe("About Data", () => {
		it("should have required fields", () => {
			expect(aboutContent).toBeDefined();
			expect(aboutContent.paragraphs).toBeDefined();
			expect(Array.isArray(aboutContent.paragraphs)).toBe(true);
			expect(aboutContent.paragraphs.length).toBeGreaterThan(0);
		});
	});

	describe("Site Config", () => {
		it("should have required fields", () => {
			expect(siteConfig).toBeDefined();
			expect(siteConfig.name).toBeDefined();
			expect(siteConfig.title).toBeDefined();
			expect(siteConfig.description).toBeDefined();
			expect(typeof siteConfig.name).toBe("string");
			expect(typeof siteConfig.title).toBe("string");
			expect(typeof siteConfig.description).toBe("string");
		});

		it("should have valid social links", () => {
			expect(siteConfig.socialLinks).toBeDefined();
			expect(siteConfig.socialLinks.github).toBeDefined();
			expect(siteConfig.socialLinks.linkedin).toBeDefined();
			expect(() => new URL(siteConfig.socialLinks.github)).not.toThrow();
			expect(() => new URL(siteConfig.socialLinks.linkedin)).not.toThrow();
		});
	});
});
