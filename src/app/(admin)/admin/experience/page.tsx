import { Separator } from "@/components/ui/separator";
import ExperienceTable from "@/features/admin/experience/experience-table";
import { getExperienceInfo } from "@/features/admin/utils/actions";
import { Job } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const ExperienceAdminPage = async () => {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect("/login");
	}

	const jobsInfo: Job[] = await getExperienceInfo({ supabase });
	return (
		<div id="home-container">
			<div className="h-16 flex">
				<h2 className="m-auto text-3xl py-6 font-semibold">
					Experience
				</h2>
			</div>
			<Separator className="my-4" />
			<div id="Header-form" className="m-4 p-4">
				<div>
					<Link
						href="/admin/experience/new"
						className="flex gap-2 bg-green-700 text-white p-4 rounded-md hover:bg-green-800 w-fit"
					>
						<Plus />
						Add new job
					</Link>
				</div>
				<ExperienceTable data={jobsInfo} />
			</div>
		</div>
	);
};

export default ExperienceAdminPage;
