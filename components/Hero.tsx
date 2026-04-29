import { CALENDLY_URL } from "@/lib/site";

const clients = [
  {
    name: "Newark Truck Center",
    type: "Dealership · US",
    href: "https://www.newarktruckcenter.com/",
  },
  {
    name: "Zoomgroc",
    type: "Fast-commerce · UK",
    href: "https://zoomgroc.com",
  },
  {
    name: "Skillnaav",
    type: "Ed-tech · India",
  },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-28 md:pt-36 pb-20 md:pb-28"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute -top-32 left-[10%] w-[400px] h-[400px] rounded-full bg-brand-accent/8 blur-[100px] animate-pulse-glow" />
        <div className="absolute top-[40%] -right-20 w-[500px] h-[500px] rounded-full bg-brand-primary/8 blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Two-column hero on desktop */}
        <div className="grid lg:grid-cols-[1fr_0.8fr] gap-12 lg:gap-16 items-center">
          {/* Left — Text */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-1.5 text-xs font-medium text-slate-500 animate-fade-up shadow-soft">
              <span className="glow-dot" />
              Shipping production software since 2023
            </div>

            <h1
              className="mt-7 font-display text-[2.5rem] sm:text-[3.25rem] lg:text-[3.75rem] font-bold leading-[1.1] tracking-tight text-slate-900 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              We build{" "}
              <span className="gradient-text">custom tech products</span>{" "}
              for businesses.
            </h1>

            <p
              className="mt-6 max-w-lg text-base sm:text-lg text-slate-600 leading-relaxed animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              Web apps, AI integrations, cloud infrastructure — designed and
              shipped by engineers who own the outcome from first commit to
              production.
            </p>

            <div
              className="mt-8 flex flex-wrap items-center gap-3 animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-cta px-6 py-3 text-sm font-semibold text-white shadow-cta hover:shadow-cta-lg hover:bg-brand-ctaDark hover:-translate-y-0.5 transition-all"
              >
                Book a free 30-min call
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a
                href="#case-study"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-6 py-3 text-sm font-medium text-slate-700 hover:text-brand-primary hover:bg-white hover:border-brand-primary/20 hover:shadow-soft transition-all"
              >
                See our work
              </a>
            </div>
          </div>

          {/* Right — Visual element */}
          <div
            className="relative hidden lg:block animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Orbiting rings */}
              <div className="absolute inset-8 rounded-full border border-slate-200/60 animate-spin-slow" />
              <div className="absolute inset-16 rounded-full border border-brand-accent/15 animate-spin-slow" style={{ animationDirection: "reverse" }} />
              <div className="absolute inset-24 rounded-full border border-brand-primary/10" />

              {/* Center glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-24 w-24 rounded-full bg-brand-accent/12 blur-2xl animate-pulse-glow" />
                <div className="absolute h-3 w-3 rounded-full bg-brand-accent shadow-glow" />
              </div>

              {/* Floating tags */}
              {[
                { label: "Full Stack", pos: "top-4 left-1/2 -translate-x-1/2", delay: "0s" },
                { label: "AI / ML", pos: "bottom-8 left-4", delay: "0.6s" },
                { label: "Cloud", pos: "bottom-8 right-4", delay: "1.2s" },
              ].map((tag) => (
                <div
                  key={tag.label}
                  className={`absolute ${tag.pos} rounded-xl border border-slate-200 bg-white/90 backdrop-blur-sm px-4 py-2.5 text-center animate-float-slow shadow-soft`}
                  style={{ animationDelay: tag.delay }}
                >
                  <div className="font-display text-sm font-semibold text-slate-800">{tag.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Client strip */}
        <div
          className="mt-16 lg:mt-20 animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="shimmer-line mb-8" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
            <span className="text-[11px] font-semibold tracking-[0.15em] text-slate-400 uppercase whitespace-nowrap">
              Trusted by
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {clients.map((c) => (
                <span key={c.name} className="group">
                  {c.href ? (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm text-slate-600 hover:text-brand-primary hover:border-brand-primary/20 hover:bg-white hover:shadow-soft transition-all"
                    >
                      <span className="font-medium">{c.name}</span>
                      <span className="text-[10px] text-slate-400">{c.type}</span>
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm text-slate-500">
                      <span className="font-medium">{c.name}</span>
                      <span className="text-[10px]">{c.type}</span>
                      <span className="rounded-full bg-amber-50 border border-amber-200 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-amber-600 uppercase">
                        Soon
                      </span>
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
