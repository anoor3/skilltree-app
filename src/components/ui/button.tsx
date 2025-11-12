import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  asChild?: boolean;
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "glow-ring bg-skilltree-gradient text-skilltree-night hover:-translate-y-0.5 shadow-[0_20px_40px_rgba(10,5,30,0.5)]",
  secondary:
    "border border-white/20 bg-white/5 text-white hover:border-white/40 hover:-translate-y-0.5",
  ghost: "text-skilltree-muted hover:text-white",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-3 py-2 text-xs",
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-4 text-base",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-skilltree-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-skilltree-night",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {leftIcon ? <span className="grid place-items-center text-current">{leftIcon}</span> : null}
      <span>{children}</span>
      {rightIcon ? <span className="grid place-items-center text-current">{rightIcon}</span> : null}
    </Comp>
  );
}
