export const LABS_CONTENT = {
  hero: {
    eyebrow: "RESEARCH & TOOLS",
    title: "시행착오를 줄여줄",
    highlight: "실전 도구 모음",
    description:
      "20년간 쌓아온 구조적 사고와 실무 노하우를 바탕으로, 일이가 직접 만들고 검증한 가이드 문서와 자동화 스크립트를 공유합니다. 필요한 도구를 언제든 꺼내 쓰세요.",
  },
  resources: {
    heading: "무료 인사이트 자료",
    caption: "진단 기반 실행 동선과 자료를 순차적으로 제공합니다.",
    items: [
      {
        title: "블로그 수익화 지수 진단",
        desc: "막연한 운영 감각을 끝내고, 지금 내 블로그가 어디서 막히는지 한 번에 점검합니다. 진단 직후 단계별 결과와 우선 실행 포인트를 확인해 다음 행동이 선명해집니다.",
        type: "Free Diagnosis",
        ctaLabel: "블로그 수익화 지수 진단 시작",
        ctaKind: "internal-link",
        ctaHref: "/labs/diagnosis",
      },
      {
        title: "검색 노출을 부르는 글 구조 템플릿",
        desc: "네이버/티스토리/구글 공통으로 활용 가능한 템플릿이며, 현재는 차후 제공 준비 중입니다.",
        type: "Notion Template",
        ctaLabel: "제공 예정 안내",
        ctaKind: "dialog-coming-soon",
      },
    ],
  },
  agents: {
    heading: "맞춤형 AI 에이전트",
    items: [
      {
        title: "0부터 1까지",
        type: "Gems",
        desc: "블로그 주제 기획부터 글의 뼈대(목차) 작성까지, 막막한 시작을 돕는 맞춤형 AI 챗봇입니다.",
        status: "Members Only",
        ctaLabel: "멤버 전용 안내",
        ctaKind: "dialog-members-only",
      },
      {
        title: "SEO 아티클 최적화 봇",
        type: "GPTs",
        desc: "작성된 원고를 바탕으로 검색 엔진 친화적인 제목과 메타 디스크립션을 뽑아줍니다.",
        status: "Members Only",
        ctaLabel: "멤버 전용 안내",
        ctaKind: "dialog-members-only",
      },
    ],
  },
  scripts: {
    heading: "자동화 스크립트",
    items: [
      {
        title: "멀티 플랫폼 자동 발행 스니펫",
        type: "Python",
        desc: "마크다운으로 작성된 글을 네이버, 티스토리, 구글 블로거(Blogspot) 양식에 맞춰 자동 변환하고 임시 저장하는 스크립트입니다.",
        status: "Members Only",
        ctaLabel: "멤버 전용 안내",
        ctaKind: "dialog-members-only",
      },
      {
        title: "키워드 트래픽 모니터링",
        type: "Python",
        desc: "타겟 키워드의 상위 노출 순위 변화와 검색량 추이를 주기적으로 크롤링하여 요약해 주는 자동화 툴입니다.",
        status: "Members Only",
        ctaLabel: "멤버 전용 안내",
        ctaKind: "dialog-members-only",
      },
    ],
  },
  bottomCta: {
    heading: "우리 브랜드만의 맞춤형 자동화 툴이 필요하신가요?",
    description:
      "반복되는 업무를 줄이고 콘텐츠 생산성을 극대화하는 사내 AI 챗봇 구축부터, 멀티 플랫폼 자동 발행 스크립트 제작까지. 기술적 한계로 막혀있던 비즈니스 병목을 해결해 드립니다.",
    button: "기업/브랜드 맞춤형 툴 문의하기",
  },
} as const;
