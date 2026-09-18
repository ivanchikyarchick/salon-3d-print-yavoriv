import { env } from "cloudflare:workers";

function getBinding() {
  if (!env.DB) throw new Error("Telegram subscriber database is unavailable");
  return env.DB;
}

export async function listTelegramSubscriberIds() {
  const result = await getBinding()
    .prepare("SELECT chat_id FROM telegram_subscribers ORDER BY subscribed_at ASC")
    .all<{ chat_id: string }>();

  return result.results.map((row) => row.chat_id);
}

export async function subscribeTelegramChat(chatId: string, displayName: string) {
  await getBinding()
    .prepare(
      `INSERT INTO telegram_subscribers (chat_id, display_name, subscribed_at)
       VALUES (?, ?, ?)
       ON CONFLICT(chat_id) DO UPDATE SET
         display_name = excluded.display_name,
         subscribed_at = excluded.subscribed_at`,
    )
    .bind(chatId, displayName, Date.now())
    .run();
}

export async function unsubscribeTelegramChat(chatId: string) {
  await getBinding()
    .prepare("DELETE FROM telegram_subscribers WHERE chat_id = ?")
    .bind(chatId)
    .run();
}
