"use client";

import { Project } from "@/types";
import { columns } from "./projects-form/columns";
import { DataTable } from "@/features/admin/projects/projects-form/data-table";
import { useProjectsStore } from "@/store/useProjectsStore";

interface ProjectsTableProps {
	data: Project[];
}

export default function ProjectsTable({ data: Projects }: ProjectsTableProps) {
	// save the jobs info to the store
	const setProjectsInStore = useProjectsStore(
		(state) => state.addProjectsToStore
	);
	setProjectsInStore(Projects);
	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={Projects} />
		</div>
	);
}
