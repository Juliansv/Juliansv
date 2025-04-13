import { Project } from "@/types";
import { create } from "zustand";

type State = {
	projects: Project[] | [];
	featuredProjects: Project[] | [];
};

type Action = {
	addProjectsToStore: (newJobList: Project[]) => void;
	addFeaturedProjectsToStore: (newJobList: Project[]) => void;
	removeAllProjects: () => void;
};

export const useProjectsStore = create<State & Action>((set) => ({
	projects: [],
	featuredProjects: [],
	addProjectsToStore: (newProjectsList: Project[]) =>
		set({ projects: newProjectsList }),
	addFeaturedProjectsToStore: (featuredProjectList: Project[]) =>
		set({ featuredProjects: featuredProjectList }),
	removeAllProjects: () => set({ projects: [] }),
}));
