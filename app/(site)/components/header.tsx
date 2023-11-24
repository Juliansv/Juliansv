import Image from "next/image";
import Link from "next/link";
import DarkButton from "./dark-button";
import logo from "@/app/icon.png"

const Header = () => {
  const pages = [
    {
      name: 'Home',
      href: '/'
    },
    {
      name: 'Projects',
      href: '/projects'
    },
    {
      name: 'About Me',
      href: '/about'
    }
  ]
  return (
    <header className="flex items-center justify-between">
      <nav className="bg-transparent border-gray-200 w-full">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4">
          <Link href="/" className="flex items-center dark:hover:text-red-600 hover:text-sky-700 ">
            <Image
              src={logo}
              sizes="any"
              className="mr-3"
              alt="Sol De Mayo Logo"
              width={32}
              height={32}
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-sky-50 ">
              JSV
            </span>
          </Link>
          <div
            className="items-center justify-between hidden w-auto md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-transparent md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:border-gray-700">
              {pages.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="block py-2 pl-3 pr-4 hover:underline hover:underline-offset-8 text-white bg-blue-600 rounded md:bg-transparent md:text-gray-900 md:hover:text-sky-700 md:p-0 dark:text-sky-50 md:dark:hover:text-red-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
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
