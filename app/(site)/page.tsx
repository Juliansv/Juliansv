import { getProjects } from "@/sanity/sanity.utils";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0;

export default async function Home() {
	const projects = await getProjects();

	console.log('image: ', projects[0].image);
	

	return (
		<div>
			<h1 className="text-7xl font-extrabold dark:text-sky-50">
				Hello I&apos;m
				<span
					className="bg-gradient-to-br from-sky-700 via-sky-100 to-sky-700
      bg-clip-text text-transparent"
				>
					{" "}
					Julian!
				</span>
			</h1>
			<p className="mt-3 text-xl text-gray-600 dark:text-sky-500">I&apos;m an Argentinian Web Developer</p>
			<h2 className="mt-5 font-bold text-gray-700 text-3xl bg-clip-text text-transparent dark:text-sky-100">Some of my projects</h2>
			<div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{projects.map((project) => (
					<Link
						key={project._id}
						className="border-2 border-gray-500 rounded-lg p-1 flex flex-col items-center hover:scale-105 hover:border-blue-500 transition dark:bg-sky-50"
            href={project.url}
					>
						<div
							className="mt-2 font-extrabold bg-gradient-to-r from-blue-800 via-blue-700 to-blue-500
        bg-clip-text text-transparent"
						>
							{project.name}
						</div>
						{project.image && (
							<Image
								src={project.image}
								alt={project.name}
								width={200}
								height={80}
								className="object-cover rounder-lg m-auto"
							/>
						)}
					</Link>
				))}
			</div>
		</div>
	);
}
