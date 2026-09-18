import { Pool } from "pg";

const globalForPostgres = globalThis as typeof globalThis & {
  telegramSubscriberPool?: Pool;
  telegramSubscriberSchema?: Promise<void>;
};

function getPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is unavailable");
  }

  if (!globalForPostgres.telegramSubscriberPool) {
    globalForPostgres.telegramSubscriberPool = new Pool({
      connectionString,
      max: 5,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
    });
  }

  return globalForPostgres.telegramSubscriberPool;
}

async function ensureSchema() {
  if (!globalForPostgres.telegramSubscriberSchema) {
    globalForPostgres.telegramSubscriberSchema = getPool()
      .query(`
        CREATE TABLE IF NOT EXISTS telegram_subscribers (
          chat_id TEXT PRIMARY KEY,
          display_name TEXT,
          subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `)
      .then(() => undefined);
  }

  return globalForPostgres.telegramSubscriberSchema;
}

export async function listTelegramSubscriberIds() {
  await ensureSchema();
  const result = await getPool().query<{ chat_id: string }>(
    "SELECT chat_id FROM telegram_subscribers ORDER BY subscribed_at ASC",
  );

  return result.rows.map((row) => row.chat_id);
}

export async function subscribeTelegramChat(chatId: string, displayName: string) {
  await ensureSchema();
  await getPool().query(
    `INSERT INTO telegram_subscribers (chat_id, display_name, subscribed_at)
     VALUES ($1, $2, NOW())
     ON CONFLICT(chat_id) DO UPDATE SET
       display_name = EXCLUDED.display_name,
       subscribed_at = EXCLUDED.subscribed_at`,
    [chatId, displayName],
  );
}

export async function unsubscribeTelegramChat(chatId: string) {
  await ensureSchema();
  await getPool().query(
    "DELETE FROM telegram_subscribers WHERE chat_id = $1",
    [chatId],
  );
}
