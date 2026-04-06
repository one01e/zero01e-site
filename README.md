# ZERO01E Site

ZERO01E 브랜딩/컨설팅 메인 웹 프로젝트입니다.

## 구성 요약

- 스택: `Next.js 16 + React 19 + Tailwind v4 + Framer Motion`
- 핵심 기능: 멀티 페이지 랜딩, 블로그 수익화 진단(26문항), 리드 수집 API(Google Sheets 연동)

## 빠른 시작

### 1) 메인 웹 (Next.js)

```bash
npm install
npm run dev
```

- 접속: `http://localhost:3000`

### 2) 스크립트로 실행/종료

```bash
./run.sh
./stop.sh
```

## 문서 안내

- 전체 인덱스: `docs/README.md`
- 구조/스택: `docs/PROJECT_STRUCTURE.md`
- 개발 현황: `docs/DEVELOPMENT_STATUS.md`
- 진단 시스템 명세: `docs/DIAGNOSIS_SYSTEM.md`
- Codex 작업 기준: `docs/CODEX_GUIDE.md`

## 현재 상태 스냅샷 (2026-04-06 기준)

- 완료: 홈/소개/커뮤니티/랩스/진단/진단결과 페이지와 공통 내비게이션 구성
- 완료: 진단 점수 계산, 결과 레벨링, 카테고리별 분석 UI, 공유 기능
- 완료: `/api/diagnosis` 입력 검증 및 Google Sheets 적재
- 완료: `npm run lint` 통과

자세한 내용은 `docs/DEVELOPMENT_STATUS.md`를 참고하세요.
