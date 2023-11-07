import Link from "next/link";
import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';

import "../globals.css";
import { getPages } from "@/sanity/sanity.utils";
import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "JSV | Portfolio",
	description: "Personal portfolio site",
	openGraph: {
		title: "JSV | Portfolio",
		description: "Personal portfolio site",
		type: "website",
		locale: "en_IE",
		url: "https://julisv.com",
		images: [
			{
				url: "https://th.bing.com/th/id/R.8e6cf7cfbb67884efb493f47c4a41bf6?rik=2voy4R%2brYT99Bg&riu=http%3a%2f%2fimg.freeflagicons.com%2fthumb%2fglossy_round_icon%2fargentina%2fargentina_640.png&ehk=BfRIlRY%2brDGRZ1O%2bqBStnJ8wAsmBj1Kb%2fPy%2f2LKAWZY%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1",
				alt: "JSV | Portfolio",
			},
		],
	},
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pages = await getPages();

	// Fetch header image from DB

	return (
		<html lang="en">
			<body className={`max-w-5xl mx-auto py-4 px-6 ${inter.className}`}>
				<header className="flex items-center justify-between">
					<Link
						href="/"
						className="bg-gradient-to-r from-blue-600 via-white-50 to-blue-500 font-bold text-transparent bg-clip-text text-3xl"
					>
						JSV
						{/* Replace for image of sol de mayo */}
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
