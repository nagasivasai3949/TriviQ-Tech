export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <span className="inline-block text-xs font-semibold tracking-widest text-brand-teal uppercase">
            About TriviqTech
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold text-white leading-tight">
            Small enough to care.{" "}
            <span className="gradient-text">Sharp enough to scale.</span>
          </h2>
          <p className="mt-5 text-lg text-slate-300 leading-relaxed">
            TriviqTech is a service-focused technology company founded on a
            simple belief: great software comes from engineers who own the
            outcome, not just the ticket.
          </p>
          <p className="mt-4 text-slate-400 leading-relaxed">
            We partner with startups and enterprises to design, build, and
            operate modern digital products across three tightly connected
            domains — <span className="text-white font-semibold">Full Stack</span>,{" "}
            <span className="text-white font-semibold">AI</span>, and{" "}
            <span className="text-white font-semibold">Cloud</span>.
          </p>

          <dl className="mt-8 grid gap-5 sm:grid-cols-3">
            {[
              { t: "Senior-led", d: "Every engagement reviewed by senior architects." },
              { t: "Transparent", d: "Weekly demos, clear roadmaps, no surprises." },
              { t: "Production-grade", d: "Security, scale & observability from day one." },
            ].map((v) => (
              <div key={v.t} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <dt className="font-display text-sm font-bold text-brand-teal">{v.t}</dt>
                <dd className="mt-1.5 text-xs text-slate-400 leading-relaxed">{v.d}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Tri-stack visual */}
        <div className="relative aspect-square max-w-md mx-auto w-full">
          <div className="absolute inset-0 grid-pattern opacity-50 rounded-3xl" />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 300" aria-hidden>
            <defs>
              <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2DD4DB" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <line x1="150" y1="50" x2="55" y2="240" stroke="url(#line-grad)" strokeWidth="1.5" strokeDasharray="4 6" />
            <line x1="150" y1="50" x2="245" y2="240" stroke="url(#line-grad)" strokeWidth="1.5" strokeDasharray="4 6" />
            <line x1="55" y1="240" x2="245" y2="240" stroke="url(#line-grad)" strokeWidth="1.5" strokeDasharray="4 6" />
          </svg>

          {[
            { pos: "top-0 left-1/2 -translate-x-1/2", label: "Full Stack", sub: "Frontend + Backend" },
            { pos: "bottom-0 left-0", label: "AI / ML", sub: "LLMs · Vision · NLP" },
            { pos: "bottom-0 right-0", label: "Cloud", sub: "AWS · Azure · GCP" },
          ].map((n, i) => (
            <div
              key={n.label}
              className={`absolute ${n.pos} w-32 rounded-2xl border border-white/10 bg-brand-ink/90 backdrop-blur px-4 py-3 text-center shadow-xl shadow-brand-deep/30 animate-float-slow`}
              style={{ animationDelay: `${i * 0.8}s` }}
            >
              <div className="font-display text-sm font-bold text-white">{n.label}</div>
              <div className="mt-0.5 text-[10px] text-slate-400">{n.sub}</div>
            </div>
          ))}

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-20 w-20 rounded-full bg-brand-gradient opacity-40 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
