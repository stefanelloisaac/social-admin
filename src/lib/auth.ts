import Database from "better-sqlite3";
import { betterAuth } from "better-auth";

const db = new Database("./auth.db");
db.pragma("journal_mode = WAL");

export const auth = betterAuth({
  database: db,
  emailAndPassword: { enabled: true },
  appName: "Social Admin",
});
