"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqItems = [
  {
    q: "Які формати файлів підходять для друку?",
    a: "Ми приймаємо файли .STL, .STEP, .OBJ та .3MF. Якщо у вас немає 3D-моделі, ви можете принести зламану деталь до майстерні у Яворові — ми знімемо розміри та змоделюємо її заново.",
  },
  {
    q: "Який пластик краще підійде для моєї деталі?",
    a: "Для побутових деталей та автокріплень зазвичай підходить PETG, для високих температур — ABS або ASA, для декору — PLA+. Для промислових, високоміцних і ударостійких деталей також друкуємо з Nylon (PA) та полікарбонату (PC). Матеріал підбираємо під умови роботи виробу.",
  },
  {
    q: "Скільки часу триває виготовлення?",
    a: "Друк за готовою моделлю зазвичай займає 24-48 годин. Якщо потрібне створення 3D-моделі за зламаною деталлю або партія від 10 штук — термін узгоджуємо індивідуально (зазвичай 2-3 дні).",
  },
  {
    q: "Як оплатити та отримати замовлення?",
    a: "У місті Яворів деталь можна забрати особисто. По Україні відправляємо Новою Поштою або Укрпоштою з можливістю післяплати.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-zinc-50 border-b border-zinc-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 block mb-2">
            Питання та відповіді
          </span>
          <h2 className="text-3xl font-bold text-zinc-950 tracking-tight">
            Часті запитання
          </h2>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="rounded-xl bg-white border border-zinc-200 overflow-hidden shadow-2xs"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-semibold text-zinc-900 hover:text-zinc-700 transition-colors cursor-pointer"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`size-4 text-zinc-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
