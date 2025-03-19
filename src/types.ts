export interface Project {
	title: string;
	description: string;
	image: string;
	stack?: string[];
	url: string;
	year: string;
}

// This is the type used to define the jobs data.
export type Job = {
	id: string;
	position: string;
	company: string;
	startedAt: string;
	finishedAt: string;
	description: string;
	techStack: string[];
};

export type JobOld = {
	id: string;
	position: string;
	company: string;
	period: string;
	description: string;
	skills: string[];
};
