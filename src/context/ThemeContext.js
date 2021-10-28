import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  let prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches,
    storedTheme = localStorage.getItem("theme"),
    defaultTheme = storedTheme ? storedTheme : prefersLight ? "light" : "dark",
    metaThemeColor = document.querySelector("meta[name=theme-color]");

  const [theme, setTheme] = useState(defaultTheme || "light");

  // Detect if the lights have been switched by OS.
  const switched = window.matchMedia("(prefers-color-scheme: light)");
  switched.addEventListener("change", (e) => {
    const switched = e.matches;
    setTheme(switched ? "light" : "dark");
  });

  localStorage.setItem("theme", theme);
  document.documentElement.className = theme;
  
  // Refresh meta theme colour
  let currentStyle = getComputedStyle(document.body).getPropertyValue('--main-bg');
  metaThemeColor.setAttribute("content", currentStyle);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
