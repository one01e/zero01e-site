"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Clock, Gauge, LoaderCircle, UserCheck2, XCircle } from "lucide-react";
import {
  createEmptyDiagnosisAnswers,
  DIAGNOSIS_DATA,
  DIAGNOSIS_QUESTION_COUNT,
  type DiagnosisCategory,
} from "@/constants/diagnosis";
import {
  DIAGNOSIS_RESULT_STORAGE_KEY,
  type DiagnosisSubmissionApiSuccess,
} from "@/constants/diagnosisApi";
import DiagnosisLeadForm, { type DiagnosisLeadFormValue } from "@/components/DiagnosisLeadForm";

type PersistedState = {
  version: number;
  currentStep: number;
  direction: number;
  answers: Array<boolean | null>;
  showLeadForm: boolean;
  isAnalyzing: boolean;
  leadDraft: DiagnosisLeadFormValue;
  startedAt: number | null;
};

const formatElapsed = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

const STORAGE_KEY = "zero01e:diagnosis:quiz";
const STORAGE_VERSION = 4;
const ANALYZING_DELAY_MS = 1500;

const QUESTION_VARIANTS = {
  enter: (direction: number) => ({ x: direction > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -60 : 60, opacity: 0 }),
};

const CATEGORY_LABELS: Record<DiagnosisCategory, string> = {
  코어: "CLASS 1 코어",
  커넥션: "CLASS 2 커넥션",
  브랜드: "CLASS 3 브랜드",
  세일즈: "CLASS 4 세일즈",
};

const createInitialLeadForm = (): DiagnosisLeadFormValue => ({
  name: "",
  phone: "",
  blogUrl: "",
  consent: false,
});

const isValidAnswers = (value: unknown): value is Array<boolean | null> => {
  return (
    Array.isArray(value) &&
    value.length === DIAGNOSIS_QUESTION_COUNT &&
    value.every((item) => item === null || typeof item === "boolean")
  );
};

const areAnswersComplete = (answers: readonly (boolean | null)[]): answers is boolean[] => {
  return answers.every((value) => typeof value === "boolean");
};

