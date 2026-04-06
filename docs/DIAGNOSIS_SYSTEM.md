# 진단 시스템 명세

기준일: 2026-04-06

## 1) 기능 개요

블로그 수익화 지수를 26개 문항으로 평가하고, 리드 정보를 함께 수집해 결과 리포트를 제공하는 기능입니다.

- 진입: `/labs/diagnosis`
- 제출 API: `/api/diagnosis`
- 결과: `/labs/diagnosis/result?submission=<id>`

## 2) 데이터 소스

- 문항 원본: `constants/diagnosisData.ts`
- 파생 상수/평가 로직: `constants/diagnosis.ts`
- API 타입 정의: `constants/diagnosisApi.ts`

핵심 고정값:

- 문항 수: 26
- 총점: 100
- 카테고리: `코어`, `커넥션`, `브랜드`, `세일즈`
- 레벨: `ELITE`, `MASTER`, `GROWTH`, `RISK`, `CRISIS`

## 3) 사용자 플로우

1. 퀴즈 응답 진행
2. 마지막 문항 후 분석 대기 화면 표시
3. 리드 폼 입력/검증
4. `/api/diagnosis`로 제출
5. 성공 시 `sessionStorage`에 결과 저장 후 결과 페이지 이동
6. 결과 페이지에서 점수/레벨/카테고리 분석 렌더링

## 4) 클라이언트 저장 전략

- 퀴즈 진행 상태: `localStorage` (`zero01e:diagnosis:quiz`)
- 결과 payload: `sessionStorage` (`zero01e:diagnosis:result`)

주의:

- 세션 초기화 시 결과 페이지 재복원 불가
- URL의 `submission` 파라미터와 세션의 `submissionId`가 불일치하면 접근 차단

## 5) API 검증 규칙

`POST /api/diagnosis`에서 아래를 검증합니다.

- 이름: 2자 이상
- 연락처: 숫자/기호 포함 8~20자 패턴
- 블로그 URL: `blog.naver.com` 또는 `m.blog.naver.com`만 허용
- 동의: `consent === true`
- 답변: boolean 배열, 길이 26
- 점수 검증: 클라이언트 점수와 서버 계산값 비교

예외:

- `blogUrl === "wkrtkf"`는 우회 허용값으로 처리

## 6) Google Sheets 적재

필수 환경변수:

- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`
- `GOOGLE_SHEET_ID`

선택 환경변수:

- `GOOGLE_SHEET_RANGE` (기본값: `Sheet1!A2`)

적재 컬럼:

- 제출시각(Asia/Seoul), 이름, 연락처, 블로그 URL, 점수, 레벨, Yes 개수, 경과시간, UTM 3종, 26개 응답(O/X)

## 7) 장애 대응 포인트

- 401: 서비스 계정 인증 실패(키/이메일 확인)
- 403: 시트 편집 권한 없음(서비스 계정 공유 필요)
- 기타: 적재 일반 오류
