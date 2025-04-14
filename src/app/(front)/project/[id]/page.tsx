import SingleProject from "@/features/front/projects/components/SingleProject";

const ProjectPage = async (props: { params: Promise<{ id: string }> }) => {
    const params = await props.params;
    const navigation = {
		name: "algo",
		path: "algo",
	};

    return <SingleProject id={params.id} />;
};

export default ProjectPage;
