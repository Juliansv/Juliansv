"use client";

import JobForm from "@/features/admin/experience/job-form";
import React from "react";

import { ArrowBigLeftDashIcon } from "lucide-react";
import Link from "next/link";
import { useJobStore } from "@/store/useJobsStore";

const JobPage = ({ params }: { params: { id: string } }) => {
	const jobs = useJobStore((state) => state.jobs);
	const data = jobs.find((job) => job.id.toString() === params.id);

	return (
		<div className="p-4 m-4">
			<Link
				href="/admin/experience"
				className="text-2xl font-semibold flex gap-2 items-center py-2 hover:text-teal-500"
			>
				<ArrowBigLeftDashIcon />
				Go back
			</Link>
			<JobForm data={data} />
		</div>
	);
};

export default JobPage;
