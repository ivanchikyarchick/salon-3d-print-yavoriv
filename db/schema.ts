import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const telegramSubscribers = sqliteTable("telegram_subscribers", {
  chatId: text("chat_id").primaryKey(),
  displayName: text("display_name"),
  subscribedAt: integer("subscribed_at", { mode: "timestamp_ms" }).notNull(),
});
