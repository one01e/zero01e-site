"use client";

import Link from "next/link";
import { FadeInUp, StaggerGrid, StaggerItem } from "@/components/MotionWrapper";
import { motion } from "framer-motion";

const formUrl = "https://forms.gle/nqjTi3Uoybi8KxwL7";

const aiAgents = [
  {
    title: "0부터 1까지",
    type: "Gems",
    description: "블로그 주제 기획부터 글의 뼈대(목차) 작성까지, 막막한 시작을 돕는 맞춤형 AI 챗봇입니다.",
    status: "Active",
    link: "#",
  },
  {
    title: "SEO 아티클 최적화 봇",
    type: "GPTs",
    description: "작성된 원고를 바탕으로 검색 엔진 친화적인 제목과 메타 디스크립션을 뽑아주는 GPTs입니다.",
    status: "Beta",
    link: "#",
  },
];

const pythonScripts = [
  {
    title: "멀티 플랫폼 자동 발행 스니펫",
    type: "Python",
    description:
      "마크다운으로 작성된 글을 네이버, 티스토리, 구글 블로거(Blogspot) 양식에 맞춰 자동 변환하고 임시 저장하는 스크립트입니다.",
    status: "Private",
    link: "#",
  },
  {
    title: "키워드 트래픽 모니터링",
    type: "Python",
    description:
      "타겟 키워드의 상위 노출 순위 변화와 검색량 추이를 주기적으로 크롤링하여 요약해 주는 자동화 툴입니다.",
    status: "v1.2",
    link: "#",
  },
];

export default function LabsPage() {
  return (
    <main className="relative flex w-full flex-col items-center overflow-hidden pb-24">
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-teal-400/5 blur-[120px]"></div>

      <section className="mt-8 flex w-full max-w-6xl flex-col items-start px-5 py-20 sm:px-8 lg:px-12">
        <FadeInUp delay={0.1}>
          <Link href="/" className="mb-6 flex items-center gap-2 text-sm font-bold text-emerald-500 hover:underline">
            <span>←</span> 돌아가기
          </Link>
        </FadeInUp>
        <FadeInUp delay={0.2}>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Labs & Tools</h1>
        </FadeInUp>
        <FadeInUp delay={0.3}>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            반복되는 업무를 줄이고 효율을 높이기 위해 직접 만든 AI 챗봇과 자동화 스크립트들을 공유합니다. 실무에서 바로
            꺼내 쓸 수 있는 도구들입니다.
          </p>
        </FadeInUp>
      </section>

      <section className="mt-12 w-full max-w-6xl px-5 sm:px-8 lg:px-12">
        <FadeInUp>
          <div className="mb-8 flex items-center gap-3">
            <div className="h-6 w-1.5 rounded-full bg-gradient-to-b from-emerald-400 to-teal-500"></div>
            <h2 className="text-2xl font-bold text-slate-900">AI Agents</h2>
          </div>
        </FadeInUp>
        <StaggerGrid className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
          {aiAgents.map((agent, idx) => (
            <StaggerItem key={idx}>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group relative flex min-h-[240px] flex-col justify-between rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)]"
              >
                <div>
                  <div className="mb-4 flex items-start justify-between">
                    <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">
                      {agent.type}
                    </span>
                    <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-bold text-slate-500">
                      {agent.status}
                    </span>
                  </div>
                  <h3 className="mb-3 text-xl font-extrabold text-slate-900">{agent.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{agent.description}</p>
                </div>
                <a
                  href={agent.link}
                  className="mt-8 inline-flex items-center text-sm font-bold text-emerald-500 transition-colors group-hover:text-emerald-600"
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
            <div className="h-6 w-1.5 rounded-full bg-gradient-to-b from-emerald-400 to-teal-500"></div>
            <h2 className="text-2xl font-bold text-slate-900">Automation Scripts</h2>
          </div>
        </FadeInUp>
        <StaggerGrid className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
          {pythonScripts.map((script, idx) => (
            <StaggerItem key={idx}>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group relative flex min-h-[240px] flex-col justify-between rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)]"
              >
                <div>
                  <div className="mb-4 flex items-start justify-between">
                    <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">
                      {script.type}
                    </span>
                    <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-bold text-slate-500">
                      {script.status}
                    </span>
                  </div>
                  <h3 className="mb-3 text-xl font-extrabold text-slate-900">{script.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{script.description}</p>
                </div>
                <a
                  href={script.link}
                  className="mt-8 inline-flex items-center text-sm font-bold text-emerald-500 transition-colors group-hover:text-emerald-600"
                >
                  코드 보기 →
                </a>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      <FadeInUp>
        <section className="mt-24 w-full max-w-6xl px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-10 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">맞춤형 자동화 툴이 필요하신가요?</h2>
            <p className="mb-8 max-w-xl text-sm text-slate-600 sm:text-base">
              개인이나 소규모 비즈니스에 딱 맞는 프롬프트 설계부터 업무 자동화 스크립트 제작까지, 도움이 필요하다면 언제든
              문의해 주세요.
            </p>
            <a
              href={formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              도입 문의하기
            </a>
          </div>
        </section>
      </FadeInUp>
    </main>
  );
}
