const works = [
  {
    title: "AI Research Briefing Pipeline",
    description:
      "News, papers, and product updates are collected and summarized into decision-ready briefs in one flow.",
  },
  {
    title: "Content System for SEO + Brand",
    description:
      "A reusable publishing workflow that turns raw ideas into consistent long-form content with clear positioning.",
  },
  {
    title: "Automation Ops Dashboard",
    description:
      "Operational dashboard that tracks automation runs, failures, and follow-up actions for fast iteration.",
  },
  {
    title: "Prompt Library for Creative Production",
    description:
      "Structured prompt sets for image, copy, and short-form media generation with predictable quality.",
  },
  {
    title: "Landing Page Sprint Kits",
    description:
      "Minimal page templates focused on conversion, speed, and maintainability for solo builders and teams.",
  },
  {
    title: "Workflow QA Playbooks",
    description:
      "Checklists and guardrails for validating AI-assisted workflows before release to production.",
  },
];

const strengths = [
  "AI systems that move from idea to working output quickly.",
  "Automation-first processes that remove repetitive operational work.",
  "Content strategy that connects technical depth with clear storytelling.",
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
            ZERO01E
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-neutral-300 sm:text-2xl">
            Building useful products where AI, automation, and content meet.
          </p>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-400 sm:text-base">
            I turn ambiguous ideas into practical systems, from fast prototypes to production-ready workflows.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#works"
              className="rounded-xl bg-neutral-100 px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-300"
            >
              Works
            </a>
            <a
              href="#contact"
              className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-neutral-100 transition hover:bg-white/10"
            >
              Contact
            </a>
          </div>
        </section>

        <section id="works" aria-labelledby="works-heading" className="space-y-6">
          <div className="space-y-2">
            <h2 id="works-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Selected Works
            </h2>
            <p className="text-sm text-neutral-400 sm:text-base">
              A selection of systems and experiments focused on practical outcomes.
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
            About
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-300 sm:text-base">
            I am zero01e (제로원), a builder focused on creating leverage through AI-enabled products and content-led
            growth systems. My work prioritizes clarity, speed, and measurable impact.
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
          id="contact"
          aria-labelledby="contact-heading"
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-10"
        >
          <h2 id="contact-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Contact
          </h2>
          <p className="mt-4 text-sm leading-7 text-neutral-300 sm:text-base">
            Open to collaborations, consulting, and product partnerships.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="mailto:hello@zero01e.com"
              className="rounded-xl bg-neutral-100 px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-300"
            >
              Email
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-neutral-100 transition hover:bg-white/10"
            >
              GitHub
            </a>
            <a
              href="#"
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
