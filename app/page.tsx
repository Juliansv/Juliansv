import { promises as fs } from "fs";
import Link from "next/link";
import Image from "next/image";

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
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12">
      <header>
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
          {/* Here it will go the nav links  */}
        </div>
        <ul className="ml-1 mt-8 flex items-center">Social links</ul>
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
              Beginning my journey in web development, I&apos;ve ventured into
              projects spanning startups to corporate enterprises, reveling in
              the challenge of innovation while staying abreast of technological
              advancements.
            </p>
            <p>
              {" "}
              Now, I specialize in creating user-friendly interfaces that
              seamlessly blend aesthetic appeal with intuitive functionality.
              Beyond the digital realm, I find solace in outdoor pursuits like
              hiking and cherish moments spent with loved ones. In essence, my
              path is defined by dedication, a thirst for knowledge, and a
              commitment to crafting memorable digital experiences.
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
            <ol className="group">
              {experience.map((job) => (
                <li key={job.position} className="mb-12">
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
                        {job.skills.map((skill) => (
                          <li key={skill} className="mr-1.5 mt-2">
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
            <ul>
              {projects.map((project) => (
                <li key={project.title} className="mb-12">
                  <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                    <div className="z-10 sm:order-2 sm:col-span-6">
                      <h3>
                        <Link href={project.url} className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300  group/link text-base">
                          <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                          <span>{project.title}</span>
                        </Link>
                      </h3>
                      <p className="mt-2 text-sm leading-normal">{project.description}</p>
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
  );
}
