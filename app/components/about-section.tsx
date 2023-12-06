const About = () => {
  return (
    <div className="min-h-screen pt-10">
      <h1 className=" font-extrabold text-4xl">
        <span
          className="bg-gradient-to-r from-sky-700 via-sky-600 to-sky-500 dark:bg-gradient-to-br dark:from-sky-700 dark:via-sky-100 dark:to-sky-700
          bg-clip-text text-transparent"
        >
          About
        </span>
      </h1>
      <div className="text-lg text-gray-700 mt-10 dark:text-sky-50">
        <p>
          I&apos;m a web developer with a passion for creating digital
          experiences. When I&apos;m not coding, you can often find me on the
          basketball court or lost in the world of music. I also like
          cryptocurrencies, especially Ethereum. I&apos;m always learning about
          new Dapps and projects.
        </p>
      </div>
    </div>
  );
};

export default About;
