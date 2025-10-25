"use client";

import { Button } from "@/components/ui/button";
import type { PostStatus } from "@/types/post";

interface StatusFilterBarProps {
  selectedStatus: PostStatus | "all";
  onStatusChange: (status: PostStatus | "all") => void;
  className?: string;
}

export function StatusFilterBar({
  selectedStatus,
  onStatusChange,
  className = "",
}: StatusFilterBarProps) {
  const statuses: Array<{ value: PostStatus | "all"; label: string }> = [
    { value: "all", label: "Todos" },
    { value: "published", label: "Publicados" },
    { value: "scheduled", label: "Agendados" },
    { value: "draft", label: "Rascunhos" },
  ];

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {statuses.map(({ value, label }) => (
        <Button
          key={value}
          variant={selectedStatus === value ? "default" : "outline"}
          size="sm"
          onClick={() => onStatusChange(value)}
          className="text-xs"
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
