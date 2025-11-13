import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";
import { cloneElement, forwardRef, isValidElement } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  asChild?: boolean;
  children: ReactNode;
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

const iconWrapper = "grid place-items-center text-current";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      leftIcon,
      rightIcon,
      asChild = false,
      children,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const baseClasses = cn(
      "relative inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-skilltree-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-skilltree-night",
      variantClasses[variant],
      sizeClasses[size],
      className,
    );

    if (asChild) {
      if (!isValidElement(children)) {
        throw new Error("Button with `asChild` expects a single valid React element child.");
      }

      const child = children as ReactElement<{ className?: string }>;

      if (leftIcon || rightIcon) {
        console.warn("Button `asChild` does not support leftIcon/rightIcon. Icons were ignored.");
      }

      return cloneElement(child, {
        ...(props as Record<string, unknown>),
        className: cn(baseClasses, child.props?.className),
      } as Record<string, unknown>);
    }

    const content = (
      <>
        {leftIcon ? <span className={iconWrapper}>{leftIcon}</span> : null}
        <span>{children}</span>
        {rightIcon ? <span className={iconWrapper}>{rightIcon}</span> : null}
      </>
    );

    return (
      <button ref={ref} type={type} className={baseClasses} {...props}>
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";
