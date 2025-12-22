import ExperienceDetail from "@/features/front/experience/components/ExperienceDetail";
import { sortedExperiences } from "@/data";

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
