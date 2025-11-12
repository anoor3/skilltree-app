"use client";

import { AddSkillSheet } from "@/components/app/tree/add-skill-sheet";
import { AiSuggestionSidebar } from "@/components/app/tree/ai-suggestion-sidebar";
import { SkillDetailPanel } from "@/components/app/tree/skill-detail-panel";
import { SkillTreeCanvas } from "@/components/app/tree/skill-tree-canvas";
import { Button } from "@/components/ui/button";
import { useUiStore } from "@/store/ui-store";
import { Plus } from "lucide-react";

export default function TreePage() {
  const openAddSkill = useUiStore((state) => state.openAddSkill);

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
        <SkillTreeCanvas />
      </div>
      <div className="flex flex-col gap-6">
        <SkillDetailPanel />
        <AiSuggestionSidebar />
      </div>
      <AddSkillSheet />
    </div>
  );
}
