"use client";

import { useEffect, useState } from "react";
import { usePageMetadata } from "@/hooks/use-page-metadata";
import { usePostManager } from "@/hooks/use-post-manager";
import { PLATFORMS_CONFIG } from "@/config/platforms";
import { PlatformPageTemplate } from "@/components/main/platform-page-template";
import { FormModal } from "@/components/main/form-modal";
import { DeleteConfirmDialog } from "@/components/ui/delete-confirm-dialog";
import { Loader } from "@/components/ui/loader";
import { getPosts } from "@/lib/db";
import type { Post } from "@/types/post";

export default function TiktokPage() {
  usePageMetadata({
    title: "TikTok",
    description: "Gerencie e agende seus vídeos do TikTok",
  });

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const postManager = usePostManager("tiktok", setPosts);
  const config = PLATFORMS_CONFIG.tiktok;

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const tiktokPosts = await getPosts("tiktok");
        setPosts(tiktokPosts);
      } catch (error) {
        console.error("Erro ao carregar posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-8 flex items-center justify-center">
        <Loader text="Carregando posts..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <main className="container mx-auto max-w-7xl">
        <PlatformPageTemplate
          platform="tiktok"
          posts={posts}
          onNewPost={postManager.openCreateForm}
          onEdit={(post) => postManager.openEditForm(post)}
          onDelete={postManager.deletePost}
          onSchedule={(post) => postManager.openEditForm(post)}
          onClone={postManager.clonePost}
        />

        <FormModal
          open={postManager.formState.open}
          mode={postManager.formState.mode}
          post={postManager.formState.post}
          onClose={postManager.closeForm}
          onSubmit={postManager.handleFormSubmit}
          platformLabel={config.label}
        />

        <DeleteConfirmDialog
          open={postManager.deleteState.open}
          onOpenChange={postManager.closeDeleteConfirm}
          onConfirm={() => postManager.confirmDelete(postManager.deleteState.postId!)}
          title="Deletar Post"
          description="Tem certeza que deseja deletar este post? Esta ação não pode ser desfeita."
          isLoading={postManager.deleteState.isLoading}
        />
      </main>
    </div>
  );
}
