import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function Chip({ className, active = false, ...props }: ChipProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-skilltree-accent/60",
        active
          ? "border-skilltree-accent/50 bg-skilltree-accent/20 text-skilltree-accent"
          : "border-white/10 bg-white/5 text-skilltree-muted hover:border-white/30 hover:text-white",
        className,
      )}
      {...props}
    />
  );
}
