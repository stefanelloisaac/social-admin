"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useAuth } from "@/hooks/use-auth";
import { Loader } from "@/components/ui/loader";
import { Toaster } from "@/components/ui/sonner";
import DotGrid from "@/components/layout/background";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  const isLightMode = resolvedTheme === "light";

  const dotGridProps = {
    dotSize: 4,
    gap: 20,
    baseColor: isLightMode ? "#d4d4d8" : "#3a3a3a",
    activeColor: "#7c3aed",
    proximity: 200,
    speedTrigger: 0,
    shockRadius: 200,
    shockStrength: 3,
    maxSpeed: 3000,
    resistance: 800,
    returnDuration: 3,
  };

  if (isLoading) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden bg-background">
        <div className="absolute inset-0">
          <DotGrid {...dotGridProps} />
        </div>
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <Loader text="Carregando..." />
        </div>
        <Toaster position="top-center" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <div className="absolute inset-0">
        <DotGrid {...dotGridProps} />
      </div>
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        {children}
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
