import Link from "next/link";

import { ArrowBigLeftDashIcon } from "lucide-react";
import { ExperienceForm } from "@/features/admin/experience/experience-form";

const JobPage = async (props: { params: Promise<{ id: string }> }) => {
    const params = await props.params;
    return (
		<div className="p-4 m-4">
			<Link
				href="/admin/experience"
				className="text-2xl font-semibold flex gap-2 items-center py-2 hover:text-teal-500"
			>
				<ArrowBigLeftDashIcon />
				Go back
			</Link>
			<ExperienceForm id={params.id} />
		</div>
	);
};

export default JobPage;
