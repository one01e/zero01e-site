"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ContactCollaborationBlock from "@/components/ContactCollaborationBlock";
import { FadeInUp, StaggerGrid, StaggerItem } from "@/components/MotionWrapper";

const formUrl = "https://forms.gle/nqjTi3Uoybi8KxwL7";

const helpItems = [
  {
    title: "키워드/주제 기획",
    description: "검색 유입 가능성이 높은 주제를 찾고, 이어서 쓸 수 있는 흐름까지 설계합니다.",
  },
  {
    title: "글 구조/흐름 개선",
    description: "핵심 메시지가 잘 전달되도록 글의 순서와 구조를 읽기 쉽게 정리합니다.",
  },
  {
    title: "AI 도구 활용 루틴",
    description: "복잡하지 않은 방식으로, 상황에 맞는 AI 활용 루틴을 만들어 드립니다.",
  },
  {
    title: "블로그 진단 & 방향성 제안",
    description: "현재 상태를 점검하고, 지금 가장 먼저 해야 할 개선 방향을 명확히 안내합니다.",
  },
];

const works = [
  { title: "키워드 발굴 & 주제 기획", description: "검색 유입이 가능한 주제를 빠르게 찾고, 글로 이어지게 설계합니다." },
  { title: "SEO 글 구조 설계", description: "제목/목차/흐름을 잡아 읽기 쉽고 오래 남는 글을 만듭니다." },
  { title: "콘텐츠 시리즈 설계", description: "1회성 글이 아니라, 연재/확장 가능한 구조로 운영을 돕습니다." },
  { title: "AI 도구 활용 워크플로우", description: "상황에 맞는 AI 툴 조합으로 제작 시간을 줄입니다." },
  { title: "브랜딩 랜딩 페이지 제작", description: "\"나는 누구인가\"를 10초 안에 전달하는 페이지를 만듭니다." },
  { title: "블로그 진단 & 개선 가이드", description: "현재 상태를 점검하고, 우선순위대로 개선 방향을 제시합니다." },
];