export default function DiagnosisQuiz() {
  const router = useRouter();

  const [isHydrated, setIsHydrated] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Array<boolean | null>>(createEmptyDiagnosisAnswers);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [leadDraft, setLeadDraft] = useState<DiagnosisLeadFormValue>(createInitialLeadForm);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const hasLoggedIntegrity = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setIsHydrated(true);
        return;
      }

      const parsed = JSON.parse(raw) as Partial<PersistedState>;
      if (parsed.version !== STORAGE_VERSION || !isValidAnswers(parsed.answers)) {
        localStorage.removeItem(STORAGE_KEY);
        setIsHydrated(true);
        return;
      }

      setCurrentStep(
        typeof parsed.currentStep === "number"
          ? Math.min(Math.max(Math.floor(parsed.currentStep), 0), DIAGNOSIS_QUESTION_COUNT - 1)
          : 0
      );
      setDirection(typeof parsed.direction === "number" ? parsed.direction : 1);
      setAnswers(parsed.answers);
      setShowLeadForm(Boolean(parsed.showLeadForm));
      setIsAnalyzing(Boolean(parsed.isAnalyzing));
      setLeadDraft({
        name: typeof parsed.leadDraft?.name === "string" ? parsed.leadDraft.name : "",
        phone: typeof parsed.leadDraft?.phone === "string" ? parsed.leadDraft.phone : "",
        blogUrl: typeof parsed.leadDraft?.blogUrl === "string" ? parsed.leadDraft.blogUrl : "",
        consent: Boolean(parsed.leadDraft?.consent),
      });
      setStartedAt(typeof parsed.startedAt === "number" ? parsed.startedAt : null);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const payload: PersistedState = {
      version: STORAGE_VERSION,
      currentStep,
      direction,
      answers,
      showLeadForm,
      isAnalyzing,
      leadDraft,
      startedAt,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [answers, currentStep, direction, isAnalyzing, isHydrated, leadDraft, showLeadForm, startedAt]);

  useEffect(() => {
    if (!isAnalyzing) return;

    const timer = window.setTimeout(() => {
      setIsAnalyzing(false);
      setShowLeadForm(true);
    }, ANALYZING_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [isAnalyzing]);

  // Timer: start on first answer, tick every second during quiz
  useEffect(() => {
    if (!isHydrated || !startedAt) return;
    // Stop ticking once quiz is complete (analyzing or lead form)
    if (isAnalyzing || showLeadForm) {
      setElapsedSeconds(Math.floor((Date.now() - startedAt) / 1000));
      return;
    }
    const tick = () => setElapsedSeconds(Math.floor((Date.now() - startedAt) / 1000));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [isHydrated, startedAt, isAnalyzing, showLeadForm]);

  useEffect(() => {
    if (process.env.NODE_ENV === "production" || hasLoggedIntegrity.current) return;
    if (!areAnswersComplete(answers)) return;

    const payload = answers.map((value, index) => ({
      id: DIAGNOSIS_DATA[index].id,
      answer: value,
    }));
    console.log("[DiagnosisQuiz] integrity check", payload, "count:", payload.length);
    hasLoggedIntegrity.current = true;
  }, [answers]);

  const currentQuestion = DIAGNOSIS_DATA[currentStep];
  const currentAnswer = answers[currentStep];
  const inQuizStep = !isAnalyzing && !showLeadForm;
  const quizProgress = Math.round(((currentStep + 1) / DIAGNOSIS_QUESTION_COUNT) * 100);
  const progress = showLeadForm || isAnalyzing ? 100 : quizProgress;

  const goToStep = useCallback((step: number, nextDirection: number) => {
    setDirection(nextDirection);
    setCurrentStep(Math.min(Math.max(step, 0), DIAGNOSIS_QUESTION_COUNT - 1));
  }, []);

  const handleAnswer = useCallback(
    (value: boolean) => {
      // Start timer on first answer
      if (!startedAt) setStartedAt(Date.now());

      setAnswers((prev) => {
        const next = [...prev];
        next[currentStep] = value;
        return next;
      });

      if (currentStep === DIAGNOSIS_QUESTION_COUNT - 1) {
        setIsAnalyzing(true);
        setShowLeadForm(false);
        return;
      }

      goToStep(currentStep + 1, 1);
    },
    [currentStep, goToStep, startedAt]
  );

  const handleBack = useCallback(() => {
    if (currentStep === 0) return;
    goToStep(currentStep - 1, -1);
  }, [currentStep, goToStep]);

  const resetQuiz = useCallback(() => {
    setCurrentStep(0);
    setDirection(1);
    setAnswers(createEmptyDiagnosisAnswers());
    setShowLeadForm(false);
    setIsAnalyzing(false);
    setLeadDraft(createInitialLeadForm());
    setStartedAt(null);
    setElapsedSeconds(0);
    hasLoggedIntegrity.current = false;
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(DIAGNOSIS_RESULT_STORAGE_KEY);
  }, []);

  const handleLeadSuccess = useCallback(
    (payload: DiagnosisSubmissionApiSuccess) => {
      sessionStorage.setItem(DIAGNOSIS_RESULT_STORAGE_KEY, JSON.stringify(payload.data));
      localStorage.removeItem(STORAGE_KEY);
      router.push(payload.data.nextPath);
    },
    [router]
  );

  if (!isHydrated) {
    return (
      <main className="flex min-h-[calc(100vh-64px)] w-full items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-300">진단 데이터를 불러오는 중입니다...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex w-full flex-col items-center overflow-hidden pb-24">
      <div className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-emerald-400/10 blur-[120px]" />

      <section className="mt-4 w-full max-w-4xl px-5 py-14 sm:mt-8 sm:px-8 lg:px-12">
        <Link href="/labs" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-emerald-600 transition hover:text-emerald-700">
          <ArrowLeft className="h-4 w-4" />
          Labs로 돌아가기
        </Link>

        <motion.div
          layout
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-emerald-900/5 dark:border-slate-700 dark:bg-slate-900 sm:p-8"
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:border-emerald-300/20 dark:bg-emerald-400/10 dark:text-emerald-300">
              <Gauge className="h-3.5 w-3.5" />
              BLOG MONETIZATION DIAGNOSIS
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-300">
              {startedAt && (
                <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 tabular-nums dark:border-slate-600 dark:bg-slate-800">
                  <Clock className="h-3 w-3" />
                  {formatElapsed(elapsedSeconds)}
                </span>
              )}
              <span>{Math.min(currentStep + 1, DIAGNOSIS_QUESTION_COUNT)} / {DIAGNOSIS_QUESTION_COUNT}</span>
            </div>
          </div>

          <div
            className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700"
            role="progressbar"
            aria-label="진단 진행률"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </div>

          {inQuizStep && (
            <motion.div layout className="mt-8">
              <div className="mb-5 flex items-center justify-between text-sm text-slate-500 dark:text-slate-300">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold tracking-wide text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">
                    {CATEGORY_LABELS[currentQuestion.categoryKey]}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-300/40 dark:bg-emerald-500/10 dark:text-emerald-300">
                    {currentQuestion.category}
                  </span>
                </div>
                <span className="font-semibold">
                  Q{currentStep + 1} / {DIAGNOSIS_QUESTION_COUNT}
                </span>
              </div>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentQuestion.id}
                  layout
                  custom={direction}
                  variants={QUESTION_VARIANTS}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-5"
                >
                  {/* Title + Subtitle */}
                  <div>
                    <h1 className="text-2xl font-extrabold leading-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
                      {currentQuestion.title}
                    </h1>
                    <p className="mt-1 text-sm font-semibold tracking-wide text-emerald-600 dark:text-emerald-400">
                      {currentQuestion.subtitle}
                    </p>
                  </div>

                  {/* Question */}
                  <p className="break-keep text-base font-medium leading-relaxed text-slate-700 dark:text-slate-200 sm:text-lg">
                    {currentQuestion.question}
                  </p>

                  {/* Example hint */}
                  <div className="rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/60">
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400">예시</p>
                    <p className="mt-1 break-keep text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {currentQuestion.desc}
                    </p>
                  </div>

                  {/* Weight */}
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-300">배점: {currentQuestion.weight}점</p>

                  {/* Answer buttons */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <motion.button
                      layout
                      type="button"
                      onClick={() => handleAnswer(true)}
                      className={`min-h-12 rounded-2xl border px-5 py-4 text-left text-sm font-bold transition-all sm:text-base ${
                        currentAnswer === true
                          ? "border-emerald-400 bg-emerald-50 text-emerald-700 shadow-sm dark:border-emerald-400 dark:bg-emerald-400/10 dark:text-emerald-300"
                          : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/70 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-300/60 dark:hover:bg-emerald-500/10"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5" />
                        예 (Yes)
                      </span>
                    </motion.button>

                    <motion.button
                      layout
                      type="button"
                      onClick={() => handleAnswer(false)}
                      className={`min-h-12 rounded-2xl border px-5 py-4 text-left text-sm font-bold transition-all sm:text-base ${
                        currentAnswer === false
                          ? "border-rose-300 bg-rose-50 text-rose-700 shadow-sm dark:border-rose-400/70 dark:bg-rose-500/10 dark:text-rose-300"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-800"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <XCircle className="h-5 w-5" />
                        아니오 (No)
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-7 flex items-center justify-between gap-3 border-t border-slate-100 pt-5 dark:border-slate-700">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <ArrowLeft className="h-4 w-4" />
                  이전 문항
                </button>
                <p className="text-xs font-medium text-slate-400 dark:text-slate-300 sm:text-sm">선택 즉시 다음 질문으로 이동합니다.</p>
              </div>
            </motion.div>
          )}

          {isAnalyzing && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-7 text-center dark:border-emerald-300/20 dark:bg-emerald-400/10"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="mx-auto mb-4 inline-flex rounded-full border border-emerald-200 bg-white p-3 text-emerald-600 dark:border-emerald-300/30 dark:bg-slate-900 dark:text-emerald-300"
              >
                <LoaderCircle className="h-6 w-6" />
              </motion.div>
              <p className="text-lg font-extrabold text-slate-900 dark:text-slate-100">진단 결과 분석 중...</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
                {DIAGNOSIS_QUESTION_COUNT}개 응답을 기반으로 개인화 리포트를 준비하고 있습니다.
              </p>
            </motion.div>
          )}

          {showLeadForm && (
            <>
              {areAnswersComplete(answers) ? (
                <DiagnosisLeadForm
                  answers={answers}
                  elapsedSeconds={elapsedSeconds}
                  initialValue={leadDraft}
                  onDraftChange={setLeadDraft}
                  onBack={() => setShowLeadForm(false)}
                  onSuccess={handleLeadSuccess}
                />
              ) : (
                <p className="mt-8 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-400/40 dark:bg-rose-500/10 dark:text-rose-300">
                  응답 데이터가 불완전합니다. 문항을 다시 진행해 주세요.
                </p>
              )}
            </>
          )}
        </motion.div>

        <div className="mt-6 rounded-2xl border border-slate-100 bg-white px-5 py-4 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 sm:text-sm">
          <p className="font-semibold text-slate-600 dark:text-slate-100">
            <UserCheck2 className="mr-1 inline h-4 w-4 align-text-bottom" />
            데이터 무결성 메모
          </p>
          <p className="mt-1 break-keep">
            응답은 브라우저 로컬 저장소에 임시 저장되며, {DIAGNOSIS_QUESTION_COUNT}개 질문 응답 배열의 길이와 값 타입을 복원 시 검증합니다.
          </p>
          <button
            type="button"
            onClick={resetQuiz}
            className="mt-3 inline-flex min-h-10 items-center rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            진단 초기화
          </button>
        </div>
      </section>
    </main>
  );
}
