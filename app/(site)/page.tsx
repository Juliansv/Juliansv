import { getProjects } from "@/sanity/sanity.utils";
import Image from "next/image";
import Link from "next/link";
import ProjectsList from "./components/projects-list";

export const revalidate = 0;

export default async function Home() {
	const projects = await getProjects();

	return (
		<div>
			<h1 className="text-7xl font-extrabold dark:text-sky-50">
				Hello, I&apos;m
				<span
					className=" bg-sky-600 dark:bg-gradient-to-br dark:from-sky-700 dark:via-sky-100 dark:to-sky-700
      bg-clip-text text-transparent"
				>
					{" "}
					Julian!
				</span>
			</h1>
			<p className="mt-3 text-xl text-gray-600 dark:text-sky-500">I&apos;m an Argentinian Web Developer</p>
			<h2 className="mt-5 font-bold text-gray-700 text-3xl bg-clip-text dark:text-sky-100">Some of my projects</h2>
			<ProjectsList data={projects} />
		</div>
	);
}
