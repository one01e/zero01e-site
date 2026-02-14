export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="text-sm tracking-widest text-white/70">ZERO01E</p>
        <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-6xl">
          0에서 1을 만드는<br />개발자 · 크리에이터
        </h1>
        <p className="mt-6 text-lg text-white/80">
          AI, 자동화, 콘텐츠 제작을 연결해 실용적인 결과물을 만듭니다.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a className="rounded-xl bg-white px-5 py-3 text-black font-semibold" href="#works">
            작업 보기
          </a>
          <a className="rounded-xl border border-white/20 px-5 py-3 text-white" href="#contact">
            연락하기
          </a>
        </div>
      </section>

      <section id="works" className="mx-auto max-w-4xl px-6 py-14">
        <h2 className="text-2xl font-semibold">Selected Works</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            { title: "SEO 블로그 프레임워크", desc: "검색 의도 기반 글 구조 자동화 템플릿" },
            { title: "프롬프트 디자인", desc: "이미지/영상 생성용 프롬프트 시스템" },
            { title: "개발 프로젝트", desc: "작은 도구부터 대시보드까지 빠르게 구축" },
            { title: "리서치 & 브리핑", desc: "뉴스/자료 수집 → 요약 → 인사이트 정리" },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-white/75">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-4xl px-6 pb-20">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p className="mt-4 text-white/80">
          협업/제안/문의는 아래 링크로 연락해 주세요.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a className="rounded-xl border border-white/20 px-5 py-3" href="mailto:you@example.com">
            Email
          </a>
          <a className="rounded-xl border border-white/20 px-5 py-3" href="https://github.com/" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="rounded-xl border border-white/20 px-5 py-3" href="#" target="_blank" rel="noreferrer">
            Blog
          </a>
        </div>
      </section>
    </main>
  );
}
