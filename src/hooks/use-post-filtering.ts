import { useMemo } from "react";
import type { Post, PostStatus } from "@/types/post";

interface UsePostFilteringOptions {
  posts: Post[];
  searchQuery: string;
  selectedStatus: PostStatus | "all";
}

export function usePostFiltering({
  posts,
  searchQuery,
  selectedStatus,
}: UsePostFilteringOptions) {
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.caption.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === "all" || post.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [posts, searchQuery, selectedStatus]);

  return {
    filteredPosts,
    count: filteredPosts.length,
    isEmpty: filteredPosts.length === 0,
  };
}
