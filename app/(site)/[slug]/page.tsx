import { getPage } from "@/sanity/sanity.utils";
import { PortableText } from "@portabletext/react";

interface PageProps {
	params: {
		slug: string;
	};
}

export const revalidate = 0;

const Page = async ({ params }: PageProps) => {
	const page = await getPage(params.slug);
	return (
		<>
			<h1 className=" font-extrabold text-4xl"><span className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 dark:bg-gradient-to-br dark:from-sky-700 dark:via-sky-100 dark:to-sky-700
      bg-clip-text text-transparent">{page.title}</span></h1>
			<div className="text-lg text-gray-700 mt-10 dark:text-sky-50">
				<PortableText value={page.content} />
			</div>
		</>
	);
};

export default Page;
