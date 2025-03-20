import { Project } from "@/types";
import { create } from "zustand";

type State = {
	projects: Project[] | [];
};

type Action = {
	addProjectsToStore: (newJobList: Project[]) => void;
	removeAllProjects: () => void;
};

export const useProjectsStore = create<State & Action>((set) => ({
	projects: [],
	addProjectsToStore: (newProjectsList: Project[]) =>
		set({ projects: newProjectsList }),
	removeAllProjects: () => set({ projects: [] }),
}));
