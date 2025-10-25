"use client";

import { useState } from "react";
import type { Post, PostStatus } from "@/types/post";
import type { Platform } from "@/config/platforms";
import { PLATFORMS_CONFIG } from "@/config/platforms";
import { PageHeader } from "@/components/layout/page-header";
import { SearchInput } from "@/components/ui/search-input";
import { StatusFilterBar } from "@/components/ui/status-filter-bar";
import { SocialMediaCard } from "@/components/main/social-media-card";
import { usePostFiltering } from "@/hooks/use-post-filtering";

interface PlatformPageTemplateProps {
  platform: Platform;
  posts: Post[];
  onNewPost: () => void;
  onEdit: (post: Post) => void;
  onDelete: (postId: string) => void;
  onSchedule?: (post: Post) => void;
  onClone?: (postId: string) => void;
}

export function PlatformPageTemplate({
  platform,
  posts,
  onNewPost,
  onEdit,
  onDelete,
  onSchedule,
  onClone,
}: PlatformPageTemplateProps) {
  const config = PLATFORMS_CONFIG[platform];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<PostStatus | "all">(
    "all"
  );

  const { filteredPosts, isEmpty } = usePostFiltering({
    posts,
    searchQuery,
    selectedStatus,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title={config.label}
        description={config.pageDescription}
        onNewClick={onNewPost}
        newButtonLabel={config.buttonText.new}
      >
        <div className="space-y-4">
          <SearchInput
            placeholder={config.placeholderText}
            value={searchQuery}
            onChange={setSearchQuery}
          />
          <StatusFilterBar
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
          />
        </div>
      </PageHeader>

      {isEmpty ? (
        <div className="flex h-64 items-center justify-center rounded-lg border border-dashed">
          <div className="text-center">
            <p className="text-muted-foreground">
              {searchQuery || selectedStatus !== "all"
                ? "Nenhum post encontrado"
                : "Nenhum post criado ainda"}
            </p>
            {!searchQuery && selectedStatus === "all" && onNewPost && (
              <button
                onClick={onNewPost}
                className="mt-2 text-sm text-primary hover:underline"
              >
                Criar primeiro post
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredPosts.map((post) => (
            <SocialMediaCard
              key={post.id}
              id={post.id}
              imageUrl={post.imageUrls[0]}
              imageUrls={post.imageUrls}
              caption={post.caption}
              likes={post.likes}
              comments={post.comments}
              status={post.status}
              scheduledDate={post.scheduledDate ? new Date(post.scheduledDate) : undefined}
              onEdit={() => onEdit(post)}
              onDelete={() => onDelete(post.id)}
              onSchedule={() => onSchedule?.(post)}
              onClone={() => onClone?.(post.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
