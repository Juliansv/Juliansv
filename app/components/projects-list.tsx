import Link from "next/link";
import { Project } from "@/types/Project";
import ProjectCard from "./project-card";
import { Element } from "react-scroll";

interface ProjectsListProps {
  data: Project[];
}

const ProjectsList: React.FC<ProjectsListProps> = ({ data }) => {
  return (
    <section aria-labelledby="Projects">
      <Element name="ProjectList" className="min-h-screen md:px-40">
        <h1 className=" pb-2 text-center text-4xl font-extrabold">
          <span
            className="bg-gradient-to-r from-sky-700 via-sky-600 to-sky-500 bg-clip-text text-transparent dark:bg-gradient-to-br dark:from-sky-700
        dark:via-sky-100 dark:to-sky-700"
          >
            Projects
          </span>
        </h1>
        <div className="mt-5 grid grid-cols-1 gap-2 md:grid-cols-3">
          {data.map((project: Project) => (
            <ProjectCard project={project} key={project._id} />
          ))}
        </div>
      </Element>
    </section>
  );
};

export default ProjectsList;
