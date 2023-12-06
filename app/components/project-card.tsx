"use client";

import { Project } from "@/types/Project";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Link href={project.url} className="scale-[0.9] transition hover:scale-[0.95]">
      <div className="h-full max-w-sm m-auto cursor-pointer overflow-hidden rounded-lg border-2 border-gray-200 border-opacity-60 bg-[#00a8e60d]/[.9]  ">
        <Image
          className="bg- w-full bg-white object-none md:h-36 lg:h-48"
          src={project.image}
          width={250}
          height={250}
          alt="blog"
        />
        <div className=" p-6">
          <h2 className="title-font mb-1 text-xs font-extrabold tracking-widest text-gray-900">
            {project.stack}
          </h2>
          <h1 className="title-font mb-3 text-3xl font-bold text-gray-900">
            {project.name}
          </h1>
          <p className="mb-3 leading-relaxed">{project.content}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
