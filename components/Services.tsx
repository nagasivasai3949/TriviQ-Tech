type Service = {
  title: string;
  tagline: string;
  desc: string;
  bullets: string[];
  icon: React.ReactNode;
  accentColor: string;
  accentBg: string;
};

const services: Service[] = [
  {
    title: "Web & Product Engineering",
    tagline: "From zero to launched",
    desc: "We take your idea and turn it into a real product — fast, responsive, and built to convert. Not a prototype. Not a template. A product your users will actually use.",
    bullets: [
      "MVP to production in 4–8 weeks",
      "Mobile-first, SEO-optimized from day one",
      "Auth, payments, dashboards — the whole stack",
      "Clean handoff with docs, or we keep running it",
    ],
    accentColor: "text-brand-accent",
    accentBg: "bg-cyan-50",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "AI That Actually Works",
    tagline: "Not demos — real ROI",
    desc: "We don't build AI for the pitch deck. We build LLM copilots, extraction pipelines, and chatbots that save your team time and make you money.",
    bullets: [
      "Chatbots that convert, not just chat",
      "Document & data extraction at scale",
      "Internal tools that cut ops costs",
      "Measured against revenue, not buzzwords",
    ],
    accentColor: "text-brand-violet",
    accentBg: "bg-indigo-50",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v1a3 3 0 0 0-3 3v1a3 3 0 0 0-3 3 3 3 0 0 0 3 3v1a3 3 0 0 0 3 3v1a3 3 0 0 0 6 0v-1a3 3 0 0 0 3-3v-1a3 3 0 0 0 3-3 3 3 0 0 0-3-3V9a3 3 0 0 0-3-3V5a3 3 0 0 0-3-3Z" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    title: "Cloud & Infrastructure",
    tagline: "Scale without the bill shock",
    desc: "Whether your traffic just spiked or your AWS bill did — we architect for scale, lock down security, and automate the stuff that slows you down.",
    bullets: [
      "Cut cloud spend by 30–60%",
      "Zero-downtime deployments",
      "Security hardening & compliance prep",
      "Monitoring, alerts, and incident response",
    ],
    accentColor: "text-sky-500",
    accentBg: "bg-sky-50",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19a4.5 4.5 0 1 0-1.4-8.78 6 6 0 0 0-11.6 2.28A4 4 0 0 0 6 19h11.5Z" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 relative section-glow bg-brand-paper">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="inline-block text-[11px] font-semibold tracking-[0.15em] text-brand-accent uppercase">
            What we do
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.15]">
            Three things, done{" "}
            <span className="gradient-text">exceptionally well.</span>
          </h2>
          <p className="mt-5 text-slate-600 leading-relaxed">
            We don&apos;t try to do everything. We focus on full-stack web, AI
            integration, and cloud — and we do them at a level most agencies
            can&apos;t match.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {services.map((s, i) => (
            <article
              key={s.title}
              className="group relative rounded-2xl border border-slate-200/80 bg-white p-7 hover:border-brand-primary/20 hover:shadow-soft-lg transition-all duration-300 card-shine"
            >
              {/* Top row: icon + tagline */}
              <div className="flex items-center gap-3 mb-5">
                <div className={`h-10 w-10 flex items-center justify-center rounded-xl ${s.accentBg} border border-slate-100 ${s.accentColor}`}>
                  <div className="h-5 w-5">{s.icon}</div>
                </div>
                <span className="text-[11px] font-semibold tracking-[0.12em] text-slate-400 uppercase">
                  {s.tagline}
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-brand-primary transition-colors">
                {s.title}
              </h3>
              <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                {s.desc}
              </p>

              <ul className="mt-5 space-y-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-brand-accent/60 flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Bottom connector line */}
              {i < services.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-px bg-gradient-to-r from-slate-200 to-transparent" />
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
