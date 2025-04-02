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

export async function getExperienceInfo({ supabase }: getSupabaseInfoProps) {
	const { data: experience } = await supabase
		.from("ExperienceSection")
		.select("*");
	if (!experience) return [];
	return experience;
}

export async function getProjectsInfo({ supabase }: getSupabaseInfoProps) {
	const { data: projects } = await supabase
		.from("ProjectsSection")
		.select("*");
	if (!projects) return [];
	return projects;
}
