"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { animate, motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  ChevronRight,
  Crown,
  Flame,
  Lightbulb,
  Rocket,
  Share2,
  ShieldAlert,
  Target,
  TrendingDown,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import { COMMON_CONTENT } from "@/constants/content";
import { DIAGNOSIS_CATEGORY_ORDER, DIAGNOSIS_LEVELS, type DiagnosisCategory } from "@/constants/diagnosis";
import type { DiagnosisLevelKey } from "@/constants/diagnosisApi";

/* ── Props ──────────────────────────────────────────── */

type DiagnosisResultProps = {
  score: number;
  maxScore: number;
  level: DiagnosisLevelKey;
  byCategory: Record<DiagnosisCategory, { yesCount: number; totalCount: number; score: number; maxScore: number }>;
};

/* ── Constants ──────────────────────────────────────── */

const CATEGORY_ICONS: Record<DiagnosisCategory, typeof Target> = {
  코어: Target,
  커넥션: Zap,
  브랜드: Trophy,
  세일즈: BarChart3,
};

const CATEGORY_COLORS: Record<DiagnosisCategory, { bar: string; text: string; bg: string; border: string }> = {
  코어: {
    bar: "from-violet-500 to-indigo-500",
    text: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-500/10",
    border: "border-violet-200 dark:border-violet-400/30",
  },
  커넥션: {
    bar: "from-sky-500 to-cyan-500",
    text: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-50 dark:bg-sky-500/10",
    border: "border-sky-200 dark:border-sky-400/30",
  },
  브랜드: {
    bar: "from-amber-500 to-orange-500",
    text: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    border: "border-amber-200 dark:border-amber-400/30",
  },
  세일즈: {
    bar: "from-emerald-500 to-teal-500",
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    border: "border-emerald-200 dark:border-emerald-400/30",
  },
};

const CATEGORY_FEEDBACK: Record<DiagnosisCategory, { strength: string; focus: string }> = {
  코어: {
    strength: "아키텍처 설계와 검색 의도 파악 능력이 탄탄합니다.",
    focus: "목차/템플릿/키워드 체급 매칭을 먼저 정비하면 지수 하락을 빠르게 막을 수 있습니다.",
  },
  커넥션: {
    strength: "독자의 스크롤과 체류를 제어하는 UX 감각이 좋습니다.",
    focus: "가독성 황금비율과 내부 링크 루프를 강화하면 이탈률이 안정적으로 줄어듭니다.",
  },
  브랜드: {
    strength: "브랜드 권위와 운영 데이터 습관의 기반이 마련되어 있습니다.",
    focus: "썸네일 표준화와 통계 장부 분석 루틴을 결합하면 협업 단가 협상력이 올라갑니다.",
  },
  세일즈: {
    strength: "세일즈 전환과 외부 확장 감각이 우수합니다.",
    focus: "B2B 역제안과 숏폼/OMU 루틴을 붙이면 수익 파이프라인이 크게 확장됩니다.",
  },
};

const LEVEL_META: Record<
  DiagnosisLevelKey,
  {
    title: string;
    subtitle: string;
    colorClass: string;
    bgClass: string;
    cardBorderClass: string;
    gaugeStroke: string;
    gaugeTrail: string;
    analysis: string;
    icon: typeof Trophy;
    nextActions: string[];
  }
