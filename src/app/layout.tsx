import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "../providers/ph-provider";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: {
		default: siteConfig.title,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	keywords: siteConfig.keywords,
	authors: [{ name: siteConfig.name, url: siteConfig.url }],
	creator: siteConfig.name,
	openGraph: {
		type: "website",
		locale: "en_US",
		url: siteConfig.url,
		title: siteConfig.title,
		description: siteConfig.description,
		siteName: siteConfig.name,
		images: [
			{
				url: siteConfig.image,
				width: 1200,
				height: 630,
				alt: `${siteConfig.name} - ${siteConfig.subtitle}`,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.title,
		description: siteConfig.description,
		images: [siteConfig.image],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	alternates: {
		canonical: siteConfig.url,
	},
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};

const montserrat = Montserrat({
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`scroll-smooth ` + montserrat.className}>
			<head>
				<StructuredData />
			</head>
			<body className="bg-dark-purple leading-relaxed selection:bg-sky-400 antialiased text-slate-400 selection:text-slate-900">
				<PostHogProvider>{children}</PostHogProvider>
			</body>
		</html>
	);
}

function StructuredData() {
	const personSchema = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: siteConfig.name,
		url: siteConfig.url,
		jobTitle: siteConfig.subtitle,
		description: siteConfig.description,
		sameAs: [siteConfig.socialLinks.github, siteConfig.socialLinks.linkedin],
		knowsAbout: [
			"Web Development",
			"Next.js",
			"React",
			"WordPress",
			"TypeScript",
			"JavaScript",
			"Frontend Development",
			"Responsive Design",
		],
	};

	const websiteSchema = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: siteConfig.name,
		url: siteConfig.url,
		description: siteConfig.description,
		author: {
			"@type": "Person",
			name: siteConfig.name,
		},
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
			/>
		</>
	);
}
