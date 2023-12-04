import About from "./components/about";
import Contact from "./components/contact-section";
import HeroSection from "./components/hero-section";
import ProjectsList from "./components/projects-list";
import projects from "@/public/projects";

export const revalidate = 0;

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen gap-4">
      <HeroSection />
      <ProjectsList data={projects} />
	  <About />
	  <Contact />
    </div>
  );
}
