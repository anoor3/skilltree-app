"use client";

import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { aiSuggestions } from "@/lib/mock-data";
import { useSkillStore } from "@/store/skill-store";
import { useUiStore } from "@/store/ui-store";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function AiSuggestionSidebar() {
  const { addSkill } = useSkillStore();
  const { openAddSkill, isAiSidebarOpen, closeAiSidebar, setLastActionMessage } = useUiStore();

  const handleApplySuggestion = (title: string) => {
    addSkill({ name: title, emoji: "✨", level: "learning" });
    setLastActionMessage(`${title} added to your tree from AI suggestions.`);
  };

  return (
    <AnimatePresence>
      {isAiSidebarOpen ? (
        <motion.aside
          initial={{ x: 280, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 280, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-skilltree-card flex h-full w-full max-w-sm flex-col gap-4 rounded-3xl border border-white/10 p-6"
        >
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-skilltree-muted">
              <Sparkles className="h-4 w-4 text-skilltree-accent" />
              AI Suggests
            </div>
            <button
              onClick={closeAiSidebar}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-skilltree-muted"
            >
              Hide
            </button>
          </header>

          <div className="space-y-3">
            {aiSuggestions.map((suggestion) => (
              <GlassCard key={suggestion.id} className="flex flex-col gap-3 p-4">
                <p className="text-sm font-semibold text-white">{suggestion.title}</p>
                <p className="text-xs text-skilltree-muted">{suggestion.description}</p>
                <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-widest text-skilltree-muted">
                  {suggestion.relatedSkills.map((skill) => (
                    <span key={skill} className="rounded-full bg-white/10 px-2 py-1">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleApplySuggestion(suggestion.title)}>
                    {suggestion.actionLabel}
                  </Button>
                  <Button variant="secondary" size="sm" onClick={openAddSkill}>
                    Customize
                  </Button>
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
