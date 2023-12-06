"use client";

import Image from "next/image";
import DarkButton from "./dark-button";
import logo from "@/app/icon.png";
import { Link } from "react-scroll";

const Header = () => {
  const pages = [
    {
      name: "Projects",
      href: "ProjectList",
      offset: -80,
    },
    {
      name: "Experience",
      href: "ExperienceSection",
      offset: -80,
    },
    {
      name: "About Me",
      href: "About",
      offset: -80,
    },
  ];

  return (
    <header className="sticky top-0 z-10 px-4 backdrop-blur-sm">
      <nav className="w-full border-gray-200">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between py-4">
          <Link
            to="HeroSection"
            smooth={true}
            offset={-80}
            className="flex cursor-pointer items-center hover:text-sky-700 dark:hover:text-red-600"
          >
            <Image
              src={logo}
              sizes="any"
              className="mr-3"
              alt="Sol De Mayo Logo"
              width={32}
              height={32}
            />
            <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-sky-50 ">
              JSV
            </span>
          </Link>
          <div
            className="hidden w-auto items-center justify-between md:order-1 md:flex md:absolute md:w-full"
            id="navbar-cta"
          >
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-transparent p-4 font-medium dark:border-gray-700 md:m-auto md:flex-row md:space-x-8 md:border-0 md:p-0">
              {pages.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.href}
                    offset={item.offset}
                    spy={true}
                    smooth={true}
                    className="block cursor-pointer rounded bg-blue-600 py-2 pl-3 pr-4 text-white dark:text-sky-50 dark:hover:bg-gray-700 dark:hover:text-white md:bg-transparent md:p-0 md:text-gray-900 md:hover:text-sky-700 md:dark:hover:bg-transparent md:active:dark:text-red-600"
                  >
                    <p className="group relative">
                      <span>{item.name}</span>
                      <span className="absolute -bottom-1 left-0 z-10 h-1 w-0 bg-red-600 duration-300 group-hover:w-full group-hover:transition-all"></span>
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex md:order-2">
            <DarkButton />
            <Link
              to="Contact"
              offset={-80}
              smooth={true}
              className="before:ease relative cursor-pointer overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-4 py-2 text-white shadow-sm transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-blue-700 hover:before:-translate-x-40"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
