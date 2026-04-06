import {
  DIAGNOSIS_LEVELS as SOURCE_LEVELS,
  DIAGNOSIS_QUESTIONS,
  type DiagnosisQuestion as DiagnosisSourceQuestion,
} from "@/constants/diagnosisData";

export type DiagnosisCategory = "코어" | "커넥션" | "브랜드" | "세일즈";

export type DiagnosisQuestion = DiagnosisSourceQuestion & {
  categoryKey: DiagnosisCategory;
};

const toCategoryKey = (part: string): DiagnosisCategory => {
  if (part.includes("코어")) return "코어";
  if (part.includes("커넥션")) return "커넥션";
  if (part.includes("브랜드")) return "브랜드";
  return "세일즈";
};

export const DIAGNOSIS_DATA: readonly DiagnosisQuestion[] = DIAGNOSIS_QUESTIONS.map((item) => ({
  ...item,
  categoryKey: toCategoryKey(item.part),
}));

export const DIAGNOSIS_CATEGORY_ORDER: readonly DiagnosisCategory[] = ["코어", "커넥션", "브랜드", "세일즈"];

export const DIAGNOSIS_QUESTION_COUNT = DIAGNOSIS_DATA.length;
export const DIAGNOSIS_MAX_SCORE = DIAGNOSIS_DATA.reduce((sum, item) => sum + item.weight, 0);

export const DIAGNOSIS_LEVELS = {
  ELITE: {
    range: [SOURCE_LEVELS.ELITE.min, SOURCE_LEVELS.ELITE.max] as const,
    label: SOURCE_LEVELS.ELITE.title,
    colorClass: SOURCE_LEVELS.ELITE.color,
    description: SOURCE_LEVELS.ELITE.desc,
  },
  MASTER: {
    range: [SOURCE_LEVELS.MASTER.min, SOURCE_LEVELS.MASTER.max] as const,
    label: SOURCE_LEVELS.MASTER.title,
    colorClass: SOURCE_LEVELS.MASTER.color,
    description: SOURCE_LEVELS.MASTER.desc,
  },
  GROWTH: {
    range: [SOURCE_LEVELS.GROWTH.min, SOURCE_LEVELS.GROWTH.max] as const,
    label: SOURCE_LEVELS.GROWTH.title,
    colorClass: SOURCE_LEVELS.GROWTH.color,
    description: SOURCE_LEVELS.GROWTH.desc,
  },
  RISK: {
    range: [SOURCE_LEVELS.RISK.min, SOURCE_LEVELS.RISK.max] as const,
    label: SOURCE_LEVELS.RISK.title,
    colorClass: SOURCE_LEVELS.RISK.color,
    description: SOURCE_LEVELS.RISK.desc,
  },
  CRISIS: {
    range: [SOURCE_LEVELS.CRISIS.min, SOURCE_LEVELS.CRISIS.max] as const,
    label: SOURCE_LEVELS.CRISIS.title,
    colorClass: SOURCE_LEVELS.CRISIS.color,
    description: SOURCE_LEVELS.CRISIS.desc,
  },
} as const;

export type DiagnosisLevel = (typeof DIAGNOSIS_LEVELS)[keyof typeof DIAGNOSIS_LEVELS];

export type DiagnosisSummary = {
  yesCount: number;
  totalScore: number;
  maxScore: number;
  byCategory: Record<DiagnosisCategory, { yesCount: number; totalCount: number; score: number; maxScore: number }>;
  level: DiagnosisLevel;
};

const assertDiagnosisDataIntegrity = () => {
  if (DIAGNOSIS_QUESTION_COUNT !== 26) {
    throw new Error("Diagnosis data integrity error: expected exactly 26 questions.");
  }
  if (DIAGNOSIS_MAX_SCORE !== 100) {
    throw new Error(`Diagnosis data integrity error: expected total score 100, got ${DIAGNOSIS_MAX_SCORE}.`);
  }

  const idSet = new Set<number>();
  for (const item of DIAGNOSIS_DATA) {
    if (!Number.isInteger(item.id) || item.id < 1 || item.id > DIAGNOSIS_QUESTION_COUNT) {
      throw new Error(`Diagnosis data integrity error: invalid id ${item.id}.`);
    }
    if (!item.title.trim() || !item.subtitle.trim() || !item.question.trim() || !item.desc.trim() || !item.category.trim()) {
      throw new Error(`Diagnosis data integrity error: empty field on question id ${item.id}.`);
    }
    if (![3, 4, 5].includes(item.weight)) {
      throw new Error(`Diagnosis data integrity error: invalid weight ${item.weight} on question id ${item.id}.`);
    }
    if (idSet.has(item.id)) {
      throw new Error(`Diagnosis data integrity error: duplicated id ${item.id}.`);
    }
    idSet.add(item.id);
  }
};

assertDiagnosisDataIntegrity();

const getLevel = (totalScore: number): DiagnosisLevel => {
  if (totalScore >= DIAGNOSIS_LEVELS.ELITE.range[0]) return DIAGNOSIS_LEVELS.ELITE;
  if (totalScore >= DIAGNOSIS_LEVELS.MASTER.range[0]) return DIAGNOSIS_LEVELS.MASTER;
  if (totalScore >= DIAGNOSIS_LEVELS.GROWTH.range[0]) return DIAGNOSIS_LEVELS.GROWTH;
  if (totalScore >= DIAGNOSIS_LEVELS.RISK.range[0]) return DIAGNOSIS_LEVELS.RISK;
  return DIAGNOSIS_LEVELS.CRISIS;
};

export const createEmptyDiagnosisAnswers = (): Array<boolean | null> =>
  Array.from({ length: DIAGNOSIS_QUESTION_COUNT }, () => null);

export const evaluateDiagnosis = (answers: readonly (boolean | null | undefined)[]): DiagnosisSummary => {
  const byCategory: DiagnosisSummary["byCategory"] = {
    코어: { yesCount: 0, totalCount: 0, score: 0, maxScore: 0 },
    커넥션: { yesCount: 0, totalCount: 0, score: 0, maxScore: 0 },
    브랜드: { yesCount: 0, totalCount: 0, score: 0, maxScore: 0 },
    세일즈: { yesCount: 0, totalCount: 0, score: 0, maxScore: 0 },
  };

  let yesCount = 0;
  let totalScore = 0;

  DIAGNOSIS_DATA.forEach((item, index) => {
    const bucket = byCategory[item.categoryKey];
    bucket.totalCount += 1;
    bucket.maxScore += item.weight;

    if (answers[index] === true) {
      yesCount += 1;
      totalScore += item.weight;
      bucket.yesCount += 1;
      bucket.score += item.weight;
    }
  });

  return {
    yesCount,
    totalScore,
    maxScore: DIAGNOSIS_MAX_SCORE,
    byCategory,
    level: getLevel(totalScore),
  };
};
