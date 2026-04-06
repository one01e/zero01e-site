"use client";

import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { DIAGNOSIS_DATA } from "@/constants/diagnosis";
import type {
  DiagnosisSubmissionApiResponse,
  DiagnosisSubmissionApiSuccess,
  DiagnosisSubmissionRequest,
} from "@/constants/diagnosisApi";

export type DiagnosisLeadFormValue = {
  name: string;
  phone: string;
  blogUrl: string;
  consent: boolean;
};

type DiagnosisLeadFormProps = {
  answers: boolean[];
  elapsedSeconds?: number;
  initialValue?: DiagnosisLeadFormValue;
  onSuccess: (payload: DiagnosisSubmissionApiSuccess) => void;
  onBack?: () => void;
  onDraftChange?: (value: DiagnosisLeadFormValue) => void;
};

type FieldErrors = Partial<Record<keyof DiagnosisLeadFormValue, string>>;

const NAVER_BLOG_HOSTS = ["blog.naver.com", "m.blog.naver.com"];

const normalizeBlogUrl = (value: string): string => {
  let trimmed = value.trim();
  if (!trimmed) return trimmed;
  if (!(/^https?:\/\//i.test(trimmed))) trimmed = `https://${trimmed}`;

  // m.blog.naver.com → blog.naver.com 정규화
  try {
    const url = new URL(trimmed);
    if (url.hostname === "m.blog.naver.com") {
      url.hostname = "blog.naver.com";
      return url.toString();
    }
  } catch {
    // URL 파싱 실패 시 원본 반환
  }
  return trimmed;
};

const isValidBlogUrl = (value: string): { valid: boolean; error?: string } => {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return { valid: false, error: "올바른 URL 형식이 아닙니다." };
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return { valid: false, error: "http 또는 https로 시작하는 URL을 입력해 주세요." };
  }

  if (!NAVER_BLOG_HOSTS.includes(url.hostname)) {
    return { valid: false, error: "네이버 블로그 URL(blog.naver.com)만 입력 가능합니다." };
  }

  // blog.naver.com/{username} 형태 확인
  const pathSegments = url.pathname.split("/").filter(Boolean);
  if (pathSegments.length === 0) {
    return { valid: false, error: "블로그 주소가 불완전합니다. (예: blog.naver.com/아이디)" };
  }

  return { valid: true };
};

const isValidPhone = (value: string): boolean => /^[0-9+\-\s()]{8,20}$/.test(value.trim());

const normalizeUtm = (value: string | null): string | undefined => {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, 100);
};

const BLOG_URL_BYPASS = "wkrtkf";
const BLOG_BYPASS_NAME = "관리자";
const BLOG_BYPASS_PHONE = "010-1234-1234";

const isBypassBlogInput = (value: string): boolean => value.trim().toLowerCase() === BLOG_URL_BYPASS;

const validate = (value: DiagnosisLeadFormValue): FieldErrors => {
  const errors: FieldErrors = {};

  if (value.name.trim().length < 2) {
    errors.name = "이름은 2자 이상 입력해 주세요.";
  }
  if (!isValidPhone(value.phone)) {
    errors.phone = "전화번호 형식이 올바르지 않습니다.";
  }
  if (!isBypassBlogInput(value.blogUrl)) {
    const normalizedUrl = normalizeBlogUrl(value.blogUrl);
    const blogCheck = isValidBlogUrl(normalizedUrl);
    if (!blogCheck.valid) {
      errors.blogUrl = blogCheck.error ?? "유효한 블로그 URL을 입력해 주세요.";
    }
  }
  if (!value.consent) {
    errors.consent = "개인정보 수집 및 이용 동의가 필요합니다.";
  }

  return errors;
};

const getDefaultValue = (): DiagnosisLeadFormValue => ({
  name: "",
  phone: "",
  blogUrl: "",
  consent: false,
});

