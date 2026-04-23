const steps = [
  {
    num: "01",
    title: "Discover",
    desc: "We listen first. Goals, constraints, users — then map the shortest path to business value.",
  },
  {
    num: "02",
    title: "Design",
    desc: "Architecture, UX and data flow designed together — so nothing surprises you in week six.",
  },
  {
    num: "03",
    title: "Build",
    desc: "Agile sprints, weekly demos, and clean code reviewed by senior engineers on every PR.",
  },
  {
    num: "04",
    title: "Elevate",
    desc: "Launch, measure, optimize. We stay on as a partner — not disappear after handover.",
  },
];

export default function Approach() {
  return (
    <section id="approach" className="py-24 md:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl">
          <span className="inline-block text-xs font-semibold tracking-widest text-brand-teal uppercase">
            How we work
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold text-white leading-tight">
            A predictable path from{" "}
            <span className="gradient-text">idea to production.</span>
          </h2>
        </div>

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative">
          {steps.map((s, i) => (
            <li
              key={s.num}
              className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-brand-teal/40 hover:bg-white/[0.05] transition"
            >
              <div className="font-display text-4xl font-bold gradient-text">
                {s.num}
              </div>
              <h4 className="mt-4 font-display text-lg font-bold text-white">
                {s.title}
              </h4>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 text-brand-teal/40" aria-hidden>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
