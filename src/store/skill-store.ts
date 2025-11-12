"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import type { SkillLevel, SkillNode } from "@/lib/types";
import { skillNodes as initialNodes } from "@/lib/mock-data";
import { createSkillRepository } from "@/lib/api/skill-repository";

interface SkillState {
  skills: SkillNode[];
  selectedSkillId: string | null;
  setSkills: (skills: SkillNode[]) => void;
  selectSkill: (id: string | null) => void;
  addSkill: (payload: {
    name: string;
    emoji: string;
    level: SkillLevel;
    progress?: number;
    connectsTo?: string[];
  }) => SkillNode;
  updateSkill: (
    id: string,
    updates: Partial<Omit<SkillNode, "id" | "connections">>,
  ) => SkillNode | null;
  connectSkills: (sourceId: string, targetId: string) => void;
  disconnectSkills: (sourceId: string, targetId: string) => void;
  removeSkill: (id: string) => SkillNode | null;
  reset: () => void;
}

const skillRepository = createSkillRepository();

const logRepoError = (action: string) => (error: unknown) => {
  console.error(`[SkillRepository] ${action} failed`, error);
};

export const useSkillStore = create<SkillState>()(
  persist(
    (set, get) => ({
      skills: initialNodes,
      selectedSkillId: "python",
      setSkills: (skills) => set({ skills }),
      selectSkill: (id) => set({ selectedSkillId: id }),
      addSkill: ({ name, emoji, level, progress, connectsTo = [] }) => {
        const state = get();
        const id = name.toLowerCase().replace(/\s+/g, "-") + `-${nanoid(4)}`;
        const newSkill: SkillNode = {
          id,
          name,
          emoji,
          level,
          progress:
            progress ?? (level === "strong" ? 0.85 : level === "learning" ? 0.5 : 0.15),
          connections: connectsTo,
        };

        const skillsWithConnections = state.skills.map((skill) =>
          connectsTo.includes(skill.id)
            ? { ...skill, connections: Array.from(new Set([...skill.connections, id])) }
            : skill,
        );

        const updatedSkills = [...skillsWithConnections, newSkill];
        set({ skills: updatedSkills, selectedSkillId: newSkill.id });
        void skillRepository.createSkill(newSkill).catch(logRepoError("create"));
        return newSkill;
      },
      updateSkill: (id, updates) => {
        const state = get();
        let updatedSkill: SkillNode | null = null;

        const updatedSkills = state.skills.map((skill) => {
          if (skill.id === id) {
            updatedSkill = { ...skill, ...updates };
            return updatedSkill;
          }
          return skill;
        });

        if (updatedSkill) {
          set({ skills: updatedSkills });
          void skillRepository.updateSkill(updatedSkill).catch(logRepoError("update"));
        }

        return updatedSkill;
      },
      connectSkills: (sourceId, targetId) => {
        const state = get();
        let changed = false;

        const updatedSkills = state.skills.map((skill) => {
          if (skill.id === sourceId && !skill.connections.includes(targetId)) {
            changed = true;
            return { ...skill, connections: [...skill.connections, targetId] };
          }
          if (skill.id === targetId && !skill.connections.includes(sourceId)) {
            changed = true;
            return { ...skill, connections: [...skill.connections, sourceId] };
          }
          return skill;
        });

        if (changed) {
          set({ skills: updatedSkills });
          void skillRepository
            .connectSkills(sourceId, targetId)
            .catch(logRepoError("connect"));
        }
      },
      disconnectSkills: (sourceId, targetId) => {
        const state = get();
        let changed = false;

        const updatedSkills = state.skills.map((skill) => {
          if (skill.id === sourceId && skill.connections.includes(targetId)) {
            changed = true;
            return {
              ...skill,
              connections: skill.connections.filter((connection) => connection !== targetId),
            };
          }
          if (skill.id === targetId && skill.connections.includes(sourceId)) {
            changed = true;
            return {
              ...skill,
              connections: skill.connections.filter((connection) => connection !== sourceId),
            };
          }
          return skill;
        });

        if (changed) {
          set({ skills: updatedSkills });
          void skillRepository
            .disconnectSkills(sourceId, targetId)
            .catch(logRepoError("disconnect"));
        }
      },
      removeSkill: (id) => {
        const state = get();
        const removedSkill = state.skills.find((skill) => skill.id === id) ?? null;
        if (!removedSkill) {
          return null;
        }

        const filteredSkills = state.skills
          .filter((skill) => skill.id !== id)
          .map((skill) => ({
            ...skill,
            connections: skill.connections.filter((connection) => connection !== id),
          }));

        set({
          skills: filteredSkills,
          selectedSkillId: state.selectedSkillId === id ? null : state.selectedSkillId,
        });
        void skillRepository.deleteSkill(id).catch(logRepoError("delete"));

        return removedSkill;
      },
      reset: () => set({ skills: initialNodes, selectedSkillId: "python" }),
    }),
    {
      name: "skilltree-store",
      version: 1,
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") {
          return {
            getItem: () => null,
            setItem: () => undefined,
            removeItem: () => undefined,
          } as unknown as Storage;
        }
        return window.localStorage;
      }),
      partialize: (state) => ({ skills: state.skills, selectedSkillId: state.selectedSkillId }),
    },
  ),
);
