import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { ReactNode } from "react";

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  className?: string;
  trend?: {
    value: number;
    direction: "up" | "down";
  };
}

export function AnalyticsCard({
  title,
  value,
  subtitle,
  icon,
  className,
  trend,
}: AnalyticsCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-6 space-y-3",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-2">{subtitle}</p>
          )}
        </div>
        {icon && <div className="text-muted-foreground ml-2 mt-1">{icon}</div>}
      </div>
      {trend && (
        <div className="flex items-center gap-2 pt-2 border-t border-border/50">
          <div
            className={cn(
              "flex items-center gap-1 text-sm font-semibold",
              trend.direction === "up"
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            )}
          >
            {trend.direction === "up" ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {Math.abs(trend.value)}%
          </div>
          <span className="text-xs text-muted-foreground">vs último período</span>
        </div>
      )}
    </div>
  );
}
