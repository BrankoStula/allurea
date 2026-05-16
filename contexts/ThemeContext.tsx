"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Theme = "navy" | "ivory" | "azure";

export const THEME_META: Record<Theme, { label: string; dot: string }> = {
  navy:  { label: "Navy",  dot: "#001b51" },
  ivory: { label: "Ivory", dot: "#f5f0e6" },
  azure: { label: "Azure", dot: "#0d2d5c" },
};

export const CYCLE: Theme[] = ["navy", "ivory", "azure"];

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
  cycleTheme: () => void;
}>({
  theme: "navy",
  setTheme: () => {},
  cycleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("navy");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const cycleTheme = () =>
    setTheme(prev => CYCLE[(CYCLE.indexOf(prev) + 1) % CYCLE.length]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
