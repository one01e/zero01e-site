const formUrl = "https://forms.gle/nqjTi3Uoybi8KxwL7";

const helpItems = [
  {
    title: "키워드/주제 기획",
    description: "검색 유입 가능성이 높은 주제를 찾고, 이어서 쓸 수 있는 흐름까지 함께 설계합니다.",
  },
  {
    title: "글 구조/흐름 개선",
    description: "핵심 메시지가 잘 전달되도록 글의 순서와 구조를 읽기 쉽게 정리합니다.",
  },
  {
    title: "AI 도구 활용 루틴",
    description: "복잡하지 않은 방식으로, 상황에 맞는 AI 활용 루틴을 만들어 드립니다.",
  },
  {
    title: "블로그 진단 & 방향성 제안",
    description: "현재 상태를 점검하고, 지금 가장 먼저 해야 할 개선 방향을 명확히 안내합니다.",
  },
];

const works = [
  {
    title: "키워드 발굴 & 주제 기획",
    description: "검색 유입이 가능한 주제를 빠르게 찾고, 글로 이어지게 설계합니다.",
  },
  {
    title: "SEO 글 구조 설계",
    description: "제목/목차/흐름을 잡아 읽기 쉽고 오래 남는 글을 만듭니다.",
  },
  {
    title: "콘텐츠 시리즈 설계",
    description: "1회성 글이 아니라, 연재/확장 가능한 구조로 운영을 돕습니다.",
  },
  {
    title: "AI 도구 활용 워크플로우",
    description: "상황에 맞는 AI 툴 조합으로 제작 시간을 줄입니다.",
  },
  {
    title: "브랜딩 랜딩 페이지 제작",
    description: "\"나는 누구인가\"를 10초 안에 전달하는 페이지를 만듭니다.",
  },
  {
    title: "블로그 진단 & 개선 가이드",
    description: "현재 상태를 점검하고, 우선순위대로 개선 방향을 제시합니다.",
  },
];

const strengths = [
  "복잡한 정보를 쉽게 정리합니다",
  "실행 가능한 형태로 빠르게 만듭니다",
  "혼자서도 꾸준히 운영할 수 있게 구조를 잡습니다",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <section
          aria-labelledby="hero-heading"
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-10"
        >
          <p className="text-xs font-medium tracking-[0.24em] text-neutral-400">zero01e / 제로원</p>
          <h1 id="hero-heading" className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            0에서 1을 만드는 사람, 제로원
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300 sm:text-xl">
            블로그 · SEO · AI 도구를 활용해 ‘쉽게 시작하고, 꾸준히 성장’하도록 돕습니다.
          </p>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-neutral-400 sm:text-base">
            막연한 아이디어를 실제로 쓸 수 있는 결과물로 바꾸고, 복잡한 과정을 단순한 방법으로 풀어냅니다.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={formUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-neutral-100 px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-300"
            >
              무료 진단 신청하기
            </a>
            <a
              href="#works"
              className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-neutral-100 transition hover:bg-white/10"
            >
              대표 작업 보기
            </a>
          </div>
        </section>

        <section aria-labelledby="help-heading" className="space-y-6">
          <div className="space-y-2">
            <h2 id="help-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
              제가 도와드릴 수 있어요
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {helpItems.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                <h3 className="text-base font-semibold text-neutral-100">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-400">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="works" aria-labelledby="works-heading" className="space-y-6">
          <div className="space-y-2">
            <h2 id="works-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
              대표 작업
            </h2>
            <p className="text-sm text-neutral-400 sm:text-base">
              제가 실제로 자주 하는 작업들을 정리했습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {works.map((work) => (
              <article
                key={work.title}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                <h3 className="text-base font-semibold text-neutral-100">{work.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-400">{work.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="about"
          aria-labelledby="about-heading"
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-10"
        >
          <h2 id="about-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            소개
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-300 sm:text-base">
            저는 zero01e(제로원)로 활동하며, 블로그를 시작하고 키우고 싶은 분들이 길을 잃지 않도록 돕고 있습니다.
            키워드 발굴과 주제 기획, 실무에서 바로 쓰는 AI 도구 활용, 빠르게 만들고 검증하는 방식에 집중합니다.
            결국 중요한 건 멋진 이론보다 꾸준히 실행되는 구조라고 생각하며, 처음 시작하는 분도 0에서 1을 만들 수
            있게 함께합니다.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-neutral-300 sm:text-base">
            {strengths.map((strength) => (
              <li key={strength} className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                {strength}
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="community-heading"
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-10"
        >
          <h2 id="community-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            혼자가 아닌, 함께 성장
          </h2>
          <p className="mt-4 text-sm leading-7 text-neutral-300 sm:text-base">
            블로그 운영 중 생기는 고민, 질문, 피드백을 나누고 함께 실험하는 공간을 만들고 있습니다. 어렵고 복잡한
            방법보다, 누구나 따라 할 수 있는 접근으로 꾸준히 성장할 수 있도록 돕고 싶습니다. 오픈채팅 또는
            커뮤니티 형태로 운영할 예정입니다.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-neutral-200"
            >
              커뮤니티 준비 중
            </button>
          </div>
        </section>

        <section
          aria-labelledby="diagnosis-heading"
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-10"
        >
          <h2 id="diagnosis-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            무료 진단은 이렇게 진행돼요
          </h2>
          <ol className="mt-6 space-y-3 text-sm text-neutral-300 sm:text-base">
            <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
              1) 폼 작성 (업종/목표/블로그 현황)
            </li>
            <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
              2) 현황 진단 (키워드·구조·운영 흐름)
            </li>
            <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
              3) 개선 방향 제안 (우선순위 & 실행 플랜)
            </li>
            <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
              4) 필요 시 협업 안내 (콘텐츠/운영/대행 옵션)
            </li>
          </ol>
          <div className="mt-6">
            <a
              href={formUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-xl bg-neutral-100 px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-300"
            >
              무료 진단 신청하기
            </a>
          </div>
        </section>

        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-10"
        >
          <h2 id="contact-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            연락
          </h2>
          <p className="mt-4 text-sm leading-7 text-neutral-300 sm:text-base">
            협업, 문의, 블로그 진단 요청은 아래로 연락 주세요.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={formUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-neutral-100 px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-300"
            >
              무료 진단 신청하기
            </a>
            <a
              href="mailto:choi01e@naver.com"
              className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-neutral-100 transition hover:bg-white/10"
            >
              이메일(네이버)
            </a>
            <a
              href="mailto:choi01e@gmail.com"
              className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-neutral-100 transition hover:bg-white/10"
            >
              이메일(지메일)
            </a>
            <a
              href="https://www.threads.com/@one01e"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-neutral-100 transition hover:bg-white/10"
            >
              Threads
            </a>
            <a
              href="https://one01e.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-neutral-100 transition hover:bg-white/10"
            >
              Blog
            </a>
          </div>
        </section>

        <footer className="border-t border-white/10 pt-6 text-xs text-neutral-500 sm:text-sm">
          © {new Date().getFullYear()} ZERO01E. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
