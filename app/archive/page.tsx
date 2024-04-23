import Link from "next/link";
import { promises as fs } from "fs";
import { ArrowLeft } from "lucide-react";

interface Project {
  title: string;
  description: string;
  image: string;
  stack?: string[];
  url: string;
  year: string;
}

const Archive = async () => {
  const file = await fs.readFile(process.cwd() + "/app/data.json", "utf8");
  const data = JSON.parse(file);

  const projects: Project[] = data.projects;

  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
      <div className="lg:py-24">
        <Link
          href="/"
          className="group mb-2 inline-flex items-center font-semibold leading-tight text-teal-300"
        >
          <span>
            <ArrowLeft className="mr-1 size-4 group-hover:-translate-x-2 transition-transform" />
          </span>
          Back to home page
        </Link>
        <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
          All projects
        </h1>
        <table id="content" className="mt-12 w-full border-collapse text-left">
          <thead className="sticky top-0 z-10 border-b border-slate-300/10 bg-slate-900/75 px-6 py-5 backdrop-blur">
            <tr>
              <th className="py-4 pr-8 text-sm font-semibold text-slate-200">
                Year
              </th>
              <th className="py-4 pr-8 text-sm font-semibold text-slate-200">
                Project
              </th>
              <th className="hidden py-4 pr-8 text-sm font-semibold text-slate-200 lg:table-cell">
                Build with
              </th>
              <th className="hidden py-4 pr-8 text-sm font-semibold text-slate-200 sm:table-cell">
                Link
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr
                key={index}
                className="border-b border-slate-300/10 last:border-none"
              >
                <td className="py-4 pr-4 align-top text-sm">
                  <div className="translate-y-px">{project.year}</div>
                </td>
                <td className="py-4 pr-4 align-top font-semibold leading-snug text-slate-200">
                  <div>
                    <div className="block sm:hidden">
                      <Link
                        href={project.url}
                        className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 sm:hidden group/link text-base"
                      >
                        {project.title}
                      </Link>
                    </div>
                    <div className="hidden sm:block">{project.title}</div>
                  </div>
                </td>
                <td className="hidden py-4 pr-4 align-top lg:table-cell">
                  <ul className="flex -translate-y-1.5 flex-wrap">
                    {project.stack?.map((stack, index) => (
                      <li key={index} className="my-1 mr-1.5">
                        <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">
                          {stack}
                        </div>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="hidden py-4 align-top sm:table-cell">
                  <ul className="translate-y-1">
                    <li className="mb-1 flex items-center">
                      <Link
                        href={project.url}
                        className="inline-flex items-baseline font-medium leading-tight hover:text-teal-300 focus-visible:text-teal-300 text-sm text-slate-400  group/link "
                      >
                        {project.url}
                      </Link>
                    </li>
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    //
  );
};

export default Archive;
