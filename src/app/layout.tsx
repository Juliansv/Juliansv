import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { unstable_ViewTransition as ViewTransition } from "react";
import { PostHogProvider } from "../providers/ph-provider";

import MouseTrailer from "@/components/MouseTrailer";

export const metadata: Metadata = {
	title: "Julian Suarez Vivas",
	description: "Portfolio website",
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
			<body className="bg-dark-purple leading-relaxed selection:bg-teal-300 antialiased text-slate-400 selection:text-teal-900">
				<PostHogProvider>
					<MouseTrailer />
					<ViewTransition>{children}</ViewTransition>
				</PostHogProvider>
			</body>
		</html>
	);
}
