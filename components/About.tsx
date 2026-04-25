const values = [
  {
    title: "We own the outcome",
    desc: "We don't just write code and hand it over. We stay accountable for whether it actually works for your business.",
    icon: "◆",
    iconBg: "bg-cyan-50 text-brand-accent",
  },
  {
    title: "No junior bait-and-switch",
    desc: "The engineers you talk to are the engineers who build. No juniors brought in after the deal is signed.",
    icon: "◇",
    iconBg: "bg-indigo-50 text-brand-violet",
  },
  {
    title: "Transparent by default",
    desc: "Weekly demos, shared repos, clear roadmaps. You always know exactly where your project stands.",
    icon: "○",
    iconBg: "bg-sky-50 text-sky-500",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 section-glow">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-start">
          <div>
            <span className="inline-block text-[11px] font-semibold tracking-[0.15em] text-brand-accent uppercase">
              About us
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.15]">
              Small team.{" "}
              <span className="gradient-text">Big standards.</span>
            </h2>
            <div className="mt-6 space-y-4 text-slate-600 leading-relaxed">
              <p>
                TriviqTech started with a simple frustration: too many software
                projects fail because the people building them don&apos;t care
                about the result. They care about closing tickets.
              </p>
              <p>
                We&apos;re a small, focused team of engineers who partner with
                founders and businesses to design, build, and run modern
                software. We work across{" "}
                <span className="text-slate-900 font-semibold">full-stack web</span>,{" "}
                <span className="text-slate-900 font-semibold">AI</span>, and{" "}
                <span className="text-slate-900 font-semibold">cloud infrastructure</span> —
                three domains that work best when they&apos;re built together.
              </p>
              <p className="text-slate-500 text-sm">
                We&apos;re remote-first, serving clients in the US, UK, and
                India. Every engagement is led by senior engineers — because
                that&apos;s the only way to ship software that actually works.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 hover:border-brand-primary/20 hover:shadow-soft-lg transition-all group"
              >
                <div className="flex items-start gap-4">
                  <span className={`flex-shrink-0 w-8 h-8 rounded-lg ${v.iconBg} border border-slate-100 flex items-center justify-center text-sm font-bold`}>
                    {v.icon}
                  </span>
                  <div>
                    <h4 className="font-display text-base font-bold text-slate-900 group-hover:text-brand-primary transition-colors">
                      {v.title}
                    </h4>
                    <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { n: "3", l: "Countries" },
                { n: "100%", l: "Senior-led" },
                { n: "<1 day", l: "Reply time" },
              ].map((s) => (
                <div key={s.l} className="text-center rounded-xl border border-slate-200/80 bg-white py-4 shadow-soft">
                  <div className="font-display text-xl font-bold gradient-text">{s.n}</div>
                  <div className="mt-1 text-[11px] text-slate-400">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
