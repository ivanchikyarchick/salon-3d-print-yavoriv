"use client";

import { MapPin, Truck, Phone, Send, Music2 } from "lucide-react";

interface WorkshopYavorivProps {
  onOpenOrderModal: () => void;
}

export function WorkshopYavoriv({ onOpenOrderModal }: WorkshopYavorivProps) {
  return (
    <section id="contacts" className="py-20 bg-white border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 block mb-2">
              Локація та зв'язок
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-950 tracking-tight mb-4">
              Салон 3D друку в місті Яворові
            </h2>
            <p className="text-zinc-600 text-base leading-relaxed mb-6">
              Ви можете особисто принести зламану деталь для зняття розмірів або забрати готове замовлення без переплат за доставку.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                <div className="flex items-center gap-2 font-bold text-zinc-900 text-sm mb-1">
                  <MapPin className="size-4 text-zinc-700" />
                  <span>Самовивіз у Яворові</span>
                </div>
                <p className="text-xs text-zinc-500">
                  м. Яворів, Львівська обл. За попередньою домовленістю у зручний час.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                <div className="flex items-center gap-2 font-bold text-zinc-900 text-sm mb-1">
                  <Truck className="size-4 text-zinc-700" />
                  <span>Доставка Новою Поштою</span>
                </div>
                <p className="text-xs text-zinc-500">
                  Відправляємо по всій Україні в день завершення друку.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://t.me/+380974762267"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-zinc-900 hover:bg-zinc-800 transition-colors"
              >
                <Send className="size-3.5" />
                <span>Написати в Telegram</span>
              </a>

              <a
                href="https://tiktok.com/@salon.3d.print_yavoriv?_r=1"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs text-zinc-700 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 transition-colors"
              >
                <Music2 className="size-3.5 text-zinc-600" />
                <span>TikTok</span>
              </a>

              <a
                href="tel:+380974762267"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs text-zinc-700 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 transition-colors"
              >
                <Phone className="size-3.5 text-zinc-600" />
                <span>+380 97 476 22 67</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl p-6 bg-zinc-50 border border-zinc-200">
            <h3 className="font-bold text-zinc-950 text-base mb-3">
              Графік прийому замовлень
            </h3>
            <div className="space-y-2 text-xs text-zinc-600 border-b border-zinc-200 pb-4 mb-4">
              <div className="flex justify-between">
                <span>Пн – Пт:</span>
                <span className="font-semibold text-zinc-900">09:00 – 20:00</span>
              </div>
              <div className="flex justify-between">
                <span>Субота:</span>
                <span className="font-semibold text-zinc-900">10:00 – 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>Неділя:</span>
                <span className="text-zinc-500">Прийом STL у чаті</span>
              </div>
            </div>

            <button
              onClick={onOpenOrderModal}
              className="w-full py-2.5 rounded-xl text-xs font-semibold text-zinc-900 bg-white hover:bg-zinc-100 border border-zinc-300 transition-colors cursor-pointer"
            >
              Залишити заявку на друк
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
