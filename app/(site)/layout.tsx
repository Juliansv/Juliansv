import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import "../globals.css";
import { Inter } from "next/font/google";
import Header from "./components/header";
import Footer from "./components/footer";
import Socials from "./components/socials";
import { ThemeProvider } from "./(providers)/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JSV | Portfolio",
  description: "Personal portfolio site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col justify-between max-w-5xl min-h-screen mx-auto px-6 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Header />
          <main className="py-8">
            {children}
            <Analytics />
          </main>
          <Socials />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
