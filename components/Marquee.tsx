const items = [
  "React", "Next.js", "Node.js", "Python",
  "TensorFlow", "LangChain", "OpenAI",
  "AWS", "Kubernetes", "Docker",
  "PostgreSQL", "Redis", "Terraform",
];

export default function Marquee() {
  return (
    <section
      className="py-8 border-y border-slate-200/60 bg-white/50"
      aria-hidden="true"
    >
      <div className="marquee-mask overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap w-max">
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className="font-display text-sm md:text-base font-medium text-slate-400 hover:text-brand-accent transition-colors tracking-wide uppercase"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
