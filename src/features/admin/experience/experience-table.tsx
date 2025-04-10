"use cache";

import { Job } from "@/types";
import { columns } from "./experience-form/columns";
import { DataTable } from "@/features/admin/experience/experience-form/data-table";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getExperienceInfo } from "@/features/utils/actions";

export default async function ExperienceTable() {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect("/login");
	}

	const Jobs: Job[] = await getExperienceInfo({ supabase });
	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={Jobs} />
		</div>
	);
}
