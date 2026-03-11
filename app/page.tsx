"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { FadeInUp, StaggerGrid, StaggerItem } from "@/components/MotionWrapper";
import ContactCollaborationBlock from "@/components/ContactCollaborationBlock";
import { HOME_CONTENT, COMMON_CONTENT } from "@/constants/content";
import { Search, Layout, Bot, Activity, Key, PenTool, Layers, Cpu, Monitor, TrendingUp, ArrowRight, User } from "lucide-react";

const getIcon = (iconName: string, className: string): ReactNode => {
  const icons: Record<string, ReactNode> = {
    Search: <Search className={className} />,
    Layout: <Layout className={className} />,
    Bot: <Bot className={className} />,
    Activity: <Activity className={className} />,
    Key: <Key className={className} />,
    PenTool: <PenTool className={className} />,
    Layers: <Layers className={className} />,
    Cpu: <Cpu className={className} />,
    Monitor: <Monitor className={className} />,
    TrendingUp: <TrendingUp className={className} />,
  };
  return icons[iconName] ?? <Bot className={className} />;
};

export default function Home() {
  const { hero, services, works, diagnosis } = HOME_CONTENT;
  const { urls } = COMMON_CONTENT;

  return (
    <main className="relative flex w-full flex-col items-center overflow-hidden pb-24">
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-emerald-400/5 blur-[120px]"></div>

      <section className="relative mt-4 flex w-full max-w-6xl flex-col items-center px-5 py-20 text-center sm:mt-8 sm:px-8 lg:px-12">
        <FadeInUp delay={0.1}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-bold tracking-widest text-emerald-600 shadow-sm sm:mb-8">
            <User className="h-3 w-3 text-emerald-500" />
            {hero.eyebrow}
          </div>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          <h1 className="text-4xl font-extrabold leading-[1.2] tracking-tight text-slate-900 sm:text-5xl sm:leading-tight lg:text-7xl">
            {hero.title}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"> {hero.highlight}</span>
          </h1>
        </FadeInUp>

        <FadeInUp delay={0.3}>
          <p className="mx-auto mt-6 max-w-2xl break-keep text-base leading-relaxed text-slate-600 sm:mt-8 sm:text-xl">{hero.description}</p>
        </FadeInUp>

        <FadeInUp
          delay={0.4}
          className="relative z-10 mt-10 grid w-full max-w-3xl grid-cols-2 divide-x divide-slate-200/60 border-y border-slate-200/60 py-6 text-center sm:grid-cols-3"
        >
          {hero.socialProofs.map((proof, idx) => (
            <div
              key={`${proof.value}-${proof.label}`}
              className={`flex flex-col gap-1 ${
                idx === 2 ? "col-span-2 border-t border-slate-200/60 pt-4 sm:col-span-1 sm:border-l sm:border-t-0 sm:pt-0" : ""
              }`}
            >
              <span className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                {proof.value}
                <span className="text-emerald-500">{proof.suffix}</span>
              </span>
              <span className="text-xs font-medium text-slate-500 sm:text-sm">{proof.label}</span>
            </div>
          ))}
        </FadeInUp>

        <FadeInUp delay={0.5} className="mt-10 flex w-full flex-col flex-wrap justify-center gap-3 px-4 sm:flex-row sm:px-0">
          <a
            href={urls.individualForm}
            target="_blank"
            rel="noreferrer"
            className="w-full rounded-xl bg-slate-900 px-6 py-4 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-slate-800 sm:w-auto sm:text-base"
          >
            {hero.ctas.primary}
          </a>
          <a
            href={urls.corporateForm}
            target="_blank"
            rel="noreferrer"
            className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-1 hover:shadow-lg sm:w-auto sm:text-base"
          >
            {hero.ctas.secondary}
          </a>
          <Link
            href="/community"
            className="w-full rounded-xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 sm:w-auto sm:text-base"
          >
            {hero.ctas.tertiary}
          </Link>
        </FadeInUp>
      </section>

      <section className="mt-20 w-full max-w-6xl px-5 sm:px-8 lg:px-12">
        <FadeInUp>
          <h2 className="mb-8 text-2xl font-extrabold text-slate-900 sm:text-3xl">{services.heading}</h2>
        </FadeInUp>
        <StaggerGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
          {services.items.map((item) => (
            <StaggerItem key={item.title}>
              <div className="group h-full rounded-3xl border border-slate-100 bg-gradient-to-br from-white to-slate-50/50 p-6 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md sm:p-8">
                <div className="mb-4 inline-flex items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 p-3 text-emerald-600 transition-transform group-hover:scale-110">
                  {getIcon(item.icon, "w-6 h-6")}
                </div>
                <h3 className="mb-3 text-lg font-extrabold text-slate-900">{item.title}</h3>
                <p className="break-keep text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      <section className="mt-20 w-full max-w-6xl px-5 sm:px-8 lg:px-12">
        <FadeInUp>
          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">{works.heading}</h2>
            <p className="mt-2 text-sm text-slate-500">{works.description}</p>
          </div>
        </FadeInUp>
        <StaggerGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {works.items.map((work) => (
            <StaggerItem key={work.title}>
              <div className="group h-full rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-teal-200 hover:shadow-md sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-xl bg-teal-50 p-2 text-teal-500">{getIcon(work.icon, "w-5 h-5")}</div>
                  <h3 className="text-base font-extrabold text-slate-900">{work.title}</h3>
                </div>
                <p className="break-keep text-sm leading-relaxed text-slate-600">{work.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      <section className="mt-24 w-full max-w-6xl px-5 sm:px-8 lg:px-12">
        <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/30 p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] sm:p-12">
          <FadeInUp>
            <h2 className="mb-8 text-2xl font-extrabold text-slate-900 sm:text-3xl">{diagnosis.heading}</h2>
          </FadeInUp>

          <StaggerGrid className="relative space-y-4 before:absolute before:inset-y-0 before:left-[19px] before:w-[2px] before:bg-emerald-100">
            {diagnosis.steps.map((step) => (
              <StaggerItem key={step} className="relative flex items-center gap-6 pl-10">
                <div className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-4 border-emerald-50 bg-white">
                  <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                </div>
                <div className="w-full rounded-2xl border border-slate-100 bg-white px-6 py-5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-emerald-200">
                  {step}
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>

          <FadeInUp delay={0.6} className="mt-10">
            <a
              href={urls.individualForm}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-4 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-1 hover:bg-emerald-400"
            >
              {diagnosis.cta} <ArrowRight className="h-4 w-4" />
            </a>
          </FadeInUp>
        </div>
      </section>

      <section className="mt-24 w-full max-w-6xl px-5 sm:px-8 lg:px-12">
        <FadeInUp>
          <ContactCollaborationBlock />
        </FadeInUp>
      </section>
    </main>
  );
}
