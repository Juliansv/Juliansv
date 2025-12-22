import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "../providers/ph-provider";

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
			<body className="bg-dark-purple leading-relaxed selection:bg-sky-400 antialiased text-slate-400 selection:text-slate-900">
				<PostHogProvider>{children}</PostHogProvider>
			</body>
		</html>
	);
}
