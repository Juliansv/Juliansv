import SingleProject from "@/features/front/projects/components/SingleProject";
import { sortedProjects } from "@/data";

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
