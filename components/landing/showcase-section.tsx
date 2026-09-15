import Image from "next/image";

const videos = [
  {
    title: "3D-сканування",
    description: "Знімаємо форму та розміри деталі.",
    src: "/workshop-scanning.mp4",
    poster: "/workshop-scanning-poster.webp",
  },
  {
    title: "Цифрова модель",
    description: "Перетворюємо скан на готову геометрію.",
    src: "/workshop-modeling.mp4",
    poster: "/workshop-modeling-poster.webp",
  },
  {
    title: "Процес друку",
    description: "Виготовляємо деталь шар за шаром.",
    src: "/workshop-printing.mp4",
    poster: "/workshop-printing-poster.webp",
  },
  {
    title: "Готовий виріб",
    description: "Перевіряємо поверхню та результат.",
    src: "/workshop-finished-model.mp4",
    poster: "/workshop-finished-model-poster.webp",
  },
];

const works = [
  {
    title: "Великі функціональні деталі",
    description: "Друкуємо не лише дрібні елементи, а й габаритні вироби під конкретне завдання.",
    image: "/workshop-large-part.webp",
  },
  {
    title: "Підготовка до сканування",
    description: "Маркуємо поверхню, щоб сканер точно відтворив складну геометрію.",
    image: "/workshop-scan-preparation.webp",
  },
  {
    title: "Декоративний друк",
    description: "Працюємо з деталізованими моделями та ефектними кольорами матеріалу.",
    image: "/workshop-finished-piece.webp",
  },
];

export function ShowcaseSection() {
  return (
    <section id="works" className="py-20 sm:py-24 bg-zinc-50 border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 block mb-2">Реальні роботи майстерні</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-950 tracking-tight">Від сканування до готового виробу</h2>
          <p className="mt-3 text-base text-zinc-600">Коротко показуємо, як фізична деталь перетворюється на цифрову модель і готовий надрукований виріб.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {videos.map((video) => (
            <article key={video.title} className="rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-sm">
              <div className="relative aspect-[9/16] bg-black">
                <video
                  src={video.src}
                  poster={video.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                  aria-label={video.title}
                  className="size-full object-cover"
                />
              </div>
              <div className="p-4 text-white">
                <h3 className="text-sm sm:text-base font-bold">{video.title}</h3>
                <p className="mt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed">{video.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          {works.map((item) => (
            <article key={item.title} className="group rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
              <div className="relative overflow-hidden aspect-[4/3] md:aspect-[3/4]">
                <Image src={item.image} alt={item.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/5 to-transparent" />
                <div className="absolute left-0 right-0 bottom-0 p-5 text-white">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="mt-1 text-sm text-zinc-300">{item.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
