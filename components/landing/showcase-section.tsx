import Image from "next/image";

const items = [
  {
    title: "Функціональні деталі",
    description: "Шестерні, втулки, кронштейни та корпуси з видимою якістю поверхні.",
    image: "/printed-parts-gallery.webp",
  },
  {
    title: "3D-сканування",
    description: "Оцифровуємо форму фізичної деталі для точного відтворення та ремонту.",
    image: "/process-3d-scanning.webp",
  },
  {
    title: "3D-моделювання",
    description: "Відновлюємо геометрію, перевіряємо посадки та готуємо модель до друку.",
    image: "/process-3d-modeling.webp",
  },
];

export function ShowcaseSection() {
  return (
    <section id="works" className="py-20 sm:py-24 bg-zinc-50 border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 block mb-2">Деталі й процес</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-950 tracking-tight">Від фізичного зразка до готового виробу</h2>
          <p className="mt-3 text-base text-zinc-600">Три етапи однієї роботи: оцифрування, підготовка точної моделі та виготовлення функціональної деталі.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((item) => (
            <article key={item.title} className="group rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
              <div className="relative overflow-hidden aspect-[4/3] md:aspect-[4/5]">
                <Image src={item.image} alt={item.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent" />
                <div className="absolute left-0 right-0 bottom-0 p-5 sm:p-6 text-white">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-1 text-sm text-zinc-300 max-w-md">{item.description}</p>
                  <span className="mt-3 inline-block text-[11px] text-zinc-400">Ілюстрація процесу</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
