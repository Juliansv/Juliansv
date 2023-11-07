import { getProjects } from "@/sanity/sanity.utils";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0;

export default async function Home() {
	const projects = await getProjects();

	console.log(projects[0].name);
	

	return (
		<div>
			<h1 className="text-7xl font-extrabold">
				Hello I&apos;m
				<span
					className="bg-gradient-to-r from-blue-700 via-white-50 to-blue-500
      bg-clip-text text-transparent"
				>
					{" "}
					Julian!
				</span>
			</h1>
			<p className="mt-3 text-xl text-gray-600">I&apos;m an Argentinian Web Developer <br/>
			¡Checkout my projects!</p>
			<h2 className="mt-10 font-bold text-gray-700 text-3xl">My projects</h2>
			<div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{projects.map((project) => (
					<Link
						key={project._id}
						className="border-2 border-gray-500 rounded-lg p-1 flex flex-col items-center max-h-45 hover:scale-105 hover:border-blue-500 transition"
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
								width={750}
								height={300}
								className="object-cover rounder-lg m-auto"
							/>
						)}
					</Link>
				))}
			</div>
		</div>
	);
}
