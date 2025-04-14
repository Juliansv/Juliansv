import SingleProject from "@/features/front/projects/components/SingleProject";

const ProjectPage = async (props: { params: Promise<{ id: string }> }) => {
	const params = await props.params;

	return <SingleProject id={params.id} />;
};

export default ProjectPage;

export const dynamic = "force-static";

export const revalidate = 3600;