> = {
  ELITE: {
    title: "상위 1% 미디어 CEO",
    subtitle: "ELITE",
    colorClass: "text-amber-600 dark:text-amber-300",
    bgClass: "bg-gradient-to-br from-amber-50 via-yellow-50/50 to-orange-50 dark:from-amber-950/40 dark:via-slate-900 dark:to-orange-950/40",
    cardBorderClass: "border-amber-300/80 dark:border-amber-500/30",
    gaugeStroke: "url(#gaugeGradientElite)",
    gaugeTrail: "#fef3c7",
    analysis:
      "블로그를 넘어 1인 미디어 기업의 체급에 도달했습니다. 콘텐츠 하나가 여러 채널에서 동시에 수익을 만들어내는 구조이며, 이제는 팀 빌딩과 IP 라이선싱으로 레버리지를 극대화할 차례입니다.",
    icon: Crown,
    nextActions: ["팀 빌딩 및 외주 파이프라인 구축", "IP(지식재산) 라이선싱 모델 설계", "멀티 채널 자동화 시스템 완성"],
  },
  MASTER: {
    title: "수익화 마스터",
    subtitle: "MASTER",
    colorClass: "text-emerald-600 dark:text-emerald-300",
    bgClass: "bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-teal-950/40",
    cardBorderClass: "border-emerald-200/80 dark:border-emerald-500/30",
    gaugeStroke: "url(#gaugeGradientMaster)",
    gaugeTrail: "#d1fae5",
    analysis:
      "핵심 시스템이 잘 갖춰진 상위 블로거입니다. 역제안과 원고료 협상의 주도권을 쥐고 있으며, 네이버 클립(숏폼) 생태계를 장악하고 OMU 자동화를 완성하면 월 수익의 앞자리가 바뀝니다.",
    icon: Trophy,
    nextActions: ["클립/숏폼 주간 제작 루틴 구축", "원소스 멀티유즈(OMU) 자동화", "B2B 제안서·협상 템플릿 고도화"],
  },
  GROWTH: {
    title: "성장 가능 정체기",
    subtitle: "GROWTH",
    colorClass: "text-teal-600 dark:text-teal-300",
    bgClass: "bg-gradient-to-br from-teal-50 via-white to-cyan-50 dark:from-teal-950/40 dark:via-slate-900 dark:to-cyan-950/40",
    cardBorderClass: "border-teal-200/80 dark:border-teal-500/30",
    gaugeStroke: "url(#gaugeGradientGrowth)",
    gaugeTrail: "#ccfbf1",
    analysis:
      "트래픽은 유입되지만 전환 구조가 약해 현금화가 막히는 단계입니다. 블로그를 비즈니스 장부로 바라보고, CTA와 내부 루프를 정밀하게 재설계해야 합니다.",
    icon: Rocket,
    nextActions: ["전환형 CTA 카피라이팅 재설계", "브랜드 장부(유입-전환) 분석 습관화", "B2B 역제안 루틴 월간 운영"],
  },
  RISK: {
    title: "구조 리셋 필요",
    subtitle: "RISK",
    colorClass: "text-orange-600 dark:text-orange-300",
    bgClass: "bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-orange-950/40 dark:via-slate-900 dark:to-amber-950/40",
    cardBorderClass: "border-orange-200/80 dark:border-orange-500/30",
    gaugeStroke: "url(#gaugeGradientRisk)",
    gaugeTrail: "#ffedd5",
    analysis:
      "노력 대비 성과가 현저히 낮은 단계입니다. 기본기가 빠진 1일 1포스팅은 블로그 지수를 깎아내리는 독이 됩니다. 발행을 멈추고 구조부터 다시 세워야 합니다.",
    icon: ShieldAlert,
    nextActions: ["타겟 독자 1명으로 니치 재설정", "목차/템플릿 기반 글 구조 표준화", "모바일 가독성·체류시간 룰 재정비"],
  },
  CRISIS: {
    title: "긴급 점검 단계",
    subtitle: "CRISIS",
    colorClass: "text-rose-600 dark:text-rose-300",
    bgClass: "bg-gradient-to-br from-rose-50 via-white to-red-50 dark:from-rose-950/40 dark:via-slate-900 dark:to-red-950/40",
    cardBorderClass: "border-rose-200/80 dark:border-rose-500/30",
    gaugeStroke: "url(#gaugeGradientCrisis)",
    gaugeTrail: "#ffe4e6",
    analysis:
      "블로그 시스템의 거의 모든 영역에 결함이 발견되었습니다. 현재 상태로 글을 계속 발행하면 시간과 노력이 소진됩니다. 가장 기초적인 SEO 뼈대부터 전면 재설계가 시급합니다.",
    icon: Flame,
    nextActions: ["블로그 목적과 타겟 독자 1명 명확히 정의", "SEO 기초: 제목 키워드 전진 배치 훈련", "네이버 블로그 기본 세팅(카테고리·소개글) 재정비"],
  },
};

