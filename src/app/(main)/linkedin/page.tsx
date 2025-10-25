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

export default function LinkedInPage() {
  usePageMetadata({
    title: "LinkedIn",
    description: "Gerencie e agende seus posts do LinkedIn",
  });

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const postManager = usePostManager("linkedin", setPosts);
  const config = PLATFORMS_CONFIG.linkedin;

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const linkedinPosts = await getPosts("linkedin");
        setPosts(linkedinPosts);
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
        <Loader fullscreen text="Carregando posts..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <main className="container mx-auto max-w-7xl">
        <PlatformPageTemplate
          platform="linkedin"
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
          platform="linkedin"
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
