import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectImage } from "./ProjectImage";

vi.mock("@/data/generated/image-placeholders", () => ({
	imagePlaceholders: {
		"/images/projects/known.webp": "data:image/webp;base64,AAAA",
	},
}));

vi.mock("next/image", () => ({
	default: ({
		src,
		alt,
		placeholder,
		blurDataURL,
	}: {
		src: string;
		alt: string;
		placeholder?: string;
		blurDataURL?: string;
	}) => (
		<img
			src={src}
			alt={alt}
			data-placeholder={placeholder ?? ""}
			data-blur={blurDataURL ?? ""}
		/>
	),
}));

describe("ProjectImage", () => {
	it("forwards placeholder=blur and blurDataURL when the src is in the map", () => {
		render(
			<ProjectImage
				src="/images/projects/known.webp"
				alt="known"
				width={100}
				height={100}
			/>
		);
		const img = screen.getByRole("img");
		expect(img).toHaveAttribute("data-placeholder", "blur");
		expect(img).toHaveAttribute("data-blur", "data:image/webp;base64,AAAA");
	});

	it("renders without blur props when the src is not in the map", () => {
		render(
			<ProjectImage
				src="/images/projects/missing.webp"
				alt="missing"
				width={100}
				height={100}
			/>
		);
		const img = screen.getByRole("img");
		expect(img).toHaveAttribute("data-placeholder", "");
		expect(img).toHaveAttribute("data-blur", "");
	});
});
