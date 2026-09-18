"use client";

import { useState, useEffect } from "react";
import { X, UploadCloud, Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    taskType?: string;
    material?: string;
    sizeCategory?: string;
    weightGrams?: number;
    pricePerGram?: number;
    quantity?: number;
    estimatedPrice?: number;
    sourceUrl?: string;
    profileTitle?: string;
    printTimeSeconds?: number;
  } | null;
}

export function OrderModal({ isOpen, onClose, initialData }: OrderModalProps) {
  const [task, setTask] = useState("");
  const [material, setMaterial] = useState("PETG Pro");
  const [contact, setContact] = useState("");
  const [details, setDetails] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    if (initialData) {
      if (initialData.taskType) setTask(initialData.taskType);
      if (initialData.material) setMaterial(initialData.material);
      if (initialData.estimatedPrice) {
        const printTime = initialData.printTimeSeconds
          ? `${Math.floor(initialData.printTimeSeconds / 3600)} год ${Math.round((initialData.printTimeSeconds % 3600) / 60)} хв`
          : null;
        setDetails(
          `Розрахунок калькулятора: ~${initialData.estimatedPrice} грн (${initialData.quantity || 1} шт, ${initialData.weightGrams || 0} г/шт, ${initialData.pricePerGram || 0} грн/г)` +
          (initialData.profileTitle ? `\nПрофіль MakerWorld: ${initialData.profileTitle}` : "") +
          (printTime ? `\nОрієнтовний час: ${printTime}` : "") +
          (initialData.sourceUrl ? `\nПосилання: ${initialData.sourceUrl}` : "")
        );
      }
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    const formData = new FormData();
    formData.set("task", task);
    formData.set("material", material);
    formData.set("contact", contact);
    formData.set("details", details);
    formData.set("website", "");
    if (file) formData.set("file", file, file.name);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as {
        error?: string;
        orderId?: string;
      };
      if (!response.ok) throw new Error(payload.error || "Не вдалося надіслати заявку.");

      setOrderId(payload.orderId || "");
      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Не вдалося надіслати заявку. Спробуйте ще раз.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleSendTelegram = () => {
    window.open("https://t.me/+380974762267", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-zinc-200 shadow-xl p-6 sm:p-7 overflow-hidden text-zinc-900">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer"
          aria-label="Закрити"
        >
          <X className="size-4.5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="size-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="size-7" />
            </div>
            <h3 className="text-xl font-bold text-zinc-950">Заявку відправлено!</h3>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-xs mx-auto">
              Майстер зв'яжеться з вами найближчим часом для уточнення деталей друку.
            </p>
            {orderId && <p className="text-xs font-semibold text-zinc-500">Номер заявки: #{orderId}</p>}
            <div className="pt-3">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-5 py-2 rounded-xl bg-zinc-900 text-white font-semibold text-xs hover:bg-zinc-800 cursor-pointer"
              >
                Закрити
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block mb-1">
                Студія у Яворові
              </span>
              <h3 className="text-2xl font-bold text-zinc-950">
                Замовити 3D-друк
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                Надішліть файл STL або опишіть зламану деталь.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-medium text-zinc-700 block mb-1">
                  Тип замовлення:
                </label>
                <input
                  type="text"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder="Наприклад: Друк шестерні за зразком"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-300 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-800"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-700 block mb-1">
                  Матеріал:
                </label>
                <select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-300 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:border-zinc-800"
                >
                  <option value="PETG Pro">PETG Pro (Міцний, інженерний)</option>
                  <option value="PLA+ Tough">PLA+ Tough (Для декору та гладкості)</option>
                  <option value="ABS / ASA">ABS / ASA (Термостійкий 95°C)</option>
                  <option value="TPU Flex">TPU Flex (Гнучкий еластомір)</option>
                  <option value="Nylon (PA)">Nylon / PA (Високоміцний, зносостійкий)</option>
                  <option value="PC (Полікарбонат)">PC / Полікарбонат (Ударостійкий)</option>
                  <option value="Порадьте матеріал">Не впевнений, підкажіть</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-700 block mb-1">
                  Прикріпити файл або фото (за бажанням):
                </label>
                <label className="border border-dashed border-zinc-300 hover:border-zinc-400 rounded-xl p-3 flex flex-col items-center justify-center gap-1 cursor-pointer bg-zinc-50 transition-colors">
                  <UploadCloud className="size-5 text-zinc-500" />
                  <span className="text-xs text-zinc-600">
                    {file ? (
                      <span className="font-semibold text-zinc-900">{file.name}</span>
                    ) : (
                      "Натисніть для вибору STL, STEP або фото"
                    )}
                  </span>
                  <input
                    type="file"
                    accept=".stl,.step,.stp,.obj,.3mf,.png,.jpg,.jpeg"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-700 block mb-1">
                  Ваш телефон або нікнейм Telegram:
                </label>
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="+38 (067) 000-00-00 або @telegram"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-300 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-800"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-700 block mb-1">
                  Коментар:
                </label>
                <textarea
                  rows={2}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Додаткові побажання щодо кольору чи розміру..."
                  className="w-full px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-300 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-800"
                />
              </div>

              {submitError && (
                <div role="alert" className="flex gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700">
                  <AlertCircle className="size-4 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-white bg-zinc-900 hover:bg-zinc-800 disabled:opacity-60 transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  {submitting && <Loader2 className="size-3.5 animate-spin" />}
                  {submitting ? "Надсилаємо…" : "Надіслати заявку"}
                </button>

                <button
                  type="button"
                  onClick={handleSendTelegram}
                  className="w-full py-2.5 px-4 rounded-xl font-medium text-xs text-zinc-700 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="size-3 text-zinc-700" />
                  <span>Написати напряму</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
