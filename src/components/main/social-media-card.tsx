"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Calendar, Edit, Trash2 } from "lucide-react";
import Image from "next/image";

interface SocialMediaCardProps {
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  scheduledDate?: Date;
}

export function SocialMediaCard({
  imageUrl,
  caption,
  likes,
  comments,
  scheduledDate,
}: SocialMediaCardProps) {
  const formatScheduledDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num.toString();
  };

  return (
    <Card className="group flex h-full flex-col overflow-hidden p-0 transition-colors hover:border-primary gap-0">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt="Prévia da postagem"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {scheduledDate && (
          <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-lg backdrop-blur-sm">
            <Calendar className="h-3.5 w-3.5" />
            Agendado
          </div>
        )}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-background/30 px-3 py-1.5 text-xs font-medium backdrop-blur-lg group-hover:bg-primary/30 group-hover:text-white transition-colors">
          <div className="flex items-center gap-1.5">
            <Heart className="h-3.5 w-3.5" />
            <span>{formatNumber(likes)}</span>
          </div>
          <div className="flex items-center gap-1.5 pl-2 border-l border-foreground/20">
            <MessageCircle className="h-3.5 w-3.5" />
            <span>{formatNumber(comments)}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col py-4 px-6">
        <div className="h-[60px] mb-3 overflow-hidden">
          <p
            className="text-sm overflow-hidden text-ellipsis"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              lineHeight: "20px",
            }}
          >
            {caption}
          </p>
        </div>

        <div className="h-8 mb-3 flex items-center justify-end">
          {scheduledDate && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="font-semibold">Agendado:</span>
              <span>{formatScheduledDate(scheduledDate)}</span>
            </div>
          )}
        </div>

        <div className="mt-auto flex items-center justify-end gap-2 pt-3 border-t">
          {!scheduledDate ? (
            <Button className="w-36">
              <Calendar className="h-4 w-4" />
              Agendar
            </Button>
          ) : (
            <Button className="w-36">
              <Calendar className="h-4 w-4" />
              Reagendar
            </Button>
          )}
          <Button className="w-36" variant='outline'>
            <Edit className="h-4 w-4" />
            Editar
          </Button>
          <Button variant="destructive" className="w-20">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
