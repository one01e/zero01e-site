"use client";

import { ArrowRight, Globe, Handshake, LineChart, Mail, MessageCircle } from "lucide-react";

type ContactCollaborationBlockProps = {
  title?: string;
};

export default function ContactCollaborationBlock({ title = "연락 & 협업" }: ContactCollaborationBlockProps) {
  return (
    <div className="flex h-full flex-col justify-between rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] lg:p-10">
      <div>
        <h2 className="mb-4 text-2xl font-extrabold text-slate-900">{title}</h2>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          온라인 / 대구 오프라인 1:1 컨설팅 진행 중
        </div>
      </div>

      <div className="my-6 flex flex-1 flex-col justify-center gap-3">
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 transition-colors hover:border-slate-300">
          <div className="mb-2 flex items-center gap-2">
            <LineChart className="h-5 w-5 text-emerald-500" />
            <h3 className="text-sm font-bold text-slate-900">블로그 진단 & 수익화 컨설팅</h3>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">
            방향성을 잃은 블로그의 현황을 점검하고, 성장과 수익화를 위한 명확한 솔루션 및 운영 구조를 제안해 드립니다.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/30 p-5 transition-colors hover:border-emerald-300">
          <div className="mb-2 flex items-center gap-2">
            <Handshake className="h-5 w-5 text-teal-500" />
            <h3 className="text-sm font-bold text-slate-900">비즈니스 협업 & 마케팅 대행</h3>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">
            IT/테크 분야의 전문성을 기반으로, 탄탄한 인플루언서 네트워크 및 커뮤니티 채널과 연계한 폭넓은 협업 캠페인
            기획 및 대행이 가능합니다.
          </p>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-3">
        <a
          href="mailto:choi01e@naver.com"
          className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-sm"
        >
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-slate-400 transition-colors group-hover:text-emerald-500" />
            <span className="text-sm font-bold text-slate-700 group-hover:text-emerald-700">네이버 메일</span>
          </div>
        </a>
        <a
          href="mailto:choi01e@gmail.com"
          className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-teal-300 hover:bg-teal-50 hover:shadow-sm"
        >
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-slate-400 transition-colors group-hover:text-teal-500" />
            <span className="text-sm font-bold text-slate-700 group-hover:text-teal-700">지메일</span>
          </div>
        </a>
        <a
          href="https://www.threads.com/@one01e"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-slate-300 hover:bg-slate-50"
        >
          <div className="flex items-center gap-3">
            <MessageCircle className="h-5 w-5 text-slate-400 transition-colors group-hover:text-slate-700" />
            <span className="text-sm font-bold text-slate-700">Threads</span>
          </div>
          <ArrowRight className="-translate-x-2 h-4 w-4 text-slate-300 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
        </a>
        <a
          href="https://one01e.com"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-slate-300 hover:bg-slate-50"
        >
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-slate-400 transition-colors group-hover:text-slate-700" />
            <span className="text-sm font-bold text-slate-700">Blog</span>
          </div>
          <ArrowRight className="-translate-x-2 h-4 w-4 text-slate-300 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
        </a>
      </div>
    </div>
  );
}
