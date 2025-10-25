export type PostStatus = "published" | "scheduled" | "draft";

export interface Post {
  id: string;
  platform?: string;
  title: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  scheduledDate?: string;
  status: PostStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostInput {
  title: string;
  imageUrl: string;
  caption: string;
  status: PostStatus;
  scheduledDate?: string;
}

export interface UpdatePostInput {
  title?: string;
  imageUrl?: string;
  caption?: string;
  status?: PostStatus;
  scheduledDate?: string;
}
