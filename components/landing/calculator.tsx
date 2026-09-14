"use client";

import { useState } from "react";
import { Send, Sparkles } from "lucide-react";

interface CalculatorProps {
  onOpenOrderModalWithData: (calcData: {
    taskType: string;
    material: string;
    sizeCategory: string;
    quantity: number;
    estimatedPrice: number;
  }) => void;
}

const tasks = [
  { id: "stl", name: "Є готовий STL / STEP файл", factor: 1.0 },
  { id: "repair", name: "Зламана деталь (потрібні заміри)", factor: 1.3 },
  { id: "decor", name: "Декор / Модель з інтернету", factor: 1.1 },
];

const materials = [
  { id: "petg", name: "PETG (Міцний)", pricePerGram: 3.5 },
  { id: "pla", name: "PLA+ (Декор)", pricePerGram: 3.2 },
  { id: "abs", name: "ABS (Термостійкий)", pricePerGram: 4.0 },
  { id: "tpu", name: "TPU (Гума / Flex)", pricePerGram: 5.5 },
];

const sizes = [
  { id: "s", name: "Дрібна (до 25 г)", weight: 20, example: "шестерня, кліпса" },
  { id: "m", name: "Середня (25-80 г)", weight: 55, example: "кронштейн, кріплення" },
  { id: "l", name: "Велика (80-200 г)", weight: 140, example: "корпус, органайзер" },
];

export function Calculator({ onOpenOrderModalWithData }: CalculatorProps) {
  const [selectedTask, setSelectedTask] = useState(tasks[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[1]);
  const [quantity, setQuantity] = useState<number>(1);

  // Price calculation
  const unitPrice = Math.round(selectedSize.weight * selectedMaterial.pricePerGram * selectedTask.factor);
  const totalPrice = Math.max(100, unitPrice * quantity);

  const handleOpenModal = () => {
    onOpenOrderModalWithData({
      taskType: selectedTask.name,
      material: selectedMaterial.name,
      sizeCategory: selectedSize.name,
      quantity,
      estimatedPrice: totalPrice,
    });
  };

  const handleSendTelegram = () => {
    const text = encodeURIComponent(
      `Добрий день! Цікавить 3D-друк у Яворові:\n` +
      `- Завдання: ${selectedTask.name}\n` +
      `- Матеріал: ${selectedMaterial.name}\n` +
      `- Розмір: ${selectedSize.name}\n` +
      `- Кількість: ${quantity} шт\n` +
      `- Орієнтовна вартість: ~${totalPrice} грн`
    );
    window.open(`https://t.me?text=${text}`, "_blank");
  };

  return (
    <section id="calculator" className="py-20 bg-white border-b border-zinc-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 block mb-2">
            Калькулятор вартості
          </span>
          <h2 className="text-3xl font-bold text-zinc-950 tracking-tight">
            Дізнайтеся орієнтовну ціну
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-600">
            Оберіть базові параметри, щоб отримати попередню оцінку вартості замовлення.
          </p>
        </div>

        {/* Clean Light Box */}
        <div className="rounded-2xl border border-zinc-200 p-6 sm:p-8 bg-zinc-50/70 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            
            {/* Task */}
            <div>
              <label className="text-xs font-semibold text-zinc-700 block mb-2">
                1. Тип замовлення:
              </label>
              <div className="space-y-2">
                {tasks.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTask(t)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-colors ${
                      selectedTask.id === t.id
                        ? "bg-zinc-900 text-white border-zinc-900"
                        : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100"
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Material */}
            <div>
              <label className="text-xs font-semibold text-zinc-700 block mb-2">
                2. Матеріал:
              </label>
              <div className="space-y-2">
                {materials.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMaterial(m)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-colors ${
                      selectedMaterial.id === m.id
                        ? "bg-zinc-900 text-white border-zinc-900"
                        : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100"
                    }`}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <label className="text-xs font-semibold text-zinc-700 block mb-2">
                3. Розмір деталі:
              </label>
              <div className="space-y-2">
                {sizes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSize(s)}
                    className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium border transition-colors ${
                      selectedSize.id === s.id
                        ? "bg-zinc-900 text-white border-zinc-900"
                        : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100"
                    }`}
                  >
                    <div>{s.name}</div>
                    <div className={`text-[10px] ${selectedSize.id === s.id ? "text-zinc-300" : "text-zinc-400"}`}>
                      {s.example}
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Summary Bar */}
          <div className="pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-zinc-500 block">Орієнтовна вартість:</span>
              <div className="text-3xl font-black text-zinc-950">
                ~{totalPrice} <span className="text-lg font-normal text-zinc-500">грн</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={handleOpenModal}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Оформити з цими даними
              </button>

              <button
                onClick={handleSendTelegram}
                className="px-4 py-2.5 rounded-xl text-xs font-medium text-zinc-700 bg-white border border-zinc-200 hover:bg-zinc-100 transition-colors flex items-center gap-1.5"
              >
                <Send className="size-3.5 text-zinc-700" />
                <span>Telegram</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
