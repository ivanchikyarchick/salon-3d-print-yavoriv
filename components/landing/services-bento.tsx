"use client";

import { Wrench, FileCode, Cpu, Sparkles, ArrowRight, Box, ScanLine } from "lucide-react";
import { SlowWorkshopVideo } from "@/components/landing/slow-workshop-video";

interface ServicesBentoProps {
  onOpenOrderModal: (serviceName?: string) => void;
}

const services = [
  {
    title: "3D-моделювання",
    desc: "Створюємо готові до виробництва 3D-моделі за кресленням, ескізом, фото або фізичним зразком.",
    icon: Box,
    badge: "500 грн/год",
    bullets: ["Моделі для 3D-друку", "Доопрацювання готових файлів", "Реверс-інжиніринг деталей"],
  },
  {
    title: "3D-сканування",
    desc: "Перетворюємо форму фізичного предмета на цифрову 3D-модель для копіювання, ремонту або подальшого редагування.",
    icon: ScanLine,
    badge: "500 грн/год",
    bullets: ["Оцифрування деталей", "Підготовка геометрії", "Файл для моделювання або друку"],
  },
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
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-center mb-12">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 block mb-2">
              Напрямки робіт
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-950 tracking-tight">
              Наші послуги
            </h2>
            <p className="mt-3 text-zinc-600 text-base">
              Друкуємо готові моделі, створюємо нові та оцифровуємо фізичні деталі. Вартість моделювання і сканування — 500 грн/год.
            </p>
          </div>

          <figure className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200">
            <SlowWorkshopVideo src="/service-scanning-slow.mp4" poster="/workshop-scan-preparation.webp" label="Підготовка деталі до точного 3D-сканування" sizes="(min-width: 1024px) 52vw, 100vw" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950/90 to-transparent px-5 pb-4 pt-12 text-sm font-semibold text-white">
              Готуємо фізичну деталь до точного 3D-сканування
            </figcaption>
          </figure>
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
