"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { useSkillStore } from "@/store/skill-store";
import { useUiStore } from "@/store/ui-store";
import type { SkillLevel } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";

export function AddSkillSheet() {
  const { isAddSkillOpen, closeAddSkill } = useUiStore();
  const { addSkill, skills } = useSkillStore();

  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("🌱");
  const [level, setLevel] = useState<SkillLevel>("planned");
  const [connectsTo, setConnectsTo] = useState<string[]>([]);

  const handleAddSkill = () => {
    if (!name.trim()) return;
    addSkill({ name, emoji, level, connectsTo });
    setName("");
    setEmoji("🌱");
    setLevel("planned");
    setConnectsTo([]);
    closeAddSkill();
  };

  return (
    <AnimatePresence>
      {isAddSkillOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 120 }}
            transition={{ type: "spring", stiffness: 240, damping: 25 }}
            className="bg-skilltree-card relative w-full max-w-xl rounded-t-3xl border border-white/10 p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">Add new skill</h2>
                <p className="text-xs text-skilltree-muted">
                  Create a node and choose where it connects in your tree.
                </p>
              </div>
              <button
                type="button"
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-skilltree-muted"
                onClick={closeAddSkill}
              >
                Close
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-xs uppercase tracking-[0.4em] text-skilltree-muted">Skill name</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Neural Networks"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-skilltree-muted focus:border-skilltree-accent/60 focus:outline-none"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm">
                <span className="text-xs uppercase tracking-[0.4em] text-skilltree-muted">Emoji</span>
                <input
                  value={emoji}
                  onChange={(event) => setEmoji(event.target.value.slice(0, 2))}
                  className="w-20 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-xl"
                />
              </label>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.4em] text-skilltree-muted">Proficiency level</span>
                <div className="flex flex-wrap gap-2">
                  {(["planned", "learning", "strong"] as SkillLevel[]).map((option) => (
                    <Chip
                      key={option}
                      active={level === option}
                      onClick={() => setLevel(option)}
                    >
                      {option}
                    </Chip>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.4em] text-skilltree-muted">Connect to existing</span>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-2">
                  {skills.map((skill) => (
                    <Chip
                      key={skill.id}
                      active={connectsTo.includes(skill.id)}
                      onClick={() =>
                        setConnectsTo((prev) =>
                          prev.includes(skill.id)
                            ? prev.filter((id) => id !== skill.id)
                            : [...prev, skill.id],
                        )
                      }
                    >
                      {skill.name}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <p className="text-xs text-skilltree-muted">
                We’ll auto-link back to your selections so the graph stays synchronized.
              </p>
              <Button onClick={handleAddSkill} disabled={!name.trim()}>
                Add skill
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
