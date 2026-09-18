import { NextResponse } from "next/server";
import {
  subscribeTelegramChat,
  unsubscribeTelegramChat,
} from "@/db/telegram-subscribers";
import { sendTelegramMessage } from "@/lib/telegram";

type TelegramUpdate = {
  message?: {
    text?: string;
    chat?: {
      id?: number;
      type?: string;
      first_name?: string;
      last_name?: string;
      username?: string;
    };
  };
};

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const password = process.env.TELEGRAM_SUBSCRIBE_PASSWORD;
  const webhookSecret = process.env.TELEGRAM_WEBHOOK_SECRET;

  if (!token || !password || !webhookSecret) {
    return NextResponse.json({ error: "Bot is not configured" }, { status: 503 });
  }

  if (
    request.headers.get("x-telegram-bot-api-secret-token") !== webhookSecret
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let update: TelegramUpdate;
  try {
    update = await request.json();
  } catch {
    return NextResponse.json({ ok: true });
  }

  const message = update.message;
  const chatId = message?.chat?.id;
  const chatType = message?.chat?.type;
  const text = message?.text?.trim();
  if (!chatId || !text) return NextResponse.json({ ok: true });

  const targetChatId = String(chatId);

  try {
    if (chatType !== "private") {
      await sendTelegramMessage(
        token,
        targetChatId,
        "Підключення сповіщень доступне лише в приватному чаті з ботом.",
      );
      return NextResponse.json({ ok: true });
    }

    if (text === "/start") {
      await sendTelegramMessage(
        token,
        targetChatId,
        "Введіть пароль доступу, щоб отримувати нові замовлення із сайту.",
      );
      return NextResponse.json({ ok: true });
    }

    if (text === "/stop") {
      await unsubscribeTelegramChat(targetChatId);
      await sendTelegramMessage(
        token,
        targetChatId,
        "Ви більше не отримуватимете нові замовлення. Щоб підключитися знову, надішліть пароль.",
      );
      return NextResponse.json({ ok: true });
    }

    if (text === password) {
      const displayName = [
        message.chat?.first_name,
        message.chat?.last_name,
        message.chat?.username ? `@${message.chat.username}` : null,
      ]
        .filter(Boolean)
        .join(" ")
        .slice(0, 180);

      await subscribeTelegramChat(targetChatId, displayName || "Telegram user");
      await sendTelegramMessage(
        token,
        targetChatId,
        "✅ Готово. Ви підключені й отримуватимете всі нові замовлення із сайту. Для відписки надішліть /stop.",
      );
      return NextResponse.json({ ok: true });
    }

    await sendTelegramMessage(
      token,
      targetChatId,
      "Невірний пароль. Спробуйте ще раз або надішліть /stop для відписки.",
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(
      "Telegram webhook failed",
      error instanceof Error ? error.message : error,
    );
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
