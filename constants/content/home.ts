export const HOME_CONTENT = {
  hero: {
    eyebrow: "WELCOME",
    title: "감으로 하는 블로그는 끝났습니다.",
    highlight: "이제는 '시스템'입니다.",
    description:
      "열심히 쓰는데 방문자와 수익은 그대로인가요? 20년간의 시스템 엔지니어링 경험과 최신 AI/SEO 기술을 결합해 막힌 혈을 뚫어드립니다. '0에서 1을 만드는(Zero to One)' 확실한 구조, 이제 '일이'가 당신의 성장을 돕겠습니다.",
    socialProofs: [
      { value: "20", suffix: "년+", label: "IT 개발 및 엔지니어링" },
      { value: "100", suffix: "%", label: "데이터 기반 SEO 진단" },
      { value: "AI", suffix: "", label: "바이브코딩 및 업무 자동화" },
    ],
    ctas: {
      primary: "📝 개인 블로그 진단 신청",
      secondary: "💬 기업 비즈니스 & 협업 문의",
      tertiary: "🎓 블사클 멤버 클래스 보기",
    },
  },
  services: {
    heading: "제가 도와드릴 수 있어요",
    items: [
      { title: "키워드/주제 기획", desc: "검색 유입 가능성이 높은 주제를 찾고, 이어서 쓸 수 있는 흐름까지 함께 설계합니다.", icon: "Search" },
      { title: "글 구조/흐름 개선", desc: "핵심 메시지가 잘 전달되도록 글의 순서와 구조를 읽기 쉽게 정리합니다.", icon: "Layout" },
      { title: "AI 도구 활용 루틴", desc: "복잡하지 않은 방식으로, 상황에 맞는 AI 활용 루틴을 만들어 드립니다.", icon: "Bot" },
      { title: "블로그 진단 & 방향성", desc: "현재 상태를 점검하고, 지금 가장 먼저 해야 할 개선 방향을 명확히 안내합니다.", icon: "Activity" },
    ],
  },
  works: {
    heading: "대표 작업",
    description: "0부터 1까지, 제가 실제로 자주 그리고 잘하는 작업들입니다.",
    items: [
      { title: "키워드 발굴 & 기획", desc: "검색 유입이 가능한 주제를 빠르게 찾고, 글로 이어지게 설계합니다.", icon: "Key" },
      { title: "SEO 글 구조 설계", desc: "제목/목차/흐름을 잡아 읽기 쉽고 오래 남는 글을 만듭니다.", icon: "PenTool" },
      { title: "콘텐츠 시리즈 설계", desc: "1회성 글이 아니라, 연재/확장 가능한 구조로 운영을 돕습니다.", icon: "Layers" },
      { title: "AI 자동화 워크플로우", desc: "상황에 맞는 AI 툴 조합으로 콘텐츠 제작 시간을 획기적으로 줄입니다.", icon: "Cpu" },
      { title: "브랜딩 랜딩 페이지", desc: "'나는 누구인가'를 10초 안에 전달하는 매력적인 페이지를 구축합니다.", icon: "Monitor" },
      { title: "데이터 기반 개선 가이드", desc: "현재 상태를 점검하고, 우선순위대로 명확한 개선 방향을 제시합니다.", icon: "TrendingUp" },
    ],
  },
  diagnosis: {
    heading: "무료 진단은 이렇게 진행돼요",
    steps: [
      "1단계: 폼 작성 (업종 / 목표 / 블로그 현황)",
      "2단계: 현황 진단 (키워드 / 구조 / 운영 흐름 분석)",
      "3단계: 개선 방향 제안 (우선순위 & 실행 플랜)",
      "4단계: 필요 시 협업 안내 (콘텐츠 / 운영 / 대행 옵션)",
    ],
    cta: "블로그 무료 진단 시작하기",
  },
} as const;
