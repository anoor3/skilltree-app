"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GlassCard } from "../ui/glass-card";
import { skillNodes, projects, aiSuggestions } from "@/lib/mock-data";

const highlightSkills = skillNodes.slice(0, 6);

export function TreePreview() {
  return (
    <section id="experience" className="mt-24 px-6 lg:px-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 lg:flex-row">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.4 }}
          className="bg-skilltree-card relative flex flex-1 flex-col overflow-hidden rounded-3xl p-10"
        >
          <div className="absolute -top-32 left-24 h-64 w-64 rounded-full bg-[#a066ff]/20 blur-3xl" />
          <div className="absolute -bottom-24 right-16 h-56 w-56 rounded-full bg-[#52e5ff]/10 blur-3xl" />
          <header className="flex items-start justify-between">
            <div>
              <h3 className="text-sm uppercase tracking-[0.4em] text-skilltree-muted">Skill Tree</h3>
              <p className="mt-3 text-xl font-semibold text-white">
                Tap a node to unlock deeper mastery.
              </p>
            </div>
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs text-skilltree-muted">
              Interactive Preview
            </span>
          </header>

          <div className="relative mt-10 grid h-[360px] place-items-center">
            <div className="absolute inset-10 rounded-full border border-white/10" />
            {highlightSkills.map((skill, index) => {
              const angle = (index / highlightSkills.length) * Math.PI * 2;
              const radius = index % 2 === 0 ? 120 : 160;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="absolute flex h-24 w-24 flex-col items-center justify-center rounded-3xl border border-white/20 bg-white/10 text-center text-white shadow-[0_20px_40px_rgba(13,5,45,0.45)]"
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                >
                  <span className="text-2xl">{skill.emoji}</span>
                  <span className="mt-2 text-xs font-medium">{skill.name}</span>
                  <span className="mt-1 text-[10px] uppercase tracking-widest text-skilltree-muted">
                    {skill.level}
                  </span>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
              className="glow-ring grid h-28 w-28 place-items-center rounded-3xl bg-skilltree-gradient text-center text-sm font-semibold text-skilltree-night"
            >
              Grow
            </motion.div>
          </div>
        </motion.div>

        <div className="flex flex-1 flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="flex h-full flex-col gap-5 p-6">
              <header className="flex items-center justify-between">
                <h4 className="text-sm uppercase tracking-[0.3em] text-skilltree-muted">Projects</h4>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-skilltree-muted">
                  Linked skills
                </span>
              </header>
              <div className="grid gap-4">
                {projects.slice(0, 3).map((project) => (
                  <div key={project.id} className="flex items-center gap-4 rounded-2xl bg-white/5 p-3">
                    <div className="relative h-14 w-14 overflow-hidden rounded-2xl">
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col text-sm">
                      <span className="font-semibold text-white">{project.title}</span>
                      <div className="mt-1 flex flex-wrap gap-2 text-[11px] uppercase tracking-widest text-skilltree-muted">
                        {project.skillRefs.map((skill) => (
                          <span key={skill} className="rounded-full bg-white/10 px-2 py-1">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <GlassCard className="flex h-full flex-col gap-4 p-6">
              <header className="flex items-center justify-between">
                <h4 className="text-sm uppercase tracking-[0.3em] text-skilltree-muted">AI Suggests</h4>
                <span className="rounded-full bg-skilltree-accent/20 px-3 py-1 text-xs text-skilltree-accent">
                  Personalized
                </span>
              </header>
              <div className="space-y-3">
                {aiSuggestions.slice(0, 3).map((suggestion) => (
                  <div key={suggestion.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-semibold text-white">{suggestion.title}</p>
                    <p className="mt-1 text-xs text-skilltree-muted">{suggestion.description}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
