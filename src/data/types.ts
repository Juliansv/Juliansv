export interface Project {
	id: string;
	slug: string;
	title: string;
	year: number;
	featured: boolean;
	description: string;
	longDescription: string;
	features: string[];
	technologies: string[];
	stack: string[];
	image: string;
	url: string;
	codeRepository?: string;
}

export interface Experience {
	id: string;
	slug: string;
	company: string;
	position: string;
	startDate: string;
	endDate: string;
	description: string;
	highlights: string[];
	technologies: string[];
	logo?: string;
}

export interface SiteConfig {
	name: string;
	title: string;
	subtitle: string;
	description: string;
	url: string;
	image: string;
	email: string;
	socialLinks: {
		github: string;
		linkedin: string;
	};
	keywords: string[];
}

export interface AboutContent {
	hero: string[];
	approach: string[];
}
