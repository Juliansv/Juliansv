import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeaturedHeroProject } from "./FeaturedHeroProject";
import type { Project } from "@/data/types";

vi.mock("next/image", () => ({
	default: ({ src, alt }: { src: string; alt: string }) => (
		<img src={src} alt={alt} />
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

const project: Project = {
	id: "9",
	slug: "tailorsift",
	title: "TailorSift",
	year: 2026,
	featured: true,
	hero: true,
	description: "AI-powered job hunt platform.",
	longDescription: "<p>Long.</p>",
	features: ["AI fit analysis"],
	technologies: ["Next.js", "TypeScript"],
	stack: ["Next.js", "TypeScript", "Supabase", "AI"],
	image: "/images/projects/tailorsift.webp",
	url: "https://tailorsift.io",
};

describe("FeaturedHeroProject", () => {
	it("renders the project title", () => {
		render(<FeaturedHeroProject project={project} />);
		expect(screen.getByText("TailorSift")).toBeInTheDocument();
	});

	it("renders the tagline", () => {
		render(<FeaturedHeroProject project={project} />);
		expect(
			screen.getByText("Sift the roles. Tailor the approach.")
		).toBeInTheDocument();
	});

	it("renders the description", () => {
		render(<FeaturedHeroProject project={project} />);
		expect(
			screen.getByText("AI-powered job hunt platform.")
		).toBeInTheDocument();
	});

	it("renders all stack chips", () => {
		render(<FeaturedHeroProject project={project} />);
		project.stack.forEach((chip) => {
			expect(screen.getByText(chip)).toBeInTheDocument();
		});
	});

	it("renders the screenshot with correct src and alt", () => {
		render(<FeaturedHeroProject project={project} />);
		const img = screen.getByRole("img");
		expect(img).toHaveAttribute("src", "/images/projects/tailorsift.webp");
		expect(img.getAttribute("alt")).toMatch(/Screenshot of TailorSift/i);
	});

	it("renders external Visit site link with correct attributes", () => {
		render(<FeaturedHeroProject project={project} />);
		const link = screen.getByRole("link", {
			name: /visit tailorsift live site/i,
		});
		expect(link).toHaveAttribute("href", "https://tailorsift.io");
		expect(link).toHaveAttribute("target", "_blank");
		expect(link).toHaveAttribute("rel", "noopener noreferrer");
	});

	it("renders Read more link to the project detail page", () => {
		render(<FeaturedHeroProject project={project} />);
		const link = screen.getByRole("link", { name: /read more/i });
		expect(link).toHaveAttribute("href", "/project/tailorsift");
	});
});
