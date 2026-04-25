"use client";

import { useState } from "react";

const LOCATION_KEY = "triviq_precise_location";

type StoredLocation = {
  lat: number;
  lng: number;
  accuracyMeters?: number;
  consent: true;
};

function readStoredLocation(): StoredLocation | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(LOCATION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredLocation;
    if (typeof parsed.lat !== "number" || typeof parsed.lng !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [note, setNote] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const precise = readStoredLocation();

    const payload = {
      ...data,
      pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
      referrer: typeof document !== "undefined" ? document.referrer || "direct" : undefined,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screen: typeof window !== "undefined" ? `${window.innerWidth}x${window.innerHeight}` : undefined,
      sessionDurationMs:
        typeof performance !== "undefined" ? Math.round(performance.now()) : undefined,
      preciseLocation: precise ?? undefined,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(json.error || "request_failed");
      }
      setStatus("sent");
      setNote("Thanks! We'll be in touch within one business day.");
      form.reset();
    } catch {
      setStatus("error");
      setNote("Something went wrong. Please email contact@triviqtech.com directly.");
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 section-glow bg-brand-paper">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="relative rounded-3xl border border-slate-200/80 bg-white p-8 md:p-14 overflow-hidden shadow-soft-lg">
          {/* Ambient glows */}
          <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-brand-accent/5 blur-[100px]" />
          <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-brand-primary/5 blur-[100px]" />

          <div className="relative grid gap-10 lg:grid-cols-2 items-start">
            {/* Left — Info */}
            <div>
              <span className="inline-block text-[11px] font-semibold tracking-[0.15em] text-brand-accent uppercase">
                Start a conversation
              </span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-slate-900 leading-[1.15]">
                Got a project?{" "}
                <span className="gradient-text">Let&apos;s talk.</span>
              </h2>
              <p className="mt-5 text-slate-600 leading-relaxed max-w-md">
                Tell us what you&apos;re building. We&apos;ll get back to you
                within one business day with honest feedback and next steps.
              </p>

              <div className="mt-8 space-y-4 text-sm">
                <div className="flex items-center gap-3 text-slate-700">
                  <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-cyan-50 border border-slate-100 text-brand-accent">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <a href="mailto:contact@triviqtech.com" className="hover:text-brand-primary transition-colors">
                    contact@triviqtech.com
                  </a>
                </div>

                <div className="flex items-center gap-3 text-slate-500">
                  <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-cyan-50 border border-slate-100 text-brand-accent">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </span>
                  <span>Remote-first · Serving US, UK & India</span>
                </div>

                {/* Trust signals — reduce commitment friction */}
                <div className="pt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-soft">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Reply in &lt; 1 day
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-soft">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                    No sales call required
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-soft">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                    Free first consult
                  </span>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <form onSubmit={onSubmit} className="space-y-4" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" required placeholder="Your name" />
                <Field label="Email" name="email" type="email" required placeholder="you@company.com" />
              </div>
              <Field label="What do you need?" name="service" as="select">
                <option>Web & Product Engineering</option>
                <option>AI / Machine Learning</option>
                <option>Cloud & DevOps</option>
                <option>Not sure yet — help me figure it out</option>
              </Field>
              <Field
                label="Tell us about your project"
                name="message"
                as="textarea"
                required
                placeholder="A few lines about what you're building..."
              />

              <button
                type="submit"
                disabled={status === "sending"}
                className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand-cta px-6 py-3.5 font-semibold text-white shadow-cta hover:shadow-cta-lg hover:bg-brand-ctaDark hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending..." : "Send message"}
                {status !== "sending" && (
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                )}
              </button>
              {note && (
                <p
                  className={`text-sm ${
                    status === "error" ? "text-red-500" : "text-brand-accent"
                  }`}
                  aria-live="polite"
                >
                  {note}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  as?: "input" | "textarea" | "select";
  children?: React.ReactNode;
};

function Field({ label, name, type = "text", required, placeholder, as = "input", children }: FieldProps) {
  const base =
    "w-full rounded-xl border border-slate-200 bg-brand-ivory px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-primary/40 focus:ring-2 focus:ring-brand-primary/10 transition-all";
  return (
    <label className="block">
      <span className="block text-xs font-medium text-slate-600 mb-1.5">{label}</span>
      {as === "textarea" ? (
        <textarea name={name} required={required} placeholder={placeholder} rows={4} className={base} />
      ) : as === "select" ? (
        <div className="relative">
          <select
            name={name}
            className={`${base} appearance-none pr-11 cursor-pointer`}
          >
            {children}
          </select>
          <svg
            aria-hidden
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      ) : (
        <input name={name} type={type} required={required} placeholder={placeholder} className={base} />
      )}
    </label>
  );
}
