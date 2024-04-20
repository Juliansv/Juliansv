import { promises as fs } from "fs";
import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin } from "lucide-react";

interface Job {
  period: string;
  position: string;
  company: string;
  description: string;
  skills: string[];
}

interface Project {
  title: string;
  description: string;
  image: string;
  stack?: string[];
  url: string;
}

export default async function Page() {
  const file = await fs.readFile(process.cwd() + "/app/data.json", "utf8");
  const data = JSON.parse(file);

  const experience: Job[] = data.experience;
  const projects: Project[] = data.projects;

  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
      <div className="lg:flex lg:justify-between lg:gap-4">
        <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
              Julian Suarez Vivas
            </h1>
            <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
              Frontend Developer
            </h2>
            <p className="mt-4 max-w-sm leading-normal">
              I focus on delivering slick, user-friendly apps with precision and
              style, prioritizing user satisfaction above all.
            </p>
            <nav
              className="nav hidden lg:block"
              aria-label="In-page jump links"
            >
              <ul className="mt-16 w-max">
                <li>
                  <Link href="#About" className="group flex items-center py-3">
                    <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
                    <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
                      About
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#Experience"
                    className="group flex items-center py-3"
                  >
                    <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
                    <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
                      Experience
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#Projects"
                    className="group flex items-center py-3"
                  >
                    <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
                    <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
                      Projects
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          {/* Here it will go the nav links  */}
          <ul className="ml-1 mt-8 flex items-center">
            <li className="mr-5 text-xs shrink-0">
              <Link href="https://github.com/juliansv">
                <Github />
              </Link>
            </li>
            <li className="mr-5 text-xs shrink-0">
              <Link href="https://www.linkedin.com/in/juliansuarezvivas/">
                <Linkedin />
              </Link>
            </li>
          </ul>
        </header>
        <main className="pt-24 lg:w-1/2 lg:py-24">
          <section
            id="about"
            className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
            aria-label="About me"
          >
            <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                About
              </h2>
            </div>
            <div>
              <p className="mb-4">
                I&apos;ve been involve in web development for a while now,
                tackling projects for various clients, from small startups to
                larger corporations. I&apos;m passionate about discovering
                innovative solutions to challenges and staying in the loop with
                the latest tech trends. Always hungry for knowledge and eager to
                explore new territories, my aim is to craft websites that truly
                stand out.
              </p>
              <p>
                {" "}
                My journey has been quite the adventure. I started off as a
                junior frontend developer, then took a detour into QA, and now
                I&apos;m back to my frontend roots, focusing especially on
                Next.js. Along the way, I&apos;ve sharpened my skills in
                JavaScript, React.js, and Next.js, while also picking up
                insights into quality assurance practices and agile
                methodologies. With diverse project experience, I enjoy solving
                problems and staying updated with tech trends. Always learning,
                I aim for standout websites.
              </p>
            </div>
          </section>
          <section
            id="experience"
            className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
            aria-label="Work experience"
          >
            <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                Experience
              </h2>
            </div>
            <div>
              <ol className="group/list">
                {experience.map((job, index) => (
                  <li key={index} className="mb-12">
                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                        {job.period}
                      </header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-slate-200">
                          {job.position + ` · ` + job.company}
                        </h3>
                        <p className="mt-2 text-sm leading-normal">
                          {job.description}
                        </p>
                        <ul className="mt-2 flex flex-wrap">
                          {job.skills.map((skill, index) => (
                            <li key={index} className="mr-1.5 mt-2">
                              <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">
                                {skill}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-12">View Full Resume</div>
            </div>
          </section>
          <section
            id="projects"
            className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
            aria-label="Selected projects"
          >
            <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                Projects
              </h2>
            </div>
            <div>
              <ul className="group/list">
                {projects.map((project, index) => (
                  <li key={index} className="mb-12">
                    <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                      <div className="z-10 sm:order-2 sm:col-span-6">
                        <h3>
                          <Link
                            href={project.url}
                            className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300  group/link text-base"
                          >
                            <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                            <span>{project.title}</span>
                          </Link>
                        </h3>
                        <p className="mt-2 text-sm leading-normal">
                          {project.description}
                        </p>
                        {project.stack && (
                          <ul className="mt-2 flex flex-wrap">
                            {project.stack.map((stackName, index) => (
                              <li key={index} className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                                  {stackName}
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      {/* image */}
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={150}
                        height={150}
                        className="rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1"
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <div>View Full Project Archive</div>
            </div>
          </section>
          <footer className="max-w-md pb-16 text-sm text-slate-500 sm:pb-0">
            <p>
              Coded in Visual Studio Code by yours truly. Built with Next.js and
              Tailwind CSS, deployed with Vercel. Font of choice: Montserrat.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
