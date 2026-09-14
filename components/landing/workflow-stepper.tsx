"use client";

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl font-mono font-black text-zinc-300 block mb-3">
                  {step.num}
                </span>
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
    </section>
  );
}
