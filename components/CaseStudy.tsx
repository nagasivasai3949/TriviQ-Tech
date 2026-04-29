import { CALENDLY_URL } from "@/lib/site";

export default function CaseStudy() {
  return (
    <section
      id="case-study"
      className="py-20 md:py-28 bg-brand-paper section-glow relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block text-[11px] font-semibold tracking-[0.15em] text-brand-accent uppercase">
            Case Study
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.15]">
            How we built{" "}
            <span className="gradient-text">Zoomgroc</span>
          </h2>
          <p className="mt-5 text-slate-600 leading-relaxed">
            A fast-commerce platform serving customers across the UK — from
            empty repo to production-ready storefront.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_1fr] items-center">
          {/* Screenshot — wrapped in a browser chrome */}
          <a
            href="https://zoomgroc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl border border-slate-200/80 bg-white shadow-soft-lg overflow-hidden hover:shadow-cta-lg hover:-translate-y-1 transition-all"
          >
            {/* Browser chrome bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/60">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-300/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
              <div className="ml-3 flex-1 truncate rounded-md bg-white border border-slate-200 px-3 py-1 text-[11px] text-slate-500">
                zoomgroc.com
              </div>
            </div>
            {/* Image */}
            <div className="relative aspect-[16/10] bg-gradient-to-br from-slate-50 via-white to-cyan-50/40 grid place-items-center">
              <img
                src="/zoomgroc.png"
                alt="Zoomgroc storefront — homepage screenshot"
                className="absolute inset-0 h-full w-full object-cover object-top"
                loading="lazy"
              />
            </div>
          </a>

          {/* Outcome + quote */}
          <div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "14d", label: "From kickoff to launch" },
                { value: "UK", label: "Live across the country" },
                { value: "0", label: "Production incidents" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-slate-200/80 bg-white p-4 text-center shadow-soft"
                >
                  <div className="font-display text-2xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              {[
                "Custom storefront with real-time inventory and order tracking",
                "Stripe checkout, address validation, and delivery scheduling",
                "Cloud infrastructure built to scale with the order volume",
              ].map((item) => (
                <li key={item} className="flex gap-2.5">
                  <svg
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-accent"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Quote */}
            <figure className="mt-7 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft">
              <svg
                className="h-6 w-6 text-brand-accent/30 mb-3"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="text-[15px] leading-relaxed text-slate-700">
                &ldquo;TriviqTech didn&apos;t just build our website — they
                understood our business. The result was a platform that our
                customers actually love using.&rdquo;
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 text-brand-accent text-xs font-bold border border-white">
                  JR
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-slate-800">James R.</div>
                  <div className="text-slate-500 text-xs">
                    Founder, Zoomgroc · UK
                  </div>
                </div>
              </figcaption>
            </figure>

            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-cta px-6 py-3 text-sm font-semibold text-white shadow-cta hover:shadow-cta-lg hover:bg-brand-ctaDark hover:-translate-y-0.5 transition-all"
            >
              Book a free 30-min call
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
