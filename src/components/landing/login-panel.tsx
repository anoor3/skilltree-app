"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function LoginPanel() {
  return (
    <section id="login" className="mt-24 px-6 lg:px-12">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1.2fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="bg-skilltree-card relative overflow-hidden rounded-3xl p-8 shadow-[0_30px_60px_rgba(12,5,32,0.5)]"
        >
          <div className="absolute -left-20 top-1/2 hidden h-40 w-40 -translate-y-1/2 rounded-full bg-skilltree-accent-soft blur-3xl md:block" />
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-skilltree-muted">
            Seamless onboarding
          </span>
          <h3 className="mt-6 text-3xl font-semibold text-white">
            Sign in and start growing.
          </h3>
          <p className="mt-3 text-sm text-skilltree-muted">
            Choose Google for instant sync with Sheets or use email to craft your journey manually. You can
            always switch later.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button className="glow-ring inline-flex flex-1 items-center justify-center gap-3 rounded-full bg-skilltree-gradient px-5 py-4 text-sm font-semibold text-skilltree-night transition-transform hover:-translate-y-1">
              <Image src="/icons/google.svg" alt="Google" width={20} height={20} />
              Continue with Google
            </button>
            <button className="inline-flex flex-1 items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-5 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-1 hover:border-white/40">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 text-xs">@</span>
              Continue with Email
            </button>
          </div>
          <p className="mt-6 text-xs text-skilltree-muted">
            By continuing you agree to our Terms of Service and consent to AI-powered recommendations tailored
            to your skills.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="bg-skilltree-card relative overflow-hidden rounded-3xl p-8"
        >
          <div className="absolute right-[-20%] top-[15%] h-32 w-32 rounded-full bg-[#52e5ff]/20 blur-2xl" />
          <h4 className="text-sm uppercase tracking-[0.3em] text-skilltree-muted">Snapshot</h4>
          <p className="mt-3 text-lg font-semibold text-white">12 skills mapped</p>
          <p className="text-sm text-skilltree-muted">3 new this week · Streak: 7 days</p>
          <div className="mt-10 space-y-3 text-sm text-skilltree-muted">
            <div className="flex items-center justify-between">
              <span className="text-white">Python Mastery</span>
              <span className="text-skilltree-info">95%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">AI Foundations</span>
              <span className="text-skilltree-warning">60%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Frontend Universe</span>
              <span className="text-skilltree-success">65%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
