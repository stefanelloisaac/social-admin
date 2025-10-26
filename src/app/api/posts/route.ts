import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/db-init";
import type { Platform } from "@/config/platforms";
import { Post } from "@/types/post";

function parsePost(row: any): Post {
  return {
    ...row,
    imageUrls:
      typeof row.imageUrls === "string"
        ? JSON.parse(row.imageUrls)
        : row.imageUrls,
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const platform = searchParams.get("platform") as Platform;
  const id = searchParams.get("id");

  try {
    const db = getDatabase();

    if (id) {
      const stmt = db.prepare(
        "SELECT * FROM posts WHERE platform = ? AND id = ?"
      );
      const post = stmt.get(platform, id);
      return NextResponse.json(post ? parsePost(post) : null);
    }

    const stmt = db.prepare(
      "SELECT * FROM posts WHERE platform = ? ORDER BY createdAt DESC"
    );
    const posts = stmt.all(platform);
    return NextResponse.json(posts.map(parsePost));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { platform, title, imageUrls, caption, status, scheduledDate } = body;

    const db = getDatabase();
    const id = Date.now().toString();
    const now = new Date().toISOString();

    const stmt = db.prepare(`
      INSERT INTO posts (
        id, platform, title, imageUrls, caption, status,
        scheduledDate, likes, comments, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id,
      platform,
      title,
      JSON.stringify(imageUrls || []),
      caption,
      status,
      scheduledDate || null,
      0,
      0,
      now,
      now
    );

    return NextResponse.json({
      id,
      platform,
      title,
      imageUrls: imageUrls || [],
      caption,
      status,
      scheduledDate,
      likes: 0,
      comments: 0,
      createdAt: now,
      updatedAt: now,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { platform, id, title, imageUrls, caption, status, scheduledDate } =
      body;

    const db = getDatabase();
    const now = new Date().toISOString();

    const stmt = db.prepare(`
      UPDATE posts SET
        title = ?,
        imageUrls = ?,
        caption = ?,
        status = ?,
        scheduledDate = ?,
        updatedAt = ?
      WHERE platform = ? AND id = ?
    `);

    stmt.run(
      title,
      JSON.stringify(imageUrls || []),
      caption,
      status,
      scheduledDate || null,
      now,
      platform,
      id
    );

    const getStmt = db.prepare(
      "SELECT * FROM posts WHERE platform = ? AND id = ?"
    );
    const updated = getStmt.get(platform, id);

    return NextResponse.json(updated ? parsePost(updated) : null);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get("platform") as Platform;
    const id = searchParams.get("id") as string;

    const db = getDatabase();
    const stmt = db.prepare("DELETE FROM posts WHERE platform = ? AND id = ?");
    const result = stmt.run(platform, id);

    return NextResponse.json({ success: (result.changes || 0) > 0 });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
