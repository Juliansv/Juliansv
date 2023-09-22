import Link from "next/link";
import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';

import "../globals.css";
import { getPages } from "@/sanity/sanity.utils";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Personal portfolio",
	description: "Personal portfolio site",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pages = await getPages();

	return (
		<html lang="en">
			<body className={`max-w-5xl mx-auto py-4 px-6 ${inter.className}`}>
				<header className="flex items-center justify-between">
					<Link
						href="/"
						className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 font-bold text-transparent bg-clip-text text-3xl"
					>
						JSV
					</Link>
					<div className="flex items-center gap-5 text-sm text-gray-600">
						{pages.map((page) => (
							<Link
								href={`/${page.slug}`}
								key={page._id}
								className="hover:underline"
							>
								{page.title}
							</Link>
						))}
					</div>
				</header>
				<main className="py-20">{children}
				<Analytics />
				</main>
			</body>
		</html>
	);
}
