import Socials from "./socials";
import { Element } from "react-scroll";

const HeroSection = () => {
  return (
    <section aria-labelledby="Hero Section">
      <Element name="HeroSection" className="min-h-screen md:px-20 md:pt-16">
        <div className="pt-6 text-center md:w-2/3 md:mx-auto md:mt-4">
          <h1 className="text-8xl font-extrabold dark:text-sky-50">
            Hello, I&apos;m
            <span
              className=" bg-sky-600 bg-clip-text text-transparent dark:bg-gradient-to-br dark:from-sky-700
        dark:via-sky-100 dark:to-sky-700"
            >
              {" "}
              Julian!
            </span>
          </h1>
          <p className="mt-4 text-3xl text-black dark:text-sky-500">
            I&apos;m an Argentinian Web Developer
          </p>
          <p className="mt-4 text-xl text-black dark:text-white">
            I&apos;ve been working with websites for a while, doing different
            kinds of projects from small startups to bigger companies. I like
            finding creative solutions to problems and keeping up with the
            latest tech. Always learning and trying new things, my goal is to
            make websites that really stand out.
          </p>
          <Socials />
        </div>
      </Element>
    </section>
  );
};

export default HeroSection;