const strengths = [
  "복잡한 정보를 쉽게 정리합니다",
  "실행 가능한 형태로 빠르게 만듭니다",
  "혼자서도 꾸준히 운영할 수 있게 구조를 잡습니다",
];

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center overflow-hidden pb-24">
      <section className="relative mt-4 flex w-full max-w-6xl flex-col items-center px-5 py-24 text-center sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/10 blur-[100px]"></div>

        <FadeInUp delay={0.1}>
          <div className="relative z-10 mb-8 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold tracking-widest text-emerald-600 shadow-sm">
            ZERO01E / 제로원
          </div>
        </FadeInUp>
        <FadeInUp delay={0.2}>
          <h1 className="relative z-10 text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">0에서 1을</span> 만드는 사람
          </h1>
        </FadeInUp>
        <FadeInUp delay={0.3}>
          <p className="relative z-10 mt-8 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            블로그 · SEO · AI 도구를 활용해 <strong>‘쉽게 시작하고, 꾸준히 성장’</strong>하도록 돕습니다. 막연한 아이디어를
            실제로 쓸 수 있는 결과물로 바꾸고, 복잡한 과정을 단순하게 풀어냅니다.
          </p>
        </FadeInUp>

        <FadeInUp delay={0.4} className="relative z-10 mt-10 flex flex-wrap justify-center gap-4">
          <a
            href={formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-slate-900 px-8 py-4 text-base font-bold text-white shadow-lg transition-colors hover:bg-slate-800"
          >
            무료 진단 신청하기
          </a>
          <a
            href="#works"
            className="rounded-2xl border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50"
          >
            대표 작업 보기
          </a>
        </FadeInUp>
      </section>

      <section className="mt-12 w-full max-w-6xl px-5 sm:px-8 lg:px-12">
        <StaggerGrid className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
          <StaggerItem
            className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] lg:p-10 md:col-span-2"
            whileHover={{ scale: 1.01, y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <h2 className="mb-4 text-2xl font-extrabold text-slate-900">어렵고 복잡한 건 배제합니다.</h2>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              저는 '제로원'으로 시작해서 현재는 '일이'로 활동하며,
              블로그를 시작하고 키우고 싶은 분들이 길을 잃지 않도록 돕고 있습니다.
              키워드 발굴과 주제 기획, 실무에서 바로 쓰는 AI 도구 활용, 빠르게 만들고 검증하는 방식에 집중합니다.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              {strengths.map((strength, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-slate-700">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  {strength}
                </div>
              ))}
            </div>
          </StaggerItem>

          <div className="flex flex-col gap-4 md:col-span-1 lg:gap-6">
            <StaggerItem>
              <Link href="/community" className="block h-full">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="group h-full rounded-3xl border border-slate-100 bg-white p-8 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-slate-900">블사클 커뮤니티</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-500">블로그 운영 고민, 질문, 피드백과 AI 사용 노하우와 정보를 함께 나누는 오픈 공간입니다.</p>
                  <div className="mt-4 text-sm font-bold text-emerald-500">참여하기 →</div>
                </motion.div>
              </Link>
            </StaggerItem>

            <StaggerItem>
              <Link href="/labs" className="block h-full">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="group h-full rounded-3xl border border-slate-100 bg-white p-8 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-slate-900">Labs & Tools</h3>
                  <p className="mt-2 text-sm text-slate-500">업무를 돕는 "0부터 1까지" Gpts, Gems 챗봇 및 프롬프트와 다양한 스크립트 모음 공유.</p>
                  <div className="mt-4 text-sm font-bold text-slate-400 transition-colors group-hover:text-emerald-500">
                    둘러보기 →
                  </div>
                </motion.div>
              </Link>
            </StaggerItem>
          </div>
        </StaggerGrid>
      </section>

      <section className="mt-24 w-full max-w-6xl px-5 sm:px-8 lg:px-12">
        <FadeInUp>
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">제가 도와드릴 수 있어요</h2>
        </FadeInUp>
        <StaggerGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {helpItems.map((item) => (
            <StaggerItem key={item.title}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm lg:p-8"
              >
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.description}</p>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      <section id="works" className="mt-24 w-full max-w-6xl px-5 sm:px-8 lg:px-12">
        <FadeInUp>
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">대표 작업</h2>
              <p className="mt-2 text-sm text-slate-600">제가 실제로 자주, 그리고 잘하는 작업들입니다.</p>
            </div>
          </div>
        </FadeInUp>
        <StaggerGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {works.map((work) => (
            <StaggerItem key={work.title}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group rounded-3xl border border-slate-100 bg-white p-8 shadow-sm"
              >
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 transition-colors group-hover:border-emerald-200 group-hover:text-emerald-600">
                  <span className="text-lg">✦</span>
                </div>
                <h3 className="text-base font-semibold text-slate-900">{work.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{work.description}</p>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      <section className="mt-24 w-full max-w-6xl px-5 sm:px-8 lg:px-12">
        <FadeInUp>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm lg:p-10"
            >
              <h2 className="mb-6 text-2xl font-bold text-slate-900">무료 진단은 이렇게 진행돼요</h2>
              <div className="relative space-y-4 before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-slate-100">
                {[
                  "폼 작성 (업종/목표/현황)",
                  "현황 진단 (키워드/구조/흐름)",
                  "개선 제안 (우선순위 플랜)",
                  "필요 시 협업 안내",
                ].map((step, idx) => (
                  <div key={idx} className="relative flex items-center gap-6 pl-8">
                    <div className="absolute left-0 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border-2 border-emerald-200 bg-white">
                      <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                    </div>
                    <div className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm text-slate-600">
                      <span className="mr-2 font-mono text-emerald-600">0{idx + 1}</span> {step}
                    </div>
                  </div>
                ))}
              </div>
              <a
                href={formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                진단 시작하기
              </a>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="h-full"
            >
              <ContactCollaborationBlock />
            </motion.div>
          </div>
        </FadeInUp>
      </section>

      <FadeInUp>
        <footer className="mt-24 flex w-full max-w-6xl items-center justify-between border-t border-slate-200 px-5 pb-12 pt-8 text-xs text-slate-500 sm:px-8 lg:px-12">
          <p>© {new Date().getFullYear()} ZERO01E. All rights reserved.</p>
          <p>Built with Next.js & Tailwind</p>
        </footer>
      </FadeInUp>
    </main>
  );
}
