import { HomeInfo, Job, Project } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";

interface getSupabaseInfoProps {
	supabase: SupabaseClient<any, "public", any>;
}

export async function getHomeInfo({ supabase }: getSupabaseInfoProps) {
	const { data } = await supabase.from("HomeSection").select("*");
	const homeInfo = data?.pop();
	return homeInfo;
}

export async function updateHomeInfo(
	{ supabase }: getSupabaseInfoProps,
	formData: HomeInfo
) {
	console.log("formData", formData);

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

export async function getExperienceInfo({ supabase }: getSupabaseInfoProps) {
	const { data } = await supabase.from("ExperienceSection").select("*");
	if (!data) return [];
	return data;
}

export async function setExperienceInfo(
	{ supabase }: getSupabaseInfoProps,
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
	{ supabase }: getSupabaseInfoProps,
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

export async function getProjectsInfo({ supabase }: getSupabaseInfoProps) {
	const { data } = await supabase.from("ProjectsSection").select("*");
	if (!data) return [];
	return data;
}

export async function setProjectInfo(
	{ supabase }: getSupabaseInfoProps,
	project: Omit<Project, "id">
) {
	const { data, error } = await supabase
		.from("ProjectsSection")
		.insert([
			{
				title: project.title,
				description: project.description,
				image: project.image,
				stack: project.stack,
				url: project.url,
				year: project.year,
			},
		])
		.select();
	return { data, error };
}

export async function updateProjectInfo(
	{ supabase }: getSupabaseInfoProps,
	project: Omit<Project, "id">,
	id: string
) {
	const { data, error } = await supabase
		.from("ProjectsSection")
		.update({
			title: project.title,
			description: project.description,
			image: project.image,
			stack: project.stack,
			url: project.url,
			year: project.year,
		})
		.eq("id", id);
	return { data, error };
}
