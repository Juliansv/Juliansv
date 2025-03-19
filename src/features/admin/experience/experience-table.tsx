"use client";

import { Job } from "@/types";
import { columns } from "./experience-form/columns";
import { DataTable } from "@/features/admin/experience/experience-form/data-table";
import { useJobStore } from "@/store/useJobsStore";

interface ExperienceTableProps {
	data: Job[];
}

export default function ExperienceTable({ data: Jobs }: ExperienceTableProps) {
	// save the jobs info to the store
	const setJobsInStore = useJobStore((state) => state.addJobsToStore);
	setJobsInStore(Jobs);
	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={Jobs} />
		</div>
	);
}
