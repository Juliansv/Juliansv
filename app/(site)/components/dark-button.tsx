"use client"
import React from 'react'
import { useTheme } from "next-themes";
import { MdDarkMode, MdOutlineWbSunny } from "react-icons/md";



const DarkButton = () => {
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;

    return (
        <button
            onClick={() => theme == "dark"? setTheme('light'): setTheme("dark")}
            className='bg-gray-800 dark:bg-gray-50 hover:bg-gray-600 dark:hover:bg-gray-300 transition-all duration-100 text-white dark:text-gray-800 px-4 py-2 mx-2 text-md rounded-lg'>
            {
                currentTheme == "dark" ? <MdOutlineWbSunny /> : <MdDarkMode />

            }
        </button>
    )
}

export default DarkButton