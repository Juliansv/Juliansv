import { HomeInfo, Job, Project } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { cache } from "react";

interface SupabaseInfoProps {
	supabase: SupabaseClient<any, "public", any>;
}

export const getHomeInfo = cache(async ({ supabase }: SupabaseInfoProps) => {
	const { data } = await supabase.from("HomeSection").select("*");
	if (!data) return [];
	return data.at(0);
});

export const getExperienceInfo = cache(
	async ({ supabase }: SupabaseInfoProps) => {
		const { data } = await supabase.from("ExperienceSection").select("*");
		if (!data) return [];
		return data;
	}
);

export const getProjectsInfo = cache(
	async ({ supabase }: SupabaseInfoProps) => {
		const { data } = await supabase.from("ProjectsSection").select("*");
		if (!data) return [];
		return data;
	}
);

export const getFeaturedProjects = cache(
	async ({ supabase }: SupabaseInfoProps) => {
		const { data } = await supabase
			.from("ProjectsSection")
			.select("*")
			.eq("featured", true);
		if (!data) return [];
		return data;
	}
);

export const getProjectById = cache(
	async ({ supabase }: SupabaseInfoProps, id: number) => {
		const { data } = await supabase
			.from("ProjectsSection")
			.select("*")
			.eq("id", id);

		if (!data) return null;
		return data;
	}
);

export async function updateHomeInfo(
	{ supabase }: SupabaseInfoProps,
	formData: HomeInfo
) {
	const { data, error } = await supabase
		.from("HomeSection")
		.update({
			title: formData.title,
			subtitle: formData.subtitle,
			description: formData.description,
			github_link: formData.github_link,
			linkedin_link: formData.linkedin_link,
			about_me: formData.about_me,
		})
		.eq("id", 1)
		.select();
	return { data, error };
}

export async function setExperienceInfo(
	{ supabase }: SupabaseInfoProps,
	job: Omit<Job, "id">
) {
	const { data, error } = await supabase
		.from("ExperienceSection")
		.insert([
			{
				position: job.position,
				company: job.company,
				startedAt: job.startedAt,
				finishedAt: job.finishedAt,
				description: job.description,
				techStack: job.techStack,
			},
		])
		.select();
	return { data, error };
}

export async function updateExperienceInfo(
	{ supabase }: SupabaseInfoProps,
	job: Omit<Job, "id">,
	id: string
) {
	const { data, error } = await supabase
		.from("ExperienceSection")
		.update({
			position: job.position,
			company: job.company,
			startedAt: job.startedAt,
			finishedAt: job.finishedAt,
			description: job.description,
			techStack: job.techStack,
		})
		.eq("id", id);
	return { data, error };
}

export async function setProjectInfo(
	{ supabase }: SupabaseInfoProps,
	project: Omit<Project, "id">
) {
	// save the project in the DB
	const { data, error } = await supabase
		.from("ProjectsSection")
		.insert([
			{
				title: project.title,
				featured: project.featured,
				description: project.description,
				image: project.image,
				stack: project.stack,
				url: project.url,
				year: project.year,
				long_description: project.long_description,
				features: project.features,
				technologies: project.technologies,
				code_repository: project.code_repository,
			},
		])
		.select();
	return { data, error };
}

export async function updateProjectInfo(
	{ supabase }: SupabaseInfoProps,
	project: Omit<Project, "id">,
	id: string
) {
	const { data, error } = await supabase
		.from("ProjectsSection")
		.update({
			title: project.title,
			featured: project.featured,
			description: project.description,
			image: project.image,
			stack: project.stack,
			url: project.url,
			year: project.year,
			long_description: project.long_description,
			features: project.features,
			technologies: project.technologies,
			code_repository: project.code_repository,
		})
		.eq("id", id);
	return { data, error };
}