export default function DiagnosisLeadForm({
  answers,
  elapsedSeconds,
  initialValue = getDefaultValue(),
  onSuccess,
  onBack,
  onDraftChange,
}: DiagnosisLeadFormProps) {
  const [value, setValue] = useState<DiagnosisLeadFormValue>(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const errors = useMemo(() => validate(value), [value]);
  const canSubmit = Object.keys(errors).length === 0;

  useEffect(() => {
    onDraftChange?.(value);
  }, [onDraftChange, value]);

  const onFieldBlur = (field: keyof DiagnosisLeadFormValue) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched({ name: true, phone: true, blogUrl: true, consent: true });
    if (!canSubmit || isSubmitting) return;

    setSubmitError(null);
    setIsSubmitting(true);

    const isBypassMode = isBypassBlogInput(value.blogUrl);
    const normalizedValue: DiagnosisLeadFormValue = {
      name: isBypassMode ? BLOG_BYPASS_NAME : value.name.trim(),
      phone: isBypassMode ? BLOG_BYPASS_PHONE : value.phone.trim(),
      blogUrl: isBypassMode ? BLOG_URL_BYPASS : normalizeBlogUrl(value.blogUrl),
      consent: value.consent,
    };
    const score = answers.reduce((sum, answer, index) => {
      if (!answer) return sum;
      return sum + (DIAGNOSIS_DATA[index]?.weight ?? 0);
    }, 0);

    const payload: DiagnosisSubmissionRequest = {
      name: normalizedValue.name,
      phone: normalizedValue.phone,
      blogUrl: normalizedValue.blogUrl,
      consent: normalizedValue.consent,
      answers,
      score,
      elapsedSeconds,
    };
    const searchParams = new URLSearchParams(window.location.search);
    const utmSource = normalizeUtm(searchParams.get("utm_source"));
    const utmMedium = normalizeUtm(searchParams.get("utm_medium"));
    const utmCampaign = normalizeUtm(searchParams.get("utm_campaign"));

    if (utmSource) payload.utm_source = utmSource;
    if (utmMedium) payload.utm_medium = utmMedium;
    if (utmCampaign) payload.utm_campaign = utmCampaign;

    try {
      const response = await fetch("/api/diagnosis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = (await response.json()) as DiagnosisSubmissionApiResponse;
      if (!response.ok || !json.success) {
        setSubmitError(json.success ? "데이터 전송에 실패했습니다." : json.error);
        return;
      }

      onSuccess(json);
    } catch {
      setSubmitError("데이터 전송 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="space-y-4">
        <input
          required
          value={value.name}
          placeholder="성함"
          className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          onChange={(event) => setValue((prev) => ({ ...prev, name: event.target.value }))}
          onBlur={() => onFieldBlur("name")}
          autoComplete="name"
        />
        {touched.name && errors.name && <p className="text-xs font-medium text-rose-600 dark:text-rose-300">{errors.name}</p>}

        <input
          required
          value={value.phone}
          placeholder="연락처 (010-0000-0000)"
          className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          onChange={(event) => setValue((prev) => ({ ...prev, phone: event.target.value }))}
          onBlur={() => onFieldBlur("phone")}
          autoComplete="tel"
        />
        {touched.phone && errors.phone && <p className="text-xs font-medium text-rose-600 dark:text-rose-300">{errors.phone}</p>}

        <input
          required
          value={value.blogUrl}
          placeholder="네이버 블로그 URL (https://blog.naver.com/아이디)"
          className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          onChange={(event) => {
            const nextBlogUrl = event.target.value;
            if (isBypassBlogInput(nextBlogUrl)) {
              setValue((prev) => ({
                ...prev,
                blogUrl: nextBlogUrl,
                name: BLOG_BYPASS_NAME,
                phone: BLOG_BYPASS_PHONE,
              }));
              return;
            }
            setValue((prev) => ({ ...prev, blogUrl: nextBlogUrl }));
          }}
          onBlur={() => onFieldBlur("blogUrl")}
          autoComplete="url"
        />
        {touched.blogUrl && errors.blogUrl && <p className="text-xs font-medium text-rose-600 dark:text-rose-300">{errors.blogUrl}</p>}
        {isBypassBlogInput(value.blogUrl) && (
          <p className="text-xs font-medium text-emerald-600 dark:text-emerald-300">
            관리자 예외 모드가 활성화되었습니다. 이름/연락처가 자동 입력됩니다.
          </p>
        )}
      </div>

      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={value.consent}
            required
            className="mt-1 h-5 w-5 accent-emerald-500"
            onChange={(event) => setValue((prev) => ({ ...prev, consent: event.target.checked }))}
            onBlur={() => onFieldBlur("consent")}
          />
          <span className="text-sm text-slate-500 dark:text-slate-300">
            (필수) 상담 및 진단 리포트 발송을 위한 개인정보 수집 및 이용에 동의합니다.
          </span>
        </label>
        {touched.consent && errors.consent && <p className="mt-2 text-xs font-medium text-rose-600 dark:text-rose-300">{errors.consent}</p>}
      </div>

      {submitError && (
        <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-400/40 dark:bg-rose-500/10 dark:text-rose-300">
          {submitError}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
            className="min-h-12 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            문항으로 돌아가기
          </button>
        )}
        <button
          type="submit"
          disabled={!canSubmit || isSubmitting}
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-4 text-base font-bold text-white transition-all hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              전송 중...
            </>
          ) : (
            <>
              <ShieldCheck size={20} />
              정밀 진단 결과 확인하기
            </>
          )}
        </button>
      </div>
    </form>
  );
}
