import { getProjects } from "@/sanity/sanity.utils";
import ProjectsList from "../components/projects-list";

const ProjectsPage = async () => {
  const projects = await getProjects();

  return (
    <>
      <h1 className=" font-extrabold text-4xl">
        <span
          className="bg-gradient-to-r from-sky-700 via-sky-600 to-sky-500 dark:bg-gradient-to-br dark:from-sky-700 dark:via-sky-100 dark:to-sky-700
        bg-clip-text text-transparent"
        >
          Projects
        </span>
      </h1>
      <ProjectsList data={projects} />
    </>
  );
};

export default ProjectsPage;
