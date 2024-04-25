import { promises as fs } from "fs";
import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, ArrowRight } from "lucide-react";

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
  year: string;
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
              <Link href="/">Julian Suarez Vivas</Link>
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
                  <Link href="#about" className="group flex items-center py-3">
                    <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
                    <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
                      About
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#experience"
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
                    href="#projects"
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
              <Link
                href="https://github.com/juliansv"
                className="block hover:text-slate-200"
              >
                <Github />
              </Link>
            </li>
            <li className="mr-5 text-xs shrink-0">
              <Link
                href="https://www.linkedin.com/in/juliansuarezvivas/"
                className="block hover:text-slate-200"
              >
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
            <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-dark-purple/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                About
              </h2>
            </div>
            <div>
              <p className="mb-4">
                I started my journey as a developer around 2017, when a friend
                of a friend told me about a bootcamp at a local startup called
                <span className="font-bold hover:text-teal-300 cursor-pointer">
                  {" "}
                  Snappler
                </span>
                . There, I learned the basics of web development and realized
                that this was the path I wanted to continue on.
              </p>
              <p className="mb-4">
                {" "}
                Fast forward to today, I have worked as a{" "}
                <span className="font-bold hover:text-teal-300 cursor-pointer">
                  {" "}
                  front-end developer
                </span>{" "}
                for three companies and as a{" "}
                <span className="font-bold hover:text-teal-300 cursor-pointer">
                  {" "}
                  QA analyst
                </span>{" "}
                for another two. I have honed my skills in different tech stacks
                and gained experience working both in the office and from home.
              </p>
              <p>
                {" "}
                For the last year I have been working as a{" "}
                <span className="font-bold hover:text-slate-300 cursor-pointer">
                  {" "}
                  freelance developer
                </span>
                , diving into different projects. Always learning and keeping up
                to date with tech trends.
              </p>
            </div>
          </section>
          <section
            id="experience"
            className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
            aria-label="Work experience"
          >
            <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-dark-purple/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
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
              <div className="mt-12">
                <Link
                  href="https://drive.google.com/file/d/13smCcgiBdyFLyl84QtOG0EQa4onTMIWr/view?usp=sharing"
                  className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
                >
                  View Full Resume
                </Link>
              </div>
            </div>
          </section>
          <section
            id="projects"
            className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
            aria-label="Selected projects"
          >
            <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-dark-purple/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
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
              <div>
                <Link
                  href="/archive"
                  className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group text-base"
                >
                  <span>
                    <span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
                      View Full Project {""}
                    </span>
                    <span>
                      <span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
                        Archive
                      </span>
                      <ArrowRight className="ml-1 inline-block h-4 w-4 shrink-0 transition-transform group-hover:translate-x-2 group-focus-visible:-translate-x-2" />
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </section>
          <footer className="max-w-md pb-16 text-sm text-slate-500 sm:pb-0">
            <p>
              Coded in{" "}
              <span className="font-bold hover:text-teal-300">
                <Link href="https://code.visualstudio.com/">
                  Visual Studio Code
                </Link>
              </span>
              . Built with{" "}
              <span className="font-bold hover:text-teal-300">
                <Link href="https://nextjs.org/">Next.js</Link>
              </span>{" "}
              and{" "}
              <span className="font-bold hover:text-teal-300">
                <Link href="https://tailwindcss.com/">Tailwind CSS</Link>
              </span>
              , deployed with{" "}
              <span className="font-bold hover:text-teal-300">
                <Link href="https://vercel.com/">Vercel</Link>
              </span>
              . Font of choice:{" "}
              <span className="font-bold hover:text-teal-300">
                <Link href="https://fonts.google.com/specimen/Montserrat">
                  Montserrat
                </Link>
              </span>
              .
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
