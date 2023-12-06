"use client";

import { Project } from "@/types/Project";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Link href={project.url}>
      <div className="cursor-pointer transition hover:scale-105 h-full bg-[#00a8e60d]/[.9] rounded-lg border-2">
        <div className="h-full overflow-hidden  border-gray-200 border-opacity-60">
          <Image
            className="bg- w-full bg-white object-none md:h-36 lg:h-48"
            src={project.image}
            width={120}
            height={120}
            alt="blog"
          />
          <div className=" p-6">
            <h2 className="title-font mb-1 text-xs font-medium tracking-widest text-gray-900">
              {project.stack}
            </h2>
            <h1 className="title-font mb-3 text-3xl font-bold text-gray-900">
              {project.name}
            </h1>
            <p className="mb-3 leading-relaxed">{project.content}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
