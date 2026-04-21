import { ImageResponse } from "next/og";
import { renderOgImage } from "@/lib/og-template";
import { DEFAULT_OG_SIZE } from "@/lib/seo";
import { getExperienceBySlug, sortedExperiences } from "@/data";

export const runtime = "nodejs";
export const alt = "Experience preview";
export const size = DEFAULT_OG_SIZE;
export const contentType = "image/png";

export async function generateStaticParams() {
	return sortedExperiences.map((e) => ({ slug: e.slug }));
}

interface ImageProps {
	params: Promise<{ slug: string }>;
}

export default async function Image({ params }: ImageProps) {
	const { slug } = await params;
	const experience = getExperienceBySlug(slug);
	const title = experience?.position ?? "Experience";
	const subtitle = experience?.company ?? "";
	const dateRange = experience
		? `${experience.startDate} — ${experience.endDate}`
		: "";

	return new ImageResponse(
		renderOgImage({
			eyebrow: "Experience",
			title,
			subtitle,
			footer: dateRange,
		}),
		{ ...DEFAULT_OG_SIZE }
	);
}
