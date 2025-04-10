import { Separator } from "@/components/ui/separator";

const BlogAdminPage = () => {
	return (
		<div id="blog-container">
			<div className="h-16 flex">
				<h2 className="m-auto text-3xl py-6 font-semibold">
					Blog Posts
				</h2>
			</div>
			<Separator className="my-4" />
			<div id="header-form" className="m-4 p-4">
				Blog data
			</div>
		</div>
	);
};

export default BlogAdminPage;
