"use client";

import AboutMe from "./AboutMe";
import Experience from "./Experience";
import Footer from "./Footer";
import Projects from "./Projects";
import { Job, Project } from "@/types";
import { FC, useEffect, useState } from "react";
import Header from "./Header";
import { useRef } from "react";

interface ObserverProps {
	experience: Job[];
	projects: Project[];
}

const ObserverWrapper: FC<ObserverProps> = ({
	experience,
	projects,
}): JSX.Element => {
	const myRef = useRef<HTMLInputElement>(null);


	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				console.log(entry.target.getAttribute("id"));
				setIsVisible(entry.isIntersecting);
			},
			{ rootMargin: "-45% 0px -45% 0px" }
		);
		observer.observe(myRef.current as Element);
	}, []);

	useEffect(() => {
		if (isVisible) {
			document
				.getElementById("experience-nav-line")
				?.classList.add("line-active");
			document
				.getElementById("experience-nav-text")
				?.classList.add("text-active");
		} else {
			document
				.getElementById("experience-nav-line")
				?.classList.remove("line-active");
			document
				.getElementById("experience-nav-text")
				?.classList.remove("text-active");
		}
	}, [isVisible]);

	return (
		<>
			<Header />
			<main className="pt-24 lg:w-1/2 lg:py-24">
				<div id="about-section">
					<AboutMe />
				</div>
				<div ref={myRef} id="experience-section">
					<Experience experience={experience} />
				</div>
				<div id="projects-section">
					<Projects projects={projects} />
				</div>
				<Footer />
			</main>
		</>
	);
};

export default ObserverWrapper;
