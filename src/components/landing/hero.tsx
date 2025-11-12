"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center lg:px-12">
      <motion.div
        className="absolute left-[-15%] top-[10%] hidden h-48 w-48 rounded-full bg-skilltree-accent-soft blur-3xl md:block"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-10%] top-[40%] hidden h-64 w-64 rounded-full bg-[#ff9af5]/20 blur-3xl md:block"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />

      <motion.span
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-skilltree-muted backdrop-blur"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <Sparkles className="h-4 w-4 text-skilltree-accent" />
        Grow your skill universe with AI guidance
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="mt-8 max-w-3xl text-balance text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
      >
        Visualize your learning journey as a living, breathing skill tree.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="mt-6 max-w-2xl text-lg text-skilltree-muted sm:text-xl"
      >
        SkillTree turns your projects, achievements, and next steps into an immersive 3D-inspired map so you
        can focus on growth, not spreadsheets.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
      >
        <Link
          href="/dashboard"
          className="glow-ring inline-flex min-w-[220px] items-center justify-center gap-2 rounded-full bg-skilltree-gradient px-8 py-4 text-base font-semibold text-skilltree-night shadow-lg transition-transform hover:-translate-y-1"
        >
          Continue with Google
        </Link>
        <Link
          href="/dashboard?auth=email"
          className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/20 px-8 py-4 text-base font-semibold text-skilltree-foreground transition-transform hover:-translate-y-1 hover:border-white/40"
        >
          Continue with Email
        </Link>
      </motion.div>

      <motion.div
        className="mt-20 grid gap-6 md:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.18,
            },
          },
        }}
      >
        {["C++", "Python", "AI"].map((skill, index) => (
          <motion.div
            key={skill}
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            className="floating-delayed relative flex h-40 w-40 items-center justify-center rounded-3xl bg-white/10 text-3xl font-semibold text-white shadow-[0_20px_50px_rgba(67,41,175,0.35)]"
            style={{ animationDelay: `${index * 0.5}s` }}
          >
            {skill}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
