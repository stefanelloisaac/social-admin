"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState, createContext, useContext } from "react";
import { Menu } from "lucide-react";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const Sidebar = ({
  children,
  open,
  setOpen,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [openState, setOpenState] = useState(false);

  const isOpen = open !== undefined ? open : openState;
  const setIsOpen = setOpen !== undefined ? setOpen : setOpenState;

  return (
    <SidebarContext.Provider value={{ open: isOpen, setOpen: setIsOpen }}>
      <DesktopSidebar>{children}</DesktopSidebar>
      <MobileSidebar>{children}</MobileSidebar>
    </SidebarContext.Provider>
  );
};

export const SidebarBody = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div className={cn("flex flex-col h-full w-full", className)} {...props}>
      {children}
    </div>
  );
};

export const DesktopSidebar = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { open, setOpen } = useSidebar();

  return (
    <div
      className={cn(
        "hidden md:flex md:flex-col h-screen bg-background border-r border-border transition-all duration-300 ease-in-out shrink-0",
        open ? "w-72" : "w-16",
        className
      )}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
    </div>
  );
};

export const MobileSidebar = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { open, setOpen } = useSidebar();

  return (
    <>
      <div className="md:hidden flex items-center justify-between h-16 bg-background border-b border-border px-4">
        <button
          onClick={() => setOpen(!open)}
          className="p-2 hover:bg-accent rounded-md transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
          <div
            className={cn(
              "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-background border-r border-border z-50 overflow-y-auto md:hidden",
              className
            )}
          >
            {children}
          </div>
        </>
      )}
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
}: {
  link: Links;
  className?: string;
}) => {
  const { open } = useSidebar();

  return (
    <Link
      href={link.href}
      className={cn(
        "border flex items-center justify-center md:justify-start gap-3 h-10 px-1.5 rounded-md transition-colors hover:bg-accent group w-full min-w-0",
        className
      )}
    >
      <div className="shrink-0 w-6 h-6 flex items-center justify-center">
        {link.icon}
      </div>
      <span
        className="hidden md:inline text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0 }}
      >
        {link.label}
      </span>
    </Link>
  );
};