/* ── Animations ─────────────────────────────────────── */

const sectionAnimation = (i: number) => ({
  initial: { opacity: 0, y: 24 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { delay: 0.15 * i, duration: 0.5, ease: "easeOut" as const },
});

/* ── Circular Gauge ─────────────────────────────────── */

const GAUGE_SIZE = 200;
const GAUGE_STROKE = 14;
const GAUGE_RADIUS = (GAUGE_SIZE - GAUGE_STROKE) / 2;
const GAUGE_CIRCUMFERENCE = 2 * Math.PI * GAUGE_RADIUS;
const SHARE_SIGNATURE = "[블사클] 오픈톡에서 혼자하는 블로그가 아닌 함께하는 블로거";
const SHARE_SIGNATURE_URL = "https://open.kakao.com/o/gZ7KJ0ei";

const roundRectPath = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
};

const wrapTextLines = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  words.forEach((word) => {
    const candidate = current ? `${current} ${word}` : word;
    if (ctx.measureText(candidate).width <= maxWidth) {
      current = candidate;
      return;
    }
    if (current) lines.push(current);
    current = word;
  });

  if (current) lines.push(current);
  return lines.length > 0 ? lines : [text];
};

function CircularGauge({ percent, level }: { percent: number; level: DiagnosisLevelKey }) {
  const meta = LEVEL_META[level];
  const offset = GAUGE_CIRCUMFERENCE * (1 - percent / 100);

  return (
    <div className="relative mx-auto" style={{ width: GAUGE_SIZE, height: GAUGE_SIZE }}>
      <svg width={GAUGE_SIZE} height={GAUGE_SIZE} className="-rotate-90">
        <defs>
          <linearGradient id="gaugeGradientElite" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
          <linearGradient id="gaugeGradientMaster" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="gaugeGradientGrowth" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
          <linearGradient id="gaugeGradientRisk" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="gaugeGradientCrisis" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="50%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>
        {/* Trail */}
        <circle
          cx={GAUGE_SIZE / 2}
          cy={GAUGE_SIZE / 2}
          r={GAUGE_RADIUS}
          fill="none"
          stroke={meta.gaugeTrail}
          strokeWidth={GAUGE_STROKE}
          className="opacity-60 dark:opacity-20"
        />
        {/* Active */}
        <motion.circle
          cx={GAUGE_SIZE / 2}
          cy={GAUGE_SIZE / 2}
          r={GAUGE_RADIUS}
          fill="none"
          stroke={meta.gaugeStroke}
          strokeWidth={GAUGE_STROKE}
          strokeLinecap="round"
          strokeDasharray={GAUGE_CIRCUMFERENCE}
          initial={{ strokeDashoffset: GAUGE_CIRCUMFERENCE }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
    </div>
  );
}

/* ── Component ──────────────────────────────────────── */

export default function DiagnosisResult({ score, maxScore, level, byCategory }: DiagnosisResultProps) {
  const { brand, urls } = COMMON_CONTENT;
  const [animatedScore, setAnimatedScore] = useState(0);
  const [shareMessage, setShareMessage] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const safeMaxScore = Math.max(1, Math.trunc(maxScore));
  const safeScore = Math.min(Math.max(Math.trunc(score), 0), safeMaxScore);
  const scorePercent = Math.round((safeScore / safeMaxScore) * 100);
  const levelMeta = LEVEL_META[level];
  const LevelIcon = levelMeta.icon;
  const openTalkUrl = (process.env.NEXT_PUBLIC_BSCL_OPENTALK_URL ?? urls.bsclOpenTalk ?? urls.waitlistForm ?? "/community").trim();

  const ctaUrl = useMemo(() => {
    if (!/^https?:\/\//i.test(openTalkUrl)) return openTalkUrl;
    try {
      const parsed = new URL(openTalkUrl);
      parsed.searchParams.set("utm_source", "diagnosis_result");
      parsed.searchParams.set("utm_medium", "cta");
      parsed.searchParams.set("utm_campaign", "phase3_bridge");
      return parsed.toString();
    } catch {
      return openTalkUrl;
    }
  }, [openTalkUrl]);

  const isExternalCta = /^https?:\/\//i.test(ctaUrl);

  const categoryStats = useMemo(
    () =>
      DIAGNOSIS_CATEGORY_ORDER.map((category) => {
        const value = byCategory[category] ?? { yesCount: 0, totalCount: 0, score: 0, maxScore: 0 };
        const totalCount = Math.max(value.totalCount, 0);
        const maxCategoryScore = Math.max(value.maxScore, 0);
        const ratio = maxCategoryScore > 0 ? Math.round((value.score / maxCategoryScore) * 100) : 0;
        return { category, yesCount: value.yesCount, totalCount, score: value.score, maxScore: maxCategoryScore, ratio };
      }),
    [byCategory]
  );

  const strongestCategory = useMemo(
    () => categoryStats.reduce((best, item) => (item.ratio > best.ratio ? item : best), categoryStats[0]),
    [categoryStats]
  );

  const weakestCategory = useMemo(
    () => categoryStats.reduce((worst, item) => (item.ratio < worst.ratio ? item : worst), categoryStats[0]),
    [categoryStats]
  );

  const sameCategoryRange = strongestCategory.category === weakestCategory.category;

  const nextLevelMessage = useMemo(() => {
    if (level === "ELITE") return "최상위 레벨 달성! 팀 빌딩과 IP 라이선싱으로 레버리지를 극대화하세요.";
    const nextMap: Record<string, { target: number; label: string }> = {
      MASTER: { target: DIAGNOSIS_LEVELS.ELITE.range[0], label: "ELITE" },
      GROWTH: { target: DIAGNOSIS_LEVELS.MASTER.range[0], label: "MASTER" },
      RISK: { target: DIAGNOSIS_LEVELS.GROWTH.range[0], label: "GROWTH" },
      CRISIS: { target: DIAGNOSIS_LEVELS.RISK.range[0], label: "RISK" },
    };
    const next = nextMap[level];
    if (!next) return "";
    const needed = Math.max(next.target - safeScore, 0);
    return `다음 레벨(${next.label})까지 ${needed}점이 더 필요합니다.`;
  }, [level, safeScore]);

  useEffect(() => {
    const controls = animate(0, safeScore, {
      duration: 1.4,
      ease: "easeOut",
      delay: 0.3,
      onUpdate: (v) => setAnimatedScore(Math.round(v)),
    });
    return () => controls.stop();
  }, [safeScore]);

  const shareText = useMemo(
    () => `ZERO01E 블로그 수익화 지수 ${safeScore}/${safeMaxScore} (${levelMeta.subtitle})`,
    [levelMeta.subtitle, safeMaxScore, safeScore]
  );

  const createShareImageBlob = useCallback(async (): Promise<Blob> => {
    const width = 1200;
    const height = 1650;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context를 생성할 수 없습니다.");

    // Background
    const bg = ctx.createLinearGradient(0, 0, width, height);
    bg.addColorStop(0, "#ecfeff");
    bg.addColorStop(0.45, "#f8fafc");
    bg.addColorStop(1, "#fefce8");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    // Header
    ctx.fillStyle = "#0f172a";
    ctx.font = "800 52px 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif";
    ctx.fillText("블로그 수익화 지수 진단 결과", 70, 110);

    ctx.fillStyle = "#475569";
    ctx.font = "600 28px 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif";
    ctx.fillText("ZERO01E DIAGNOSTIC SNAPSHOT", 70, 160);

    // Main score card
    roundRectPath(ctx, 60, 210, width - 120, 290, 34);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#334155";
    ctx.font = "700 30px 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif";
    ctx.fillText("메인 점수", 100, 275);

    ctx.fillStyle = "#0f172a";
    ctx.font = "900 110px 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif";
    ctx.fillText(`${safeScore}`, 100, 410);

    ctx.fillStyle = "#64748b";
    ctx.font = "700 40px 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif";
    ctx.fillText(`/ ${safeMaxScore}`, 295, 410);

    ctx.fillStyle = "#0f766e";
    ctx.font = "800 42px 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif";
    ctx.fillText(levelMeta.title, 560, 330);

    ctx.fillStyle = "#334155";
    ctx.font = "700 30px 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif";
    ctx.fillText(`${scorePercent}% 달성`, 560, 385);

    // Detail scores
    roundRectPath(ctx, 60, 540, width - 120, 510, 30);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.strokeStyle = "#dbeafe";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#0f172a";
    ctx.font = "800 38px 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif";
    ctx.fillText("세부 점수", 95, 605);

    let rowY = 680;
    categoryStats.forEach((item) => {
      const colorMap: Record<DiagnosisCategory, string> = {
        코어: "#6366f1",
        커넥션: "#0ea5e9",
        브랜드: "#f59e0b",
        세일즈: "#10b981",
      };
      const label = `${item.category}  ${item.score}/${item.maxScore} (${item.ratio}%)`;

      ctx.fillStyle = "#334155";
      ctx.font = "700 30px 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif";
      ctx.fillText(label, 95, rowY);

      const barX = 95;
      const barY = rowY + 20;
      const barW = width - 240;
      const barH = 22;

      roundRectPath(ctx, barX, barY, barW, barH, 11);
      ctx.fillStyle = "#e2e8f0";
      ctx.fill();

      const activeW = Math.max(0, Math.min(barW, Math.round((barW * item.ratio) / 100)));
      roundRectPath(ctx, barX, barY, activeW, barH, 11);
      ctx.fillStyle = colorMap[item.category];
      ctx.fill();

      rowY += 105;
    });

    // Next actions
    roundRectPath(ctx, 60, 1090, width - 120, 380, 30);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.strokeStyle = "#bbf7d0";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#0f172a";
    ctx.font = "800 38px 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif";
    ctx.fillText("추천 다음 액션", 95, 1150);

    let actionY = 1220;
    levelMeta.nextActions.forEach((action, index) => {
      ctx.fillStyle = "#0f766e";
      ctx.font = "900 28px 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif";
      ctx.fillText(`${index + 1}.`, 100, actionY);

      ctx.fillStyle = "#334155";
      ctx.font = "700 27px 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif";
      const wrapped = wrapTextLines(ctx, action, width - 210);
      wrapped.forEach((line, lineIdx) => {
        ctx.fillText(line, 145, actionY + lineIdx * 38);
      });

      actionY += wrapped.length * 38 + 24;
    });

    // Signature (bottom-right)
    ctx.fillStyle = "#475569";
    ctx.font = "700 21px 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif";
    const signatureWidth = ctx.measureText(SHARE_SIGNATURE).width;
    const signatureX = width - 70 - signatureWidth;
    ctx.fillText(SHARE_SIGNATURE, signatureX, height - 78);

    ctx.fillStyle = "#0f766e";
    ctx.font = "800 22px 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif";
    const urlWidth = ctx.measureText(SHARE_SIGNATURE_URL).width;
    const urlX = width - 70 - urlWidth;
    ctx.fillText(SHARE_SIGNATURE_URL, urlX, height - 42);

    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("공유 이미지를 생성하지 못했습니다."));
          return;
        }
        resolve(blob);
      }, "image/png");
    });
  }, [categoryStats, levelMeta.nextActions, levelMeta.title, safeMaxScore, safeScore, scorePercent]);

  const handleShare = async () => {
    if (isSharing) return;
    setIsSharing(true);
    setShareMessage("");

    try {
      const imageBlob = await createShareImageBlob();
      const imageFile = new File([imageBlob], `zero01e-diagnosis-${safeScore}.png`, { type: "image/png" });

      if (navigator.share && typeof navigator.canShare === "function" && navigator.canShare({ files: [imageFile] })) {
        await navigator.share({
          title: "블로그 수익화 진단 결과",
          text: shareText,
          files: [imageFile],
        });
        return;
      }

      const objectUrl = URL.createObjectURL(imageBlob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = `zero01e-diagnosis-${safeScore}.png`;
      anchor.click();
      URL.revokeObjectURL(objectUrl);

      setShareMessage("공유 이미지가 다운로드되었습니다. 카카오톡/쓰레드에 업로드해 공유해 보세요.");
      window.setTimeout(() => setShareMessage(""), 2800);
    } catch {
      setShareMessage("공유 이미지 생성에 실패했습니다. 다시 시도해 주세요.");
      window.setTimeout(() => setShareMessage(""), 2000);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* ── Hero: Score Card ──────────────────────────── */}
      <motion.section
        {...sectionAnimation(0)}
        className={`relative overflow-hidden rounded-3xl border-2 p-6 shadow-2xl shadow-slate-900/5 sm:p-10 ${levelMeta.bgClass} ${levelMeta.cardBorderClass}`}
      >
        {/* Decorative blurs */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-gradient-to-tr from-violet-400/10 to-sky-400/10 blur-3xl" />

        <div className="relative">
          {/* Report header */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/80 px-4 py-1.5 text-xs font-bold tracking-[0.15em] text-slate-500 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300"
            >
              <BarChart3 className="h-3.5 w-3.5" />
              ZERO01E DIAGNOSTIC REPORT
            </motion.div>
          </div>

          {/* Circular gauge + score */}
          <div className="relative mt-6">
            <CircularGauge percent={scorePercent} level={level} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black tabular-nums text-slate-900 dark:text-slate-100">
                {animatedScore}
              </span>
              <span className="mt-0.5 text-sm font-bold text-slate-400 dark:text-slate-500">/ {safeMaxScore}</span>
            </div>
          </div>

          {/* Level badge */}
          <div className="mt-5 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="inline-flex items-center gap-2"
            >
              <div className="rounded-full bg-white/90 p-2 shadow-md dark:bg-slate-800">
                <LevelIcon className={`h-6 w-6 ${levelMeta.colorClass}`} />
              </div>
              <div className="text-left">
                <h2 className={`text-2xl font-black leading-tight sm:text-3xl ${levelMeta.colorClass}`}>{levelMeta.title}</h2>
                <p className="text-xs font-bold tracking-wider text-slate-400 dark:text-slate-500">{levelMeta.subtitle}</p>
              </div>
            </motion.div>
          </div>

          {/* Next level hint */}
          <p className="mt-4 text-center text-sm font-semibold text-slate-500 dark:text-slate-400">
            {nextLevelMessage}
          </p>
        </div>
      </motion.section>

      {/* ── Analysis ──────────────────────────────────── */}
      <motion.section
        {...sectionAnimation(1)}
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6"
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-lg bg-slate-100 p-2 dark:bg-slate-800">
            <Lightbulb className="h-5 w-5 text-slate-600 dark:text-slate-300" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">종합 분석</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{levelMeta.analysis}</p>
          </div>
        </div>
      </motion.section>

      {/* ── Category Breakdown ────────────────────────── */}
      <motion.section
        {...sectionAnimation(2)}
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6"
      >
        <p className="mb-5 text-sm font-bold text-slate-800 dark:text-slate-100">파트별 상세 분석</p>
        <div className="space-y-4">
          {categoryStats.map((item, index) => {
            const color = CATEGORY_COLORS[item.category];
            const CatIcon = CATEGORY_ICONS[item.category];
            return (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                className={`rounded-xl border p-4 ${color.border} ${color.bg}`}
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CatIcon className={`h-4 w-4 ${color.text}`} />
                    <span className={`text-sm font-bold ${color.text}`}>{item.category}</span>
                  </div>
                  <span className="text-sm font-extrabold text-slate-700 dark:text-slate-200">
                    {item.score}<span className="font-semibold text-slate-400">/{item.maxScore}</span>
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-white/80 dark:bg-slate-800">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${color.bar}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.ratio}%` }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.6, ease: "easeOut" }}
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  {item.yesCount}개 달성 / {item.totalCount}개 중 · 달성률 {item.ratio}%
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* ── Strength / Weakness ───────────────────────── */}
      <motion.section
        {...sectionAnimation(3)}
        className="grid gap-4 sm:grid-cols-2"
      >
        <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50/50 p-5 dark:border-emerald-500/20 dark:from-emerald-950/30 dark:to-teal-950/20">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-emerald-100 p-1.5 dark:bg-emerald-500/20">
              <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">현재 강점</p>
          </div>
          <p className="mt-3 text-base font-extrabold text-slate-800 dark:text-slate-100">{strongestCategory.category}</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {CATEGORY_FEEDBACK[strongestCategory.category].strength}
          </p>
        </div>

        <div className="rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50 to-orange-50/50 p-5 dark:border-rose-500/20 dark:from-rose-950/30 dark:to-orange-950/20">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-rose-100 p-1.5 dark:bg-rose-500/20">
              <TrendingDown className="h-4 w-4 text-rose-600 dark:text-rose-400" />
            </div>
            <p className="text-xs font-bold text-rose-700 dark:text-rose-300">우선 개선 포인트</p>
          </div>
          <p className="mt-3 text-base font-extrabold text-slate-800 dark:text-slate-100">
            {sameCategoryRange ? "전체 밸런스 유지" : weakestCategory.category}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {sameCategoryRange
              ? "카테고리 점수가 고르게 형성되었습니다. 수익화 동선 최적화를 먼저 진행해 전환율을 높여보세요."
              : CATEGORY_FEEDBACK[weakestCategory.category].focus}
          </p>
        </div>
      </motion.section>

      {/* ── Next Actions ──────────────────────────────── */}
      <motion.section
        {...sectionAnimation(4)}
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6"
      >
        <p className="mb-4 text-sm font-bold text-slate-800 dark:text-slate-100">추천 다음 액션</p>
        <ul className="space-y-3">
          {levelMeta.nextActions.map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 + index * 0.1, duration: 0.3 }}
              className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/60"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-extrabold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                {index + 1}
              </span>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{item}</span>
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {/* ── CTA Bridge ────────────────────────────────── */}
      <motion.section
        {...sectionAnimation(5)}
        className="relative overflow-hidden rounded-2xl border-2 border-amber-200 bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 p-6 shadow-lg dark:border-amber-400/30 dark:from-amber-950/30 dark:via-yellow-950/20 dark:to-orange-950/30"
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-300/20 blur-2xl" />
        <div className="relative">
          <p className="text-sm font-bold text-amber-800 dark:text-amber-200">
            26개 문항에 대한 상세 해설 + 실전 전략이 담긴 PDF를 무료로 받아보세요.
          </p>
          <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">
            커뮤니티 공지사항에서 즉시 확인 가능합니다.
          </p>
          <a
            href={ctaUrl}
            target={isExternalCta ? "_blank" : undefined}
            rel={isExternalCta ? "noopener noreferrer" : undefined}
            aria-label="블사클 오픈톡으로 이동해 상세 PDF 가이드 확인하기"
            className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-3 text-base font-extrabold text-white shadow-lg transition-all hover:from-black hover:to-slate-900 hover:shadow-xl"
          >
            20페이지 상세 분석 PDF 받기
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </motion.section>

      {/* ── Footer Actions ────────────────────────────── */}
      <motion.section
        {...sectionAnimation(6)}
        className="flex flex-col items-start gap-3"
      >
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            disabled={isSharing}
            className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            <Share2 className="h-4 w-4" />
            {isSharing ? "공유 이미지 생성 중..." : "내 점수 자랑하기"}
          </button>
          <Link
            href="/labs/diagnosis"
            className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            <ChevronRight className="h-4 w-4" />
            진단 다시 하기
          </Link>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          {brand.persona}의 피드백: PDF의 3가지 전략만 반영해도 상위 단계 진입이 가능합니다.
        </p>
        {shareMessage && <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{shareMessage}</p>}
      </motion.section>
    </div>
  );
}
