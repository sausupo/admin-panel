import { cn } from "@/shared/lib/css";
import { Button } from "@/shared/ui/kit/button";
import { useTheme } from "@/shared/ui/theme/theme-provider";
import { Moon, Sun } from "lucide-react";

interface ThemeSwitcher {
  className?: string;
}

export function ThemeSwitcher({ className }: ThemeSwitcher) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      size="icon"
      variant="outline"
      className={cn(className)}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Moon /> : <Sun />}
    </Button>
  );
}
