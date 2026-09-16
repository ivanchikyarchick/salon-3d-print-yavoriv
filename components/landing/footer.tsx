"use client";

import { Layers, Send, Phone, MapPin, Music2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white py-12 text-zinc-500 text-xs border-t border-zinc-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="size-7 rounded-md bg-zinc-900 text-white flex items-center justify-center">
                <Layers className="size-3.5" />
              </div>
              <span className="font-bold text-sm text-zinc-900">
                SALON 3D PRINTING
              </span>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed max-w-sm">
              Локальна майстерня 3D-друку у місті Яворів. Виготовлення інженерних деталей, автозапчастин та декору.
            </p>
          </div>

          <div>
            <span className="font-semibold text-zinc-900 block mb-3 text-xs">
              Розділи
            </span>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-zinc-900 transition-colors">Послуги</a></li>
              <li><a href="#materials" className="hover:text-zinc-900 transition-colors">Матеріали</a></li>
              <li><a href="#calculator" className="hover:text-zinc-900 transition-colors">Калькулятор ціни</a></li>
              <li><a href="#process" className="hover:text-zinc-900 transition-colors">Як замовити</a></li>
            </ul>
          </div>

          <div>
            <span className="font-semibold text-zinc-900 block mb-3 text-xs">
              Контакти
            </span>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="size-3.5 text-zinc-400" />
                <span>м. Яворів, Львівська обл.</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-3.5 text-zinc-400" />
                <a href="tel:+380974762267" className="hover:text-zinc-900">+380 97 476 22 67</a>
              </div>
              <div className="flex items-center gap-2">
                <Send className="size-3.5 text-zinc-400" />
                <a href="https://t.me/+380974762267" target="_blank" rel="noreferrer" className="hover:text-zinc-900">Telegram: +380 97 476 22 67</a>
              </div>
              <div className="flex items-center gap-2">
                <Music2 className="size-3.5 text-zinc-400" />
                <a href="https://tiktok.com/@salon.3d.print_yavoriv?_r=1" target="_blank" rel="noreferrer" className="hover:text-zinc-900">TikTok: @salon.3d.print_yavoriv</a>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-zinc-400 text-[11px]">
          <div>© 2026 SALON 3D PRINTING. Всі права захищено.</div>
          <div>3D-друк за моделями та зразками</div>
        </div>
      </div>
    </footer>
  );
}
