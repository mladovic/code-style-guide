import { useMemo } from "react";
import { NavItem } from "./types";

function toTitleCase(str: string) {
  if (typeof str !== "string") {
    throw new TypeError("Input must be a string");
  }

  return str
    .trim()
    .split("-")
    .filter((word) => word.length > 0)
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

export function useNav() {
  return useMemo((): NavItem[] => {
    const navItems: NavItem[] = [];
    const modules = import.meta.glob("../docs/**/*.md");

    Object.keys(modules).forEach((filePath) => {
      const cleanPath = filePath
        .replace(/^..\/docs\//, "")
        .replace(/\.md(\?raw)?$/, "");
      const parts = cleanPath.split("/");

      let currentLevel = navItems;
      parts.forEach((part, index) => {
        const title = toTitleCase(part);
        const existingItem = currentLevel.find((item) => item.title === title);

        if (existingItem) {
          if (index === parts.length - 1) {
            existingItem.path = `/docs/${cleanPath}`;
          }
          currentLevel = existingItem.children || [];
        } else {
          const newItem: NavItem = {
            title,
            path: index === parts.length - 1 ? `/docs/${cleanPath}` : "#",
          };

          if (index < parts.length - 1) {
            newItem.children = [];
          }

          currentLevel.push(newItem);
          currentLevel = newItem.children || [];
        }
      });
    });

    return navItems;
  }, []);
}
