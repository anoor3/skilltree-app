"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { SkillNode } from "@/lib/types";
import { useSkillStore } from "@/store/skill-store";

const levelColors: Record<SkillNode["level"], string> = {
  strong: "from-[#8bfd7b] to-[#52e5ff]",
  learning: "from-[#52e5ff] to-[#a066ff]",
  planned: "from-[#6574f7] to-[#c084fc]",
};

interface PositionedSkill extends SkillNode {
  x: number;
  y: number;
}

function computePositions(skills: SkillNode[], size = 720): PositionedSkill[] {
  const center = size / 2;
  const ringCounts = Math.max(1, Math.ceil(Math.sqrt(skills.length)));
  const ringRadius = size / (2.2 * ringCounts);

  return skills.map((skill, index) => {
    const ring = Math.floor(index / ringCounts) + 1;
    const angle = (index % ringCounts) * ((Math.PI * 2) / ringCounts) + (ring % 2 === 0 ? Math.PI / ring : 0);
    const radius = ring * ringRadius;

    return {
      ...skill,
      x: center + Math.cos(angle) * radius,
      y: center + Math.sin(angle) * radius,
    };
  });
}

export function SkillTreeCanvas() {
  const skills = useSkillStore((state) => state.skills);
  const selectedSkillId = useSkillStore((state) => state.selectedSkillId);
  const selectSkill = useSkillStore((state) => state.selectSkill);

  const positionedSkills = useMemo(() => computePositions(skills), [skills]);
  const size = 720;
  const center = size / 2;

  const edges = useMemo(() => {
    const map = new Map<string, PositionedSkill>();
    positionedSkills.forEach((skill) => map.set(skill.id, skill));

    const rendered = new Set<string>();

    return positionedSkills.flatMap((skill) =>
      skill.connections
        .map((targetId) => {
          const target = map.get(targetId);
          if (!target || skill.id === target.id) return null;
          const key = [skill.id, target.id].sort().join("-");
          if (rendered.has(key)) return null;
          rendered.add(key);
          return { source: skill, target };
        })
        .filter(Boolean) as { source: PositionedSkill; target: PositionedSkill }[],
    );
  }, [positionedSkills]);

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#120933]/80 via-[#100724]/80 to-[#070215]/90 shadow-[0_30px_80px_rgba(7,0,30,0.55)]">
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#52E5FF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#A066FF" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        {edges.map(({ source, target }) => (
          <motion.line
            key={`${source.id}-${target.id}`}
            x1={source.x}
            y1={source.y}
            x2={target.x}
            y2={target.y}
            stroke="url(#edge-gradient)"
            strokeWidth={3}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        ))}
      </svg>

      {positionedSkills.map((skill) => {
        const isSelected = skill.id === selectedSkillId;
        return (
          <motion.button
            key={skill.id}
            onClick={() => selectSkill(skill.id)}
            className={cn(
              "absolute flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/10 text-white shadow-[0_25px_50px_rgba(8,0,35,0.45)] transition-transform",
              isSelected ? "scale-110" : "hover:scale-105",
            )}
            style={{ left: skill.x, top: skill.y }}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.96 }}
          >
            <span className="text-3xl">{skill.emoji}</span>
            <span className="mt-2 text-sm font-semibold">{skill.name}</span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.4em] text-skilltree-muted">
              {skill.level}
            </span>
            <div
              className={cn(
                "absolute inset-0 -z-10 rounded-[inherit] opacity-60 blur-xl",
                `bg-gradient-to-br ${levelColors[skill.level]}`,
              )}
            />
          </motion.button>
        );
      })}

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/5" />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
