import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/Project";
import ProjectCard from "./project-card";

interface ProjectsListProps {
  data: Project[];
}

const ProjectsList: React.FC<ProjectsListProps> = ({ data }) => {
  return (
    <>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((project: Project) => (
          <>
            {/* <ProjectCard project={project} /> */}
            <Link
              key={project._id}
              className="border-2 border-gray-500 rounded-lg p-1 flex flex-col items-center hover:scale-105 hover:border-sky-700 hover:dark:border-red-700 transition dark:bg-sky-50"
              href={project.url}
            >
              <div
                className="mt-2 font-extrabold bg-gradient-to-r from-sky-800 via-sky-700 to-sky-500
            bg-clip-text text-transparent"
              >
                {project.name}
              </div>
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.name}
                  width={200}
                  height={80}
                  className="object-cover rounder-lg m-auto"
                />
              )}
            </Link>
          </>
        ))}
      </div>
    </>
  );
};

export default ProjectsList;
