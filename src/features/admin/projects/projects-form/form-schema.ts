"use client";

import { z } from "zod";

export const formSchema = z.object({
	title: z.string().min(2, {
		message: "Title must be at least 2 characters.",
	}),
	description: z.string().min(2, {
		message: "Description must be at least 2 characters",
	}),
	image: z.string().min(2, {
		message: "Company must be at least 2 characters.",
	}),
	stack: z.array(z.string()),
	url: z.string().min(2, {
		message: "Start at must be at least 2 characters.",
	}),
	year: z.string().min(2, {
		message: "Finish at must be at least 2 characters.",
	}),
});
