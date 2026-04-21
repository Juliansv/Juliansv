import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { sortedProjects } from "@/data/projects";
import { sortedExperiences } from "@/data/experience";

describe("sitemap()", () => {
	const ORIGINAL_ENV = { ...process.env };

	beforeEach(() => {
		vi.resetModules();
		process.env.NEXT_PUBLIC_SITE_URL = "https://www.julisv.com";
	});

	afterEach(() => {
		process.env = { ...ORIGINAL_ENV };
	});

	it("includes home, archive, all projects, and all experiences", async () => {
		const sitemap = (await import("./sitemap")).default;
		const entries = sitemap();

		const urls = entries.map((e) => e.url);
		expect(urls).toContain("https://www.julisv.com/");
		expect(urls).toContain("https://www.julisv.com/archive");
		for (const p of sortedProjects) {
			expect(urls).toContain(`https://www.julisv.com/project/${p.slug}`);
		}
		for (const e of sortedExperiences) {
			expect(urls).toContain(`https://www.julisv.com/experience/${e.slug}`);
		}
	});

	it("has the expected total count", async () => {
		const sitemap = (await import("./sitemap")).default;
		const entries = sitemap();
		expect(entries.length).toBe(
			sortedProjects.length + sortedExperiences.length + 2
		);
	});

	it("all urls start with the configured site url", async () => {
		const sitemap = (await import("./sitemap")).default;
		const entries = sitemap();
		for (const e of entries) {
			expect(e.url.startsWith("https://www.julisv.com/")).toBe(true);
		}
	});

	it("every entry has a lastModified date", async () => {
		const sitemap = (await import("./sitemap")).default;
		const entries = sitemap();
		for (const e of entries) {
			expect(e.lastModified).toBeInstanceOf(Date);
		}
	});
});
