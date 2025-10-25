import Database from "better-sqlite3";

const db = new Database("./auth.db");
db.pragma("journal_mode = WAL");

// Initialize posts table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    platform TEXT NOT NULL,
    title TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    caption TEXT NOT NULL,
    likes INTEGER NOT NULL DEFAULT 0,
    comments INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'draft',
    scheduledDate TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    UNIQUE(platform, id)
  );

  CREATE INDEX IF NOT EXISTS idx_posts_platform ON posts(platform);
  CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
  CREATE INDEX IF NOT EXISTS idx_posts_platform_status ON posts(platform, status);
`);

export function getDatabase() {
  return db;
}
