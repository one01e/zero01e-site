import type { DiagnosisCategory } from "@/constants/diagnosis";

export type DiagnosisLevelKey = "ELITE" | "MASTER" | "GROWTH" | "RISK" | "CRISIS";
export type DiagnosisLevelLabel = "최상위 단계" | "확장 단계" | "정체 단계" | "위험 단계" | "긴급 단계";

export type DiagnosisSubmissionRequest = {
  name: string;
  phone: string;
  blogUrl: string;
  answers: boolean[];
  score: number;
  consent: boolean;
  elapsedSeconds?: number;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

export type DiagnosisSubmissionResult = {
  submissionId: string;
  submittedAt: string;
  result: {
    score: number;
    yesCount: number;
    maxScore: number;
    level: {
      key: DiagnosisLevelKey;
      label: string;
      colorClass: string;
    };
    byCategory: Record<DiagnosisCategory, { yesCount: number; totalCount: number; score: number; maxScore: number }>;
  };
  lead: {
    name: string;
    phoneMasked: string;
    blogUrl: string;
  };
  nextPath: string;
};

export type DiagnosisSubmissionApiSuccess = {
  success: true;
  result: {
    score: number;
    maxScore: number;
    level: DiagnosisLevelLabel;
    levelKey: DiagnosisLevelKey;
  };
  data: DiagnosisSubmissionResult;
};

export type DiagnosisSubmissionApiError = {
  success: false;
  error: string;
};

export type DiagnosisSubmissionApiResponse = DiagnosisSubmissionApiSuccess | DiagnosisSubmissionApiError;

export const DIAGNOSIS_RESULT_STORAGE_KEY = "zero01e:diagnosis:result";
