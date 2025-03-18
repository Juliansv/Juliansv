import { Job } from "@/types";
import { create } from "zustand";

type State = {
	jobs: Job[] | [];
};

type Action = {
	addJobsToStore: (newJobList: Job[]) => void;
	removeAllJobs: () => void;
};

export const useJobStore = create<State & Action>((set) => ({
	jobs: [],
	addJobsToStore: (newJobList: Job[]) => set({ jobs: newJobList }),
	removeAllJobs: () => set({ jobs: [] }),
}));
