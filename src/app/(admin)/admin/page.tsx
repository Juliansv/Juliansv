import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { Separator } from "@/components/ui/separator";
import HomeForm from "@/features/admin/home/home-form";
import { getHomeInfo } from "@/features/admin/utils/actions";

interface HomeFormProps {
	title: string;
	subtitle: string;
	description: string;
	github_link: string;
	linkedin_link: string;
	about_me: string;
}

const AdminPage = async () => {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect("/login");
	}

	const homeInfo: HomeFormProps = await getHomeInfo({ supabase });

	return (
		<div id="home-container">
			<div className="h-16 flex">
				<h2 className="m-auto text-3xl py-6 font-semibold">
					Home Section
				</h2>
			</div>
			<Separator className="my-4" />
			<div id="header-form" className="m-4 p-4">
				<HomeForm data={homeInfo} />
			</div>
		</div>
	);
};

export default AdminPage;
