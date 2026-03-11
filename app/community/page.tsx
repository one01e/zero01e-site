"use client";

import Link from "next/link";
import { FadeInUp, StaggerGrid, StaggerItem } from "@/components/MotionWrapper";
import { motion } from "framer-motion";

const communityFeatures = [
  {
    title: "실시간 피드백 & Q&A",
    description: "블로그 운영 중 막히는 부분이나 궁금한 점을 언제든 묻고, 명확한 해결책을 얻을 수 있습니다.",
    icon: "💡",
  },
  {
    title: "SEO & AI 노하우 공유",
    description: "검색 노출을 위한 최신 SEO 트렌드와 제작 시간을 획기적으로 줄여주는 AI 프롬프트를 공유합니다.",
    icon: "🚀",
  },
  {
    title: "단계별 커리큘럼 진행",
    description: "왕초보부터 수익화 단계까지, 내 수준에 맞는 미션과 가이드를 통해 체계적으로 성장합니다.",
    icon: "📈",
  },
  {
    title: "동반 성장 네트워킹",
    description: "같은 목표를 가진 멤버들과 인사이트를 나누고 서로 동기부여를 얻는 든든한 환경을 제공합니다.",
    icon: "🤝",
  },
];

const joinUrl = "https://forms.gle/nqjTi3Uoybi8KxwL7";

export default function CommunityPage() {
  return (
    <main className="flex w-full flex-col items-center overflow-hidden pb-24">
      <section className="mt-8 flex w-full max-w-6xl flex-col items-center px-5 py-20 text-center sm:px-8 lg:px-12">
        <FadeInUp delay={0.1} className="mb-12 flex w-full justify-start">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold text-emerald-500 hover:underline">
            <span>←</span> 홈으로
          </Link>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          <div className="mb-6 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold tracking-widest text-emerald-600 shadow-sm">
            MEMBERSHIP CLUB
          </div>
        </FadeInUp>

        <FadeInUp delay={0.3}>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            혼자가 아닌, <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">함께 성장하는 곳</span>
          </h1>
        </FadeInUp>

        <FadeInUp delay={0.4}>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
            블로그를 키우는 과정은 외롭고 지치기 쉽습니다.
            <br className="hidden sm:block" />
            <strong className="text-slate-900">&apos;블사클&apos;</strong>은 든든한 멘토와 동료들이 모여, 어렵고 복잡한 방법 대신
            누구나 따라 할 수 있는 접근으로 꾸준히 성과를 만드는 커뮤니티입니다.
          </p>
        </FadeInUp>
      </section>

      <section className="mt-12 w-full max-w-6xl px-5 sm:px-8 lg:px-12">
        <StaggerGrid className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
          {communityFeatures.map((feature, idx) => (
            <StaggerItem key={idx}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] lg:p-10"
              >
                <div className="mb-6 inline-flex rounded-2xl border border-slate-100 bg-slate-50 p-3 text-3xl shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-extrabold text-slate-900">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{feature.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      <FadeInUp>
        <section className="mt-24 w-full max-w-6xl px-5 sm:px-8 lg:px-12">
          <div className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/50 p-8 text-center shadow-lg shadow-emerald-900/5 lg:p-12">
            <h2 className="mb-6 text-2xl font-extrabold text-slate-900 sm:text-3xl">지금 바로 합류하세요</h2>
            <p className="mx-auto mb-10 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              정기적인 온라인 라이브 세션과 세분화된 커리큘럼이 준비되어 있습니다. 시행착오를 줄이고, 나만의 브랜딩과
              수익화를 향한 여정을 함께 시작해 보세요.
            </p>
            <div className="flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
              <a
                href={joinUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-sm font-bold text-white shadow-md transition-transform hover:-translate-y-1"
              >
                멤버십 가입 안내 →
              </a>
              <button
                type="button"
                disabled
                className="cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-8 py-4 text-sm font-bold text-slate-400"
              >
                오픈채팅방 (준비 중)
              </button>
            </div>
          </div>
        </section>
      </FadeInUp>
    </main>
  );
}
