"use client";

import { Wrench, FileCode, Cpu, Sparkles, ArrowRight } from "lucide-react";

interface ServicesBentoProps {
  onOpenOrderModal: (serviceName?: string) => void;
}

const services = [
  {
    title: "Відновлення зламаних деталей",
    desc: "Якщо деталь тріснула чи загубилася: знімаємо точні розміри з уламків штангенциркулем, проєктуємо 3D-модель та друкуємо міцний аналог.",
    icon: Wrench,
    badge: "Популярно",
    bullets: ["Шестерні побутової техніки", "Кронштейни та кліпси авто", "Втулки та перехідники"],
  },
  {
    title: "Друк за готовими 3D-файлами",
    desc: "Маєте завантажений файл STL, STEP або OBJ? Безкоштовно перевіримо геометрію на помилки, підберемо заповнення та швидко запустимо у друк.",
    icon: FileCode,
    badge: "Швидкий старт",
    bullets: ["Формати STL, STEP, OBJ, 3MF", "Підбір оптимальної орієнтації", "Безкоштовний аналіз моделі"],
  },
  {
    title: "Корпуси для електроніки",
    desc: "Індивідуальні корпуси для плат, блоків живлення, сенсорів та дронів. Точна посадка роз'ємів і можливість впресовування латунних різьб.",
    icon: Cpu,
    badge: "Інженерія",
    bullets: ["Точні посадкові місця під плати", "Впресовані металеві різьби", "Ударостійкі матеріали"],
  },
  {
    title: "Декор, сувеніри та дрібні серії",
    desc: "Оригінальні вази, органайзери для робочого столу, рельєфні логотипи або тиражі деталей від 10 до 200+ штук зі знижкою.",
    icon: Sparkles,
    badge: "Серія та декор",
    bullets: ["Шовковисті матові кольори", "Знижки на партії від 10 шт", "Іменні сувеніри та написи"],
  },
];

export function ServicesBento({ onOpenOrderModal }: ServicesBentoProps) {
  return (
    <section id="services" className="py-20 sm:py-24 bg-white border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Header */}
        <div className="max-w-xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 block mb-2">
            Напрямки робіт
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-950 tracking-tight">
            Що ми виготовляємо
          </h2>
          <p className="mt-3 text-zinc-600 text-base">
            Працюємо як з поодинокими замовленнями на ремонт, так і з серійним виготовленням деталей.
          </p>
        </div>

        {/* 4 Clean Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="clean-card p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="size-10 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-800 flex items-center justify-center">
                      <Icon className="size-5" />
                    </span>
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-zinc-950 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-zinc-600 leading-relaxed mb-5">
                    {item.desc}
                  </p>

                  <ul className="space-y-1.5 border-t border-zinc-100 pt-4 text-xs text-zinc-600">
                    {item.bullets.map((b, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-zinc-400" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-end">
                  <button
                    onClick={() => onOpenOrderModal(item.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:text-zinc-600 transition-colors cursor-pointer"
                  >
                    <span>Замовити розрахунок</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
