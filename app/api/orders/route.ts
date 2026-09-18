import { NextResponse } from "next/server";
import { listTelegramSubscriberIds } from "@/db/telegram-subscribers";
import {
  sendTelegramDocument,
  sendTelegramMessage,
} from "@/lib/telegram";

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

function getStaticChatIds() {
  return [
    process.env.TELEGRAM_CHAT_ID,
    ...(process.env.TELEGRAM_ADMIN_CHAT_IDS || "").split(","),
  ]
    .map((value) => value?.trim())
    .filter((value): value is string => Boolean(value));
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const staticChatIds = getStaticChatIds();

  if (!token || !staticChatIds.length) {
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
    let subscriberIds: string[] = [];
    try {
      subscriberIds = await listTelegramSubscriberIds();
    } catch (error) {
      console.error(
        "Subscriber lookup failed",
        error instanceof Error ? error.message : error,
      );
    }

    const recipients = [...new Set([...staticChatIds, ...subscriberIds])];
    const results = await Promise.allSettled(
      recipients.map(async (chatId) => {
        await sendTelegramMessage(token, chatId, message, "HTML");
        if (file) {
          await sendTelegramDocument(
            token,
            chatId,
            file,
            `Файл до замовлення #${orderId}`,
          );
        }
      }),
    );
    const delivered = results.filter((result) => result.status === "fulfilled").length;
    if (!delivered) throw new Error("Order delivery failed for all recipients");

    return NextResponse.json({ ok: true, orderId });
  } catch (error) {
    console.error("Order delivery failed", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: "Не вдалося надіслати заявку. Спробуйте ще раз або зв'яжіться з нами напряму." },
      { status: 502 },
    );
  }
}
