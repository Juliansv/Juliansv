import { ImageResponse } from "next/og";
import { renderOgImage } from "@/lib/og-template";
import { DEFAULT_OG_SIZE, truncate } from "@/lib/seo";
import { getProjectBySlug, sortedProjects } from "@/data";

export const runtime = "nodejs";
export const alt = "Project preview";
export const size = DEFAULT_OG_SIZE;
export const contentType = "image/png";

export async function generateStaticParams() {
	return sortedProjects.map((p) => ({ slug: p.slug }));
}

interface ImageProps {
	params: Promise<{ slug: string }>;
}

export default async function Image({ params }: ImageProps) {
	const { slug } = await params;
	const project = getProjectBySlug(slug);
	const title = project?.title ?? "Project";
	const subtitle = project
		? truncate(project.description, 120)
		: "Portfolio project";
	const stackChips = project ? project.stack.slice(0, 4).join(" · ") : "";

	return new ImageResponse(
		renderOgImage({
			eyebrow: "Project",
			title,
			subtitle,
			footer: stackChips,
		}),
		{ ...DEFAULT_OG_SIZE }
	);
}
