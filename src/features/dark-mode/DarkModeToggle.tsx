import { useState } from "react";
import { useDarkMode } from "./useDarkMode";

export function DarkModeToggle() {
  const { theme, setTheme } = useDarkMode();
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (selectedTheme: string) => {
    setTheme(selectedTheme as "light" | "dark" | "system");
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none"
      >
        Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            <button
              onClick={() => handleChange("light")}
              className={`${
                theme === "light"
                  ? "bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-white"
                  : "text-gray-700 dark:text-gray-200"
              } block w-full text-left px-4 py-2 text-sm`}
              role="menuitem"
            >
              Light
            </button>
            <button
              onClick={() => handleChange("dark")}
              className={`${
                theme === "dark"
                  ? "bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-white"
                  : "text-gray-700 dark:text-gray-200"
              } block w-full text-left px-4 py-2 text-sm`}
              role="menuitem"
            >
              Dark
            </button>
            <button
              onClick={() => handleChange("system")}
              className={`${
                theme === "system"
                  ? "bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-white"
                  : "text-gray-700 dark:text-gray-200"
              } block w-full text-left px-4 py-2 text-sm`}
              role="menuitem"
            >
              System
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
