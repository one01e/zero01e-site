export const COMMUNITY_CONTENT = {
  hero: {
    eyebrow: "BLOG CLASS",
    status: {
      closed: "1기 정원 마감",
      open: "2기 대기 접수 중",
    },
    title: "블사클 5단계 로드맵으로",
    highlight: "블로그의 뼈대를 단단히 세웁니다",
    description:
      "현재 블사클은 블로그 성장 과정을 5단계 커리큘럼으로 운영합니다. 지금 진행 중인 1기는 그중 (클래스:코어)로, 블로그 초기 구성과 기본 뼈대를 세우는 핵심 시작 구간입니다.",
    notice: "※ 1기(1단계) 진행 중 / 2기 모집은 대기 접수로 운영됩니다.",
  },
  curriculum: {
    heading: "블사클 멤버 클래스 커리큘럼 (5단계)",
    description: "[블사클 1기]에서는 (클래스:코어) 집중적으로 진행하며, 이후 기수에서 순차적으로 다음 클래스를 확장합니다.",
    items: [
      {
        class: "클래스 1 [코어]",
        state: "현재 오픈",
        title: "흔들리지 않는 기본기, 지치지 않는 글쓰기의 모든 것",
        subtitle: "검색 최적화(SEO) 세팅과 롱테일 키워드 공략",
        framework: "Foundation & Traffic",
        details: [
          "블로그 기본 운영 구조와 장기 글쓰기 루틴을 세웁니다.",
          "SEO 세팅을 기반으로 검색 유입이 가능한 뼈대를 만듭니다.",
          "롱테일 키워드 중심으로 초기 트래픽 확보 전략을 실습합니다.",
        ],
        expandable: true,
      },
      {
        class: "클래스 2 [커넥션]",
        state: "준비 중",
        title: "혼자 쓰는 글은 그만, 내 글에 열광하는 찐팬 만들기",
        subtitle: "릴레이션십 마케팅과 충성 고객(팬덤) 확보 전략",
        framework: "Fandom Matrix",
        details: [],
        expandable: false,
      },
      {
        class: "클래스 3 [브랜드]",
        state: "준비 중",
        title: "나라는 이름이 브랜드가 되는, 대체 불가능한 블로그",
        subtitle: "평범한 일기장을 고단가 포트폴리오로 바꾸는 브랜딩 마법",
        framework: "Identity Building",
        details: [],
        expandable: false,
      },
      {
        class: "클래스 4 [세일즈]",
        state: "준비 중",
        title: "취미를 직업으로, 내 블로그에 현금 파이프라인 꽂기",
        subtitle: "세일즈 카피라이팅 및 고단가 B2B 협상 실무",
        framework: "Monetization Flow",
        details: [],
        expandable: false,
      },
      {
        class: "클래스 5 [크리에이터]",
        state: "준비 중",
        title: "글을 넘어 영상으로, 터지는 숏폼으로 최상위 포식자 되기",
        subtitle: "하이엔드 숏폼 수익화, 네이버 클립 300만 조회수 해킹",
        framework: "Short-form Dominance",
        details: [],
        expandable: false,
      },
    ],
  },
  benefits: {
    title: "상시 피드백 네트워킹",
    items: ["1:1 블로그 현황 진단 및 개선안 제공", "막히는 구간 발생 시 즉각적인 Q&A", "멤버 간 인사이트 공유 및 동기부여"],
  },
  bottomCta: {
    heading: "블사클 1단계(1기) 진행 중, 다음 기수 합류를 준비하세요.",
    description:
      "현재 1기 정원이 마감되어 1단계 커리큘럼이 운영 중입니다. 지금 2기 대기 명단에 등록하시면 정식 모집 오픈 시 우선 참여 안내와 얼리버드 혜택 소식을 가장 먼저 받아보실 수 있습니다.",
    buttonWaitlist: "[블사클 2기] 사전 알림 신청",
    buttonEarlybird: "얼리버드 혜택 확인",
  },
} as const;
