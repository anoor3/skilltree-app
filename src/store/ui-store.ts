"use client";

import { create } from "zustand";

interface UiState {
  isAddSkillOpen: boolean;
  openAddSkill: () => void;
  closeAddSkill: () => void;
  isAiSidebarOpen: boolean;
  openAiSidebar: () => void;
  closeAiSidebar: () => void;
  toggleAiSidebar: () => void;
  selectedProjectId: string | null;
  openProject: (id: string) => void;
  closeProject: () => void;
  lastActionMessage: string | null;
  setLastActionMessage: (message: string | null) => void;
  isTreeFullscreen: boolean;
  enterTreeFullscreen: () => void;
  exitTreeFullscreen: () => void;
  toggleTreeFullscreen: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  isAddSkillOpen: false,
  openAddSkill: () => set({ isAddSkillOpen: true }),
  closeAddSkill: () => set({ isAddSkillOpen: false }),
  isAiSidebarOpen: true,
  openAiSidebar: () => set({ isAiSidebarOpen: true }),
  closeAiSidebar: () => set({ isAiSidebarOpen: false }),
  toggleAiSidebar: () => set((state) => ({ isAiSidebarOpen: !state.isAiSidebarOpen })),
  selectedProjectId: null,
  openProject: (id) => set({ selectedProjectId: id }),
  closeProject: () => set({ selectedProjectId: null }),
  lastActionMessage: null,
  setLastActionMessage: (message) => set({ lastActionMessage: message }),
  isTreeFullscreen: false,
  enterTreeFullscreen: () => set({ isTreeFullscreen: true }),
  exitTreeFullscreen: () => set({ isTreeFullscreen: false }),
  toggleTreeFullscreen: () => set((state) => ({ isTreeFullscreen: !state.isTreeFullscreen })),
}));
