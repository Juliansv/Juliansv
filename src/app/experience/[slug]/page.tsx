import { Metadata } from "next";
import ExperienceDetail from "@/features/front/experience/components/ExperienceDetail";
import { sortedExperiences, getExperienceBySlug } from "@/data";
import { siteConfig } from "@/data/site";

export async function generateMetadata(props: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const params = await props.params;
	const experience = getExperienceBySlug(params.slug);

	if (!experience) {
		return {
			title: "Experience Not Found",
		};
	}

	const title = `${experience.position} at ${experience.company}`;

	return {
		title: title,
		description: experience.description,
		openGraph: {
			title: `${title} | ${siteConfig.name}`,
			description: experience.description,
			url: `${siteConfig.url}/experience/${experience.slug}`,
			type: "article",
		},
		twitter: {
			card: "summary",
			title: `${title} | ${siteConfig.name}`,
			description: experience.description,
		},
		alternates: {
			canonical: `${siteConfig.url}/experience/${experience.slug}`,
		},
	};
}

const ExperiencePage = async (props: { params: Promise<{ slug: string }> }) => {
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
