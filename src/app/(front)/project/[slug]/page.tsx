import { Metadata } from "next";
import SingleProject from "@/features/front/projects/components/SingleProject";
import { sortedProjects, getProjectBySlug } from "@/data";
import { siteConfig } from "@/data/site";

export async function generateMetadata(props: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const params = await props.params;
	const project = getProjectBySlug(params.slug);

	if (!project) {
		return {
			title: "Project Not Found",
		};
	}

	return {
		title: project.title,
		description: project.description,
		openGraph: {
			title: `${project.title} | ${siteConfig.name}`,
			description: project.description,
			url: `${siteConfig.url}/project/${project.slug}`,
			type: "article",
			images: [
				{
					url: project.image,
					width: 1200,
					height: 630,
					alt: `Screenshot of ${project.title}`,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: `${project.title} | ${siteConfig.name}`,
			description: project.description,
			images: [project.image],
		},
		alternates: {
			canonical: `${siteConfig.url}/project/${project.slug}`,
		},
	};
}

const ProjectPage = async (props: { params: Promise<{ slug: string }> }) => {
	const params = await props.params;

	return <SingleProject slug={params.slug} />;
};

export default ProjectPage;

export const dynamic = "force-static";

export async function generateStaticParams() {
	return sortedProjects.map((project) => ({
		slug: project.slug,
	}));
}
