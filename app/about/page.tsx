"use client";

import Link from "next/link";
import ContactCollaborationBlock from "@/components/ContactCollaborationBlock";
import { FadeInUp, StaggerGrid, StaggerItem } from "@/components/MotionWrapper";
import { motion } from "framer-motion";

const timeline = [
  {
    period: "현재",
    role: "블로그 컨설턴트 & 커뮤니티 리더",
    description:
      "블사클 커뮤니티 운영 및 온라인/대구 1:1 오프라인 컨설팅 진행. AI 기반 SEO 자동화 파이프라인 구축.",
  },
  {
    period: "15년+",
    role: "시니어 소프트웨어 엔지니어 (SM/SI)",
    description:
      "Delphi, Oracle, MSSQL 환경에서 복잡한 기업용 레거시 시스템의 유지보수 및 최적화를 전담하며 구조적 문제 해결 능력을 체득했습니다.",
  },
];

export default function AboutPage() {
  return (
    <main className="flex w-full flex-col items-center overflow-hidden pb-24">
      <section className="mt-8 flex w-full max-w-6xl flex-col items-start px-5 py-20 sm:px-8 lg:px-12">
        <FadeInUp delay={0.1}>
          <Link href="/" className="mb-8 flex items-center gap-2 text-sm font-bold text-emerald-500 hover:underline">
            <span>←</span> 홈으로
          </Link>
        </FadeInUp>
        <FadeInUp delay={0.2}>
          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            15년의 엔지니어링 경험,
            <br />
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              이제는 비즈니스의 0에서 1을 만듭니다.
            </span>
          </h1>
        </FadeInUp>
        <FadeInUp delay={0.3}>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
            안녕하세요, <strong className="text-slate-900">제로원(zero01e)</strong>입니다.
            <br />저는 15년 이상 복잡한 레거시 시스템을 다루며 &apos;어떻게 하면 더 효율적이고 안정적으로 구조를 짤 수 있을까&apos;를
            치열하게 고민해 온 개발자입니다. 지금은 그 구조적 사고를 바탕으로 블로그 기획, SEO 최적화, 그리고 AI 도구
            활용을 돕는 조력자로 활동하고 있습니다.
          </p>
        </FadeInUp>
      </section>

      <section className="mt-12 w-full max-w-6xl px-5 sm:px-8 lg:px-12">
        <StaggerGrid className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
          <StaggerItem className="lg:col-span-2">
            <motion.div
              whileHover={{ y: -2 }}
              className="flex h-full flex-col justify-center rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] lg:p-10"
            >
              <h2 className="mb-8 text-2xl font-extrabold text-slate-900">제가 일하는 방식</h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="relative">
                  <div className="absolute -left-4 top-1 h-5 w-1 rounded-r-md bg-gradient-to-b from-emerald-400 to-teal-500"></div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900">0부터 1까지</h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    가장 어려운 것은 &apos;시작&apos;입니다. 막연한 아이디어를 실행 가능한 최소 기능(MVP)과 글로 빠르게 만들어내는
                    데 집중합니다.
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -left-4 top-1 h-5 w-1 rounded-r-md bg-gradient-to-b from-teal-400 to-cyan-500"></div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900">구조와 최적화</h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    15년간 복잡한 시스템을 다뤄온 경험을 바탕으로, 단발성 작업이 아닌 오래 지속되고 검색엔진에 최적화(SEO)된
                    콘텐츠 구조를 설계합니다.
                  </p>
                </div>
              </div>
            </motion.div>
          </StaggerItem>

          <StaggerItem>
            <motion.div whileHover={{ y: -2 }} className="h-full">
              <ContactCollaborationBlock title="컨설팅 & 협업 안내" />
            </motion.div>
          </StaggerItem>
        </StaggerGrid>
      </section>

      <section className="mt-20 w-full max-w-6xl px-5 sm:px-8 lg:px-12">
        <FadeInUp>
          <h2 className="mb-10 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">걸어온 길</h2>
        </FadeInUp>
        <StaggerGrid className="space-y-6">
          {timeline.map((item, idx) => (
            <StaggerItem key={idx}>
              <motion.div
                whileHover={{ x: 4 }}
                className="group flex flex-col gap-4 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-colors hover:border-emerald-200 sm:flex-row sm:gap-10"
              >
                <div className="flex-shrink-0 pt-1 sm:w-32">
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-bold tracking-widest text-emerald-600">
                    {item.period}
                  </span>
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-extrabold text-slate-900">{item.role}</h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>
    </main>
  );
}
