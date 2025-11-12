"use client";

import { motion } from "framer-motion";
import { ArrowRight, TreePalm } from "lucide-react";
import { GlassCard } from "../ui/glass-card";

const steps = [
  {
    id: 1,
    title: "Login",
    description: "Sign in with Google or email to sync your Sheets instantly.",
  },
  {
    id: 2,
    title: "Dashboard",
    description: "Track streaks, growth metrics, and AI recommended next steps.",
  },
  {
    id: 3,
    title: "Skill Tree",
    description: "Tap glowing nodes to dive into details and add new branches.",
  },
  {
    id: 4,
    title: "Export",
    description: "Share a beautiful snapshot or live link once you're ready.",
  },
];

export function FlowSummary() {
  return (
    <section id="ai" className="mt-28 px-6 pb-32 lg:px-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start gap-4"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-skilltree-muted">
            <TreePalm className="h-3.5 w-3.5 text-skilltree-success" />
            Growth flow
          </span>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Every interaction grows your forest.
          </h2>
          <p className="max-w-xl text-skilltree-muted">
            Follow the loop from login to shareable portfolio. You’re never more than a tap away from action.
          </p>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.12, duration: 0.5 }}
            >
              <GlassCard className="flex h-full flex-col gap-4 p-6">
                <div className="flex items-center justify-between text-sm text-skilltree-muted">
                  <span className="text-xs uppercase tracking-[0.4em]">Step {step.id}</span>
                  {index < steps.length - 1 ? <ArrowRight className="h-4 w-4" /> : null}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  <p className="text-xs text-skilltree-muted">{step.description}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
