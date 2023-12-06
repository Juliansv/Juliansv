"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { BsSun } from "react-icons/bs";

const DarkButton = () => {
  const [currentTheme, setCurrentTheme] = useState<String>()
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setCurrentTheme(theme)
  }, [theme])
  

  return (
    <button
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
      className="bg-gray-800 dark:bg-gray-50 hover:bg-gray-600 dark:hover:bg-gray-300 transition-all duration-100 text-white dark:text-gray-800 px-4 py-2 mx-2 text-md rounded-lg"
    >
      {currentTheme == "dark" ? <BsSun /> : <MdDarkMode /> }
    </button>
  );
};

export default DarkButton;
