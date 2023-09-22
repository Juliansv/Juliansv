import { getPage } from "@/sanity/sanity.utils";
import {PortableText} from '@portabletext/react'

interface PageProps {
	params: {
		slug: string;
	};
}

const Page = async ({ params }: PageProps) => {
	const page = await getPage(params.slug);
	return (<>
        <h1>{page.title}</h1>
        <div className="text-lg text-gray-700 mt-10">
            <PortableText value={page.content} />
        </div>
    </>);
};

export default Page;
