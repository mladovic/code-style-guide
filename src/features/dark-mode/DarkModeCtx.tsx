import { createContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system" | "";

interface DarkModeCtxProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

interface DarkModeCtxProviderProps {
  children: React.ReactNode;
}

export const DarkModeCtx = createContext<DarkModeCtxProps>({
  theme: "",
  setTheme: () => {},
});

export function DarkModeCtxProvider({ children }: DarkModeCtxProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const localTheme = localStorage.getItem("theme") as Theme | null;
    return localTheme || "system";
  });

  const applyTheme = (theme: Theme) => {
    const root = window.document.documentElement;

    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  useEffect(() => {
    if (theme !== "system") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      applyTheme("system");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [theme]);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <DarkModeCtx.Provider value={{ theme, setTheme }}>
      {children}
    </DarkModeCtx.Provider>
  );
}
