import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "../providers/ph-provider";
import { siteUrl, absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/data/site";

const DESCRIPTION =
	"Full-stack web developer specializing in Next.js, React, and TypeScript. Building fast, accessible, and well-crafted web experiences.";

export const metadata: Metadata = {
	metadataBase: siteUrl,
	title: {
		default: `${siteConfig.name} — Full-stack web developer`,
		template: `%s · ${siteConfig.name}`,
	},
	description: DESCRIPTION,
	authors: [{ name: siteConfig.name, url: siteUrl.toString() }],
	alternates: { canonical: "/" },
	openGraph: {
		type: "website",
		url: "/",
		siteName: siteConfig.name,
		locale: "en_US",
		title: `${siteConfig.name} — Full-stack web developer`,
		description: DESCRIPTION,
	},
	twitter: {
		card: "summary_large_image",
		title: `${siteConfig.name} — Full-stack web developer`,
		description: DESCRIPTION,
	},
	robots: { index: true, follow: true },
};

const montserrat = Montserrat({
	subsets: ["latin"],
});

const personJsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: siteConfig.name,
	url: absoluteUrl("/"),
	jobTitle: "Full-stack web developer",
	sameAs: [siteConfig.socialLinks.github, siteConfig.socialLinks.linkedin],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`scroll-smooth ` + montserrat.className}>
			<body className="bg-dark-purple leading-relaxed text-slate-400 antialiased selection:bg-sky-400 selection:text-slate-900">
				<script
					type="application/ld+json"
					// JSON-LD content is compile-time (siteConfig); JSON.stringify handles escaping.
					dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
				/>
				<PostHogProvider>{children}</PostHogProvider>
			</body>
		</html>
	);
}
