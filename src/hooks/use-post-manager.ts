import { useState, useCallback } from "react";
import type { Post, CreatePostInput, UpdatePostInput } from "@/types/post";
import type { Platform } from "@/config/platforms";
import * as db from "@/lib/db";

interface FormState {
  open: boolean;
  mode: "create" | "edit" | "view";
  post?: Post;
}

interface DeleteState {
  open: boolean;
  postId?: string;
  isLoading: boolean;
}

export function usePostManager(platform: Platform, onPostsChange: (posts: Post[]) => void) {
  const [formState, setFormState] = useState<FormState>({
    open: false,
    mode: "create",
  });
  const [deleteState, setDeleteState] = useState<DeleteState>({
    open: false,
    isLoading: false,
  });

  const openCreateForm = useCallback(() => {
    setFormState({ open: true, mode: "create" });
  }, []);

  const openEditForm = useCallback((post: Post) => {
    setFormState({ open: true, mode: "edit", post });
  }, []);

  const openViewForm = useCallback((post: Post) => {
    setFormState({ open: true, mode: "view", post });
  }, []);

  const closeForm = useCallback(() => {
    setFormState({ open: false, mode: "create" });
  }, []);

  const createPost = useCallback(
    async (input: CreatePostInput) => {
      const newPost = await db.createPost(platform, input);
      const posts = await db.getPosts(platform);
      onPostsChange(posts);
    },
    [platform, onPostsChange]
  );

  const updatePost = useCallback(
    async (postId: string, input: UpdatePostInput) => {
      await db.updatePost(platform, postId, input);
      const posts = await db.getPosts(platform);
      onPostsChange(posts);
    },
    [platform, onPostsChange]
  );

  const openDeleteConfirm = useCallback((postId: string) => {
    setDeleteState({ open: true, postId, isLoading: false });
  }, []);

  const closeDeleteConfirm = useCallback(() => {
    setDeleteState({ open: false, postId: undefined, isLoading: false });
  }, []);

  const confirmDelete = useCallback(
    async (postId: string) => {
      setDeleteState((prev) => ({ ...prev, isLoading: true }));
      try {
        await db.deletePost(platform, postId);
        const posts = await db.getPosts(platform);
        onPostsChange(posts);
        setDeleteState({ open: false, isLoading: false });
      } catch (error) {
        console.error("Erro ao deletar post:", error);
        setDeleteState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [platform, onPostsChange]
  );

  const deletePost = useCallback(
    async (postId: string) => {
      openDeleteConfirm(postId);
    },
    [openDeleteConfirm]
  );

  const clonePost = useCallback(
    async (postId: string) => {
      await db.clonePost(platform, postId);
      const posts = await db.getPosts(platform);
      onPostsChange(posts);
    },
    [platform, onPostsChange]
  );

  const handleFormSubmit = useCallback(
    async (data: CreatePostInput | UpdatePostInput) => {
      if (formState.mode === "create") {
        await createPost(data as CreatePostInput);
      } else if (formState.mode === "edit" && formState.post) {
        await updatePost(formState.post.id, data as UpdatePostInput);
      }
    },
    [formState, createPost, updatePost]
  );

  return {
    formState,
    deleteState,
    openCreateForm,
    openEditForm,
    openViewForm,
    closeForm,
    openDeleteConfirm,
    closeDeleteConfirm,
    confirmDelete,
    createPost,
    updatePost,
    deletePost,
    clonePost,
    handleFormSubmit,
  };
}
