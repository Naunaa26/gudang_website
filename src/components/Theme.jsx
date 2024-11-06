import { button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

const Moon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 transition-transform duration-300 transform rotate-0 dark:rotate-210"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
);

const Sun = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 transition-transform duration-300 transform rotate-0 dark:-rotate-180"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
      clipRule="evenodd"
    />
  </svg>
);

export default function Theme() {
  const [isDarkmode, setisDarkmode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      window.document.documentElement.classList.add("dark");
      setisDarkmode(true);
    }
  }, []);

  const handleClick = () => {
    if (isDarkmode) {
      window.document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
      window.document.documentElement.classList.add("dark");
    }
    setisDarkmode(!isDarkmode);
  };

  return (
    <button
      className=" bg-slate-700 dark:bg-orange-600 dark:text-yellow-400 text-[#be9e5d] hover:text-yellow-300 hover:bg-slate-500 dark:hover:bg-orange-500 dark:hover:text-yellow-400 p-2 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
      onClick={handleClick}
    >
      {isDarkmode ? <Moon /> : <Sun />}
    </button>
  );
}
