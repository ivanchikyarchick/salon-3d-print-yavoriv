type TelegramResponse = {
  ok?: boolean;
  description?: string;
};

async function telegramRequest(
  token: string,
  method: "sendMessage" | "sendDocument",
  body: BodyInit,
  headers?: HeadersInit,
) {
  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers,
    body,
    signal: AbortSignal.timeout(15_000),
  });
  const payload = (await response.json().catch(() => null)) as TelegramResponse | null;

  if (!response.ok || !payload?.ok) {
    throw new Error(payload?.description || "Telegram API request failed");
  }
}

export async function sendTelegramMessage(
  token: string,
  chatId: string,
  text: string,
  parseMode?: "HTML",
) {
  await telegramRequest(
    token,
    "sendMessage",
    JSON.stringify({
      chat_id: chatId,
      text,
      ...(parseMode ? { parse_mode: parseMode } : {}),
      disable_web_page_preview: true,
    }),
    { "Content-Type": "application/json" },
  );
}

export async function sendTelegramDocument(
  token: string,
  chatId: string,
  file: File,
  caption: string,
) {
  const telegramForm = new FormData();
  telegramForm.set("chat_id", chatId);
  telegramForm.set("caption", caption);
  telegramForm.set("document", file, file.name);
  await telegramRequest(token, "sendDocument", telegramForm);
}
