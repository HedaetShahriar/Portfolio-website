"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useMemo, useState } from "react";

export const ThemeContext = createContext({ theme: "dark", toggle: () => {} });

export default function Providers({ children }) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem("theme") : "dark";
    setTheme(stored);
    document.documentElement.classList.add(stored === 'dark' ? 'theme-dark' : 'theme-light');
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("theme", theme);
      document.documentElement.classList.remove('theme-dark', 'theme-light');
      document.documentElement.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
    }
  }, [theme]);

  const value = useMemo(() => ({
    theme,
    toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
  }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      <SessionProvider>{children}</SessionProvider>
    </ThemeContext.Provider>
  );
}