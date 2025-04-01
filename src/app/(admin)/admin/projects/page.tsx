import { Separator } from "@/components/ui/separator";
import ProjectsTable from "@/features/admin/projects/projects-table";
import { getProjectsInfo } from "@/features/utils/actions";
import { Project } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const ProjectsAdminPage = async () => {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect("/login");
	}

	const ProjectsInfo: Project[] = await getProjectsInfo({ supabase });
	return (
		<div id="home-container">
			<div className="h-16 flex">
				<h2 className="m-auto text-3xl py-6 font-semibold">Projects</h2>
			</div>
			<Separator className="my-4" />
			<div id="Header-form" className="m-4 p-4">
				<Link
					href="/admin/projects/new"
					className="flex gap-2 bg-green-700 text-white p-4 rounded-md hover:bg-green-800 w-fit"
				>
					<Plus />
					Add new project
				</Link>
				<ProjectsTable data={ProjectsInfo} />
			</div>
		</div>
	);
};

export default ProjectsAdminPage;
