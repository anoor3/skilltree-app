"use client";

import { cn } from "@/lib/utils";
import { Home, LayoutDashboard, Sparkles, UserRound } from "lucide-react";
import type { ComponentType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  { label: "Home", href: "/dashboard", icon: Home },
  { label: "Tree", href: "/tree", icon: LayoutDashboard },
  { label: "Projects", href: "/projects", icon: Sparkles },
  { label: "Profile", href: "/profile", icon: UserRound },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-6 z-40 mx-auto flex w-[min(480px,92%)] items-center justify-between rounded-full border border-white/10 bg-skilltree-night/70 px-4 py-3 shadow-[0_20px_60px_rgba(5,2,20,0.6)] backdrop-blur-xl">
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 text-xs font-medium uppercase tracking-wider transition-colors",
              isActive ? "text-white" : "text-skilltree-muted hover:text-white",
            )}
          >
            <span
              className={cn(
                "grid h-11 w-11 place-items-center rounded-full border border-transparent transition",
                isActive
                  ? "bg-skilltree-gradient text-skilltree-night shadow-lg"
                  : "border-white/10 bg-white/5 text-white/80",
              )}
            >
              <Icon className="h-5 w-5" />
            </span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
