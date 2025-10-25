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
    <div className="space-y-4 pb-4 border-b">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
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
