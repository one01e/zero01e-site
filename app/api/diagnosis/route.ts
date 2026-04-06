import { google } from "googleapis";
import { NextResponse } from "next/server";
import {
  DIAGNOSIS_LEVELS,
  DIAGNOSIS_MAX_SCORE,
  DIAGNOSIS_QUESTION_COUNT,
  evaluateDiagnosis,
  type DiagnosisCategory,
} from "@/constants/diagnosis";
import type {
  DiagnosisLevelKey,
  DiagnosisLevelLabel,
  DiagnosisSubmissionApiResponse,
  DiagnosisSubmissionRequest,
  DiagnosisSubmissionResult,
} from "@/constants/diagnosisApi";

type RawDiagnosisSubmissionRequest = Partial<Record<keyof DiagnosisSubmissionRequest, unknown>>;

const BLOG_URL_BYPASS = "wkrtkf";
const BLOG_BYPASS_NAME = "관리자";
const BLOG_BYPASS_PHONE = "010-1234-1234";
const NAVER_BLOG_HOSTS = ["blog.naver.com", "m.blog.naver.com"];

const isBypassBlogInput = (value: string): boolean => value.trim().toLowerCase() === BLOG_URL_BYPASS;

const normalizeBlogUrl = (value: string): string => {
  let trimmed = value.trim();
  if (!trimmed) return trimmed;
  if (!(/^https?:\/\//i.test(trimmed))) trimmed = `https://${trimmed}`;

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

const isValidBlogUrl = (value: string): boolean => {
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return false;
    if (!NAVER_BLOG_HOSTS.includes(url.hostname)) return false;
    const pathSegments = url.pathname.split("/").filter(Boolean);
    return pathSegments.length > 0;
  } catch {
    return false;
  }
};

const normalizePhone = (value: string): string => value.trim();

const maskPhone = (value: string): string => {
  const digits = value.replace(/\D/g, "");
  if (digits.length < 8) return "****";
  return `${digits.slice(0, 3)}-${"*".repeat(Math.max(digits.length - 7, 1))}${digits.slice(-4)}`;
};

const isValidPhone = (value: string): boolean => /^[0-9+\-\s()]{8,20}$/.test(value);

const normalizeUtm = (value: unknown): string => {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  return trimmed.slice(0, 100);
};

const getUtmFromReferer = (referer: string | null): { source: string; medium: string; campaign: string } => {
  if (!referer) return { source: "", medium: "", campaign: "" };
  try {
    const url = new URL(referer);
    return {
      source: normalizeUtm(url.searchParams.get("utm_source")),
      medium: normalizeUtm(url.searchParams.get("utm_medium")),
      campaign: normalizeUtm(url.searchParams.get("utm_campaign")),
    };
  } catch {
    return { source: "", medium: "", campaign: "" };
  }
};

const getLevelKey = (totalScore: number): DiagnosisLevelKey => {
  if (totalScore >= DIAGNOSIS_LEVELS.ELITE.range[0]) return "ELITE";
  if (totalScore >= DIAGNOSIS_LEVELS.MASTER.range[0]) return "MASTER";
  if (totalScore >= DIAGNOSIS_LEVELS.GROWTH.range[0]) return "GROWTH";
  if (totalScore >= DIAGNOSIS_LEVELS.RISK.range[0]) return "RISK";
  return "CRISIS";
};

const LEVEL_LABEL_MAP: Record<DiagnosisLevelKey, DiagnosisLevelLabel> = {
  ELITE: "최상위 단계",
  MASTER: "확장 단계",
  GROWTH: "정체 단계",
  RISK: "위험 단계",
  CRISIS: "긴급 단계",
};

const getLevelLabel = (levelKey: DiagnosisLevelKey): DiagnosisLevelLabel => LEVEL_LABEL_MAP[levelKey];

const toBadRequest = (error: string) =>
  NextResponse.json<DiagnosisSubmissionApiResponse>({ success: false, error }, { status: 400 });

export async function POST(request: Request) {
  let rawBody: RawDiagnosisSubmissionRequest;
  try {
    rawBody = (await request.json()) as RawDiagnosisSubmissionRequest;
  } catch {
    return toBadRequest("요청 본문(JSON) 파싱에 실패했습니다.");
  }

  const rawName = typeof rawBody.name === "string" ? rawBody.name.trim() : "";
  const rawPhone = typeof rawBody.phone === "string" ? normalizePhone(rawBody.phone) : "";
  const rawBlogUrl = typeof rawBody.blogUrl === "string" ? rawBody.blogUrl.trim() : "";
  const isBlogBypass = isBypassBlogInput(rawBlogUrl);
  const name = isBlogBypass ? BLOG_BYPASS_NAME : rawName;
  const phone = isBlogBypass ? BLOG_BYPASS_PHONE : rawPhone;
  const blogUrl = isBlogBypass ? BLOG_URL_BYPASS : normalizeBlogUrl(rawBlogUrl);
  const consent = rawBody.consent === true;
  const elapsedSeconds = typeof rawBody.elapsedSeconds === "number" && Number.isFinite(rawBody.elapsedSeconds)
    ? Math.max(0, Math.round(rawBody.elapsedSeconds))
    : 0;
  const elapsedFormatted = elapsedSeconds > 0
    ? `${Math.floor(elapsedSeconds / 60)}분 ${elapsedSeconds % 60}초`
    : "-";
  const refererUtm = getUtmFromReferer(request.headers.get("referer"));
  const utmSource = normalizeUtm(rawBody.utm_source) || refererUtm.source || "(direct)";
  const utmMedium = normalizeUtm(rawBody.utm_medium) || refererUtm.medium || "(none)";
  const utmCampaign = normalizeUtm(rawBody.utm_campaign) || refererUtm.campaign || "(none)";

  if (name.length < 2) {
    return toBadRequest("이름 형식이 올바르지 않습니다.");
  }
  if (!isValidPhone(phone)) {
    return toBadRequest("연락처 형식이 올바르지 않습니다.");
  }
  if (!isBlogBypass && !isValidBlogUrl(blogUrl)) {
    return toBadRequest("네이버 블로그 URL(blog.naver.com/아이디)만 입력 가능합니다.");
  }
  if (!consent) {
    return toBadRequest("개인정보 수집 및 이용 동의가 필요합니다.");
  }

  if (!Array.isArray(rawBody.answers) || rawBody.answers.length !== DIAGNOSIS_QUESTION_COUNT) {
    return toBadRequest(`answers는 길이 ${DIAGNOSIS_QUESTION_COUNT}의 배열이어야 합니다.`);
  }
  if (!rawBody.answers.every((item) => typeof item === "boolean")) {
    return toBadRequest("answers는 boolean 값만 포함해야 합니다.");
  }
  const answers = rawBody.answers as boolean[];

  const hasClientScore = typeof rawBody.score === "number" && Number.isFinite(rawBody.score);
  const clientScore = hasClientScore ? Math.trunc(rawBody.score as number) : null;

  const evaluated = evaluateDiagnosis(answers);
  const yesCount = answers.filter(Boolean).length;
  const acceptedScores = [evaluated.totalScore, yesCount];
  if (clientScore !== null && !acceptedScores.includes(clientScore)) {
    return NextResponse.json<DiagnosisSubmissionApiResponse>(
      { success: false, error: "점수 검증에 실패했습니다. 다시 시도해 주세요." },
      { status: 409 }
    );
  }

  const levelKey = getLevelKey(evaluated.totalScore);
  const levelLabel = getLevelLabel(levelKey);
  const submissionId = `diag_${Date.now()}`;
  const submittedAt = new Date().toISOString();
  const nextPath = `/labs/diagnosis/result?submission=${encodeURIComponent(submissionId)}`;

  const resultPayload: DiagnosisSubmissionResult = {
    submissionId,
    submittedAt,
    result: {
      score: evaluated.totalScore,
      yesCount: evaluated.yesCount,
      maxScore: evaluated.maxScore,
      level: {
        key: levelKey,
        label: evaluated.level.label,
        colorClass: evaluated.level.colorClass,
      },
      byCategory: evaluated.byCategory as Record<
        DiagnosisCategory,
        { yesCount: number; totalCount: number; score: number; maxScore: number }
      >,
    },
    lead: {
      name,
      phoneMasked: maskPhone(phone),
      blogUrl,
    },
    nextPath,
  };

  const serverLogPayload = {
    timestamp: submittedAt,
    submissionId,
    name,
    phone,
    blogUrl,
    score: evaluated.totalScore,
    level: levelLabel,
    levelKey,
    yesCount,
    utmSource,
    utmMedium,
    utmCampaign,
    answers,
  };

  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const sheetRange = process.env.GOOGLE_SHEET_RANGE ?? "Sheet1!A2";

  if (!serviceAccountEmail || !privateKey || !sheetId) {
    return NextResponse.json<DiagnosisSubmissionApiResponse>(
      { success: false, error: "Google Sheets 환경 변수가 누락되었습니다." },
      { status: 500 }
    );
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: serviceAccountEmail,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });

    console.info("[Google Sheets] Attempting append to sheet:", sheetId, "range:", sheetRange);
    const appendResult = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: sheetRange,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }),
            name,
            phone,
            blogUrl,
            evaluated.totalScore,
            levelLabel,
            yesCount,
            elapsedFormatted,
            utmSource,
            utmMedium,
            utmCampaign,
            ...answers.map((answer) => (answer ? "O" : "X")),
          ],
        ],
      },
    });
    console.info("[Google Sheets] Append result status:", appendResult.status, "updatedRange:", appendResult.data.updates?.updatedRange);
  } catch (error) {
    console.error("Google Sheets Error:", error);
    const statusCode =
      typeof error === "object" && error !== null && "code" in error && typeof error.code === "number"
        ? error.code
        : undefined;
    if (statusCode === 401) {
      return NextResponse.json<DiagnosisSubmissionApiResponse>(
        { success: false, error: "Google 서비스 계정 인증에 실패했습니다. 키/이메일 설정을 확인해 주세요." },
        { status: 500 }
      );
    }
    if (statusCode === 403) {
      return NextResponse.json<DiagnosisSubmissionApiResponse>(
        { success: false, error: "Google 시트 편집 권한이 없습니다. 서비스 계정을 시트 편집자로 공유해 주세요." },
        { status: 500 }
      );
    }
    return NextResponse.json<DiagnosisSubmissionApiResponse>(
      { success: false, error: "데이터 저장 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }

  console.info(`[NEW DIAGNOSIS LEAD]\n${JSON.stringify(serverLogPayload, null, 2)}`);

  return NextResponse.json<DiagnosisSubmissionApiResponse>(
    {
      success: true,
      result: {
        score: evaluated.totalScore,
        maxScore: DIAGNOSIS_MAX_SCORE,
        level: levelLabel,
        levelKey,
      },
      data: resultPayload,
    },
    { status: 200 }
  );
}
