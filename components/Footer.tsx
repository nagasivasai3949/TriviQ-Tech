import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/[0.06] bg-brand-ink text-slate-300">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 grid gap-10 lg:grid-cols-[2fr_3fr]">
        <div>
          <Logo size={32} onDark />
          <p className="mt-4 text-sm text-slate-400 max-w-xs leading-relaxed">
            A focused technology studio building full-stack web apps, AI
            integrations, and cloud infrastructure.
          </p>
          <a
            href="mailto:contact@triviqtech.com"
            className="inline-block mt-3 text-sm text-cyan-300 hover:text-white transition-colors"
          >
            contact@triviqtech.com
          </a>
        </div>

        <div className="grid gap-8 sm:grid-cols-3 text-sm">
          <FooterCol
            title="Services"
            links={[
              { label: "Full Stack", href: "#services" },
              { label: "AI / ML", href: "#services" },
              { label: "Cloud & DevOps", href: "#services" },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { label: "About", href: "#about" },
              { label: "How We Work", href: "#approach" },
              { label: "Our Work", href: "#projects" },
              { label: "Contact", href: "#contact" },
              { label: "Privacy", href: "/privacy" },
            ]}
          />
          <FooterCol
            title="Connect"
            links={[
              { label: "contact@triviqtech.com", href: "mailto:contact@triviqtech.com" },
            ]}
          />
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>© {year} TriviqTech. All rights reserved.</span>
          <a href="/privacy" className="hover:text-cyan-300 transition-colors">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h5 className="font-display text-xs font-bold text-slate-200 mb-3 tracking-wider uppercase">
        {title}
      </h5>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="text-slate-400 hover:text-cyan-300 transition-colors">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
