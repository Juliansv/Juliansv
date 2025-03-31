import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { Separator } from "@/components/ui/separator";

const AdminPage = async () => {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect("/login");
	}

	return (
		<div id="dashboard-container">
			<div className="h-16 flex">
				<h2 className="m-auto text-3xl py-6 font-semibold">
					Dashboard
				</h2>
			</div>
			<Separator className="my-4" />
			<div id="header-form" className="m-4 p-4">
				Dashboard data
			</div>
		</div>
	);
};

export default AdminPage;
