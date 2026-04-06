"use client";

import { useState } from "react";
import Link from "next/link";
import { FadeInUp, StaggerGrid, StaggerItem } from "@/components/MotionWrapper";
import { motion } from "framer-motion";
import { Bell, ChevronDown, Gift, Lock, Target, Users } from "lucide-react";
import { COMMUNITY_CONTENT, COMMON_CONTENT } from "@/constants/content";

export default function CommunityPage() {
  const { hero, curriculum, benefits, bottomCta } = COMMUNITY_CONTENT;
  const { urls } = COMMON_CONTENT;
  const [openClass, setOpenClass] = useState<string | null>("클래스 1 [코어]");

  return (
    <main className="relative flex w-full flex-col items-center overflow-hidden pb-24">
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-emerald-400/5 blur-[120px]"></div>

      <section className="mt-4 flex w-full max-w-6xl flex-col items-center px-5 py-20 text-center sm:mt-8 sm:px-8 lg:px-12">
        <FadeInUp delay={0.1} className="mb-8 flex w-full justify-start sm:mb-12">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold text-emerald-600 transition-colors hover:text-emerald-700">
            <span>←</span> 홈으로
          </Link>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-bold tracking-widest text-slate-700 shadow-sm">
            <span>{hero.eyebrow}</span>
            <span className="mx-1 text-slate-300">|</span>
            <Lock className="h-3 w-3 text-rose-500" />
            <span className="text-slate-400 line-through">{hero.status.closed}</span>
            <span className="mx-1 text-slate-300">|</span>
            <Bell className="h-3 w-3 animate-bounce text-emerald-500" />
            <span className="text-emerald-600">{hero.status.open}</span>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.3}>
          <h1 className="mb-6 text-4xl font-extrabold leading-[1.2] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {hero.title}
            <br className="block sm:hidden" />
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"> {hero.highlight}</span>
          </h1>
        </FadeInUp>

        <FadeInUp delay={0.4}>
          <p className="max-w-2xl break-keep px-4 text-base leading-relaxed text-slate-600 sm:px-0 sm:text-lg">
            {hero.description}
            <br />
            <span className="mt-2 inline-block rounded bg-emerald-50 px-2 py-1 font-bold text-emerald-600">{hero.notice}</span>
          </p>
        </FadeInUp>
      </section>

      <section className="mt-12 w-full max-w-6xl px-5 sm:mt-16 sm:px-8 lg:px-12">
        <FadeInUp>
          <div className="mb-10 flex flex-col items-center text-center sm:mb-12">
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">{curriculum.heading}</h2>
            <p className="mt-3 text-sm text-slate-500 sm:text-base">{curriculum.description}</p>
          </div>
        </FadeInUp>

        <StaggerGrid className="space-y-4">
          {curriculum.items.map((item) => (
            <StaggerItem key={item.class}>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-colors hover:border-emerald-200 sm:p-8"
              >
                <button
                  type="button"
                  disabled={!item.expandable}
                  onClick={() => setOpenClass((prev) => (prev === item.class ? null : item.class))}
                  className={`flex w-full items-start justify-between gap-4 text-left ${
                    item.expandable ? "cursor-pointer" : "cursor-not-allowed"
                  }`}
                >
                  <div className="flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700 sm:text-sm">
                        {item.class}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          item.expandable ? "bg-teal-50 text-teal-700" : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {item.state}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-extrabold text-slate-900 sm:text-xl">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">{item.subtitle}</p>
                    <p className="mt-2 text-xs font-bold uppercase tracking-wide text-emerald-600 sm:text-sm">{item.framework}</p>
                  </div>
                  <div
                    className={`mt-1 rounded-xl border p-2 ${
                      item.expandable ? "border-emerald-100 bg-emerald-50 text-emerald-600" : "border-slate-200 bg-slate-50 text-slate-400"
                    }`}
                  >
                    {item.expandable ? (
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${openClass === item.class ? "rotate-180" : "rotate-0"}`}
                      />
                    ) : (
                      <Lock className="h-4 w-4" />
                    )}
                  </div>
                </button>

                {item.expandable && openClass === item.class && (
                  <div className="mt-5 border-t border-slate-100 pt-5">
                    <ul className="space-y-2 text-sm text-slate-600">
                      {item.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2">
                          <Target className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </StaggerItem>
          ))}

          <StaggerItem>
            <motion.div
              whileHover={{ y: -4 }}
              className="flex h-full flex-col justify-center rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] sm:p-8"
            >
              <div className="mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-emerald-600" />
                  <h3 className="text-lg font-extrabold text-slate-900">{benefits.title}</h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-600">
                  {benefits.items.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2">
                      <span className="mt-0.5 text-emerald-500">•</span>
                      {benefit}
                    </li>
                  ))}
              </ul>
            </motion.div>
          </StaggerItem>
        </StaggerGrid>
      </section>

      {/*
        [예정 섹션] 1기 성과 및 리얼 후기
        - 1기가 종료된 후 주석을 해제하고 멤버들의 성과(트래픽 상승률 등)와 후기를 채워 넣으세요.
      */}
      {/*
      <section className="mt-24 w-full max-w-6xl px-5 sm:px-8 lg:px-12">
        <FadeInUp>
          <div className="mb-10 flex flex-col items-center text-center sm:mb-12">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-600">
              ✨ 1기 멤버 성과 리포트
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">단 5주 만에 만들어낸 변화</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
              <p className="text-sm italic text-slate-600">
                &quot;방향성을 못 잡고 있었는데, 일이님 컨설팅 이후 일 방문자가 300% 상승했습니다.&quot;
              </p>
              <p className="mt-4 text-sm font-bold text-slate-900">- IT 블로거 A님</p>
            </div>
          </div>
        </FadeInUp>
      </section>
      */}

      <section className="mt-16 w-full max-w-6xl px-5 sm:mt-24 sm:px-8 lg:px-12">
        <FadeInUp>
          <div className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/50 p-8 text-center shadow-xl shadow-emerald-900/5 sm:p-12">
            <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-teal-400/10 blur-2xl"></div>

            <h2 className="mb-4 text-2xl font-extrabold text-slate-900 sm:mb-6 sm:text-3xl">
              {bottomCta.heading.split(",")[0]},
              <br className="block sm:hidden" /> {bottomCta.heading.split(",")[1]}
            </h2>
            <p className="mx-auto mb-8 max-w-2xl break-keep text-sm leading-relaxed text-slate-600 sm:mb-10 sm:text-base">
              {bottomCta.description}
            </p>

            <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
              <a
                href={urls.bsclSeason2WaitlistForm}
                target="_blank"
                rel="noreferrer"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-4 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-1 sm:w-auto"
              >
                <Bell className="h-4 w-4 text-emerald-400" />
                {bottomCta.buttonWaitlist}
              </a>
              <a
                href={urls.bsclOpenTalk}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-8 py-4 text-sm font-bold text-emerald-600 shadow-sm transition-all hover:bg-emerald-50 sm:w-auto"
              >
                <Gift className="h-4 w-4" />
                {bottomCta.buttonEarlybird}
              </a>
            </div>
          </div>
        </FadeInUp>
      </section>
    </main>
  );
}
