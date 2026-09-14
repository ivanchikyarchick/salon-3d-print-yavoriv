"use client";

import { useState, useEffect } from "react";
import { X, UploadCloud, Send, CheckCircle2 } from "lucide-react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    taskType?: string;
    material?: string;
    sizeCategory?: string;
    quantity?: number;
    estimatedPrice?: number;
  } | null;
}

export function OrderModal({ isOpen, onClose, initialData }: OrderModalProps) {
  const [task, setTask] = useState("");
  const [material, setMaterial] = useState("PETG Pro");
  const [contact, setContact] = useState("");
  const [details, setDetails] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialData) {
      if (initialData.taskType) setTask(initialData.taskType);
      if (initialData.material) setMaterial(initialData.material);
      if (initialData.estimatedPrice) {
        setDetails(
          `Розрахунок калькулятора: ~${initialData.estimatedPrice} грн (${initialData.quantity || 1} шт, ${initialData.sizeCategory || ""})`
        );
      }
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleSendTelegram = () => {
    const text = encodeURIComponent(
      `Замовлення 3D-друку (Яворів):\n` +
      `- Завдання: ${task || "Консультація"}\n` +
      `- Матеріал: ${material}\n` +
      `- Контакт: ${contact}\n` +
      `- Файл: ${fileName || "Без файлу"}\n` +
      `- Коментар: ${details || "-"}`
    );
    window.open(`https://t.me?text=${text}`, "_blank");
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
                    {fileName ? (
                      <span className="font-semibold text-zinc-900">{fileName}</span>
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

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-white bg-zinc-900 hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Надіслати заявку
                </button>

                <button
                  type="button"
                  onClick={handleSendTelegram}
                  className="w-full py-2.5 px-4 rounded-xl font-medium text-xs text-zinc-700 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="size-3 text-zinc-700" />
                  <span>Відкрити в Telegram</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
