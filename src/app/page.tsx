import { promises as fs } from "fs";
import { Job, Project } from "@/types";
import Main from "@/features/home/Main";
import Header from "@/features/home/Header";

export default async function Page() {
	const file = await fs.readFile(process.cwd() + "/src/lib/data.json", "utf8");
	const data = JSON.parse(file);

	const experience: Job[] = data.experience;
	const projects: Project[] = data.projects;

	return (
		<div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
			<div className="lg:flex lg:justify-between lg:gap-4">
				<Header />
				<Main experience={experience} projects={projects} />
			</div>
		</div>
	);
}
