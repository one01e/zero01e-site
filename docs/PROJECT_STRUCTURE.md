# 프로젝트 구조 문서

기준일: 2026-04-06

## 1) 워크스페이스 구성

- 단일 서비스: Next.js App Router 기반 `zero01e-site`

## 2) 메인 웹(Next.js) 핵심 구조

### 라우트

- `/` : 홈 (서비스 소개, 대표 작업, 진단 안내, 협업 문의)
- `/about` : 소개 페이지
- `/community` : 블사클 커뮤니티 페이지
- `/labs` : 자료/도구 허브
- `/labs/diagnosis` : 블로그 수익화 진단 퀴즈
- `/labs/diagnosis/result` : 진단 결과 페이지
- `/api/diagnosis` : 진단 제출 API (Google Sheets 적재)

### 디렉터리 역할

- `app/`
  - 페이지 라우트와 API 라우트
- `components/`
  - UI 모듈 (`Navbar`, `DiagnosisQuiz`, `DiagnosisLeadForm`, `DiagnosisResult` 등)
- `constants/`
  - 콘텐츠 텍스트/링크, 진단 문항/점수/타입 정의
- `public/`
  - 정적 에셋

## 3) 상태/콘텐츠 관리 방식

- 사이트 텍스트/링크는 `constants/content/*.ts`에서 중앙 관리
- 진단 데이터는 `constants/diagnosisData.ts`의 26문항(총점 100점) 기반
- 결과 계산/카테고리 집계는 `constants/diagnosis.ts`에서 수행

## 4) 참고

- 본 문서는 `zero01e-site` 메인 웹 기준 구조만 다룹니다.
