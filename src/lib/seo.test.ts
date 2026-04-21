import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("seo primitives", () => {
	const ORIGINAL_ENV = { ...process.env };

	beforeEach(() => {
		vi.resetModules();
	});

	afterEach(() => {
		process.env = { ...ORIGINAL_ENV };
	});

	describe("siteUrl", () => {
		it("uses NEXT_PUBLIC_SITE_URL when set", async () => {
			process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
			const { siteUrl } = await import("./seo");
			expect(siteUrl.toString()).toBe("https://example.com/");
		});

		it("falls back to https://VERCEL_URL when only VERCEL_URL is set", async () => {
			delete process.env.NEXT_PUBLIC_SITE_URL;
			process.env.VERCEL_URL = "my-preview.vercel.app";
			const { siteUrl } = await import("./seo");
			expect(siteUrl.toString()).toBe("https://my-preview.vercel.app/");
		});

		it("falls back to https://www.julisv.com when neither env var is set", async () => {
			delete process.env.NEXT_PUBLIC_SITE_URL;
			delete process.env.VERCEL_URL;
			const { siteUrl } = await import("./seo");
			expect(siteUrl.toString()).toBe("https://www.julisv.com/");
		});
	});

	describe("absoluteUrl", () => {
		it("builds an absolute URL from a pathname with leading slash", async () => {
			process.env.NEXT_PUBLIC_SITE_URL = "https://www.julisv.com";
			const { absoluteUrl } = await import("./seo");
			expect(absoluteUrl("/project/tailorsift")).toBe(
				"https://www.julisv.com/project/tailorsift"
			);
		});

		it("handles the root path", async () => {
			process.env.NEXT_PUBLIC_SITE_URL = "https://www.julisv.com";
			const { absoluteUrl } = await import("./seo");
			expect(absoluteUrl("/")).toBe("https://www.julisv.com/");
		});
	});

	describe("isProductionHost", () => {
		it("returns true for www.julisv.com", async () => {
			const { isProductionHost } = await import("./seo");
			expect(isProductionHost(new URL("https://www.julisv.com"))).toBe(true);
		});

		it("returns false for preview host", async () => {
			const { isProductionHost } = await import("./seo");
			expect(isProductionHost(new URL("https://preview.vercel.app"))).toBe(
				false
			);
		});

		it("returns false for localhost", async () => {
			const { isProductionHost } = await import("./seo");
			expect(isProductionHost(new URL("http://localhost:3000"))).toBe(false);
		});

		it("returns false for apex julisv.com (no www)", async () => {
			const { isProductionHost } = await import("./seo");
			expect(isProductionHost(new URL("https://julisv.com"))).toBe(false);
		});
	});

	describe("truncate", () => {
		it("returns the input unchanged when shorter than max", async () => {
			const { truncate } = await import("./seo");
			expect(truncate("short", 160)).toBe("short");
		});

		it("truncates at word boundary and appends ellipsis", async () => {
			const { truncate } = await import("./seo");
			const input =
				"This is a long description that will definitely exceed the limit when we set the limit low enough to see truncation";
			const out = truncate(input, 40);
			expect(out.length).toBeLessThanOrEqual(40);
			expect(out.endsWith("…")).toBe(true);
			expect(out).not.toContain("  ");
		});

		it("handles empty string", async () => {
			const { truncate } = await import("./seo");
			expect(truncate("", 160)).toBe("");
		});
	});

	describe("DEFAULT_OG_SIZE", () => {
		it("is 1200x630", async () => {
			const { DEFAULT_OG_SIZE } = await import("./seo");
			expect(DEFAULT_OG_SIZE).toEqual({ width: 1200, height: 630 });
		});
	});
});
