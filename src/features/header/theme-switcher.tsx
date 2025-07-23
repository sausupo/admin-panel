import { Button } from "@/shared/ui/kit/button";
import { useTheme } from "@/shared/ui/theme/theme-provider";
import { Moon, Sun } from "lucide-react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      size="icon"
      variant="secondary"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Moon /> : <Sun />}
    </Button>
  );
}
