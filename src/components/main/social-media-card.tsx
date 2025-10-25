"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Calendar, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { formatNumber, formatScheduledDate } from "@/lib/formatters";
import { ImageCollagePreview } from "@/components/main/image-collage-preview";

interface SocialMediaCardProps {
  id: string;
  imageUrl: string;
  imageUrls?: string[];
  caption: string;
  likes: number;
  comments: number;
  scheduledDate?: Date;
  status: "published" | "scheduled" | "draft";
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onClone?: (id: string) => void;
  onSchedule?: (id: string) => void;
}

export function SocialMediaCard({
  id,
  imageUrl,
  imageUrls,
  caption,
  likes,
  comments,
  scheduledDate,
  status,
  onEdit,
  onDelete,
  onClone,
  onSchedule,
}: SocialMediaCardProps) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden p-0 transition-colors hover:border-primary">
      <div className="relative aspect-square overflow-hidden bg-muted group">
        {imageUrls && imageUrls.length > 0 ? (
          <div className="w-full h-full">
            <ImageCollagePreview imageUrls={imageUrls} />
          </div>
        ) : (
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt="Prévia da postagem"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
        {scheduledDate && (
          <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground shadow-lg backdrop-blur-sm">
            <Calendar className="h-3 w-3" />
            <span className="hidden sm:inline">Agendado</span>
          </div>
        )}
        <div className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full bg-background/30 px-2 py-1 text-xs font-medium backdrop-blur-lg group-hover:bg-primary/30 group-hover:text-white transition-colors">
          <div className="flex items-center gap-1">
            <Heart className="h-3 w-3" />
            <span className="text-xs">{formatNumber(likes)}</span>
          </div>
          <div className="flex items-center gap-1 pl-1.5 border-l border-foreground/20">
            <MessageCircle className="h-3 w-3" />
            <span className="text-xs">{formatNumber(comments)}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col py-3 px-4">
        <div className="h-[45px] mb-2 overflow-hidden">
          <p
            className="text-xs overflow-hidden text-ellipsis"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              lineHeight: "16px",
            }}
          >
            {caption}
          </p>
        </div>

        <div className="h-5 mb-2 flex items-center justify-end">
          {scheduledDate && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="font-semibold">Ag:</span>
              <span className="text-[10px]">{formatScheduledDate(scheduledDate)}</span>
            </div>
          )}
        </div>

        <div className="mt-auto flex items-center justify-end gap-1 pt-2 border-t">
          {!scheduledDate ? (
            <Button
              size="sm"
              className="h-8 px-2 text-xs gap-1 flex-1"
              onClick={() => onSchedule?.(id)}
            >
              <Calendar className="h-3 w-3" />
              <span className="hidden sm:inline">Agendar</span>
            </Button>
          ) : (
            <Button
              size="sm"
              className="h-8 px-2 text-xs gap-1 flex-1"
              onClick={() => onSchedule?.(id)}
            >
              <Calendar className="h-3 w-3" />
              <span className="hidden sm:inline">Reagendar</span>
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            className="h-8 px-2 text-xs gap-1"
            onClick={() => onEdit?.(id)}
          >
            <Edit className="h-3 w-3" />
            <span className="hidden sm:inline">Editar</span>
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="h-8 w-8 p-0"
            onClick={() => onDelete?.(id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
