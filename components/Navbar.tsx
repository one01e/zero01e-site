"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "홈", path: "/" },
  { name: "랩스", path: "/labs" },
  { name: "클래스", path: "/community" },
  { name: "소개", path: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/70 backdrop-blur-xl transition-all">
      <div className="absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"></div>
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-extrabold tracking-tighter text-slate-900">
            ZERO<span className="text-emerald-500">01E</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              aria-current={isActive(item.path) ? "page" : undefined}
              className={`text-sm font-medium transition ${
                isActive(item.path)
                  ? "text-emerald-600 underline decoration-2 underline-offset-8 decoration-emerald-400"
                  : "text-slate-600 hover:text-emerald-500"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={isMobileMenuOpen ? "모바일 메뉴 닫기" : "모바일 메뉴 열기"}
          className="rounded-xl border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-50 md:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-slate-900/30 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <aside
        className={`fixed right-0 top-0 z-50 h-screen w-[78%] max-w-xs border-l border-slate-200 bg-white p-6 shadow-2xl transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <span className="text-sm font-extrabold tracking-tight text-slate-900">
            ZERO<span className="text-emerald-500">01E</span> 메뉴
          </span>
          <button
            type="button"
            aria-label="모바일 메뉴 닫기"
            className="rounded-lg border border-slate-200 p-1.5 text-slate-700 transition hover:bg-slate-50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-current={isActive(item.path) ? "page" : undefined}
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                isActive(item.path) ? "bg-emerald-50 text-emerald-700" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
    </header>
  );
}
