# Codex 작업 가이드

기준일: 2026-04-06

이 문서는 Codex가 이 프로젝트에서 작업할 때 참고할 최소 기준 문서입니다.

## 1) 시작 전 확인 순서

1. `README.md` (전체 개요)
2. `docs/PROJECT_STRUCTURE.md` (구조/라우트)
3. `docs/DEVELOPMENT_STATUS.md` (현재 상태/리스크)
4. 변경 대상 코드 파일

## 2) 코드 수정 원칙

- 페이지 텍스트/링크는 가능한 `constants/content/*.ts`에서 관리
- 진단 로직 변경 시 `diagnosisData.ts` + `diagnosis.ts` + `diagnosisApi.ts` 동시 점검
- API 응답 스키마 변경 시 클라이언트 소비 지점(`DiagnosisQuiz`, 결과 페이지) 동기화
- 기존 워크트리의 사용자 변경사항을 임의 되돌리지 않음

## 3) 문서 동기화 원칙

아래 변경이 발생하면 docs를 갱신합니다.

- 라우트 추가/삭제
- API 입력/출력 스펙 변경
- 환경변수 추가/삭제
- 기능 상태(완료/보류/예정) 변경

## 4) 검증 체크리스트

- 기본 실행: `npm run dev`
- 진단 플로우 수동 점검:
  - `/labs/diagnosis` 문항 진행
  - 리드 폼 제출
  - `/labs/diagnosis/result` 렌더링 확인
- API 수동 점검:
  - `POST /api/diagnosis` 필드 검증 에러 케이스 확인

참고:

- lint는 현재 통과 상태이며, 신규 변경 시 `npm run lint` 재확인 권장
