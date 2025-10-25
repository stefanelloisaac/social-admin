"use client";

import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const buttonClasses =
  "cursor-pointer bg-secondary border border-secondary flex items-center justify-center md:justify-start gap-3 h-10 px-1.5 rounded-md transition-colors hover:bg-secondary/80 group w-full min-w-0";

export function LogoutButton() {
  const { open } = useSidebar();
  const { signOut } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await signOut();
      router.push("/auth/sign-in");
    } catch (err) {
      console.error("Logout failed:", err);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={cn(buttonClasses, isLoading && "opacity-50 cursor-not-allowed")}
      title="Sair da conta"
    >
      <div className="shrink-0 w-6 h-6 flex items-center justify-center">
        <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5" />
      </div>
      <span
        className="hidden md:inline text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0 }}
      >
        {isLoading ? "Saindo..." : "Sair"}
      </span>
    </button>
  );
}
