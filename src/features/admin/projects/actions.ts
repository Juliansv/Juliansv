"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { setProjectInfo, updateProjectInfo } from "@/features/utils/actions";
import { Project } from "@/types";

export async function createNewProject(formData: Omit<Project, "id">) {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect("/login");
	}

	const result = await setProjectInfo({ supabase }, formData);

	if (!result.error) {
		redirect("/admin/projects");
	}
}

export async function updateProject(formData: Omit<Project, "id">, id: string) {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect("/login");
	}

	const result = await updateProjectInfo({ supabase }, formData, id);

	if (!result.error) {
		redirect("/admin/projects");
	}
}
