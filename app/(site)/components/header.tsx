import Image from "next/image";
import Link from "next/link";



const Header = () => {
  return (
    <header className="flex items-center justify-between ">
      <nav className="bg-white border-gray-200 w-full dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4">
          <a href="/" className="flex items-center">
            <Image
              src="/../../icon.png"
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
          <div className="flex md:order-2">
            <Link
              href="/contact"
              className="text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:bg-blue-950 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0"
            >
              Contact Me
            </Link>

            {/* <button
                  data-collapse-toggle="navbar-cta"
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  aria-controls="navbar-cta"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                </button> */}
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  href={"/"}
                  className="block py-2 pl-3 pr-4 text-white bg-blue-600 rounded md:bg-transparent md:text-gray-900 md:hover:text-blue-700 md:p-0 dark:text-sky-50 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Home
                </Link>
              </li>
              {/* <li>
                    <Link
                      href="#"
                      className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0  hover:text-white border-gray-700"
                    >
                      Projects
                    </Link>
                  </li> */}
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
        </div>
      </nav>
    </header>
  );
};

export default Header;
