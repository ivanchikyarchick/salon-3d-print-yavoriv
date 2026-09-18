import { NextResponse } from "next/server";

const MAX_FILE_SIZE = 20 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set([
  "stl",
  "step",
  "stp",
  "obj",
  "3mf",
  "png",
  "jpg",
  "jpeg",
]);

function getText(formData: FormData, key: string, maxLength: number) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

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
  const payload = (await response.json().catch(() => null)) as
    | { ok?: boolean; description?: string }
    | null;

  if (!response.ok || !payload?.ok) {
    throw new Error(payload?.description || "Telegram API request failed");
  }
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json(
      { error: "Приймання заявок тимчасово налаштовується. Спробуйте трохи пізніше." },
      { status: 503 },
    );
  }

  const requestOrigin = request.headers.get("origin");
  if (requestOrigin && requestOrigin !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Запит відхилено." }, { status: 403 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Не вдалося прочитати заявку." }, { status: 400 });
  }

  if (getText(formData, "website", 200)) {
    return NextResponse.json({ ok: true });
  }

  const task = getText(formData, "task", 180) || "Консультація";
  const material = getText(formData, "material", 100) || "Не вказано";
  const contact = getText(formData, "contact", 120);
  const details = getText(formData, "details", 2500) || "Без коментаря";
  const fileValue = formData.get("file");
  const file = fileValue instanceof File && fileValue.size > 0 ? fileValue : null;

  if (contact.length < 3) {
    return NextResponse.json(
      { error: "Вкажіть номер телефону або Telegram для зв'язку." },
      { status: 400 },
    );
  }

  if (file) {
    const extension = file.name.split(".").pop()?.toLowerCase() || "";
    if (!ALLOWED_EXTENSIONS.has(extension)) {
      return NextResponse.json(
        { error: "Дозволені файли STL, STEP, STP, OBJ, 3MF, PNG, JPG або JPEG." },
        { status: 400 },
      );
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Файл завеликий. Максимальний розмір — 20 МБ." },
        { status: 413 },
      );
    }
  }

  const orderId = crypto.randomUUID().slice(0, 8).toUpperCase();
  const createdAt = new Intl.DateTimeFormat("uk-UA", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Kyiv",
  }).format(new Date());

  const message = [
    `🧾 <b>Нове замовлення #${orderId}</b>`,
    "",
    `<b>Тип:</b> ${escapeHtml(task)}`,
    `<b>Матеріал:</b> ${escapeHtml(material)}`,
    `<b>Контакт:</b> ${escapeHtml(contact)}`,
    `<b>Файл:</b> ${file ? escapeHtml(file.name) : "не додано"}`,
    "",
    `<b>Коментар:</b>\n${escapeHtml(details)}`,
    "",
    `<i>${escapeHtml(createdAt)} · salon-3d-printing-yavoriv</i>`,
  ].join("\n");

  try {
    await telegramRequest(
      token,
      "sendMessage",
      JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      { "Content-Type": "application/json" },
    );

    if (file) {
      const telegramForm = new FormData();
      telegramForm.set("chat_id", chatId);
      telegramForm.set("caption", `Файл до замовлення #${orderId}`);
      telegramForm.set("document", file, file.name);
      await telegramRequest(token, "sendDocument", telegramForm);
    }

    return NextResponse.json({ ok: true, orderId });
  } catch (error) {
    console.error("Order delivery failed", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: "Не вдалося надіслати заявку. Спробуйте ще раз або зв'яжіться з нами напряму." },
      { status: 502 },
    );
  }
}
