import { Job } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";

interface getSupabaseInfoProps {
	supabase: SupabaseClient<any, "public", any>;
}

export async function getHomeInfo({ supabase }: getSupabaseInfoProps) {
	const { data } = await supabase.from("HomeSection").select("*");
	const homeInfo = data?.pop();
	return homeInfo;
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
