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
    caption: "신청 시 이메일로 즉시 발송해 드립니다.",
    items: [
      {
        title: "블로그 진단 & 수익화 체크리스트",
        desc: "내 블로그가 왜 안 크는지 5분 만에 진단할 수 있는 20가지 핵심 체크리스트 PDF.",
        type: "PDF Guide",
      },
      {
        title: "검색 노출을 부르는 글 구조 템플릿",
        desc: "네이버, 티스토리, 구글 어디서든 통하는 가독성 최적화 노션(Notion) 템플릿.",
        type: "Notion Template",
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
        status: "Active",
        link: "#",
      },
      {
        title: "SEO 아티클 최적화 봇",
        type: "GPTs",
        desc: "작성된 원고를 바탕으로 검색 엔진 친화적인 제목과 메타 디스크립션을 뽑아줍니다.",
        status: "Beta",
        link: "#",
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
        status: "Private",
        link: "#",
      },
      {
        title: "키워드 트래픽 모니터링",
        type: "Python",
        desc: "타겟 키워드의 상위 노출 순위 변화와 검색량 추이를 주기적으로 크롤링하여 요약해 주는 자동화 툴입니다.",
        status: "v1.2",
        link: "#",
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
