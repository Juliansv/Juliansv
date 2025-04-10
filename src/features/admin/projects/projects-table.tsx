"use cache";

import { Project } from "@/types";
import { columns } from "./projects-form/columns";
import { DataTable } from "@/features/admin/projects/projects-form/data-table";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getProjectsInfo } from "@/features/utils/actions";

export default async function ProjectsTable() {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect("/login");
	}

	const Projects: Project[] = await getProjectsInfo({ supabase });
	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={Projects} />
		</div>
	);
}
