"use client";

import { useEffect, useState } from "react";
import { usePageMetadata } from "@/hooks/use-page-metadata";
import { AnalyticsDashboard } from "@/components/main/analytics-dashboard";
import { Loader } from "@/components/ui/loader";
import type { Post } from "@/types/post";

export default function DashboardPage() {
  usePageMetadata({
    title: "Dashboard",
    description: "Gerencie todas as suas redes sociais em um único lugar",
  });

  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fakePosts: Post[] = [
      {
        id: "1",
        imageUrls: ["https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400"],
        caption: "Belíssimo por do sol na praia! 🌅",
        likes: 1250,
        comments: 85,
        status: "published",
        platform: "instagram",
        createdAt: "2024-09-15T00:00:00Z",
        updatedAt: "2024-09-15T00:00:00Z",
        title: "Pôr do sol",
      },
      {
        id: "2",
        imageUrls: ["https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400"],
        caption: "Novo projeto saindo do forno 🔥",
        likes: 890,
        comments: 120,
        status: "published",
        platform: "instagram",
        createdAt: "2024-09-20T00:00:00Z",
        updatedAt: "2024-09-20T00:00:00Z",
        title: "Novo projeto",
      },
      {
        id: "3",
        imageUrls: ["https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400"],
        caption: "Dia perfeito no escritório",
        likes: 2100,
        comments: 250,
        status: "published",
        platform: "facebook",
        createdAt: "2024-09-10T00:00:00Z",
        updatedAt: "2024-09-10T00:00:00Z",
        title: "Dia no escritório",
      },
      {
        id: "4",
        imageUrls: ["https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400"],
        caption: "Check this out! 🎬",
        likes: 3450,
        comments: 520,
        status: "published",
        platform: "tiktok",
        createdAt: "2024-09-05T00:00:00Z",
        updatedAt: "2024-09-05T00:00:00Z",
        title: "Vídeo viral",
      },
      {
        id: "5",
        imageUrls: ["https://images.unsplash.com/photo-1552664730-d307ca884978?w=400"],
        caption: "Crescimento profissional em alta! 📈",
        likes: 1680,
        comments: 340,
        status: "published",
        platform: "linkedin",
        createdAt: "2024-09-18T00:00:00Z",
        updatedAt: "2024-09-18T00:00:00Z",
        title: "Crescimento profissional",
      },
      {
        id: "6",
        imageUrls: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"],
        caption: "Novo conteúdo chegando em breve",
        likes: 950,
        comments: 145,
        status: "published",
        platform: "instagram",
        createdAt: "2024-08-20T00:00:00Z",
        updatedAt: "2024-08-20T00:00:00Z",
        title: "Novo conteúdo",
      },
      {
        id: "7",
        imageUrls: ["https://images.unsplash.com/photo-1500595046891-9caadc3b5126?w=400"],
        caption: "Momento de reflexão e gratidão",
        likes: 1420,
        comments: 210,
        status: "published",
        platform: "facebook",
        createdAt: "2024-08-15T00:00:00Z",
        updatedAt: "2024-08-15T00:00:00Z",
        title: "Reflexão",
      },
      {
        id: "8",
        imageUrls: ["https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400"],
        caption: "Vibes de trabalho em equipe 🚀",
        likes: 2850,
        comments: 480,
        status: "published",
        platform: "tiktok",
        createdAt: "2024-08-10T00:00:00Z",
        updatedAt: "2024-08-10T00:00:00Z",
        title: "Trabalho em equipe",
      },
      {
        id: "9",
        imageUrls: ["https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400"],
        caption: "Transformação digital em ação",
        likes: 1790,
        comments: 295,
        status: "published",
        platform: "linkedin",
        createdAt: "2024-08-22T00:00:00Z",
        updatedAt: "2024-08-22T00:00:00Z",
        title: "Transformação digital",
      },
      {
        id: "10",
        imageUrls: ["https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?w=400"],
        caption: "Inspiração do dia! ✨",
        likes: 875,
        comments: 125,
        status: "published",
        platform: "instagram",
        createdAt: "2024-07-30T00:00:00Z",
        updatedAt: "2024-07-30T00:00:00Z",
        title: "Inspiração",
      },
      {
        id: "11",
        imageUrls: ["https://images.unsplash.com/photo-1552681528-1f494e779068?w=400"],
        caption: "Compartilhando conhecimento com a comunidade",
        likes: 1340,
        comments: 220,
        status: "published",
        platform: "facebook",
        createdAt: "2024-07-25T00:00:00Z",
        updatedAt: "2024-07-25T00:00:00Z",
        title: "Conhecimento",
      },
      {
        id: "12",
        imageUrls: ["https://images.unsplash.com/photo-1499949786920-6ceb67cd5d1d?w=400"],
        caption: "Tendência viral! 📱",
        likes: 4200,
        comments: 680,
        status: "published",
        platform: "tiktok",
        createdAt: "2024-07-20T00:00:00Z",
        updatedAt: "2024-07-20T00:00:00Z",
        title: "Viral",
      },
    ];

    setTimeout(() => {
      setAllPosts(fakePosts);
      setIsLoading(false);
    }, 300);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <Loader fullscreen text="Carregando dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-7xl">
        <AnalyticsDashboard posts={allPosts} />
      </div>
    </div>
  );
}
