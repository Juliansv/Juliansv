import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Projects from "./Projects";

vi.mock("next/image", () => ({
	default: ({ src, alt }: { src: string; alt: string }) => (
		<img src={src} alt={alt} />
	),
}));

vi.mock("next/link", () => ({
	default: ({
		children,
		href,
		...props
	}: {
		children: React.ReactNode;
		href: string;
	}) => (
		<a href={href} {...props}>
			{children}
		</a>
	),
}));

vi.mock("@/components/ViewTransitionLink", () => ({
	ViewTransitionLink: ({
		children,
		href,
		...props
	}: {
		children: React.ReactNode;
		href: string;
	}) => (
		<a href={href} {...props}>
			{children}
		</a>
	),
}));

describe("Projects", () => {
	it("renders the hero card for TailorSift", () => {
		render(<Projects />);
		expect(
			screen.getByText("Sift the roles. Tailor the approach.")
		).toBeInTheDocument();
	});

	it("renders TailorSift before the other featured projects in the DOM", () => {
		render(<Projects />);
		const hrefs = screen
			.getAllByRole("link")
			.map((a) => a.getAttribute("href") || "");
		const tailorsiftIdx = hrefs.findIndex((h) => /tailorsift/i.test(h));
		const faveIdx = hrefs.findIndex((h) => /fave-cocina/i.test(h));
		expect(tailorsiftIdx).toBeGreaterThanOrEqual(0);
		expect(faveIdx).toBeGreaterThanOrEqual(0);
		expect(tailorsiftIdx).toBeLessThan(faveIdx);
	});

	it("links to the archive at the bottom", () => {
		render(<Projects />);
		expect(
			screen.getByText(/view full project/i, { exact: false })
		).toBeInTheDocument();
	});
});
