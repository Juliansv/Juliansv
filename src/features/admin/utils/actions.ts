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
	const { data, error } = await supabase
		.from("ExperienceSection")
		.select("*");
	if (!data) return [];
	return data;
}
