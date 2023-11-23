import Image from "next/image";
import Link from "next/link";
import DarkButton from "./dark-button";
import logo from "@/app/icon.png"

const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <nav className="bg-transparent border-gray-200 w-full">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4">
          <a href="/" className="flex items-center">
            <Image
              src={logo}
              sizes="any"
              className="mr-3"
              alt="Sol De Mayo Logo"
              width={32}
              height={32}
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-sky-50">
              JSV
            </span>
          </a>
          <div
            className="items-center justify-between hidden w-auto md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-transparent md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:border-gray-700">
              <li>
                <Link
                  href={"/"}
                  className="block py-2 pl-3 pr-4 text-white bg-blue-600 rounded md:bg-transparent md:text-gray-900 md:hover:text-blue-700 md:p-0 dark:text-sky-50 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 hover:text-white border-gray-700 dark:text-sky-50 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 hover:text-white border-gray-700 dark:text-sky-50 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex md:order-2">
            <DarkButton />
            <Link
              href="/contact"
              className="text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:bg-blue-950 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0"
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
