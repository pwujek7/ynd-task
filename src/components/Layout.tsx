import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import useTheme from "@/context/ThemeContext";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { THEME } from "@/const/theme";

export function Layout({ children }: { children: ReactNode }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="container flex flex-col min-h-screen">
      <div className="fixed top-2 right-2">
        <Button onClick={toggleTheme}>
          {theme === THEME.DARK ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>
      {children}
    </div>
  );
}
