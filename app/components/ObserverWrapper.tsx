"use client";

import AboutMe from "./AboutMe";
import Experience from "./Experience";
import Footer from "./Footer";
import Projects from "./Projects";
import { Job, Project } from "@/types";
import { FC, useEffect } from "react";
import Header from "./Header";
import { useInView } from "react-intersection-observer";

interface ObserverProps {
	experience: Job[];
	projects: Project[];
}

const ObserverWrapper: FC<ObserverProps> = ({
	experience,
	projects,
}): JSX.Element => {
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

        if (aboutInView) {
            document.getElementById("about-nav-line")?.classList.add("line-active");
            document.getElementById("about-nav-text")?.classList.add("text-active");
        } else if (experienceInView) {
            document.getElementById("experience-nav-line")?.classList.add("line-active");
            document.getElementById("experience-nav-text")?.classList.add("text-active");
        } else {
            document.getElementById("projects-nav-line")?.classList.add("line-active");
            document.getElementById("projects-nav-text")?.classList.add("text-active");
        }
        
	}, [aboutInView, experienceInView, projectsInView]);

	return (
		<>
			<Header />
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

export default ObserverWrapper;
