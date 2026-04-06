"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { ArrowLeft, Clock3 } from "lucide-react";
import DiagnosisResult from "@/components/DiagnosisResult";
import {
  DIAGNOSIS_RESULT_STORAGE_KEY,
  type DiagnosisSubmissionResult,
} from "@/constants/diagnosisApi";

function DiagnosisResultContent() {
  const searchParams = useSearchParams();
  const [payload] = useState<DiagnosisSubmissionResult | null>(() => {
    if (typeof window === "undefined") return null;
    const raw = sessionStorage.getItem(DIAGNOSIS_RESULT_STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as DiagnosisSubmissionResult;
    } catch {
      sessionStorage.removeItem(DIAGNOSIS_RESULT_STORAGE_KEY);
      return null;
    }
  });

  const requestedSubmissionId = searchParams.get("submission");
  const isMismatchedSubmission =
    Boolean(requestedSubmissionId) && Boolean(payload?.submissionId) && requestedSubmissionId !== payload?.submissionId;

  if (!payload || isMismatchedSubmission) {
    return (
      <main className="flex min-h-[calc(100vh-64px)] w-full items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">결과 데이터를 찾을 수 없습니다.</h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-300">
            진단을 먼저 완료해 주세요. 브라우저 세션이 초기화되면 결과 데이터가 사라질 수 있습니다.
          </p>
          <Link
            href="/labs/diagnosis"
            className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-400"
          >
            진단 다시 시작
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex w-full flex-col items-center overflow-hidden pb-24">
      <div className="pointer-events-none absolute right-0 top-0 h-[360px] w-[360px] rounded-full bg-emerald-400/10 blur-[100px]" />

      <section className="mt-4 w-full max-w-4xl px-5 py-14 sm:mt-8 sm:px-8 lg:px-12">
        <Link href="/labs/diagnosis" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700">
          <ArrowLeft className="h-4 w-4" />
          진단으로 돌아가기
        </Link>

        <DiagnosisResult
          score={payload.result.score}
          maxScore={payload.result.maxScore}
          level={payload.result.level.key}
          byCategory={payload.result.byCategory}
        />

        <div className="mt-5 rounded-2xl border border-slate-100 bg-white p-5 text-sm shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-xs font-bold tracking-wide text-slate-400 dark:text-slate-500">SUBMISSION INFO</p>
          <div className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
            <div className="rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800">
              <p className="text-xs text-slate-400 dark:text-slate-500">이름</p>
              <p className="font-semibold text-slate-700 dark:text-slate-200">{payload.lead.name}</p>
            </div>
            <div className="rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800">
              <p className="text-xs text-slate-400 dark:text-slate-500">연락처</p>
              <p className="font-semibold text-slate-700 dark:text-slate-200">{payload.lead.phoneMasked}</p>
            </div>
            <div className="rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800">
              <p className="text-xs text-slate-400 dark:text-slate-500">블로그</p>
              <p className="truncate font-semibold text-slate-700 dark:text-slate-200">{payload.lead.blogUrl}</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
            <Clock3 className="mr-1 inline h-3.5 w-3.5 align-text-bottom" />
            {new Date(payload.submittedAt).toLocaleString("ko-KR")}
          </p>
        </div>
      </section>
    </main>
  );
}

export default function DiagnosisResultPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[calc(100vh-64px)] w-full items-center justify-center">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-300">결과를 불러오는 중...</p>
        </main>
      }
    >
      <DiagnosisResultContent />
    </Suspense>
  );
}
