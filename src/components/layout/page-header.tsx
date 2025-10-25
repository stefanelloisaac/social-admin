"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  onNewClick?: () => void;
  newButtonLabel?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  onNewClick,
  newButtonLabel = "Novo",
  children,
}: PageHeaderProps) {
  return (
    <div className="space-y-2 pb-4 border-b">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-0.5">
          <h1 className="text-xl font-bold">{title}</h1>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        {onNewClick && (
          <Button onClick={onNewClick} className="gap-2 whitespace-nowrap">
            <Plus className="h-4 w-4" />
            {newButtonLabel}
          </Button>
        )}
      </div>
      {children && <div className="pt-2">{children}</div>}
    </div>
  );
}
