"use client";

import { useJobStore } from "@/store/useJobsStore";
import JobForm from "./experience-form/job-form";

export const ExperienceForm = ({ id }: { id: string }) => {
	// useJobStore is a custom hook that returns the jobs array from the store
	const jobs = useJobStore((state) => state.jobs);

	// The find method is used to find the job with the id that matches the id passed as a prop
	const data = jobs.find((job) => job.id.toString() === id);

	return (
		<>
			<JobForm data={data} />
		</>
	);
};
