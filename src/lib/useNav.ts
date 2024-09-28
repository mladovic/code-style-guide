import { NavItem } from "./types";
import navData from "./nav.json";
import { useMemo } from "react";

export function useNav(): NavItem[] {
  return useMemo(() => navData as NavItem[], []);
}
