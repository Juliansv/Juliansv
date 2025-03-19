"use client";

import { useJobStore } from "@/store/useJobsStore";
import JobForm from "./experience-form/job-form";

export const ExperienceForm = ({ id }: { id: string }) => {
	const jobs = useJobStore((state) => state.jobs);
	const data = jobs.find((job) => job.id.toString() === id);
	return (
		<>
			<JobForm data={data} />
		</>
	);
};
