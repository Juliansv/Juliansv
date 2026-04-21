import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("robots()", () => {
	const ORIGINAL_ENV = { ...process.env };

	beforeEach(() => {
		vi.resetModules();
	});

	afterEach(() => {
		process.env = { ...ORIGINAL_ENV };
	});

	it("allows all crawling on production host and includes sitemap", async () => {
		process.env.NEXT_PUBLIC_SITE_URL = "https://www.julisv.com";
		const robots = (await import("./robots")).default;
		const result = robots();
		expect(result.rules).toEqual([{ userAgent: "*", allow: "/" }]);
		expect(result.sitemap).toBe("https://www.julisv.com/sitemap.xml");
		expect(result.host).toBe("www.julisv.com");
	});

	it("disallows all crawling on preview host and omits sitemap", async () => {
		process.env.NEXT_PUBLIC_SITE_URL = "https://preview.vercel.app";
		const robots = (await import("./robots")).default;
		const result = robots();
		expect(result.rules).toEqual([{ userAgent: "*", disallow: "/" }]);
		expect(result.sitemap).toBeUndefined();
	});

	it("disallows all crawling when siteUrl falls back to VERCEL_URL", async () => {
		delete process.env.NEXT_PUBLIC_SITE_URL;
		process.env.VERCEL_URL = "my-preview.vercel.app";
		const robots = (await import("./robots")).default;
		const result = robots();
		expect(result.rules).toEqual([{ userAgent: "*", disallow: "/" }]);
	});
});
