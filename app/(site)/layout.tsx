import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import "../globals.css";
import { Inter } from "next/font/google";
import Header from "./components/header";
import Footer from "./components/footer";
import Socials from "./components/socials";
import { ThemeProvider } from "./theme-provider";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const pages = await getPages();

  return (
    <html lang="en">
        <body className={`flex flex-col justify-between max-w-5xl min-h-screen mx-auto px-6 ${inter.className}`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem> 
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
