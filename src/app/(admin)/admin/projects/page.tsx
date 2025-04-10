import { Separator } from "@/components/ui/separator";
import TableSkeleton from "@/features/admin/components/table-skeleton";
import ProjectsTable from "@/features/admin/projects/projects-table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const ProjectsAdminPage = async () => {
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
				<Suspense fallback={<TableSkeleton />}>
					<ProjectsTable />
				</Suspense>
			</div>
		</div>
	);
};

export default ProjectsAdminPage;
