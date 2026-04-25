"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Animated Counter Hook ─── */
function useCounter(target: number, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!startOnView) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, startOnView]);

  return { count, ref };
}

/* ─── Stats Data ─── */
const stats = [
  {
    value: 20,
    suffix: "+",
    label: "Projects Delivered",
    desc: "Across web, AI & cloud",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    value: 3,
    suffix: "+",
    label: "Countries Served",
    desc: "US · UK · India & growing",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    value: 99,
    suffix: "%",
    label: "On-Time Delivery",
    desc: "We ship when we say we will",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    value: 100,
    suffix: "%",
    label: "Client Satisfaction",
    desc: "Every client, every project",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

/* ─── Floating Badge Component ─── */
function FloatingBadge({ children, className, delay }: { children: React.ReactNode; className: string; delay: string }) {
  return (
    <div
      className={`absolute ${className} rounded-full border border-slate-200 bg-white/90 backdrop-blur-sm px-4 py-2 text-sm font-medium text-slate-600 animate-float-slow shadow-soft`}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  );
}

/* ─── Stat Card ─── */
function StatCard({ stat }: { stat: typeof stats[0] }) {
  const { count, ref } = useCounter(stat.value);
  return (
    <div
      ref={ref}
      className="group relative rounded-2xl border border-slate-200/80 bg-white p-6 md:p-8 hover:border-brand-primary/20 hover:shadow-soft-lg transition-all duration-300 card-shine text-center"
    >
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-50 border border-slate-100 text-brand-accent mb-4 group-hover:scale-110 transition-transform">
        {stat.icon}
      </div>
      <div className="font-display text-4xl md:text-5xl font-bold gradient-text tracking-tight">
        {count}{stat.suffix}
      </div>
      <div className="mt-2 font-display text-base font-semibold text-slate-800">
        {stat.label}
      </div>
      <div className="mt-1 text-xs text-slate-400">
        {stat.desc}
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 relative section-glow overflow-hidden bg-brand-paper">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block text-[11px] font-semibold tracking-[0.15em] text-brand-accent uppercase">
            Our Impact
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.15]">
            Trusted by businesses{" "}
            <span className="gradient-text">across the globe.</span>
          </h2>
          <p className="mt-5 text-slate-600 leading-relaxed">
            From startups finding their first users to established businesses
            scaling to new markets — we&apos;ve been the engineering team behind
            products that people actually use.
          </p>
        </div>

        {/* Visual orbit with floating badges */}
        <div className="relative mt-16 mb-16 hidden md:flex items-center justify-center" style={{ height: "280px" }}>
          {/* Orbit rings */}
          <div className="absolute w-[500px] h-[500px] rounded-full border border-slate-200/50" />
          <div className="absolute w-[360px] h-[360px] rounded-full border border-slate-200/70" />
          <div className="absolute w-[200px] h-[200px] rounded-full border border-brand-accent/15" />

          {/* Center glow */}
          <div className="absolute w-20 h-20 rounded-full bg-brand-accent/10 blur-2xl animate-pulse-glow" />
          <div className="absolute w-4 h-4 rounded-full bg-brand-accent shadow-glow" />

          {/* Floating badges */}
          <FloatingBadge className="top-0 left-[15%]" delay="0s">
            🇺🇸 United States
          </FloatingBadge>
          <FloatingBadge className="top-8 right-[12%]" delay="0.8s">
            🇬🇧 United Kingdom
          </FloatingBadge>
          <FloatingBadge className="bottom-4 left-[8%]" delay="1.6s">
            🇮🇳 India
          </FloatingBadge>
          <FloatingBadge className="bottom-0 right-[18%]" delay="2.4s">
            🌍 Remote-first
          </FloatingBadge>
          <FloatingBadge className="top-[45%] left-[2%]" delay="0.4s">
            ⚡ Fast Delivery
          </FloatingBadge>
          <FloatingBadge className="top-[40%] right-[2%]" delay="1.2s">
            🔒 Production-grade
          </FloatingBadge>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white px-6 py-5 shadow-soft">
          <p className="text-sm text-slate-600">
            Ready to become our next success story?{" "}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand-cta px-6 py-2.5 text-sm font-semibold text-white shadow-cta hover:shadow-cta-lg hover:bg-brand-ctaDark hover:-translate-y-0.5 transition-all"
          >
            Start your project
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
