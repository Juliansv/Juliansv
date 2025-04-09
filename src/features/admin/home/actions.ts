"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { HomeInfo } from "@/types";
import { updateHomeInfo } from "../../utils/actions";

export async function handleUpdateHomeInfo(formData: HomeInfo) {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect("/login");
	}

	const result = await updateHomeInfo({ supabase }, formData);

	if (!result.error) {
		redirect("/admin");
	}
}
