"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const navItems = [
  { href: "#experience", label: "Experience" },
  { href: "#features", label: "Features" },
  { href: "#projects", label: "Projects" },
  { href: "#ai", label: "AI Assist" },
];

export function LandingHeader() {
  return (
    <header className="fixed inset-x-0 top-6 z-40 flex justify-center px-4">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex w-full max-w-5xl items-center justify-between rounded-full border border-white/10 bg-white/10 px-6 py-3 backdrop-blur-xl"
      >
        <Link href="#" className="flex items-center gap-2 text-sm font-semibold text-white">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-skilltree-gradient text-sm font-bold text-skilltree-night shadow-md">
            ST
          </span>
          SkillTree
        </Link>
        <div className="hidden items-center gap-6 text-sm text-skilltree-muted md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Link
            href="#login"
            className="hidden rounded-full border border-white/20 px-4 py-2 text-skilltree-muted transition hover:border-white/40 hover:text-white md:inline-flex"
          >
            Sign In
          </Link>
          <Link
            href="#login"
            className="glow-ring inline-flex items-center rounded-full bg-skilltree-gradient px-4 py-2 text-sm font-semibold text-skilltree-night"
          >
            Try Demo
          </Link>
        </div>
      </motion.nav>
    </header>
  );
}
