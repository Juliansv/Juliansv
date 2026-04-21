import { ImageResponse } from "next/og";
import { renderOgImage } from "@/lib/og-template";
import { DEFAULT_OG_SIZE } from "@/lib/seo";
import { siteConfig } from "@/data/site";

export const runtime = "nodejs";
export const alt = `${siteConfig.name} — Full-stack web developer`;
export const size = DEFAULT_OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
	return new ImageResponse(
		renderOgImage({
			eyebrow: "Portfolio",
			title: siteConfig.name,
			subtitle: "Full-stack web developer — Next.js, React, TypeScript",
		}),
		{ ...DEFAULT_OG_SIZE }
	);
}
