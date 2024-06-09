import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
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
        <nav className="nav hidden lg:block" aria-label="In-page jump links">
          <ul className="mt-16 w-max">
            <li>
              <Link
                href="#about"
                className="group flex items-center py-3"
                id="about-nav"
              >
                <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-active:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 group-active:bg-slate-200 motion-reduce:transition-none"></span>
                <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200 group-active:text-slate-200">
                  About
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="#experience"
                className="group flex items-center py-3"
                id="experience-nav"
              >
                <span
                  id="experience-nav-line"
                  className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-active:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 group-active:bg-slate-200 motion-reduce:transition-none"
                ></span>
                <span
                  id="experience-nav-text"
                  className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200 group-active:text-slate-200"
                >
                  Experience
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="#projects"
                className="group flex items-center py-3"
                id="projects-nav"
              >
                <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-active:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 group-active:bg-slate-200 motion-reduce:transition-none"></span>
                <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200 group-active:text-slate-200">
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
  );
};

export default Header;
