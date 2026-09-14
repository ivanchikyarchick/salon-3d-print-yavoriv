"use client";

import { motion } from "framer-motion";
import { Box, FileText, PackageCheck, ScanSearch, type LucideIcon } from "lucide-react";

type Step = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Надсилаєте модель або опис",
    description: "Прикріпіть готовий файл або коротко розкажіть про свою ідею.",
    icon: FileText,
  },
  {
    number: "02",
    title: "Оцінюємо вартість і термін",
    description: "Перевіряємо модель, радимо матеріал і погоджуємо всі деталі.",
    icon: ScanSearch,
  },
  {
    number: "03",
    title: "Друкуємо виріб",
    description: "Готуємо модель до друку та контролюємо якість готової деталі.",
    icon: Box,
  },
  {
    number: "04",
    title: "Отримуєте замовлення",
    description: "Забираєте у Яворові або отримуєте зручною доставкою по Україні.",
    icon: PackageCheck,
  },
];

export function Process() {
  return (
    <section id="process" className="scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="max-w-[720px]"
        >
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-[#e85f19]">Простий процес</p>
          <h2 className="text-[clamp(2.25rem,6vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.045em] text-[#20211f]">Як це працює</h2>
          <p className="mt-5 max-w-[570px] text-lg leading-8 text-[#6a6c66]">Чотири зрозумілі кроки від першого повідомлення до готового виробу у ваших руках.</p>
        </motion.div>

        <div className="relative mt-12 grid gap-4 lg:grid-cols-4">
          <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-[#dcdcd6] lg:block" aria-hidden="true" />
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                className="relative rounded-[24px] border border-[#e1e1dc] bg-white p-6 shadow-[0_8px_26px_rgba(34,35,31,0.04)] lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none"
              >
                <div className="relative z-10 flex items-center justify-between lg:block">
                  <span className="grid size-14 place-items-center rounded-full border-[6px] border-[#f7f7f5] bg-[#20211f] text-white shadow-[0_0_0_1px_rgba(32,33,31,0.08)] lg:mb-8">
                    <Icon className="size-5" strokeWidth={1.9} />
                  </span>
                  <span className="text-sm font-bold text-[#f36b21] lg:hidden">КРОК {step.number}</span>
                </div>
                <p className="hidden text-sm font-bold uppercase tracking-[0.12em] text-[#f36b21] lg:block">Крок {step.number}</p>
                <h3 className="mt-6 text-xl font-bold leading-7 tracking-[-0.025em] text-[#292a27] lg:mt-3">{step.title}</h3>
                <p className="mt-3 text-base leading-7 text-[#6d6f69]">{step.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
