import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export const ThemeToggleButton = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  return (
    <Button onClick={() => setTheme(isDarkMode ? "light" : "dark")}>
      {isDarkMode ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
};
