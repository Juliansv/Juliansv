export interface Job {
	period: string;
	position: string;
	company: string;
	description: string;
	skills: string[];
}

export interface Project {
	title: string;
	description: string;
	image: string;
	stack?: string[];
	url: string;
	year: string;
}
