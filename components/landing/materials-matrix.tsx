"use client";

import { Check, ArrowRight } from "lucide-react";

interface MaterialsMatrixProps {
  onSelectMaterialForOrder: (materialName: string) => void;
}

const materials = [
  {
    name: "PETG Pro",
    type: "Інженерний термопласт",
    desc: "Найкращий вибір для міцних побутових та автомобільних деталей. Не боїться вологи, не розшаровується та витримує помірні навантаження.",
    badge: "Найпопулярніший",
    temp: "до 75°C",
    useCases: "Кронштейни, шестерні, автокліпси, перехідники",
  },
  {
    name: "PLA+ Tough",
    type: "Екологічний полімер",
    desc: "Дає ідеальну гладку поверхню без деформацій і високу чіткість дрібних елементів. Підходить для декору та корпусів.",
    badge: "Для естетики",
    temp: "до 55°C",
    useCases: "Декор, органайзери, макети, корпуси приладів",
  },
  {
    name: "ABS / ASA",
    type: "Термостійкий пластик",
    desc: "Міцний матеріал, який витримує нагрів до 95°C та вплив сонячного ультрафіолету. Чудово шліфується.",
    badge: "Термостійкий",
    temp: "до 95°C",
    useCases: "Деталі під капот авто, вуличні кронштейни",
  },
  {
    name: "TPU Flex",
    type: "Гнучка гума",
    desc: "М'який еластичний полімер, який можна згинати та стискати — він завжди повертається до початкової форми.",
    badge: "Еластичний",
    temp: "до 80°C",
    useCases: "Ущільнювачі, заглушки, демпфери вібрацій, чохли",
  },
  {
    name: "Nylon (PA)",
    type: "Високоміцний технічний пластик",
    desc: "Зносостійкий і витривалий матеріал для деталей, які працюють під навантаженням, зазнають ударів або постійного тертя.",
    badge: "Промисловий",
    temp: "Зносостійкий",
    useCases: "Шестерні, втулки, кріплення, функціональні механізми",
  },
  {
    name: "PC (Полікарбонат)",
    type: "Ударостійкий технічний пластик",
    desc: "Дуже міцний і термостійкий матеріал для промислових деталей, корпусів та конструкцій із підвищеними вимогами.",
    badge: "Максимальна міцність",
    temp: "Ударостійкий",
    useCases: "Промислові деталі, силові корпуси, захисні елементи",
  },
];

export function MaterialsMatrix({ onSelectMaterialForOrder }: MaterialsMatrixProps) {
  return (
    <section id="materials" className="py-20 bg-zinc-50 border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 block mb-2">
              Матеріали
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-950 tracking-tight">
              З чого ми друкуємо
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm sm:text-base text-zinc-600 max-w-md">
            Допоможемо підібрати правильний пластик залежно від умов роботи деталі: навантаження, температура або вологість.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {materials.map((mat) => (
            <div
              key={mat.name}
              className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700">
                    {mat.badge}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">{mat.temp}</span>
                </div>

                <h3 className="text-lg font-bold text-zinc-950 mb-1">{mat.name}</h3>
                <p className="text-xs text-zinc-400 font-medium mb-3">{mat.type}</p>
                
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">
                  {mat.desc}
                </p>

                <div className="pt-3 border-t border-zinc-100 text-xs">
                  <span className="text-zinc-400 block mb-1 text-[11px]">Застосування:</span>
                  <span className="text-zinc-800 font-medium">{mat.useCases}</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-100">
                <button
                  onClick={() => onSelectMaterialForOrder(mat.name)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-900 hover:text-zinc-600 transition-colors cursor-pointer"
                >
                  <span>Обрати для замовлення</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
