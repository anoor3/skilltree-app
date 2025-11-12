"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Leaf, Share2, Sparkles } from "lucide-react";
import { GlassCard } from "../ui/glass-card";

const features = [
  {
    id: "map",
    title: "See your skills grow",
    description: "A 3D-inspired map that blooms with every new skill you add.",
    icon: Leaf,
    accent: "from-[#8b5cf6] to-[#ec4899]",
  },
  {
    id: "ai",
    title: "AI-powered guidance",
    description: "Smart suggestions for what to learn next based on your stack.",
    icon: BrainCircuit,
    accent: "from-[#22d3ee] to-[#818cf8]",
  },
  {
    id: "share",
    title: "Showcase projects",
    description: "Link your portfolio and GitHub to highlight outcomes, not just skills.",
    icon: Share2,
    accent: "from-[#f97316] to-[#fb7185]",
  },
];

export function FeatureCards() {
  return (
    <section id="features" className="mt-28 px-6 lg:px-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col items-start gap-4 text-left"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-skilltree-muted">
            <Sparkles className="h-3.5 w-3.5 text-skilltree-accent" />
            Intelligent learning flow
          </span>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Put your growth on display.
          </h2>
          <p className="max-w-xl text-skilltree-muted">
            SkillTree turns every step of your journey into an elegant, animated showcase. From progress
            rings to glowing node paths, your skills feel alive.
          </p>
        </motion.header>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12, duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <GlassCard className="flex h-full flex-col gap-6 p-6">
                <div className={`relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.accent} text-white shadow-lg`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm text-skilltree-muted">{feature.description}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
