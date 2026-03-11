"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { name: "홈", path: "/" },
  { name: "서비스", path: "/#works" },
  { name: "랩스", path: "/labs" },
  { name: "커뮤니티", path: "/community" },
  { name: "소개", path: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isWorksActiveByScroll, setIsWorksActiveByScroll] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      setIsWorksActiveByScroll(false);
      return;
    }

    const updateWorksActive = () => {
      const worksSection = document.getElementById("works");
      if (!worksSection) {
        setIsWorksActiveByScroll(false);
        return;
      }

      const triggerLine = window.scrollY + window.innerHeight * 0.35;
      setIsWorksActiveByScroll(triggerLine >= worksSection.offsetTop);
    };

    updateWorksActive();
    window.addEventListener("scroll", updateWorksActive, { passive: true });
    window.addEventListener("resize", updateWorksActive);

    return () => {
      window.removeEventListener("scroll", updateWorksActive);
      window.removeEventListener("resize", updateWorksActive);
    };
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/" && !isWorksActiveByScroll;
    }

    if (path === "/#works") {
      return pathname === "/" && isWorksActiveByScroll;
    }

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

        <div className="flex items-center">
          <a
            href="https://forms.gle/nqjTi3Uoybi8KxwL7"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-emerald-500/20 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/30"
          >
            무료 진단 신청
          </a>
        </div>
      </div>
    </header>
  );
}
