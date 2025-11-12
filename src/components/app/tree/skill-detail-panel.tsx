"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { ProgressRing } from "@/components/ui/progress-ring";
import { projects } from "@/lib/mock-data";
import type { SkillLevel } from "@/lib/types";
import { useSkillStore } from "@/store/skill-store";
import { useUiStore } from "@/store/ui-store";
import { motion } from "framer-motion";

const levelOptions: { label: string; value: SkillLevel }[] = [
  { label: "Planned", value: "planned" },
  { label: "Learning", value: "learning" },
  { label: "Strong", value: "strong" },
];

export function SkillDetailPanel() {
  const { skills, selectedSkillId, updateSkill, removeSkill } = useSkillStore();
  const setLastActionMessage = useUiStore((state) => state.setLastActionMessage);
  const selectedSkill = useMemo(
    () => skills.find((skill) => skill.id === selectedSkillId),
    [skills, selectedSkillId],
  );
  const [progress, setProgress] = useState(() => selectedSkill?.progress ?? 0.5);
  const [level, setLevel] = useState<SkillLevel>(selectedSkill?.level ?? "learning");

  useEffect(() => {
    if (selectedSkill) {
      setProgress(selectedSkill.progress);
      setLevel(selectedSkill.level);
    }
  }, [selectedSkill?.id, selectedSkill?.progress, selectedSkill?.level]);

  if (!selectedSkill) {
    return (
      <div className="bg-skilltree-card flex h-full flex-col items-center justify-center rounded-3xl border border-white/10 p-8 text-center text-skilltree-muted">
        <p className="text-sm">Select a skill node to view details.</p>
      </div>
    );
  }

  return (
    <motion.div
      key={selectedSkill.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-skilltree-card flex h-full flex-col gap-6 rounded-3xl border border-white/10 p-6"
    >
      <header className="flex items-start justify-between gap-3">
        <div>
          <span className="text-3xl">{selectedSkill.emoji}</span>
          <h2 className="mt-3 text-2xl font-semibold text-white">{selectedSkill.name}</h2>
          <p className="text-xs uppercase tracking-[0.4em] text-skilltree-muted">{selectedSkill.level}</p>
        </div>
        <ProgressRing value={selectedSkill.progress} size={84} strokeWidth={8} />
      </header>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-white">Proficiency</h3>
        <div className="flex flex-wrap gap-2">
          {levelOptions.map((option) => (
            <Chip
              key={option.value}
              active={level === option.value}
              onClick={() => {
                setLevel(option.value);
                updateSkill(selectedSkill.id, { level: option.value });
                setLastActionMessage(`Marked ${selectedSkill.name} as ${option.label.toLowerCase()}.`);
              }}
            >
              {option.label}
            </Chip>
          ))}
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-skilltree-muted">
            <span>Progress</span>
            <span>{Math.round(progress * 100)}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={progress}
            onChange={(event) => {
              const value = Number(event.target.value);
              setProgress(value);
              updateSkill(selectedSkill.id, { progress: value });
              setLastActionMessage(`Updated ${selectedSkill.name} progress to ${Math.round(value * 100)}%.`);
            }}
            className="w-full accent-[#52e5ff]"
          />
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-white">Related Projects</h3>
        <div className="flex flex-col gap-3">
          {projects
            .filter((project) => project.skillRefs.includes(selectedSkill.id))
            .map((project) => (
              <div key={project.id} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-skilltree-muted">
                <p className="text-white">{project.title}</p>
                <p className="text-xs">{project.description}</p>
              </div>
            ))}
          {projects.filter((project) => project.skillRefs.includes(selectedSkill.id)).length === 0 ? (
            <p className="text-xs text-skilltree-muted">No linked projects yet. Add one from the Projects tab.</p>
          ) : null}
        </div>
      </section>

      <div className="mt-auto flex flex-col gap-3">
        <Button
          variant="secondary"
          onClick={() => {
            const nextProgress = Math.min(1, selectedSkill.progress + 0.1);
            updateSkill(selectedSkill.id, { progress: nextProgress });
            setProgress(nextProgress);
            setLastActionMessage(`Logged progress on ${selectedSkill.name}.`);
          }}
        >
          Log a win (+10%)
        </Button>
        <Button
          variant="ghost"
          className="text-red-300 hover:text-red-200"
          onClick={() => {
            removeSkill(selectedSkill.id);
            setLastActionMessage(`${selectedSkill.name} removed from your tree.`);
          }}
        >
          Remove skill
        </Button>
      </div>
    </motion.div>
  );
}
