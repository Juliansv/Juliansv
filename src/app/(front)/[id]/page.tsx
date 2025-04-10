import { getProjectById } from "@/features/utils/actions";
import { Project } from "@/types";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

const ProjectPage = async ({ params }: { params: { id: string } }) => {
	const supabase = await createClient();

	const data = await getProjectById({ supabase }, Number(params.id));

	console.log("data", data);

	if (data?.length === 0) {
		return <div>ERROR NOT FOUND</div>;
	}

	const project: Project = data?.[0];

	return (
		<article>
			<h1>{project.title}</h1>
			<Image
				src={project.image}
				alt={project.title}
				width={500}
				height={500}
			/>
		</article>
	);
};

export default ProjectPage;
