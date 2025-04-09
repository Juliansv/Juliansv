"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { setExperienceInfo, updateExperienceInfo } from "../../utils/actions";
import { Job } from "@/types";

export async function createNewJob(formData: Omit<Job, "id">) {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect("/login");
	}

	const result = await setExperienceInfo({ supabase }, formData);

	if (!result.error) {
		redirect("/admin/experience");
	}
}

export async function updateJob(formData: Omit<Job, "id">, id: string) {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect("/login");
	}

	const result = await updateExperienceInfo({ supabase }, formData, id);

	if (!result.error) {
		redirect("/admin/experience");
	}
}
