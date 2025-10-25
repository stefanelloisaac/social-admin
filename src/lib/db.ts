import type { Post, CreatePostInput, UpdatePostInput } from "@/types/post";
import type { Platform } from "@/config/platforms";

const API_BASE = "/api/posts";

export async function getPosts(platform: Platform): Promise<Post[]> {
  try {
    const response = await fetch(`${API_BASE}?platform=${platform}`);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPost(
  platform: Platform,
  id: string
): Promise<Post | undefined> {
  try {
    const response = await fetch(`${API_BASE}?platform=${platform}&id=${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }
    const post = await response.json();
    return post || undefined;
  } catch (error) {
    console.error("Error fetching post:", error);
    return undefined;
  }
}

export async function createPost(
  platform: Platform,
  input: CreatePostInput
): Promise<Post> {
  try {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        platform,
        ...input,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    const post = await response.json();
    return post;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

export async function updatePost(
  platform: Platform,
  id: string,
  input: UpdatePostInput
): Promise<Post | undefined> {
  try {
    const response = await fetch(API_BASE, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        platform,
        id,
        ...input,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update post");
    }

    const post = await response.json();
    return post;
  } catch (error) {
    console.error("Error updating post:", error);
    return undefined;
  }
}

export async function deletePost(
  platform: Platform,
  id: string
): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}?platform=${platform}&id=${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete post");
    }

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error("Error deleting post:", error);
    return false;
  }
}

export async function clonePost(
  platform: Platform,
  id: string
): Promise<Post | undefined> {
  try {
    const original = await getPost(platform, id);
    if (!original) return undefined;

    const cloned: CreatePostInput = {
      title: `${original.title} (Cópia)`,
      imageUrls: original.imageUrls,
      caption: original.caption,
      status: "draft",
    };

    return createPost(platform, cloned);
  } catch (error) {
    console.error("Error cloning post:", error);
    return undefined;
  }
}
