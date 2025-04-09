"use client";

import { z } from "zod";

export const formSchema = z.object({
	title: z.string().min(2, {
		message: "Title must be at least 2 characters.",
	}),
	featured: z.boolean(),
	description: z.string().min(2, {
		message: "Description must be at least 2 characters",
	}),
	image: z.string(),
	stack: z.array(z.string()),
	url: z.string().min(2, {
		message: "Project URL must be at least 2 characters long.",
	}),
	year: z.string().min(2, {
		message: "year at must be at least 2 characters.",
	}),
	long_description: z.string(),
	features: z.string(),
	technologies: z.string(),
	code_repository: z.string(),
});
