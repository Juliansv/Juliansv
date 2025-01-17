import { redirect } from "next/navigation";

import { createClient } from "@/features/auth/utils/supabase/server";

const AdminPage = async () => {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect("/login");
	}
	return <div>Admin page</div>;
};

export default AdminPage;
