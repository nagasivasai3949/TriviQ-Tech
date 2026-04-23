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
      setNote("Thanks! We'll reply within one business day.");
      form.reset();
    } catch {
      setStatus("error");
      setNote("Something went wrong. Please email saipraneethtalluri@gmail.com.");
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 md:p-14 overflow-hidden">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand-teal/20 blur-3xl" />
          <div className="absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-brand-deep/30 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-2 items-start">
            <div>
              <span className="inline-block text-xs font-semibold tracking-widest text-brand-teal uppercase">
                Let's build
              </span>
              <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold text-white leading-tight">
                Have an idea <span className="gradient-text">worth shipping?</span>
              </h2>
              <p className="mt-5 text-slate-300 leading-relaxed max-w-md">
                Tell us about your project. We'll reply within one business day
                with next steps — no sales runaround.
              </p>

              <div className="mt-8 space-y-4 text-sm">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-white/5 border border-white/10 text-brand-teal">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </span>
                  <div className="flex flex-col gap-1">
                    <a href="mailto:saipraneethtalluri@gmail.com" className="hover:text-white">saipraneethtalluri@gmail.com</a>
                    <a href="mailto:sivasaipersonal1@gmail.com" className="hover:text-white">sivasaipersonal1@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-white/5 border border-white/10 text-brand-teal">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </span>
                  <div className="flex flex-col gap-1">
                    <a href="tel:+919030233949" className="hover:text-white">+91 90302 33949</a>
                    <a href="tel:+917013083537" className="hover:text-white">+91 70130 83537</a>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-white/5 border border-white/10 text-brand-teal">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  </span>
                  <span>Remote-first · Serving clients worldwide</span>
                </div>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-4" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" required placeholder="Your full name" />
                <Field label="Email" name="email" type="email" required placeholder="you@company.com" />
              </div>
              <Field label="What do you need?" name="service" as="select">
                <option className="bg-brand-ink text-white">Web & Product Engineering</option>
                <option className="bg-brand-ink text-white">AI / Machine Learning</option>
                <option className="bg-brand-ink text-white">Cloud & DevOps</option>
                <option className="bg-brand-ink text-white">Not sure — help me figure it out</option>
              </Field>
              <Field
                label="Project details"
                name="message"
                as="textarea"
                required
                placeholder="A few lines about what you're building..."
              />

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-full bg-brand-gradient px-6 py-3.5 font-semibold text-white shadow-xl shadow-brand-teal/20 hover:shadow-brand-teal/50 hover:-translate-y-0.5 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending..." : "Send message"}
              </button>
              {note && (
                <p
                  className={`text-sm ${
                    status === "error" ? "text-red-300" : "text-brand-teal"
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
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-teal/60 focus:bg-white/[0.06] transition";
  return (
    <label className="block">
      <span className="block text-xs font-medium text-slate-300 mb-1.5">{label}</span>
      {as === "textarea" ? (
        <textarea name={name} required={required} placeholder={placeholder} rows={4} className={base} />
      ) : as === "select" ? (
        <div className="relative">
          <select
            name={name}
            className={`${base} appearance-none pr-11 cursor-pointer [&>option]:bg-brand-ink [&>option]:text-white`}
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
