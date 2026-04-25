"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

const links = [
  { href: "#services", label: "Services" },
  { href: "#approach", label: "How We Work" },
  { href: "#projects", label: "Work" },
  { href: "#about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/70 shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 md:h-[72px]">
        <a href="#home" aria-label="TriviqTech home">
          <Logo size={32} />
        </a>

        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative px-4 py-2 text-[13px] font-medium text-slate-600 hover:text-brand-primary transition-colors rounded-lg hover:bg-slate-900/[0.04]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-brand-cta px-5 py-2 text-[13px] font-semibold text-white shadow-cta hover:shadow-cta-lg hover:bg-brand-ctaDark hover:-translate-y-0.5 transition-all"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white/90 animate-pulse" />
          Get in touch
        </a>

        <button
          className="md:hidden text-slate-700 p-2 rounded-lg hover:bg-slate-900/[0.05] transition"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="16" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        } bg-white/95 backdrop-blur-xl border-b border-slate-200/70`}
      >
        <nav className="px-5 py-5 flex flex-col gap-1" aria-label="Mobile">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-slate-700 hover:text-brand-primary font-medium py-2.5 px-3 rounded-lg hover:bg-slate-900/[0.04] transition"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-2 pt-3 border-t border-slate-200">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-brand-cta px-5 py-3 text-sm font-semibold text-white shadow-cta"
            >
              Get in touch
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
