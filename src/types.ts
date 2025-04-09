export interface Project {
	id: string;
	title: string;
	description: string;
	image: string;
	stack?: string[];
	url: string;
	year: string;
	long_description: string;
	features: string;
	technologies: string;
	code_repository: string;
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

export interface HomeInfo {
	title: string;
	subtitle: string;
	description: string;
	github_link: string;
	linkedin_link: string;
	about_me: string;
}

export type JobOld = {
	id: string;
	position: string;
	company: string;
	period: string;
	description: string;
	skills: string[];
};
