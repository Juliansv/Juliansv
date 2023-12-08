import {Element} from "react-scroll"

const About = () => {
  return (
    <Element name="About" className="hidden">
      <div className="min-h-screen pt-10">
        <h1 className=" text-4xl font-extrabold">
          <span
            className="bg-gradient-to-r from-sky-700 via-sky-600 to-sky-500 bg-clip-text text-transparent dark:bg-gradient-to-br dark:from-sky-700
          dark:via-sky-100 dark:to-sky-700"
          >
            About
          </span>
        </h1>
        <div className="mt-10 text-lg text-gray-700 dark:text-sky-50">
          <p>
            I&apos;m a web developer with a passion for creating digital
            experiences. When I&apos;m not coding, you can often find me on the
            basketball court or lost in the world of music. I also like
            cryptocurrencies, especially Ethereum. I&apos;m always learning
            about new Dapps and projects.
          </p>
        </div>
      </div>
    </Element>
  );
};

export default About;
