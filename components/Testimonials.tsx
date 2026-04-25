"use client";

import { useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    quote:
      "TriviqTech didn't just build our website — they understood our business. The result was a platform that our customers actually love using.",
    name: "James R.",
    role: "Founder",
    company: "E-commerce Startup, UK",
    avatar: "JR",
    accent: "from-cyan-400 to-brand-accent",
    avatarBg: "bg-gradient-to-br from-cyan-100 to-blue-100 text-brand-accent",
  },
  {
    quote:
      "We needed an AI solution that worked in production, not just a demo. TriviqTech delivered exactly that — on time, on budget, and with zero drama.",
    name: "Sarah M.",
    role: "CTO",
    company: "Tech Company, US",
    avatar: "SM",
    accent: "from-brand-violet to-indigo-400",
    avatarBg: "bg-gradient-to-br from-indigo-100 to-violet-100 text-brand-violet",
  },
  {
    quote:
      "Our cloud costs dropped by 40% after TriviqTech re-architected our infrastructure. Best investment we've made this year.",
    name: "Rajesh K.",
    role: "VP Engineering",
    company: "SaaS Platform, India",
    avatar: "RK",
    accent: "from-sky-400 to-blue-500",
    avatarBg: "bg-gradient-to-br from-sky-100 to-blue-100 text-sky-600",
  },
  {
    quote:
      "What sets TriviqTech apart is their transparency. Weekly demos, clear communication, and engineers who actually care about the outcome.",
    name: "Michael D.",
    role: "Product Manager",
    company: "Logistics Firm, US",
    avatar: "MD",
    accent: "from-amber-400 to-orange-400",
    avatarBg: "bg-gradient-to-br from-amber-100 to-orange-100 text-amber-600",
  },
  {
    quote:
      "From the first call to launch, they treated our project like their own. We've already hired them for our next product.",
    name: "Priya S.",
    role: "CEO",
    company: "Ed-tech Startup, India",
    avatar: "PS",
    accent: "from-rose-400 to-pink-400",
    avatarBg: "bg-gradient-to-br from-rose-100 to-pink-100 text-rose-600",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-rotate
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  const t = testimonials[active];

  return (
    <section className="py-24 md:py-32 overflow-hidden bg-brand-ink section-glow section-glow-on-dark">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block text-[11px] font-semibold tracking-[0.15em] text-cyan-300 uppercase">
            Testimonials
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.15]">
            What our clients{" "}
            <span className="gradient-text-on-dark">have to say.</span>
          </h2>
        </div>

        {/* Testimonial carousel */}
        <div
          className="mt-14 relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main testimonial card */}
          <div className="relative rounded-3xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-8 md:p-12 overflow-hidden max-w-3xl mx-auto">
            {/* Ambient glow */}
            <div className={`absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-br ${t.accent} opacity-10 blur-[80px] transition-all duration-700`} />

            {/* Quote icon */}
            <div className="relative">
              <svg
                className="w-10 h-10 text-cyan-300/25 mb-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              {/* Quote text */}
              <blockquote className="relative text-lg md:text-xl text-white/90 leading-relaxed font-light">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="mt-8 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${t.avatarBg} flex items-center justify-center text-sm font-bold border border-white/10`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="font-display font-semibold text-white">
                    {t.name}
                  </div>
                  <div className="text-sm text-slate-400">
                    {t.role}, {t.company}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            {/* Prev button */}
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/[0.1] bg-white/[0.04] flex items-center justify-center text-slate-400 hover:text-white hover:border-white/[0.2] transition-all"
              aria-label="Previous testimonial"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === active
                      ? "w-8 h-2 bg-cyan-300"
                      : "w-2 h-2 bg-white/[0.2] hover:bg-white/[0.4]"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/[0.1] bg-white/[0.04] flex items-center justify-center text-slate-400 hover:text-white hover:border-white/[0.2] transition-all"
              aria-label="Next testimonial"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mini logo strip */}
        <div className="mt-16 text-center">
          <p className="text-[11px] font-semibold tracking-[0.15em] text-slate-500 uppercase mb-6">
            Industries we&apos;ve worked across
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              "E-commerce",
              "Logistics",
              "Ed-tech",
              "SaaS",
              "Healthcare",
              "Automotive",
              "Fintech",
            ].map((industry) => (
              <span
                key={industry}
                className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-xs font-medium text-slate-400 hover:text-white hover:border-white/[0.15] transition-all"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
