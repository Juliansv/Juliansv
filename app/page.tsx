"use client"

import About from "./components/about-section";
import Contact from "./components/contact-section";
import ExperienceSection from "./components/experience-section";
import HeroSection from "./components/hero-section";
import ProjectsList from "./components/projects-list";
import projects from "@/public/projects";
import { Element } from "react-scroll";

export default function Home() {
  return (
    <div>
      <Element name="HeroSection" className="min-h-screen">
        <HeroSection />
      </Element>
      <Element name="ProjectList" className="min-h-screen">
        <ProjectsList data={projects} />
      </Element>
      <Element name="ExperienceSection" className="min-h-screen">
        <ExperienceSection />
      </Element>
      <Element name="About" className="hidden">
        <About />
      </Element>
      <Element name="Contact" className="min-h-screen">
        <Contact />
      </Element>
    </div>
  );
}
