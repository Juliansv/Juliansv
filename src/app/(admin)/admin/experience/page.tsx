import { Separator } from "@/components/ui/separator";
import TableSkeleton from "@/features/admin/components/table-skeleton";
import ExperienceTable from "@/features/admin/experience/experience-table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const ExperienceAdminPage = async () => {
	return (
		<div id="home-container">
			<div className="h-16 flex">
				<h2 className="m-auto text-3xl py-6 font-semibold">
					Experience
				</h2>
			</div>
			<Separator className="my-4" />
			<div id="Header-form" className="m-4 p-4">
				<Link
					href="/admin/experience/new"
					className="flex gap-2 bg-green-700 text-white p-4 rounded-md hover:bg-green-800 w-fit"
				>
					<Plus />
					Add new job
				</Link>
				<Suspense fallback={<TableSkeleton />}>
					<ExperienceTable />
				</Suspense>
			</div>
		</div>
	);
};

export default ExperienceAdminPage;
