"use client";

import { z } from "zod";

export const formSchema = z.object({
	position: z.string().min(2, {
		message: "Position must be at least 2 characters.",
	}),
	company: z
		.string()
		.min(2, {
			message: "Company must be at least 2 characters.",
		})
		.max(100, {
			message: "Company must be at most 100 characters.",
		}),
	startedAt: z.string().min(2, {
		message: "Start at must be at least 2 characters.",
	}),
	finishedAt: z.string().min(2, {
		message: "Finish at must be at least 2 characters.",
	}),
	description: z.string().min(2, {
		message: "Description must be at least 2 characters",
	}),
	techStack: z.array(z.string()).length(1, {
		message: "must have at least 1 tech",
	}),
});
