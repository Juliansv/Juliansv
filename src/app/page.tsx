import { Suspense } from "react";

import Header from "@/features/front/components/Header";
import AboutMe from "@/features/front/about-me/components/AboutMe";
import Experience from "@/features/front/previous-jobs/components/Experience";
import Projects from "@/features/front/projects/components/Projects";
import MainContainerWrapper from "@/features/front/components/MainContainerWrapper";
import Footer from "@/features/front/components/Footer";

export default async function Page() {
	return (
		<div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
			<div className="lg:flex lg:justify-between lg:gap-4">
				<Header />
				{/* <Main experience={experience} projects={projects} /> */}
				<MainContainerWrapper>
					<Suspense>
						<AboutMe />
					</Suspense>
					<Suspense>
						<Experience />
					</Suspense>
					<Suspense>
						<Projects />
					</Suspense>
					<Footer />
				</MainContainerWrapper>
			</div>
		</div>
	);
}
