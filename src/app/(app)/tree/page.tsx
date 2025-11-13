"use client";

import { useEffect } from "react";
import { AddSkillSheet } from "@/components/app/tree/add-skill-sheet";
import { AiSuggestionSidebar } from "@/components/app/tree/ai-suggestion-sidebar";
import { SkillDetailPanel } from "@/components/app/tree/skill-detail-panel";
import { SkillTreeCanvas } from "@/components/app/tree/skill-tree-canvas";
import { Button } from "@/components/ui/button";
import { useUiStore } from "@/store/ui-store";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, Minimize2, Plus } from "lucide-react";

export default function TreePage() {
  const openAddSkill = useUiStore((state) => state.openAddSkill);
  const isTreeFullscreen = useUiStore((state) => state.isTreeFullscreen);
  const enterTreeFullscreen = useUiStore((state) => state.enterTreeFullscreen);
  const exitTreeFullscreen = useUiStore((state) => state.exitTreeFullscreen);

  useEffect(() => {
    if (!isTreeFullscreen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isTreeFullscreen]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Your interactive skill tree</h2>
            <p className="text-sm text-skilltree-muted">
              Tap a node to inspect it, drag to explore, or add new branches to grow your universe.
            </p>
          </div>
          <Button
            size="sm"
            className="self-start"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => openAddSkill()}
          >
            Add Skill
          </Button>
        </div>
        <div className="relative">
          <SkillTreeCanvas
            className={`transition-opacity duration-300 ${isTreeFullscreen ? "pointer-events-none opacity-0" : "opacity-100"}`}
          />
          {!isTreeFullscreen ? (
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Maximize2 className="h-4 w-4" />}
              className="absolute right-4 top-4 hidden md:inline-flex"
              onClick={enterTreeFullscreen}
            >
              Fullscreen
            </Button>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <SkillDetailPanel />
        <AiSuggestionSidebar />
      </div>
      <AddSkillSheet />

      <AnimatePresence>
        {isTreeFullscreen ? (
          <motion.div
            key="tree-fullscreen"
            className="fixed inset-0 z-[70] flex flex-col bg-gradient-to-br from-[#050212] via-[#120933] to-[#03000c]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-end gap-3 px-6 pt-6">
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<Minimize2 className="h-4 w-4" />}
                onClick={exitTreeFullscreen}
              >
                Exit fullscreen
              </Button>
            </div>
            <motion.div
              className="flex flex-1 items-center justify-center p-6"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 26 }}
            >
              <SkillTreeCanvas
                size={960}
                className="aspect-[16/10] w-full max-w-[1200px] border border-white/10 bg-gradient-to-br from-[#11062d]/85 via-[#0d0624]/85 to-[#070019]/90 shadow-[0_40px_120px_rgba(12,0,44,0.65)]"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
