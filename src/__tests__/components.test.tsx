import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

describe("Component Tests", () => {
	describe("Badge Component", () => {
		it("renders with default variant", () => {
			render(<Badge>Test Badge</Badge>);
			const badge = screen.getByText("Test Badge");
			expect(badge).toBeInTheDocument();
		});

		it("renders with different variants", () => {
			const { rerender } = render(<Badge variant="default">Default</Badge>);
			expect(screen.getByText("Default")).toBeInTheDocument();

			rerender(<Badge variant="secondary">Secondary</Badge>);
			expect(screen.getByText("Secondary")).toBeInTheDocument();

			rerender(<Badge variant="destructive">Destructive</Badge>);
			expect(screen.getByText("Destructive")).toBeInTheDocument();
		});
	});

	describe("Button Component", () => {
		it("renders correctly", () => {
			render(<Button>Click me</Button>);
			const button = screen.getByRole("button", { name: /click me/i });
			expect(button).toBeInTheDocument();
		});

		it("applies custom className", () => {
			render(<Button className="custom-class">Button</Button>);
			const button = screen.getByRole("button", { name: /button/i });
			expect(button).toHaveClass("custom-class");
		});

		it("can be disabled", () => {
			render(<Button disabled>Disabled Button</Button>);
			const button = screen.getByRole("button", { name: /disabled button/i });
			expect(button).toBeDisabled();
		});
	});
});
