import Link from "next/link";
import { Project } from "@/types/Project";
import ProjectCard from "./project-card";

interface ProjectsListProps {
  data: Project[];
}

const ProjectsList: React.FC<ProjectsListProps> = ({ data }) => {
  return (
    <section className="pt-6">
      <h1 className=" text-4xl font-extrabold pb-2">
        <span
          className="bg-gradient-to-r from-sky-700 via-sky-600 to-sky-500 bg-clip-text text-transparent dark:bg-gradient-to-br dark:from-sky-700
        dark:via-sky-100 dark:to-sky-700"
        >
          Projects
        </span>
      </h1>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((project: Project) => (
          <ProjectCard project={project} key={project._id} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsList;
