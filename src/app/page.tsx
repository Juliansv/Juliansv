import { Suspense } from "react";

import Header from "@/features/front/components/Header";
import AboutMe from "@/features/front/about-me/components/AboutMe";
import Experience from "@/features/front/experience/components/Experience";
import Projects from "@/features/front/projects/components/Projects";
import MainContainerWrapper from "@/features/front/components/MainContainerWrapper";
import Footer from "@/features/front/components/Footer";
import { SectionWrapper } from "@/features/front/components/SectionWrapper";
import ExperienceSkeleton from "@/features/front/experience/components/ExperienceSkeleton";
import ProjectsSkeleton from "@/features/front/projects/components/ProjectsSkeleton";

export default async function Page() {
	return (
		<div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
			<div className="lg:flex lg:justify-between lg:gap-4">
				<Header />
				<MainContainerWrapper>
					<SectionWrapper
						id="about-section"
						styles="z-10 relative mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
						ariaLabel="About me"
					>
						<AboutMe />
					</SectionWrapper>
					<SectionWrapper
						id="projects-section"
						styles="mb-16 scroll-mt-16 mdd:mb-24 lg:mb-36 lg:scroll-mt-24"
						ariaLabel="Selected projects"
					>
						<Suspense fallback={<ProjectsSkeleton />}>
							<Projects />
						</Suspense>
					</SectionWrapper>
					<SectionWrapper
						id="experience-section"
						styles="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
						ariaLabel="Work experience"
					>
						<Suspense fallback={<ExperienceSkeleton />}>
							<Experience />
						</Suspense>
					</SectionWrapper>
					<Footer />
				</MainContainerWrapper>
			</div>
		</div>
	);
}
