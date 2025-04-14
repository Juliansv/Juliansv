import Link from "next/link";

import { ArrowBigLeftDashIcon } from "lucide-react";
import ProjectForm from "@/features/admin/projects/project-form";

const ProjectPage = async (props: { params: Promise<{ id: string }> }) => {
    const params = await props.params;
    return (
		<div className="p-4 m-4">
			<Link
				href="/admin/projects"
				className="text-2xl font-semibold flex gap-2 items-center py-2 hover:text-teal-500"
			>
				<ArrowBigLeftDashIcon />
				Go back
			</Link>
			<ProjectForm id={params.id} />
		</div>
	);
};

export default ProjectPage;
