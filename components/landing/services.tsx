"use client";

import { motion } from "framer-motion";
import {
  Blocks,
  Box,
  Component,
  FileBox,
  Gift,
  Wrench,
  type LucideIcon,
} from "lucide-react";

type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  index: string;
};

const services: Service[] = [
  {
    title: "Декор та подарунки",
    description: "Вази, органайзери, персональні сувеніри та предмети для особливих моментів.",
    icon: Gift,
    index: "01",
  },
  {
    title: "Технічні деталі",
    description: "Функціональні корпуси, кріплення, перехідники й деталі під точні розміри.",
    icon: Component,
    index: "02",
  },
  {
    title: "Прототипи",
    description: "Швидка перевірка форми, посадки та конструкції до серійного виробництва.",
    icon: Blocks,
    index: "03",
  },
  {
    title: "Фігурки та моделі",
    description: "Макети, мініатюри й деталізовані моделі для колекцій, хобі або презентацій.",
    icon: Box,
    index: "04",
  },
  {
    title: "Запчастини",
    description: "Відтворюємо зламані або рідкісні елементи, які складно знайти у продажу.",
    icon: Wrench,
    index: "05",
  },
  {
    title: "Друк за вашим STL",
    description: "Надішліть готовий файл — перевіримо модель, підберемо матеріал і надрукуємо.",
    icon: FileBox,
    index: "06",
  },
];

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 border-y border-black/[0.06] bg-white py-20 sm:py-24 lg:py-28">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-[#e85f19]">Можливості студії</p>
            <h2 className="max-w-[680px] text-[clamp(2.25rem,6vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.045em] text-[#20211f]">
              Що ми друкуємо
            </h2>
          </div>
          <p className="max-w-[410px] text-base leading-7 text-[#6a6c66] sm:text-right">
            Від одиничної деталі до виразного подарунка — допоможемо перетворити цифрову модель на готовий виріб.
          </p>
        </motion.div>

        <div className="mt-11 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                whileHover={{ y: -4 }}
                className="group relative min-h-[252px] overflow-hidden rounded-[24px] border border-[#e4e4df] bg-[#fafaf8] p-6 shadow-[0_8px_24px_rgba(34,35,31,0.035)] transition-[border-color,box-shadow] duration-300 hover:border-[#d7d7d1] hover:shadow-[0_18px_42px_rgba(34,35,31,0.08)] sm:p-7"
              >
                <div className="flex items-start justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl border border-[#ebe9e3] bg-white text-[#30312e] shadow-sm transition-colors duration-300 group-hover:bg-[#f36b21] group-hover:text-white">
                    <Icon className="size-5" strokeWidth={1.9} />
                  </span>
                  <span className="text-sm font-bold text-[#b1b2ad]">{service.index}</span>
                </div>
                <h3 className="mt-8 text-xl font-bold tracking-[-0.025em] text-[#272825]">{service.title}</h3>
                <p className="mt-3 text-base leading-7 text-[#6d6f69]">{service.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
