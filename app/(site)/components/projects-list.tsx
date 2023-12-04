import Link from "next/link";
import { Project } from "@/types/Project";
import ProjectCard from "./project-card";

interface ProjectsListProps {
  data: Project[];
}

const ProjectsList: React.FC<ProjectsListProps> = ({ data }) => {
  return (
    <div className="min-h-screen">
      <h1 className=" font-extrabold text-4xl">
        <span
          className="bg-gradient-to-r from-sky-700 via-sky-600 to-sky-500 dark:bg-gradient-to-br dark:from-sky-700 dark:via-sky-100 dark:to-sky-700
        bg-clip-text text-transparent"
        >
          Projects
        </span>
      </h1>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {data.map((project: Project) => (
          <ProjectCard project={project} key={project._id} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsList;
