import { NextResponse } from "next/server";

const MAKERWORLD_HOSTS = new Set(["makerworld.com", "www.makerworld.com"]);

function getModelId(value: string) {
  const trimmed = value.trim();
  if (/^\d+$/.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    if (!MAKERWORLD_HOSTS.has(url.hostname.toLowerCase())) return null;
    return url.pathname.match(/\/models\/(\d+)/)?.[1] ?? null;
  } catch {
    return null;
  }
}

function finiteNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

export async function POST(request: Request) {
  let body: { url?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некоректний запит." }, { status: 400 });
  }

  const modelId = typeof body.url === "string" ? getModelId(body.url) : null;
  if (!modelId) {
    return NextResponse.json(
      { error: "Вставте повне посилання на модель MakerWorld." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `https://api.bambulab.com/v1/design-service/design/${modelId}`,
      {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(12_000),
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Не вдалося отримати модель. Перевірте посилання або спробуйте пізніше." },
        { status: response.status === 404 ? 404 : 502 },
      );
    }

    const design: any = await response.json();
    const profiles = (Array.isArray(design.instances) ? design.instances : [])
      .map((instance: any) => {
        const plates = Array.isArray(instance?.extention?.modelInfo?.plates)
          ? instance.extention.modelInfo.plates
          : [];
        const weight = finiteNumber(instance?.weight)
          || plates.reduce((sum: number, plate: any) => sum + finiteNumber(plate?.weight), 0);
        const printTimeSeconds = finiteNumber(instance?.prediction)
          || plates.reduce((sum: number, plate: any) => sum + finiteNumber(plate?.prediction), 0);

        return {
          id: String(instance?.id ?? instance?.profileId ?? ""),
          title: instance?.titleTranslated || instance?.title || "Профіль друку",
          printer: instance?.extention?.modelInfo?.compatibility?.devProductName || "Bambu Lab",
          material: instance?.instanceFilaments?.[0]?.type || "Не вказано",
          weightGrams: Math.round(weight * 10) / 10,
          printTimeSeconds: Math.round(printTimeSeconds),
          plateCount: plates.length || 1,
          coverUrl: instance?.cover || instance?.pictures?.[0]?.url || null,
          isDefault: Boolean(instance?.isDefault || instance?.id === design.defaultInstanceId),
        };
      })
      .filter((profile: any) => profile.id && profile.weightGrams > 0 && profile.printTimeSeconds > 0)
      .sort((a: any, b: any) => Number(b.isDefault) - Number(a.isDefault))
      .slice(0, 24);

    if (!profiles.length) {
      return NextResponse.json(
        { error: "У цієї моделі немає профілю з розрахованою вагою та часом друку." },
        { status: 422 },
      );
    }

    return NextResponse.json({
      model: {
        id: String(design.id ?? modelId),
        title: design.titleTranslated || design.title || `Модель ${modelId}`,
        creator: design.designCreator?.name || design.designCreator?.handle || "Автор MakerWorld",
        coverUrl: design.coverUrl || profiles[0].coverUrl,
        license: design.license || "Ліцензія не вказана",
        licenseNote: design.licenseDescriptionInfo?.content || null,
        sourceUrl: `https://makerworld.com/en/models/${modelId}-${design.slug || "model"}`,
      },
      profiles,
    });
  } catch {
    return NextResponse.json(
      { error: "MakerWorld тимчасово недоступний. Спробуйте ще раз або введіть вагу вручну в калькуляторі." },
      { status: 502 },
    );
  }
}
