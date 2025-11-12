import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "outline";
}

const variantMap: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-white/10 text-white",
  accent: "bg-skilltree-accent/20 text-skilltree-accent",
  outline: "border border-white/15 text-skilltree-muted",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-widest",
        variantMap[variant],
        className,
      )}
      {...props}
    />
  );
}
