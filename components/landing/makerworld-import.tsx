"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowUpRight, Clock3, ExternalLink, Loader2, Scale, ShieldCheck } from "lucide-react";

interface PrintProfile {
  id: string;
  title: string;
  printer: string;
  material: string;
  weightGrams: number;
  printTimeSeconds: number;
  plateCount: number;
  coverUrl: string | null;
  isDefault: boolean;
}

interface MakerWorldModel {
  id: string;
  title: string;
  creator: string;
  coverUrl: string | null;
  license: string;
  licenseNote: string | null;
  sourceUrl: string;
}

interface MakerWorldResponse {
  model: MakerWorldModel;
  profiles: PrintProfile[];
}

interface MakerWorldImportProps {
  onOrder: (data: {
    taskType: string;
    material: string;
    weightGrams: number;
    pricePerGram: number;
    quantity: number;
    estimatedPrice: number;
    sourceUrl: string;
    profileTitle: string;
    printTimeSeconds: number;
  }) => void;
}

function getRate(weight: number) {
  if (weight <= 50) return 7;
  if (weight <= 100) return 6;
  if (weight <= 150) return 5;
  return 4;
}

function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.max(1, Math.round((seconds % 3600) / 60));
  if (!hours) return `${minutes} хв`;
  return minutes === 60 ? `${hours + 1} год` : `${hours} год ${minutes} хв`;
}

export function MakerWorldImport({ onOrder }: MakerWorldImportProps) {
  const [url, setUrl] = useState("");
  const [data, setData] = useState<MakerWorldResponse | null>(null);
  const [selectedProfileId, setSelectedProfileId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedProfile = useMemo(
    () => data?.profiles.find((profile) => profile.id === selectedProfileId) ?? null,
    [data, selectedProfileId],
  );

  const safeQuantity = Math.max(1, quantity || 1);
  const totalWeight = selectedProfile ? selectedProfile.weightGrams * safeQuantity : 0;
  const pricePerGram = getRate(totalWeight || 1);
  const totalPrice = Math.round(totalWeight * pricePerGram);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await fetch("/api/makerworld", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Не вдалося завантажити модель.");

      setData(payload);
      setSelectedProfileId(payload.profiles[0]?.id || "");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Сталася помилка.");
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = () => {
    if (!data || !selectedProfile) return;
    onOrder({
      taskType: `Модель з MakerWorld: ${data.model.title}`,
      material: selectedProfile.material,
      weightGrams: selectedProfile.weightGrams,
      pricePerGram,
      quantity: safeQuantity,
      estimatedPrice: totalPrice,
      sourceUrl: data.model.sourceUrl,
      profileTitle: selectedProfile.title,
      printTimeSeconds: selectedProfile.printTimeSeconds,
    });
  };

  return (
    <section id="makerworld" className="relative overflow-hidden py-20 bg-zinc-50 text-zinc-900 border-y border-zinc-200">
      <div aria-hidden="true" className="absolute -top-28 -right-24 size-80 rounded-full bg-zinc-200/60 blur-3xl" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-14 items-start">
          <div className="relative">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 block mb-3">Імпорт із MakerWorld</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">Знайдіть модель — ми відразу порахуємо друк</h2>
            <p className="mt-4 text-base text-zinc-600 leading-relaxed">
              Відкрийте каталог MakerWorld, оберіть модель і вставте сюди її посилання. Ми підтягнемо вагу пластику та орієнтовний час із профілю друку.
            </p>
            <a href="https://makerworld.com/en/3d-models" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-950 text-white text-sm font-semibold hover:bg-zinc-800 transition-colors shadow-sm">
              Відкрити MakerWorld <ExternalLink className="size-4" />
            </a>
            <div className="mt-7 flex gap-3 text-sm text-zinc-600">
              <ShieldCheck className="size-5 text-zinc-700 shrink-0" />
              <p>Перед замовленням перевірте ліцензію моделі. Остаточні параметри підтверджуємо після перевірки файлу.</p>
            </div>
          </div>

          <div className="relative rounded-2xl bg-white text-zinc-900 border border-zinc-200 p-5 sm:p-6 shadow-xl shadow-zinc-950/10">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <label htmlFor="makerworld-url" className="sr-only">Посилання на модель MakerWorld</label>
              <input id="makerworld-url" type="url" required value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://makerworld.com/en/models/…" className="flex-1 h-12 px-4 rounded-xl bg-zinc-50 border border-zinc-300 text-sm focus:outline-none focus:border-zinc-900" />
              <button type="submit" disabled={loading} className="h-12 px-5 rounded-xl bg-zinc-950 hover:bg-zinc-800 disabled:opacity-60 text-white text-sm font-bold transition-colors inline-flex items-center justify-center gap-2">
                {loading ? <Loader2 className="size-4 animate-spin" /> : <ArrowUpRight className="size-4" />}
                {loading ? "Завантажуємо" : "Отримати дані"}
              </button>
            </form>

            {error && <div role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

            {data && (
              <div className="mt-5">
                <div className="flex gap-4 pb-5 border-b border-zinc-200">
                  {data.model.coverUrl && <img src={data.model.coverUrl} alt="" className="size-20 sm:size-24 rounded-xl object-cover bg-zinc-100 shrink-0" />}
                  <div className="min-w-0">
                    <h3 className="font-bold text-lg leading-tight line-clamp-2">{data.model.title}</h3>
                    <p className="mt-1 text-sm text-zinc-500">Автор: {data.model.creator}</p>
                    <p className="mt-2 text-xs font-medium text-zinc-600">Ліцензія: {data.model.license}</p>
                  </div>
                </div>

                <fieldset className="mt-5">
                  <legend className="text-sm font-semibold mb-3">Оберіть профіль друку</legend>
                  <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
                    {data.profiles.map((profile) => (
                      <label key={profile.id} className={`block rounded-xl border p-3 cursor-pointer transition-colors ${profile.id === selectedProfileId ? "border-zinc-900 bg-zinc-50" : "border-zinc-200 hover:border-zinc-400"}`}>
                        <input type="radio" name="makerworld-profile" value={profile.id} checked={profile.id === selectedProfileId} onChange={() => setSelectedProfileId(profile.id)} className="sr-only" />
                        <div className="flex justify-between gap-3">
                          <span className="text-sm font-semibold line-clamp-1">{profile.title}</span>
                          {profile.isDefault && <span className="text-[11px] font-semibold text-zinc-700 shrink-0">Основний</span>}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500">
                          <span className="inline-flex items-center gap-1"><Scale className="size-3.5" /> {profile.weightGrams} г</span>
                          <span className="inline-flex items-center gap-1"><Clock3 className="size-3.5" /> {formatDuration(profile.printTimeSeconds)}</span>
                          <span>{profile.printer}</span><span>{profile.material}</span><span>{profile.plateCount} пл.</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {selectedProfile && (
                  <div className="mt-5 rounded-xl bg-zinc-950 text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="flex items-end gap-4">
                      <div>
                        <label htmlFor="makerworld-quantity" className="text-xs text-zinc-400 block mb-1">Кількість</label>
                        <input id="makerworld-quantity" type="number" min="1" value={quantity} onChange={(event) => setQuantity(Math.max(1, Number(event.target.value)))} className="w-20 h-10 px-3 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-zinc-400">Орієнтовна ціна</div>
                        <div className="text-2xl font-black">~{totalPrice} грн</div>
                        <div className="text-xs text-zinc-500">{totalWeight} г × {pricePerGram} грн/г</div>
                      </div>
                    </div>
                    <button type="button" onClick={handleOrder} className="px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 text-sm font-bold transition-colors">Замовити цю модель</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
