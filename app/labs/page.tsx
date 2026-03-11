"use client";

import Link from "next/link";
import { FadeInUp, StaggerGrid, StaggerItem } from "@/components/MotionWrapper";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Code, Download, FileText, Sparkles } from "lucide-react";
import { LABS_CONTENT, COMMON_CONTENT } from "@/constants/content";

export default function LabsPage() {
  const { hero, resources, agents, scripts, bottomCta } = LABS_CONTENT;
  const { urls } = COMMON_CONTENT;

  return (
    <main className="relative flex w-full flex-col items-center overflow-hidden pb-24">
      <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-teal-400/5 blur-[120px]"></div>

      <section className="mt-4 flex w-full max-w-6xl flex-col items-start px-5 py-20 sm:mt-8 sm:px-8 lg:px-12">
        <FadeInUp delay={0.1}>
          <Link href="/" className="mb-8 flex items-center gap-2 text-sm font-bold text-emerald-600 transition-colors hover:text-emerald-700">
            <span>←</span> 돌아가기
          </Link>
        </FadeInUp>
        <FadeInUp delay={0.2}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-bold tracking-widest text-slate-700 shadow-sm">
            <Sparkles className="h-3 w-3 text-emerald-500" />
            {hero.eyebrow}
          </div>
        </FadeInUp>
        <FadeInUp delay={0.3}>
          <h1 className="mb-6 text-4xl font-extrabold leading-[1.2] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {hero.title}
            <br className="block sm:hidden" />
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"> {hero.highlight}</span>
          </h1>
        </FadeInUp>
        <FadeInUp delay={0.4}>
          <p className="max-w-2xl break-keep text-base leading-relaxed text-slate-600 sm:text-lg">{hero.description}</p>
        </FadeInUp>
      </section>

      <section className="mt-12 w-full max-w-6xl px-5 sm:px-8 lg:px-12">
        <FadeInUp>
          <div className="mb-8 flex flex-col">
            <h2 className="flex items-center gap-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              <FileText className="h-6 w-6 text-emerald-500" />
              {resources.heading}
            </h2>
            <p className="mt-2 text-sm text-slate-500">{resources.caption}</p>
          </div>
        </FadeInUp>
        <StaggerGrid className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
          {resources.items.map((item, idx) => (
            <StaggerItem key={idx}>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                className="group relative flex h-full flex-col justify-between rounded-3xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/50 p-6 shadow-[0_4px_20px_rgb(0,0,0,0.04)] transition-all hover:border-emerald-300 hover:shadow-[0_8px_30px_rgb(16,185,129,0.1)] sm:p-8"
              >
                <div>
                  <span className="mb-4 inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white shadow-sm">
                    {item.type}
                  </span>
                  <h3 className="mb-3 text-xl font-extrabold text-slate-900">{item.title}</h3>
                  <p className="break-keep text-sm leading-relaxed text-slate-600">{item.desc}</p>
                </div>
                <a
                  href={urls.waitlistForm}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition-all group-hover:border-emerald-500 group-hover:bg-emerald-500 group-hover:text-white sm:w-auto"
                >
                  <span className="flex items-center gap-2">
                    <Download className="h-4 w-4" /> 무료로 받기
                  </span>
                  <ArrowRight className="-translate-x-2 h-4 w-4 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </a>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      <section className="mt-20 w-full max-w-6xl px-5 sm:px-8 lg:px-12">
        <FadeInUp>
          <div className="mb-8 flex items-center gap-3">
            <Bot className="h-6 w-6 text-teal-500" />
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">{agents.heading}</h2>
          </div>
        </FadeInUp>
        <StaggerGrid className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
          {agents.items.map((agent, idx) => (
            <StaggerItem key={idx}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group flex h-full flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-colors hover:border-teal-200 sm:p-8"
              >
                <div>
                  <div className="mb-4 flex items-start justify-between">
                    <span className="inline-flex items-center rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">
                      {agent.type}
                    </span>
                    <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-bold text-slate-500">{agent.status}</span>
                  </div>
                  <h3 className="mb-3 text-lg font-extrabold text-slate-900">{agent.title}</h3>
                  <p className="break-keep text-sm leading-relaxed text-slate-600">{agent.desc}</p>
                </div>
                <a
                  href={agent.link}
                  className="mt-8 inline-flex items-center text-sm font-bold text-teal-600 transition-colors group-hover:text-teal-700"
                >
                  사용해보기 →
                </a>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      <section className="mt-20 w-full max-w-6xl px-5 sm:px-8 lg:px-12">
        <FadeInUp>
          <div className="mb-8 flex items-center gap-3">
            <Code className="h-6 w-6 text-slate-700" />
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">{scripts.heading}</h2>
          </div>
        </FadeInUp>
        <StaggerGrid className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
          {scripts.items.map((script, idx) => (
            <StaggerItem key={idx}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group flex h-full flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-colors hover:border-slate-300 sm:p-8"
              >
                <div>
                  <div className="mb-4 flex items-start justify-between">
                    <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                      {script.type}
                    </span>
                    <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-bold text-slate-500">{script.status}</span>
                  </div>
                  <h3 className="mb-3 text-lg font-extrabold text-slate-900">{script.title}</h3>
                  <p className="break-keep text-sm leading-relaxed text-slate-600">{script.desc}</p>
                </div>
                <a
                  href={script.link}
                  className="mt-8 inline-flex items-center text-sm font-bold text-slate-600 transition-colors group-hover:text-slate-900"
                >
                  코드 보기 →
                </a>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      <section className="mt-24 w-full max-w-6xl px-5 sm:px-8 lg:px-12">
        <FadeInUp>
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 p-8 text-center shadow-xl sm:p-12">
            <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl"></div>

            <h2 className="mb-4 text-2xl font-extrabold text-white sm:mb-6 sm:text-3xl">
              {bottomCta.heading}
            </h2>
            <p className="mx-auto mb-8 max-w-2xl break-keep text-sm leading-relaxed text-slate-400 sm:mb-10 sm:text-base">
              {bottomCta.description}
            </p>
            <div className="flex justify-center">
              <a
                href={urls.corporateForm}
                target="_blank"
                rel="noreferrer"
                className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-1 sm:w-auto"
              >
                {bottomCta.button}
              </a>
            </div>
          </div>
        </FadeInUp>
      </section>
    </main>
  );
}
