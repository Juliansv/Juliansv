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
    <div className="flex flex-col min-h-screen gap-4">
      <Element name="HeroSection">
        <HeroSection />
      </Element>
      <Element name="ProjectList" className="min-h-screen">
        <ProjectsList data={projects} />
      </Element>
      <Element name="ExperienceSection" className="min-h-screen">
        <ExperienceSection />
      </Element>
      <Element name="About">
        <About />
      </Element>
      <Element name="Contact">
        <Contact />
      </Element>
    </div>
  );
}
