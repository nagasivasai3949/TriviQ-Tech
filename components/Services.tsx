type Service = {
  title: string;
  desc: string;
  bullets: string[];
  icon: React.ReactNode;
  accent: string;
  highlight?: boolean;
};

const services: Service[] = [
  {
    title: "Web & Product Engineering",
    desc: "From idea to launched product. We build fast, beautiful, conversion-focused websites and full-stack apps that your customers actually use.",
    bullets: [
      "Ship an MVP in 4–8 weeks",
      "Mobile-first, SEO-ready, instantly fast",
      "Secure auth, payments & dashboards",
      "Handover with docs — or we keep running it",
    ],
    accent: "from-brand-teal/80 to-cyan-500/40",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "AI That Earns Its Keep",
    desc: "We don't ship AI demos. We build LLM copilots, RAG chatbots, and automation that cut costs, close leads, or unlock new revenue.",
    bullets: [
      "Customer-facing chatbots that actually convert",
      "Document & data extraction pipelines",
      "Internal copilots for ops & support teams",
      "Measured against ROI, not vanity metrics",
    ],
    accent: "from-indigo-500/80 to-brand-deep/60",
    highlight: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v1a3 3 0 0 0-3 3v1a3 3 0 0 0-3 3 3 3 0 0 0 3 3v1a3 3 0 0 0 3 3v1a3 3 0 0 0 6 0v-1a3 3 0 0 0 3-3v-1a3 3 0 0 0 3-3 3 3 0 0 0-3-3V9a3 3 0 0 0-3-3V5a3 3 0 0 0-3-3Z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Cloud, DevOps & Scale",
    desc: "When traffic spikes or your AWS bill does — we re-architect for scale, lock down security, and automate the boring stuff.",
    bullets: [
      "Cut cloud spend by 30–60%",
      "Zero-downtime deploys on AWS, Azure, GCP",
      "Pass SOC 2 / ISO groundwork",
      "24/7 monitoring & incident response",
    ],
    accent: "from-sky-500/80 to-brand-deep/60",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19a4.5 4.5 0 1 0-1.4-8.78 6 6 0 0 0-11.6 2.28A4 4 0 0 0 6 19h11.5Z" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl">
          <span className="inline-block text-xs font-semibold tracking-widest text-brand-teal uppercase">
            What we do
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold text-white leading-tight">
            What we do for <span className="gradient-text">our clients.</span>
          </h2>
          <p className="mt-5 text-lg text-slate-300 leading-relaxed">
            One senior team, one clear SOW, one partner who owns the outcome —
            from your first landing page to your hundredth enterprise customer.
            No agency-style vendor stitching, no junior handoffs.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.title}
              className={`group relative rounded-2xl p-[1px] transition-all hover:-translate-y-1 ${
                s.highlight
                  ? "bg-gradient-to-b from-brand-teal/60 to-brand-deep/40"
                  : "bg-white/10"
              }`}
            >
              <div className="h-full rounded-2xl bg-brand-ink/90 p-7 relative overflow-hidden">
                {/* Accent glow */}
                <div
                  className={`pointer-events-none absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br ${s.accent} blur-3xl opacity-40 group-hover:opacity-70 transition-opacity`}
                />

                {s.highlight && (
                  <span className="absolute top-5 right-5 rounded-full bg-brand-teal/15 border border-brand-teal/30 px-2.5 py-1 text-[10px] font-bold tracking-wider text-brand-teal uppercase">
                    Popular
                  </span>
                )}

                <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 text-brand-teal">
                  <div className="h-6 w-6">{s.icon}</div>
                </div>

                <h3 className="relative mt-5 font-display text-xl font-bold text-white">
                  {s.title}
                </h3>
                <p className="relative mt-3 text-sm text-slate-400 leading-relaxed">
                  {s.desc}
                </p>

                <ul className="relative mt-5 space-y-2.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-slate-300">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
