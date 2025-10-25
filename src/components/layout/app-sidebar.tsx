"use client";

import { Sidebar, SidebarBody, SidebarLink, useSidebar } from "@/components/ui/sidebar";
import {
  Instagram,
  Facebook,
  Music,
  LogOut,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function AppSidebar() {
  const links = [
    {
      label: "Instagram",
      href: "/instagram",
      icon: <Instagram className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />,
    },
    {
      label: "Facebook",
      href: "/facebook",
      icon: <Facebook className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />,
    },
    {
      label: "TikTok",
      href: "/tiktok",
      icon: <Music className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />,
    },
  ];

  return (
    <Sidebar>
      <SidebarBody className="px-3 py-4">
        <div className="flex flex-col h-full">
          {/* Logo Section - Fixed Height */}
          <div className="h-16 flex items-center justify-center md:justify-start">
            <Logo />
          </div>

          {/* Navigation Section - Flexible */}
          <nav className="flex-1 flex flex-col gap-2 overflow-y-auto min-h-0">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </nav>

          {/* Bottom Section - Fixed Height */}
          <div className="flex flex-col gap-3 shrink-0 border-t border-border pt-4">
            <ThemeToggle />
            <SidebarLink
              link={{
                label: "Sair",
                href: "#",
                icon: <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />,
              }}
            />
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  );
}

export const Logo = () => {
  const { open } = useSidebarContext();

  return (
    <div className="flex items-center justify-center md:justify-start gap-3 w-full min-w-0">
      <div className="h-10 w-10 bg-linear-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shrink-0 shadow-md">
        <span className="text-white text-sm font-bold">SA</span>
      </div>
      <div className="hidden md:flex flex-col gap-0.5 min-w-0 transition-opacity duration-300" style={{ opacity: open ? 1 : 0 }}>
        <span className="text-sm font-bold text-foreground truncate">Social Admin</span>
        <span className="text-xs text-muted-foreground truncate">Dashboard</span>
      </div>
    </div>
  );
};

const useSidebarContext = () => {
  const { open } = useSidebar();
  return { open };
};
