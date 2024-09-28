import { useMemo } from "react";
import Fuse, { IFuseOptions } from "fuse.js";
import { NavItem } from "./types";
import navData from "./nav.json";

export interface SearchResult {
  item: NavItem;
  refIndex: number;
  score: number;
}

const options: IFuseOptions<NavItem> = {
  keys: ["title", "content"],
  includeScore: true,
  threshold: 0.4,
  ignoreLocation: true,
  minMatchCharLength: 2,
};

export function useFuse() {
  const flattenNavData = (navItems: NavItem[]): NavItem[] => {
    const flatList: NavItem[] = [];

    const traverse = (items: NavItem[]) => {
      items.forEach((item) => {
        if (item.content && item.content.trim() !== "") {
          flatList.push({
            title: item.title,
            path: item.path,
            content: item.content,
          });
        }

        if (item.children && item.children.length > 0) {
          traverse(item.children);
        }
      });
    };

    traverse(navItems);
    return flatList;
  };

  const fuse = useMemo(() => {
    return new Fuse(flattenNavData(navData), options);
  }, []);

  return fuse;
}
