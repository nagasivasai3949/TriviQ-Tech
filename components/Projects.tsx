type Project = {
  name: string;
  client: string;
  country: string;
  flag: string;
  summary: string;
  stack: string[];
  url?: string;
  status: "live" | "private";
  accent: string;
  preview: React.ReactNode;
};

const projects: Project[] = [
  {
    name: "Newark Truck Center",
    client: "Commercial truck dealership",
    country: "United States",
    flag: "🇺🇸",
    summary:
      "A modern, SEO-optimized marketing site for a full-service truck dealership — inventory discovery, service scheduling, and parts inquiries all on one stack.",
    stack: ["Next.js", "Tailwind", "Node.js", "SEO"],
    url: "https://www.newarktruckcenter.com/",
    status: "live",
    accent: "from-sky-500/60 to-brand-deep/60",
    preview: (
      <svg viewBox="0 0 200 120" fill="none" aria-hidden className="w-full h-full">
        <rect width="200" height="120" rx="10" fill="#0B1220" />
        <rect x="14" y="14" width="172" height="18" rx="4" fill="#1E3A8A" opacity="0.55" />
        <rect x="14" y="40" width="80" height="56" rx="6" fill="#2DD4DB" opacity="0.25" />
        <rect x="100" y="40" width="86" height="26" rx="4" fill="#ffffff" opacity="0.1" />
        <rect x="100" y="70" width="86" height="26" rx="4" fill="#ffffff" opacity="0.1" />
        <circle cx="40" cy="72" r="10" fill="#2DD4DB" opacity="0.85" />
        <rect x="56" y="66" width="30" height="4" rx="2" fill="#ffffff" opacity="0.75" />
        <rect x="56" y="74" width="22" height="3" rx="1.5" fill="#ffffff" opacity="0.5" />
      </svg>
    ),
  },
  {
    name: "Zoomgroc",
    client: "Online grocery platform",
    country: "United Kingdom",
    flag: "🇬🇧",
    summary:
      "A fast-commerce grocery experience with real-time inventory, slot-based delivery, and a checkout flow tuned for mobile conversion across the UK.",
    stack: ["React", "Node.js", "PostgreSQL", "Payments"],
    url: "https://zoomgroc.com",
    status: "live",
    accent: "from-brand-teal/70 to-emerald-500/40",
    preview: (
      <svg viewBox="0 0 200 120" fill="none" aria-hidden className="w-full h-full">
        <rect width="200" height="120" rx="10" fill="#0B1220" />
        <rect x="14" y="14" width="172" height="14" rx="3" fill="#2DD4DB" opacity="0.4" />
        <rect x="14" y="36" width="52" height="60" rx="6" fill="#ffffff" opacity="0.08" />
        <rect x="74" y="36" width="52" height="60" rx="6" fill="#ffffff" opacity="0.08" />
        <rect x="134" y="36" width="52" height="60" rx="6" fill="#2DD4DB" opacity="0.18" />
        <circle cx="40" cy="56" r="10" fill="#2DD4DB" opacity="0.7" />
        <circle cx="100" cy="56" r="10" fill="#2DD4DB" opacity="0.5" />
        <circle cx="160" cy="56" r="10" fill="#2DD4DB" opacity="0.85" />
        <rect x="22" y="78" width="36" height="4" rx="2" fill="#ffffff" opacity="0.7" />
        <rect x="82" y="78" width="36" height="4" rx="2" fill="#ffffff" opacity="0.7" />
        <rect x="142" y="78" width="36" height="4" rx="2" fill="#ffffff" opacity="0.7" />
        <rect x="22" y="86" width="24" height="3" rx="1.5" fill="#ffffff" opacity="0.4" />
        <rect x="82" y="86" width="24" height="3" rx="1.5" fill="#ffffff" opacity="0.4" />
        <rect x="142" y="86" width="24" height="3" rx="1.5" fill="#ffffff" opacity="0.4" />
      </svg>
    ),
  },
  {
    name: "Skillnaav",
    client: "Ed-tech career platform",
    country: "India",
    flag: "🇮🇳",
    summary:
      "A career guidance and skilling platform matching students to industry mentors and curated learning paths. Currently in stealth on the client's request.",
    stack: ["Next.js", "AI matching", "MongoDB", "Cloud"],
    status: "private",
    accent: "from-indigo-500/70 to-brand-deep/60",
    preview: (
      <svg viewBox="0 0 200 120" fill="none" aria-hidden className="w-full h-full">
        <rect width="200" height="120" rx="10" fill="#0B1220" />
        <rect x="14" y="14" width="100" height="12" rx="3" fill="#6366F1" opacity="0.55" />
        <rect x="14" y="34" width="172" height="32" rx="6" fill="#ffffff" opacity="0.08" />
        <circle cx="32" cy="50" r="8" fill="#2DD4DB" opacity="0.85" />
        <rect x="46" y="44" width="60" height="4" rx="2" fill="#ffffff" opacity="0.75" />
        <rect x="46" y="52" width="80" height="3" rx="1.5" fill="#ffffff" opacity="0.45" />
        <rect x="144" y="44" width="32" height="12" rx="6" fill="#2DD4DB" opacity="0.3" />
        <rect x="14" y="74" width="172" height="22" rx="6" fill="#ffffff" opacity="0.06" />
        <rect x="22" y="82" width="44" height="6" rx="3" fill="#6366F1" opacity="0.5" />
        <rect x="72" y="82" width="44" height="6" rx="3" fill="#2DD4DB" opacity="0.45" />
        <rect x="122" y="82" width="44" height="6" rx="3" fill="#ffffff" opacity="0.18" />
      </svg>
    ),
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 relative border-t border-white/5">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[720px] h-[420px] rounded-full bg-brand-deep/20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl">
          <span className="inline-block text-xs font-semibold tracking-widest text-brand-teal uppercase">
            Selected work
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold text-white leading-tight">
            Products shipped across{" "}
            <span className="gradient-text">three continents.</span>
          </h2>
          <p className="mt-5 text-lg text-slate-300 leading-relaxed">
            From commercial dealerships in the US to fast-commerce in the UK and
            ed-tech in India — a snapshot of the products we&apos;ve designed,
            built, and scaled for our clients.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.name}
              className="group relative rounded-2xl p-[1px] bg-white/10 hover:bg-gradient-to-b hover:from-brand-teal/60 hover:to-brand-deep/40 transition-all hover:-translate-y-1"
            >
              <div className="h-full rounded-2xl bg-brand-ink/90 relative overflow-hidden flex flex-col">
                <div
                  className={`pointer-events-none absolute -top-24 -right-24 w-56 h-56 rounded-full bg-gradient-to-br ${p.accent} blur-3xl opacity-40 group-hover:opacity-70 transition-opacity`}
                />

                {/* Preview */}
                <div className="relative p-4 pb-0">
                  <div className="rounded-xl border border-white/10 overflow-hidden bg-black/40 aspect-[5/3]">
                    {p.preview}
                  </div>
                  {p.status === "private" && (
                    <span className="absolute top-7 right-7 rounded-full bg-amber-500/15 border border-amber-400/30 px-2.5 py-1 text-[10px] font-bold tracking-wider text-amber-300 uppercase">
                      Stealth
                    </span>
                  )}
                  {p.status === "live" && (
                    <span className="absolute top-7 right-7 rounded-full bg-emerald-500/15 border border-emerald-400/30 px-2.5 py-1 text-[10px] font-bold tracking-wider text-emerald-300 uppercase inline-flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live
                    </span>
                  )}
                </div>

                <div className="relative p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="text-base leading-none">{p.flag}</span>
                    <span className="font-medium">{p.country}</span>
                    <span className="text-slate-600">·</span>
                    <span>{p.client}</span>
                  </div>

                  <h3 className="mt-2 font-display text-xl font-bold text-white">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed flex-1">
                    {p.summary}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-300"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 pt-4 border-t border-white/5">
                    {p.url ? (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-teal hover:text-white transition-colors"
                      >
                        Visit site
                        <svg
                          className="h-3.5 w-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500">
                        <svg
                          className="h-3.5 w-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="11" width="18" height="10" rx="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        Under NDA — launching soon
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5">
          <p className="text-sm text-slate-300">
            Have a product in mind?{" "}
            <span className="text-white font-semibold">
              We&apos;d love to build it with you.
            </span>
          </p>
          <a
            href="#contact"
            className="inline-flex items-center rounded-full bg-brand-gradient px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-teal/20 hover:shadow-brand-teal/40 hover:-translate-y-0.5 transition"
          >
            Start your project
          </a>
        </div>
      </div>
    </section>
  );
}
