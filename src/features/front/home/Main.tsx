"use client";

import AboutMe from "@/features/front/about-me/components/AboutMe";
import Experience from "@/features/front/previous-jobs/components/Experience";
import Footer from "@/features/front/home/Footer";
import Projects from "@/features/front/projects/components/Projects";
import { Job, JobOld, Project } from "@/types";
import { FC, useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface MainProps {
	experience: JobOld[];
	projects: Project[];
}

const Main: FC<MainProps> = ({ experience, projects }): JSX.Element => {
	const { ref: aboutRef, inView: aboutInView } = useInView({
		rootMargin: "-35% 0px -35% 0px",
	});
	const { ref: experienceRef, inView: experienceInView } = useInView({
		rootMargin: "-35% 0px -35% 0px",
	});
	const { ref: projectsRef, inView: projectsInView } = useInView({
		rootMargin: "-35% 0px -35% 0px",
	});

	useEffect(() => {
		document.querySelector(".line-active")?.classList.remove("line-active");
		document.querySelector(".text-active")?.classList.remove("text-active");

		let element;

		if (aboutInView) {
			element = "about";
		} else if (experienceInView) {
			element = "experience";
		} else if (projectsInView) {
			element = "projects";
		}

		document
			.getElementById(`${element}-nav-line`)
			?.classList.add("line-active");
		document
			.getElementById(`${element}-nav-text`)
			?.classList.add("text-active");
	}, [aboutInView, experienceInView, projectsInView]);

	return (
		<>
			<main className="pt-24 lg:w-1/2 lg:py-24">
				<div ref={aboutRef} id="about-section">
					<AboutMe />
				</div>
				<div ref={experienceRef} id="experience-section">
					<Experience experience={experience} />
				</div>
				<div ref={projectsRef} id="projects-section">
					<Projects projects={projects} />
				</div>
				<Footer />
			</main>
		</>
	);
};

export default Main;
