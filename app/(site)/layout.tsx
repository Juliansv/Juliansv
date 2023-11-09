import Link from "next/link";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import "../globals.css";
import { getPages } from "@/sanity/sanity.utils";
import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JSV | Portfolio",
  description: "Personal portfolio site",
  openGraph: {
    title: "JSV | Portfolio",
    description: "Personal portfolio site",
    type: "website",
    locale: "en_IE",
    url: "https://julisv.com",
    images: [
      {
        url: "https://th.bing.com/th/id/R.8e6cf7cfbb67884efb493f47c4a41bf6?rik=2voy4R%2brYT99Bg&riu=http%3a%2f%2fimg.freeflagicons.com%2fthumb%2fglossy_round_icon%2fargentina%2fargentina_640.png&ehk=BfRIlRY%2brDGRZ1O%2bqBStnJ8wAsmBj1Kb%2fPy%2f2LKAWZY%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1",
        alt: "JSV | Portfolio",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pages = await getPages();

  return (
    <html lang="en">
      <body className={`flex flex-col justify-between max-w-5xl min-h-screen mx-auto px-6 ${inter.className}`}>
        <header className="flex items-center justify-between">
          <nav className="bg-white border-gray-200 w-full">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4">
              <a href="/" className="flex items-center">
                <Image
                  src="https://w7.pngwing.com/pngs/118/204/png-transparent-yellow-sun-illustration-flag-of-argentina-inca-empire-sun-of-may-inti-sol-miscellaneous-flag-food-thumbnail.png"
                  className="mr-3"
                  alt="Sol De Mayo Logo"
                  width={32}
                  height={32}
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
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
                <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
                  <li>
                    <Link
                      href={"/"}
                      className="block py-2 pl-3 pr-4 text-white bg-blue-600 rounded md:bg-transparent md:text-gray-900 md:hover:text-blue-700 md:p-0"
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
                      className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 hover:text-white border-gray-700"
                    >
                      About
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <main className="py-10">
          {children}
          <Analytics />
        </main>

        <footer className="bg-white rounded-lg mx-4">
          <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <span className="block text-sm text-gray-500 sm:text-center">
              © 2023{" "}
              <a href="https://github.com/juliansv" className="hover:underline">
                Julian Suarez Vivas
              </a>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
