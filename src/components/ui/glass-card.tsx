import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export function GlassCard({ className, glow = false, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "bg-skilltree-card relative overflow-hidden rounded-3xl border border-white/10",
        glow && "glow-ring",
        className,
      )}
      {...props}
    />
  );
}
