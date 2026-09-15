"use client";

import { useState, useEffect } from "react";
import { Layers, Send, Menu, X, ArrowUpRight } from "lucide-react";

interface HeaderProps {
  onOpenOrderModal: () => void;
}

export function Header({ onOpenOrderModal }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Послуги", href: "#services" },
    { label: "Матеріали", href: "#materials" },
    { label: "Наші роботи", href: "#works" },
    { label: "MakerWorld", href: "#makerworld" },
    { label: "Калькулятор", href: "#calculator" },
    { label: "Як замовити", href: "#process" },
    { label: "Контакти", href: "#contacts" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-zinc-200/80 shadow-xs py-3.5"
            : "bg-white/50 backdrop-blur-xs py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="size-9 rounded-lg bg-zinc-900 text-white flex items-center justify-center">
                <Layers className="size-4.5" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-zinc-900 tracking-tight">
                  SALON 3D PRINTING
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 border border-zinc-200">
                  Яворів
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 transition-colors"
              >
                <Send className="size-3.5 text-zinc-700" />
                <span>Telegram</span>
              </a>

              <button
                onClick={onOpenOrderModal}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                <span>Замовити друк</span>
                <ArrowUpRight className="size-3.5" />
              </button>
            </div>

            {/* Mobile menu trigger */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={onOpenOrderModal}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-zinc-900 rounded-lg"
              >
                Замовити
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-zinc-600 hover:text-zinc-900 rounded-lg bg-zinc-100"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-24 px-6 lg:hidden flex flex-col justify-between pb-8">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-zinc-800 hover:text-zinc-950 py-2 border-b border-zinc-100"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="space-y-3 pt-6 border-t border-zinc-200">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="w-full py-3 text-center font-semibold text-white bg-zinc-900 rounded-xl"
            >
              Замовити 3D-друк
            </button>
            <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              className="block w-full py-2.5 text-center text-sm font-medium text-zinc-700 bg-zinc-100 rounded-xl"
            >
              Написати у Telegram
            </a>
          </div>
        </div>
      )}
    </>
  );
}
