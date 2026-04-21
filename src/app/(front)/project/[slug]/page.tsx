import type { Metadata } from "next";
import SingleProject from "@/features/front/projects/components/SingleProject";
import { sortedProjects, getProjectBySlug } from "@/data";
import { absoluteUrl, truncate } from "@/lib/seo";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const project = getProjectBySlug(slug);
	if (!project) return {};

	const description = truncate(project.description);
	const canonical = `/project/${project.slug}`;

	return {
		title: project.title,
		description,
		keywords: project.stack,
		alternates: { canonical },
		openGraph: {
			type: "article",
			url: canonical,
			title: project.title,
			description,
		},
		twitter: {
			card: "summary_large_image",
			title: project.title,
			description,
		},
	};
}

const ProjectPage = async (props: PageProps) => {
	const params = await props.params;
	const project = getProjectBySlug(params.slug);

	const jsonLd = project
		? {
				"@context": "https://schema.org",
				"@type": "CreativeWork",
				name: project.title,
				description: project.description,
				url: project.url,
				author: { "@type": "Person", name: "Julian Suarez Vivas" },
				keywords: project.stack.join(", "),
				image: absoluteUrl(project.image),
			}
		: null;

	return (
		<>
			{jsonLd ? (
				<script
					type="application/ld+json"
					// JSON-LD content is compile-time (projects data); JSON.stringify handles escaping.
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			) : null}
			<SingleProject slug={params.slug} />
		</>
	);
};

export default ProjectPage;

export const dynamic = "force-static";

export async function generateStaticParams() {
	return sortedProjects.map((project) => ({
		slug: project.slug,
	}));
}
