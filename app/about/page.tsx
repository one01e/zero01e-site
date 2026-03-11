"use client";

import Link from "next/link";
import { FadeInUp, StaggerGrid, StaggerItem } from "@/components/MotionWrapper";
import { motion } from "framer-motion";
import { MapPin, Briefcase, Code2, Sparkles, User, ArrowRight } from "lucide-react";
import { ABOUT_CONTENT, COMMON_CONTENT } from "@/constants/content";

export default function AboutPage() {
  const { hero, coreValues, location, history, bottomCta } = ABOUT_CONTENT;
  const { urls } = COMMON_CONTENT;

  return (
    <main className="relative flex w-full flex-col items-center overflow-hidden pb-24">
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-teal-400/5 blur-[120px]"></div>

      <section className="mt-4 flex w-full max-w-6xl flex-col items-start px-5 py-20 sm:mt-8 sm:px-8 lg:px-12">
        <FadeInUp delay={0.1}>
          <Link href="/" className="mb-8 flex items-center gap-2 text-sm font-bold text-emerald-600 transition-colors hover:text-emerald-700">
            <span>←</span> 홈으로
          </Link>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-bold tracking-widest text-slate-700 shadow-sm">
            <User className="h-3 w-3 text-emerald-500" />
            {hero.eyebrow}
          </div>
        </FadeInUp>

        <FadeInUp delay={0.3}>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.2] sm:text-5xl lg:text-6xl">
            {hero.title}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              {hero.highlight}
            </span>
          </h1>
        </FadeInUp>

        <FadeInUp delay={0.4}>
          <p className="mt-4 max-w-3xl break-keep text-base leading-relaxed text-slate-600 sm:text-lg">
            {hero.description}
          </p>
        </FadeInUp>
      </section>

      <section className="mt-12 w-full max-w-6xl px-5 sm:mt-16 sm:px-8 lg:px-12">
        <StaggerGrid className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
          <StaggerItem className="lg:col-span-2">
            <motion.div
              whileHover={{ y: -4 }}
              className="flex h-full flex-col justify-center rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-colors hover:border-emerald-200 lg:p-10"
            >
              <h2 className="mb-8 flex items-center gap-2 text-2xl font-extrabold text-slate-900">
                <Sparkles className="h-6 w-6 text-emerald-500" />
                {coreValues.heading}
              </h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="relative pl-5">
                  <div className="absolute left-0 top-1.5 h-5 w-1 rounded-full bg-gradient-to-b from-emerald-400 to-teal-500"></div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900">{coreValues.items[0].title}</h3>
                  <p className="break-keep text-sm leading-relaxed text-slate-600">
                    {coreValues.items[0].desc}
                  </p>
                </div>
                <div className="relative pl-5">
                  <div className="absolute left-0 top-1.5 h-5 w-1 rounded-full bg-gradient-to-b from-teal-400 to-cyan-500"></div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900">{coreValues.items[1].title}</h3>
                  <p className="break-keep text-sm leading-relaxed text-slate-600">
                    {coreValues.items[1].desc}
                  </p>
                </div>
              </div>
            </motion.div>
          </StaggerItem>

          <StaggerItem>
            <motion.div
              whileHover={{ y: -4 }}
              className="flex h-full flex-col rounded-3xl border border-emerald-100 bg-gradient-to-b from-emerald-50/50 to-teal-50/50 p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] lg:p-10"
            >
              <h2 className="mb-4 flex items-center gap-2 text-xl font-extrabold text-slate-900">
                <MapPin className="h-5 w-5 text-emerald-600" />
                {location.heading}
              </h2>
              <p className="flex-1 break-keep text-sm leading-relaxed text-slate-600">{location.description}</p>
              <div className="mt-8 border-t border-emerald-200/50 pt-6">
                <a
                  href={urls.individualForm}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1 text-sm font-bold text-emerald-600 transition-colors hover:text-emerald-700"
                >
                  {location.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          </StaggerItem>
        </StaggerGrid>
      </section>

      <section className="mt-20 w-full max-w-6xl px-5 sm:mt-24 sm:px-8 lg:px-12">
        <FadeInUp>
          <div className="mb-10 flex items-center gap-3">
            <Briefcase className="h-6 w-6 text-slate-700" />
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">{history.heading}</h2>
          </div>
        </FadeInUp>

        <StaggerGrid className="space-y-6">
          {history.items.map((item, idx) => (
            <StaggerItem key={idx}>
              <motion.div
                whileHover={{ x: 4 }}
                className="group flex flex-col gap-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-colors hover:border-emerald-200 hover:shadow-md sm:flex-row sm:gap-10 sm:p-8"
              >
                <div className="flex-shrink-0 pt-1 sm:w-36">
                  <span className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold tracking-widest text-emerald-700">
                    {item.period}
                  </span>
                </div>
                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-xl font-extrabold text-slate-900">
                    {idx === 1 && <Code2 className="h-5 w-5 text-slate-400" />}
                    {item.role}
                  </h3>
                  <p className="max-w-2xl break-keep text-sm leading-relaxed text-slate-600">{item.desc}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      <section className="mt-24 w-full max-w-6xl px-5 text-center sm:px-8 lg:px-12">
        <FadeInUp>
          <p className="mb-6 font-medium text-slate-500">{bottomCta.heading}</p>
          <Link
            href="/community"
            className="inline-flex rounded-2xl bg-slate-900 px-8 py-4 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-1 hover:bg-slate-800"
          >
            {bottomCta.button}
          </Link>
        </FadeInUp>
      </section>
    </main>
  );
}
