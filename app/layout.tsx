import type { Metadata } from "next";
import { Montserrat } from 'next/font/google'
import "./globals.css";


export const metadata: Metadata = {
  title: "Portfolio v2",
  description: "Portfolio version 2",
};

const montserrat = Montserrat({
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ` + montserrat.className}>
      <body className="bg-dark-purple leading-relaxed selection:bg-teal-300 antialiased text-slate-400 selection:text-teal-900">{children}</body>
    </html>
  );
}
