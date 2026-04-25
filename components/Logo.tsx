type Props = {
  className?: string;
  showWordmark?: boolean;
  size?: number;
  onDark?: boolean;
};

export default function Logo({
  className = "",
  showWordmark = true,
  size = 36,
  onDark = false,
}: Props) {
  const tColor = onDark ? "#F8FAFC" : "#0F172A";
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="tq-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0891B2" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
          <filter id="tq-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* T bar */}
        <rect x="8" y="10" width="24" height="7" rx="2" fill={tColor} />
        <rect x="16" y="10" width="8" height="32" rx="2" fill={tColor} />
        {/* Play arrow with glow */}
        <path
          d="M28 16 L52 32 L28 48 Z"
          fill="url(#tq-grad)"
          filter="url(#tq-glow)"
        />
      </svg>
      {showWordmark && (
        <span
          className={`font-display text-xl font-bold tracking-tight ${
            onDark ? "text-white" : "text-slate-900"
          }`}
        >
          Triviq
          <span className={onDark ? "text-cyan-300" : "text-brand-accent"}>
            Tech
          </span>
        </span>
      )}
    </div>
  );
}
