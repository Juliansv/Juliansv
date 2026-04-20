import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutMe } from "@/features/front/about-me/components/AboutMe";

describe("AboutMe Component", () => {
	it("renders the intro paragraph", () => {
		render(<AboutMe />);
		expect(screen.getByText(/web developer/i)).toBeInTheDocument();
		expect(
			screen.getByText(/clean, responsive experiences/i)
		).toBeInTheDocument();
	});

	it("renders all three service cards", () => {
		render(<AboutMe />);
		expect(screen.getByRole("heading", { name: "Build" })).toBeInTheDocument();
		expect(screen.getByRole("heading", { name: "Launch" })).toBeInTheDocument();
		expect(screen.getByRole("heading", { name: "Manage" })).toBeInTheDocument();
	});

	it("renders the tech list", () => {
		render(<AboutMe />);
		expect(screen.getByText("React")).toBeInTheDocument();
		expect(screen.getByText("Next.js")).toBeInTheDocument();
		expect(screen.getByText("TypeScript")).toBeInTheDocument();
		expect(screen.getByText("Tailwind CSS")).toBeInTheDocument();
		expect(screen.getByText("WordPress")).toBeInTheDocument();
		expect(screen.getByText("Node.js")).toBeInTheDocument();
		expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
	});

	it("renders card descriptions", () => {
		render(<AboutMe />);
		expect(
			screen.getByText(/custom websites and web apps/i)
		).toBeInTheDocument();
		expect(screen.getByText(/end-to-end delivery/i)).toBeInTheDocument();
		expect(
			screen.getAllByText(/easy-to-manage websites/i).length
		).toBeGreaterThanOrEqual(1);
	});

	it("does not render old bento grid content", () => {
		const { container } = render(<AboutMe />);
		// No numbered labels
		expect(container.textContent).not.toMatch(/\b01\b/);
		expect(container.textContent).not.toMatch(/\b02\b/);
		expect(container.textContent).not.toMatch(/\b03\b/);
		expect(container.textContent).not.toMatch(/\b04\b/);
		expect(container.textContent).not.toMatch(/\b05\b/);
		expect(container.textContent).not.toMatch(/\b06\b/);
		// No old card titles
		expect(
			screen.queryByText("Custom Web Applications")
		).not.toBeInTheDocument();
		expect(screen.queryByText("Who I Work With")).not.toBeInTheDocument();
		expect(
			screen.queryByRole("heading", { name: "Frontend" })
		).not.toBeInTheDocument();
		expect(
			screen.queryByRole("heading", { name: "Backend" })
		).not.toBeInTheDocument();
	});

	it("renders the About heading", () => {
		render(<AboutMe />);
		expect(screen.getByRole("heading", { name: "About" })).toBeInTheDocument();
	});
});
