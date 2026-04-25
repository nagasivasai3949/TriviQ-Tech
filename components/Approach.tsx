const steps = [
  {
    num: "01",
    title: "Listen",
    desc: "We start by understanding your business, your users, and your constraints. No assumptions — just questions that matter.",
    accent: "border-l-brand-accent",
  },
  {
    num: "02",
    title: "Architect",
    desc: "Data flow, UX, and infrastructure planned together upfront so nothing blindsides you in week six.",
    accent: "border-l-sky-400",
  },
  {
    num: "03",
    title: "Build",
    desc: "Two-week sprints, weekly demos, clean code. You see progress every week — not a big reveal at the end.",
    accent: "border-l-brand-violet",
  },
  {
    num: "04",
    title: "Launch & Grow",
    desc: "We don't disappear after deploy. We stick around for monitoring, optimization, and whatever comes next.",
    accent: "border-l-brand-cta",
  },
];

export default function Approach() {
  return (
    <section id="approach" className="py-24 md:py-32 section-glow">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="inline-block text-[11px] font-semibold tracking-[0.15em] text-brand-accent uppercase">
            How we work
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.15]">
            No surprises.{" "}
            <span className="gradient-text">Just steady progress.</span>
          </h2>
        </div>

        {/* Timeline layout */}
        <div className="mt-14 relative">
          {/* Vertical connector line — desktop */}
          <div className="hidden lg:block absolute left-[calc(50%-0.5px)] top-0 bottom-0 w-px bg-gradient-to-b from-brand-accent/30 via-brand-primary/20 to-transparent" />

          <div className="grid gap-8 lg:gap-0">
            {steps.map((s, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={s.num} className="relative lg:grid lg:grid-cols-2 lg:gap-12">
                  {/* Dot on timeline */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-8 z-10 items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-brand-accent/30 border-2 border-brand-accent ring-4 ring-brand-ivory" />
                  </div>

                  {/* Content — alternating sides */}
                  <div className={`${isEven ? "lg:pr-16" : "lg:col-start-2 lg:pl-16"}`}>
                    <div className={`rounded-2xl border border-slate-200/80 ${s.accent} border-l-4 bg-white p-6 hover:shadow-soft-lg transition-all`}>
                      <div className="flex items-center gap-4 mb-3">
                        <span className="font-display text-3xl font-bold gradient-text">{s.num}</span>
                        <h4 className="font-display text-lg font-bold text-slate-900">{s.title}</h4>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>

                  {/* Empty column for layout on the other side */}
                  {isEven && <div className="hidden lg:block" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
