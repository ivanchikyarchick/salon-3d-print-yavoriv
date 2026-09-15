"use client";

import { SlowWorkshopVideo } from "@/components/landing/slow-workshop-video";

const steps = [
  {
    num: "01",
    title: "Надсилаєте файл або фото",
    desc: "Прикріпіть файл STL/STEP або надішліть фото зламаної деталі з лінійкою/штангенциркулем.",
  },
  {
    num: "02",
    title: "Узгоджуємо деталі",
    desc: "Підбираємо матеріал під ваші умови, перевіряємо геометрію та погоджуємо точну ціну й термін.",
  },
  {
    num: "03",
    title: "Отримуєте замовлення",
    desc: "Друкуємо деталь, перевіряємо якість і віддаємо у Яворові або відправляємо Новою Поштою.",
  },
];

export function WorkflowStepper() {
  return (
    <section id="process" className="py-20 bg-zinc-50 border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 block mb-2">
            Процес
          </span>
          <h2 className="text-3xl font-bold text-zinc-950 tracking-tight">
            Як проходить замовлення
          </h2>
        </div>

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-6 items-stretch">
          <figure className="relative min-h-80 overflow-hidden rounded-2xl bg-zinc-200 border border-zinc-200">
            <SlowWorkshopVideo src="/result-finished-piece-slow.mp4" poster="/workshop-finished-piece.webp" label="Готовий декоративний виріб після 3D-друку" sizes="(min-width: 1024px) 42vw, 100vw" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950/90 to-transparent px-6 pb-5 pt-16 text-white">
              <span className="block text-xs uppercase tracking-wider text-orange-300">Результат</span>
              <span className="mt-1 block text-lg font-bold">Готова деталь, яку можна одразу використовувати</span>
            </figcaption>
          </figure>

          <div className="grid gap-4">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-xs flex gap-5"
              >
                <span className="text-2xl font-mono font-black text-zinc-300 shrink-0">
                  {step.num}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-zinc-950 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
