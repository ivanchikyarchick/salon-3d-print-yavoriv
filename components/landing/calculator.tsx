"use client";

import { useState } from "react";
import { Scale } from "lucide-react";

interface CalculatorProps {
  onOpenOrderModalWithData: (calcData: {
    taskType: string;
    material: string;
    quantity: number;
    weightGrams: number;
    pricePerGram: number;
    estimatedPrice: number;
  }) => void;
}

const materials = [
  "PETG Pro",
  "PLA+ Tough",
  "ABS / ASA",
  "TPU Flex",
  "Nylon (PA)",
  "PC (Полікарбонат)",
];

const priceTiers = [
  { label: "1–50 г", rate: 7 },
  { label: "51–100 г", rate: 6 },
  { label: "101–150 г", rate: 5 },
  { label: "від 151 г", rate: 4 },
];

function getPricePerGram(weight: number) {
  if (weight <= 50) return 7;
  if (weight <= 100) return 6;
  if (weight <= 150) return 5;
  return 4;
}

export function Calculator({ onOpenOrderModalWithData }: CalculatorProps) {
  const [material, setMaterial] = useState(materials[0]);
  const [weightGrams, setWeightGrams] = useState(50);
  const [quantity, setQuantity] = useState(1);

  const safeWeight = Math.max(1, Number.isFinite(weightGrams) ? weightGrams : 1);
  const safeQuantity = Math.max(1, Number.isFinite(quantity) ? quantity : 1);
  const totalWeight = safeWeight * safeQuantity;
  const pricePerGram = getPricePerGram(totalWeight);
  const totalPrice = Math.round(totalWeight * pricePerGram);
  const isBulkOrder = totalWeight >= 3000;

  const handleOpenModal = () => {
    onOpenOrderModalWithData({
      taskType: "3D-друк за вагою",
      material,
      quantity: safeQuantity,
      weightGrams: safeWeight,
      pricePerGram,
      estimatedPrice: totalPrice,
    });
  };

  return (
    <section id="calculator" className="py-20 bg-white border-b border-zinc-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 block mb-2">
            Калькулятор вартості друку
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
            Вартість друку визначається від кількості пластику витраченого на друк деталі
          </h2>
          <p className="mt-3 text-base text-zinc-600">
            Вкажіть орієнтовну вагу однієї деталі та кількість. Остаточну вагу визначаємо після підготовки моделі до друку.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 p-6 sm:p-8 bg-zinc-50/70 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1.2fr] gap-6">
            <div>
              <label htmlFor="calc-material" className="text-sm font-semibold text-zinc-700 block mb-2">Матеріал</label>
              <select id="calc-material" value={material} onChange={(event) => setMaterial(event.target.value)} className="w-full h-11 px-3 rounded-xl bg-white border border-zinc-300 text-sm text-zinc-900 focus:outline-none focus:border-zinc-800">
                {materials.map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="calc-weight" className="text-sm font-semibold text-zinc-700 block mb-2">Вага, г/шт</label>
                <input id="calc-weight" type="number" min="1" step="1" value={weightGrams} onChange={(event) => setWeightGrams(Number(event.target.value))} className="w-full h-11 px-3 rounded-xl bg-white border border-zinc-300 text-sm text-zinc-900 focus:outline-none focus:border-zinc-800" />
              </div>
              <div>
                <label htmlFor="calc-quantity" className="text-sm font-semibold text-zinc-700 block mb-2">Кількість</label>
                <input id="calc-quantity" type="number" min="1" step="1" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} className="w-full h-11 px-3 rounded-xl bg-white border border-zinc-300 text-sm text-zinc-900 focus:outline-none focus:border-zinc-800" />
              </div>
            </div>

            <div className="rounded-xl bg-zinc-900 text-white p-5 flex items-center justify-between gap-4">
              <div>
                <span className="text-sm text-zinc-300 block">Орієнтовна вартість</span>
                <div className="text-3xl font-black">~{totalPrice} <span className="text-lg font-normal text-zinc-300">грн</span></div>
                <span className="text-xs text-zinc-400">{totalWeight} г × {pricePerGram} грн/г</span>
              </div>
              <Scale className="size-7 text-zinc-400 shrink-0" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6">
            {priceTiers.map((tier) => (
              <div key={tier.label} className={`rounded-xl border p-3 ${tier.rate === pricePerGram ? "bg-white border-zinc-900" : "bg-white/60 border-zinc-200"}`}>
                <div className="text-xs text-zinc-500">{tier.label}</div>
                <div className="text-sm font-bold text-zinc-900">{tier.rate} грн/г</div>
              </div>
            ))}
          </div>

          {isBulkOrder && (
            <div className="mt-4 rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-800">
              Загальна вага від 3 кг — можемо погодити індивідуальну ціну.
            </div>
          )}

          <div className="pt-6 mt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-zinc-500 max-w-xl">Моделювання та 3D-сканування розраховуються окремо — 500 грн/год.</p>
            <button onClick={handleOpenModal} className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-zinc-900 hover:bg-zinc-800 transition-colors cursor-pointer">Оформити з цими даними</button>
          </div>
        </div>
      </div>
    </section>
  );
}
