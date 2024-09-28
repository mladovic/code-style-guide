import { useContext } from "react";
import { DarkModeCtx } from "./DarkModeCtx";

export function useDarkMode() {
  const ctx = useContext(DarkModeCtx);
  if (ctx === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeCtxProvider");
  }

  return ctx;
}
