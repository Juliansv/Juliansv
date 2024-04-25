"use client";

import HeroSection from "./components/hero-section";
import projects from "@/public/projects";
import ExperienceSection from "./components/experience-section";
import About from "./components/about-section";
import Contact from "./components/contact-section";

import ProjectsList from "./components/projects-list";

export default function Home() {
  return (
    <main className="px-4">
        <HeroSection />
        <ProjectsList data={projects} />
        <ExperienceSection />
        <Contact />
    </main>
  );
}
