import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-brand-ink/80">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid gap-10 lg:grid-cols-[2fr_3fr]">
        <div>
          <Logo size={36} />
          <p className="mt-4 text-sm text-slate-400 max-w-xs">
            A service-based technology studio engineering the tri-stack: Full
            Stack, AI, and Cloud.
          </p>
          <p className="mt-3 text-xs font-semibold tracking-widest text-brand-teal uppercase">
            Innovate · Integrate · Elevate
          </p>
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
              { label: "Approach", href: "#approach" },
              { label: "Projects", href: "#projects" },
              { label: "Contact", href: "#contact" },
              { label: "Privacy", href: "/privacy" },
            ]}
          />
          <FooterCol
            title="Contact"
            links={[
              { label: "saipraneethtalluri@gmail.com", href: "mailto:saipraneethtalluri@gmail.com" },
              { label: "sivasaipersonal1@gmail.com", href: "mailto:sivasaipersonal1@gmail.com" },
              { label: "+91 90302 33949", href: "tel:+919030233949" },
              { label: "+91 70130 83537", href: "tel:+917013083537" },
            ]}
          />
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>© {year} TriviqTech. All rights reserved.</span>
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1 justify-center">
            <span>Founder-led · Built with care.</span>
            <a href="/privacy" className="hover:text-brand-teal transition-colors">
              Privacy
            </a>
          </span>
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
      <h5 className="font-display text-sm font-bold text-white mb-3">{title}</h5>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="text-slate-400 hover:text-brand-teal transition-colors">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
