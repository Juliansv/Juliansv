const HeroSection = () => {
  return (
    <div className="min-h-screen text-center pt-20">
      <h1 className="text-8xl font-extrabold dark:text-sky-50">
        Hello, I&apos;m
        <span
          className=" bg-sky-600 dark:bg-gradient-to-br dark:from-sky-700 dark:via-sky-100 dark:to-sky-700
      bg-clip-text text-transparent"
        >
          {" "}
          Julian!
        </span>
      </h1>
      <p className="mt-3 text-3xl text-gray-600 dark:text-sky-500">I&apos;m an Argentinian Web Developer</p>
    </div>
  );
};

export default HeroSection;
