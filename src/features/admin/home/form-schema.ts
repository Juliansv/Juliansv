"use client";

import { z } from "zod";

export const formSchema = z.object({
	title: z.string().min(2, {
		message: "Title must be at least 2 characters.",
	}),
	subtitle: z
		.string()
		.min(2, {
			message: "Subtitle must be at least 2 characters.",
		})
		.max(100, {
			message: "Subtitle must be at most 100 characters.",
		}),
	description: z.string().min(2, {
		message: "Description must be at least 2 characters.",
	}),
	github_link: z.string().url({
		message: "Please enter a valid URL.",
	}),
	linkedin_link: z.string().url({
		message: "Please enter a valid URL.",
	}),
	about_me: z.string().min(2, {
		message: "About me must be at least 2 characters.",
	}),
});
