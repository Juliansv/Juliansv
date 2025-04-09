"use client";

import { useInView } from "react-intersection-observer";
import { Children } from "react";
import { cloneElement } from "react";
import { useEffect } from "react";

const MainContainerWrapper = ({ children }: { children: React.ReactNode }) => {
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

	const childrenWithRefs = Children.map(children, (child, index) => {
		// Check if the child is a valid element
		if (!child || typeof child !== "object" || !("props" in child)) {
			return child;
		}

		// Add the appropriate ref based on index
		if (index === 0) return cloneElement(child, { ref: aboutRef });
		if (index === 1) return cloneElement(child, { ref: experienceRef });
		if (index === 2) return cloneElement(child, { ref: projectsRef });
		return child;
	});

	return <main className="pt-24 lg:w-1/2 lg:py-24">{childrenWithRefs}</main>;
};

export default MainContainerWrapper;
