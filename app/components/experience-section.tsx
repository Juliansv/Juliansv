import { Element } from "react-scroll";

const ExperienceSection = () => {
  return (
    <section aria-labelledby="Experience">
      <Element name="ExperienceSection" className="min-h-screen mt-10 md:px-40">
        <div className="grid items-center justify-center gap-10 md:grid-cols-2">
        <div className="flex h-full flex-col justify-center gap-6 rounded-lg bg-[#00a8e60d]/[.05] p-8 shadow-lg ">
            <h1 className="text-white-400 leading mb-4 text-6xl font-bold">
              Some of my previous jobs
            </h1>
            <div className="flex flex-col gap-4">
              <p className="leading-relaxed">
                <span className="text-sky-500">
                  These are a few of the jobs I had in the past.
                </span>{" "}
                Being over 10 years since I had my first one, it would be an
                extensive section if I put all of them here.{" "}
                <span className="text-sky-500">
                  I&apos;ve selected what I believe were the most relevant
                  positions
                </span>{" "}
                taking into account the roles I&apos;m aiming for.
              </p>
              <p className="leading-relaxed">
                <span className="text-sky-500">
                  You may notice there&apos;s a big gap between my first job in
                  tech and my first role as a QA.
                </span>{" "}
                If you want to learn more about my journey I wrote a blog post
                about it.{" "}
              </p>
              <a className="text-white-500 mt-4 inline-flex cursor-pointer items-center">
                <p className="group relative flex items-center">
                  <span>Go to post</span>
                  <span className="absolute -bottom-1 left-0 z-10 h-1 w-0 bg-red-600 duration-500 group-hover:w-full group-hover:transition-all"></span>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="ml-2 h-4 w-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </p>
              </a>
            </div>
          </div>
          <div className="space-y-6 border-l-2 border-dashed border-l-sky-950 m-6">
            <div className="relative w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="absolute -top-0.5 -ml-3.5 h-7 w-7 rounded-full text-sky-500"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="ml-6">
                <h4 className="font-bold text-sky-500">Freelancing</h4>
                <p className="mt-2 max-w-screen-sm text-sm leading-relaxed text-white">
                  Last year I started to work as a freelancer. I have worked
                  with small businesses and solo entrepreneurs, building a
                  variety of things like landing pages and web scrappers.
                </p>
                <span className="mt-1 block text-sm font-semibold text-sky-500">
                  November 2022 - Present day
                </span>
              </div>
            </div>
            <div className="relative w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="absolute -top-0.5 -ml-3.5 h-7 w-7 rounded-full text-sky-500"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="ml-6">
                <h4 className="font-bold text-sky-500">QA Analyst</h4>
                <p className="mt-2 max-w-screen-sm text-sm leading-relaxed text-white">
                  My main responsibilities were implementing test strategies,
                  analyze and develop system and integration tests, and research
                  competition and market.
                </p>
                <span className="mt-1 block text-sm font-semibold text-sky-500">
                  February 2022 - September 2022
                </span>
              </div>
            </div>
            <div className="relative w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="absolute -top-0.5 -ml-3.5 h-7 w-7 rounded-full text-sky-500"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="ml-6">
                <h4 className="font-bold text-sky-500">QA Manual</h4>
                <p className="mt-2 max-w-screen-sm text-sm leading-relaxed text-white">
                  This was my first approach to QA roles. It was for an IA
                  company based in the US. I was performing manual QA on web
                  scrappers.
                </p>
                <span className="mt-1 block text-sm font-semibold text-sky-500">
                  November 2021 - February 2022
                </span>
              </div>
            </div>
            <div className="relative w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="absolute -top-0.5 -ml-3.5 h-7 w-7 rounded-full text-sky-500"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="ml-6">
                <h4 className="font-bold text-sky-500">Frontend Developer</h4>
                <p className="mt-2 max-w-screen-sm text-sm leading-relaxed text-white">
                  The company was called Snappler, it was my first job in tech.
                  They taught me the basics of web development using Ruby On
                  Rails.
                </p>
                <span className="mt-1 block text-sm font-semibold text-sky-500">
                  2016 - 2018
                </span>
              </div>
            </div>
          </div>
        </div>
      </Element>
    </section>
  );
};

export default ExperienceSection;
