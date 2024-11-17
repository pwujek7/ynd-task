import { createContext, useContext, useEffect, useState } from "react";
import { THEME } from "@/const/theme";

type Theme = THEME;

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

type ThemeProviderProps = { children: React.ReactNode };

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(THEME.LIGHT);

  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode) {
      setTheme(savedMode as Theme);
      document.documentElement.classList.add(savedMode);
    } else {
      document.documentElement.classList.add(THEME.LIGHT);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.remove(THEME.LIGHT, THEME.DARK);
    document.documentElement.classList.add(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export default useTheme;
