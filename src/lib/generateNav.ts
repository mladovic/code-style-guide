import { toTitleCase } from "./toTitleCase";

interface NavItem {
  title: string;
  path: string;
  children?: NavItem[];
}

const generateNav = (): NavItem[] => {
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
};

export default generateNav;
export type { NavItem };
