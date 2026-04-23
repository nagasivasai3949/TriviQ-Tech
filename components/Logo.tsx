type Props = {
  className?: string;
  showWordmark?: boolean;
  size?: number;
};

export default function Logo({
  className = "",
  showWordmark = true,
  size = 36,
}: Props) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="tq-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2DD4DB" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
        </defs>
        {/* T bar */}
        <rect x="10" y="8" width="22" height="8" rx="1.5" fill="#F8FAFC" />
        <rect x="17" y="8" width="8" height="34" rx="1.5" fill="#F8FAFC" />
        {/* Play arrow */}
        <path d="M26 14 L54 32 L26 50 Z" fill="url(#tq-grad)" />
      </svg>
      {showWordmark && (
        <span className="font-display text-xl font-bold tracking-tight text-white">
          Triviq<span className="text-brand-teal">Tech</span>
        </span>
      )}
    </div>
  );
}
