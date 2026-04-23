const trust = [
  { label: "Newark Truck Center", flag: "🇺🇸", href: "https://www.newarktruckcenter.com/" },
  { label: "Zoomgroc", flag: "🇬🇧", href: "https://zoomgroc.com" },
  { label: "Skillnaav", flag: "🇮🇳" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-32 md:pt-40 pb-20 md:pb-28"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-pattern opacity-60" />
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-brand-teal/20 blur-3xl animate-float-slow" />
        <div className="absolute -bottom-40 -right-20 w-[620px] h-[620px] rounded-full bg-brand-deep/30 blur-3xl animate-float-slow" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-widest text-brand-teal uppercase animate-fade-up">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-teal animate-pulse" />
          Trusted across US · UK · India
        </span>

        <h1
          className="mt-6 font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          We ship the software
          <br className="hidden sm:block" />{" "}
          <span className="gradient-text">that grows your business.</span>
        </h1>

        <p
          className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          From a truck dealership in New Jersey to fast-commerce in the UK and
          an ed-tech platform in India — TriviqTech designs, builds, and scales
          production-grade{" "}
          <span className="text-white font-semibold">Web</span>,{" "}
          <span className="text-white font-semibold">AI</span>, and{" "}
          <span className="text-white font-semibold">Cloud</span> products for
          founders who need it shipped right the first time.
        </p>

        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-4 animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <a
            href="#contact"
            className="inline-flex items-center rounded-full bg-brand-gradient px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand-teal/20 hover:shadow-brand-teal/50 hover:-translate-y-0.5 transition"
          >
            Book a free 30-min scoping call
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/25 transition"
          >
            See live client work
            <span aria-hidden>→</span>
          </a>
        </div>

        <p
          className="mt-4 text-xs text-slate-500 animate-fade-up"
          style={{ animationDelay: "0.35s" }}
        >
          Reply within 1 business day · No sales runaround · NDA on request
        </p>

        {/* Trust strip */}
        <div
          className="mt-14 animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="text-[11px] font-semibold tracking-widest text-slate-500 uppercase">
            Products we&apos;ve shipped for clients
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {trust.map((t) =>
              t.href ? (
                <a
                  key={t.label}
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300 hover:text-white hover:border-brand-teal/40 hover:bg-white/[0.06] transition"
                >
                  <span className="text-base leading-none">{t.flag}</span>
                  <span className="font-medium">{t.label}</span>
                </a>
              ) : (
                <span
                  key={t.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-400"
                >
                  <span className="text-base leading-none">{t.flag}</span>
                  <span className="font-medium">{t.label}</span>
                  <span className="rounded-full bg-amber-500/15 border border-amber-400/30 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-amber-300 uppercase">
                    Stealth
                  </span>
                </span>
              )
            )}
          </div>
        </div>

        <div
          className="mt-14 grid grid-cols-3 gap-6 max-w-xl mx-auto animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          {[
            { n: "3", l: "Countries served" },
            { n: "<1d", l: "Reply time" },
            { n: "100%", l: "Senior-led" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-display text-2xl sm:text-3xl font-bold gradient-text">
                {s.n}
              </div>
              <div className="mt-1 text-xs sm:text-sm text-slate-400">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
