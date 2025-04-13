import SingleProject from "@/features/front/projects/components/SingleProject";

const ProjectPage = ({ params }: { params: { id: string } }) => {
	const navigation = {
		name: "algo",
		path: "algo",
	};

	return <SingleProject id={params.id} />;
};

export default ProjectPage;
