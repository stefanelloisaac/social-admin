"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";
import { useEffect, useState, useEffectEvent } from "react";

const buttonClasses =
  "cursor-pointer bg-secondary border border-secondary flex items-center justify-center md:justify-start gap-3 h-10 px-1.5 rounded-md transition-colors hover:bg-secondary/80 group w-full min-w-0";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const { open } = useSidebar();
  const [mounted, setMounted] = useState(false);

  const handleMount = useEffectEvent(() => {
    setMounted(true);
  });

  useEffect(() => {
    handleMount();
  }, []);

  if (!mounted) {
    return (
      <button
        className={cn(buttonClasses)}
        disabled
        aria-label="Carregando alternador de tema"
      >
        <div className="shrink-0 w-6 h-6 flex items-center justify-center">
          <Sun className="h-5 w-5" />
        </div>
        <span
          className="hidden md:inline text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis transition-opacity duration-300"
          style={{ opacity: open ? 1 : 0 }}
        >
          Claro
        </span>
      </button>
    );
  }

  const currentTheme = theme || "light";
  const Icon = currentTheme === "dark" ? Moon : Sun;
  const themeLabels: Record<string, string> = {
    light: "Claro",
    dark: "Escuro",
  };
  const themeLabel = themeLabels[currentTheme] || "Claro";

  const handleToggle = () => {
    const nextTheme = currentTheme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  return (
    <button
      onClick={handleToggle}
      className={cn(buttonClasses)}
      title={`Alternar para ${currentTheme === "light" ? "escuro" : "claro"}`}
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
