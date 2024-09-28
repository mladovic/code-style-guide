import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  MagnifyingGlassCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { useFuse } from "../lib/useFuse";

export function SearchBar() {
  const [query, setQuery] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any[]>([]);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const fuse = useFuse();

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim() === "") {
        setResults([]);
      } else {
        const searchResults = fuse.search(query);
        setResults(searchResults.slice(0, 5));
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query, fuse]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (path: string) => {
    setQuery("");
    setResults([]);
    navigate(path);
  };

  return (
    <div className="relative w-full max-w-md" ref={containerRef}>
      <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700">
        <MagnifyingGlassCircleIcon className="h-5 w-5 text-gray-500 dark:text-gray-300" />
        <input
          type="text"
          ref={inputRef}
          className="flex-1 ml-2 bg-transparent focus:outline-none text-gray-700 dark:text-gray-200"
          placeholder="Search documentation..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="ml-2 focus:outline-none"
            aria-label="Clear search"
          >
            <XMarkIcon className="h-5 w-5 text-gray-500 dark:text-gray-300" />
          </button>
        )}
      </div>
      {isFocused && results.length > 0 && (
        <ul className="absolute z-10 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md mt-1 max-h-80 overflow-y-auto shadow-lg">
          {results.map((result) => (
            <li
              key={result.item.path}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
              onClick={() => handleSelect(result.item.path)}
            >
              <div className="font-semibold text-gray-800 dark:text-gray-200">
                {result.item.title}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {result.item.path}
              </div>
            </li>
          ))}
        </ul>
      )}
      {isFocused && query && results.length === 0 && (
        <div className="absolute z-10 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md mt-1 px-4 py-2 text-gray-500 dark:text-gray-400 shadow-lg">
          No results found.
        </div>
      )}
    </div>
  );
}
