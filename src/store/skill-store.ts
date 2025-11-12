"use client";

import { create } from "zustand";
import { nanoid } from "nanoid";
import type { SkillLevel, SkillNode } from "@/lib/types";
import { skillNodes as initialNodes } from "@/lib/mock-data";

interface SkillState {
  skills: SkillNode[];
  selectedSkillId: string | null;
  selectSkill: (id: string | null) => void;
  addSkill: (payload: {
    name: string;
    emoji: string;
    level: SkillLevel;
    connectsTo?: string[];
  }) => void;
}

export const useSkillStore = create<SkillState>((set) => ({
  skills: initialNodes,
  selectedSkillId: "python",
  selectSkill: (id) => set({ selectedSkillId: id }),
  addSkill: ({ name, emoji, level, connectsTo = [] }) =>
    set((state) => {
      const id = name.toLowerCase().replace(/\s+/g, "-") + `-${nanoid(4)}`;
      const newSkill: SkillNode = {
        id,
        name,
        emoji,
        level,
        progress: level === "strong" ? 0.85 : level === "learning" ? 0.5 : 0.15,
        connections: connectsTo,
      };

      return {
        skills: [...state.skills, newSkill],
        selectedSkillId: newSkill.id,
      };
    }),
}));
