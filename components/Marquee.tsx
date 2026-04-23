const items = [
  "React", "Next.js", "Node.js", "Python", "Go",
  "TensorFlow", "PyTorch", "LangChain", "OpenAI", "Claude",
  "AWS", "Azure", "GCP", "Kubernetes", "Docker",
  "PostgreSQL", "MongoDB", "Redis", "Terraform", "GraphQL",
];

export default function Marquee() {
  return (
    <section className="py-10 border-y border-white/5 bg-white/[0.02]" aria-hidden="true">
      <div className="marquee-mask overflow-hidden">
        <div className="flex gap-10 animate-marquee whitespace-nowrap w-max">
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className="font-display text-lg md:text-xl font-medium text-slate-500 hover:text-brand-teal transition-colors"
            >
              {item}
              <span className="ml-10 text-slate-700">●</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
