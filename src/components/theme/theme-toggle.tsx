"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const { open } = useSidebar();

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  const currentTheme = theme || "system";
  const Icon = currentTheme === "dark" ? Moon : Sun;
  const themeLabel = currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1);

  return (
    <button
      onClick={() => {
        const themes = ["light", "dark", "system"];
        const currentIndex = themes.indexOf(currentTheme);
        const nextTheme = themes[(currentIndex + 1) % themes.length];
        handleThemeChange(nextTheme);
      }}
      className={cn(
        "flex items-center justify-center md:justify-start gap-3 h-10 px-1.5 rounded-md transition-colors hover:bg-accent group w-full min-w-0"
      )}
    >
      <div className="shrink-0 w-6 h-6 flex items-center justify-center">
        <Icon className="h-5 w-5" />
      </div>
      <span
        className="hidden md:inline text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0 }}
      >
        {themeLabel}
      </span>
    </button>
  );
}
