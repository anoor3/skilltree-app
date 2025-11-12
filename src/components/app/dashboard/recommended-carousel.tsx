"use client";

import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { aiSuggestions } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function RecommendedCarousel() {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Recommended next skills</h3>
        <Button variant="ghost" size="sm" className="text-xs uppercase tracking-widest text-skilltree-muted">
          View all
        </Button>
      </div>
      <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
        {aiSuggestions.map((suggestion, index) => (
          <motion.div
            key={suggestion.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
            className="min-w-[240px]"
          >
            <GlassCard className="flex h-full flex-col justify-between gap-4 p-5">
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-[0.4em] text-skilltree-muted">AI suggests</span>
                <h4 className="text-base font-semibold text-white">{suggestion.title}</h4>
                <p className="text-sm text-skilltree-muted">{suggestion.description}</p>
                <div className="flex flex-wrap gap-2 text-xs uppercase tracking-widest text-skilltree-muted">
                  {suggestion.relatedSkills.map((skill) => (
                    <span key={skill} className="rounded-full bg-white/10 px-2 py-1">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="self-start"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                {suggestion.actionLabel}
              </Button>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
