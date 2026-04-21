import type { Metadata } from "next";
import ExperienceDetail from "@/features/front/experience/components/ExperienceDetail";
import { sortedExperiences, getExperienceBySlug } from "@/data";
import { truncate } from "@/lib/seo";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const experience = getExperienceBySlug(slug);
	if (!experience) return {};

	const title = `${experience.position} at ${experience.company}`;
	const description = truncate(experience.description);
	const canonical = `/experience/${experience.slug}`;

	return {
		title,
		description,
		alternates: { canonical },
		openGraph: {
			type: "article",
			url: canonical,
			title,
			description,
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
		},
	};
}

const ExperiencePage = async (props: PageProps) => {
	const params = await props.params;
	return <ExperienceDetail slug={params.slug} />;
};

export default ExperiencePage;

export const dynamic = "force-static";

export async function generateStaticParams() {
	return sortedExperiences.map((exp) => ({
		slug: exp.slug,
	}));
}
