"use client";

import Image from "next/image";
import { ArrowRight, Check, Calculator } from "lucide-react";

interface HeroProps {
  onOpenOrderModal: () => void;
}

export function Hero({ onOpenOrderModal }: HeroProps) {
  return (
    <section className="relative pt-32 pb-16 sm:pt-36 sm:pb-20 subtle-grid border-b border-zinc-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Clean Location Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-700 mb-6">
              <span className="size-2 rounded-full bg-emerald-500" />
              <span>Майстерня у м. Яворів • Працюємо щодня</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-black tracking-tight text-zinc-950 leading-[1.12]">
              3D-друк, моделювання та сканування в Яворові
            </h1>

            {/* Clear Description */}
            <p className="mt-5 text-base sm:text-lg text-zinc-600 leading-relaxed max-w-xl">
              Друкуємо міцні деталі з інженерних матеріалів, створюємо точні 3D-моделі та скануємо фізичні вироби для подальшого відтворення.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onOpenOrderModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-zinc-900 hover:bg-zinc-800 transition-all cursor-pointer shadow-sm"
              >
                <span>Замовити / Оцінити STL</span>
                <ArrowRight className="size-4" />
              </button>

              <a
                href="#calculator"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-sm text-zinc-700 bg-zinc-100 hover:bg-zinc-200/70 border border-zinc-200 transition-colors"
              >
                <Calculator className="size-4 text-zinc-600" />
                <span>Розрахувати ціну</span>
              </a>
            </div>

            {/* 3 Core Points */}
            <div className="mt-10 pt-6 border-t border-zinc-200 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-zinc-600">
              <div className="flex items-center gap-1.5">
                <Check className="size-4 text-zinc-800" />
                <span>Самовивіз у Яворові або Нова Пошта</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="size-4 text-zinc-800" />
                <span>Точність шару до 0.08 мм</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="size-4 text-zinc-800" />
                <span>Готовність від 1 дня</span>
              </div>
            </div>

          </div>

          {/* Right Column: Clean, Elegant Photo Card (No gimmicky HUD/console) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-zinc-50 border border-zinc-200/90 p-3 shadow-sm">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100">
                <Image
                  src="/hero-filament-studio-v2.webp"
                  alt="Котушки білого та чорного пластику для 3D-друку"
                  fill
                  className="object-cover object-center grayscale contrast-105"
                  priority
                />
              </div>

              <div className="mt-3 px-2 py-1.5 flex items-center justify-between text-xs text-zinc-500">
                <span className="font-medium text-zinc-700">Матеріали для 3D-друку</span>
                <span>Технічні пластики</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
