import Database from "better-sqlite3";
import { hashPassword } from "better-auth/crypto";
import { randomUUID } from "crypto";

const db = new Database("./auth.db");

async function createAdmin() {
  try {
    const email = "admin@admin.com";
    const password = "admin123";

    // Check if exists
    const existing = db.prepare("SELECT id FROM user WHERE email = ?").get(email);
    if (existing) {
      console.log("✅ Admin user already exists");
      return;
    }

    // Hash password
    const hashed = await hashPassword(password);

    const userId = randomUUID();
    const accountId = randomUUID();

    // 1. Insert into user table
    db.prepare(
      `INSERT INTO user (id, name, email, emailVerified, image, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))`
    ).run(userId, "Admin", email, 1, null);

    // 2. Insert into account table with password
    db.prepare(
      `INSERT INTO account (id, accountId, providerId, userId, password, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))`
    ).run(accountId, accountId, "credential", userId, hashed);

    console.log("✅ Admin user created: admin@admin.com / admin123");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    db.close();
  }
}

createAdmin();
