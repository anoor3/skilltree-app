import { cn } from "@/lib/utils";

interface ProgressRingProps {
  value: number; // 0-1
  size?: number;
  strokeWidth?: number;
  className?: string;
  label?: string;
}

export function ProgressRing({
  value,
  size = 96,
  strokeWidth = 10,
  className,
  label,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(value, 0), 1);
  const dashOffset = circumference * (1 - progress);

  return (
    <div className={cn("relative inline-flex flex-col items-center", className)}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          stroke="rgba(255,255,255,0.1)"
          fill="transparent"
          strokeWidth={strokeWidth}
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
        <circle
          stroke="url(#ring-gradient)"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="transition-[stroke-dashoffset] duration-500 ease-out"
        />
        <defs>
          <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A066FF" />
            <stop offset="50%" stopColor="#52E5FF" />
            <stop offset="100%" stopColor="#00FFD1" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute inset-0 grid place-items-center text-xl font-semibold text-white">
        {Math.round(progress * 100)}%
      </span>
      {label ? <span className="mt-2 text-xs uppercase tracking-[0.3em] text-skilltree-muted">{label}</span> : null}
    </div>
  );
}
