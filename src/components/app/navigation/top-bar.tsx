"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import { useUiStore } from "@/store/ui-store";
import { Plus, Sparkles } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/tree": "Skill Tree",
  "/projects": "Projects",
  "/profile": "Profile",
};

export function TopBar() {
  const { user } = useAuthStore();
  const pathname = usePathname();
  const basePath = pathname.split("/").slice(0, 2).join("/") || "/dashboard";
  const openAddSkill = useUiStore((state) => state.openAddSkill);
  const toggleAiSidebar = useUiStore((state) => state.toggleAiSidebar);
  const isAiSidebarOpen = useUiStore((state) => state.isAiSidebarOpen);
  const isTreeRoute = basePath === "/tree";

  return (
    <header className="sticky top-0 z-30 flex flex-col gap-6 bg-gradient-to-b from-skilltree-night/90 via-skilltree-night/60 to-transparent px-6 pb-6 pt-10 backdrop-blur">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.6em] text-skilltree-muted">{titles[basePath] ?? "SkillTree"}</p>
          <h1 className="mt-2 text-2xl font-semibold text-white">
            Hey {user?.name.split(" ")[0] ?? "Pathfinder"} 👋 Ready to grow today?
          </h1>
          <p className="mt-1 text-sm text-skilltree-muted">
            You’ve added 12 skills 🌱 · Streak: {user?.streak ?? 0} days
          </p>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Button
            variant={isAiSidebarOpen ? "primary" : "secondary"}
            className="px-4 py-2"
            size="sm"
            leftIcon={<Sparkles className="h-4 w-4" />}
            onClick={toggleAiSidebar}
          >
            AI Suggests
          </Button>
          {isTreeRoute ? (
            <Button
              size="sm"
              className="px-4 py-2"
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={() => openAddSkill()}
            >
              Add Skill
            </Button>
          ) : null}
          {user ? (
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
              <Image
                src={user.avatarUrl}
                alt={user.name}
                width={36}
                height={36}
                className="h-9 w-9 rounded-full border border-white/10"
              />
              <div className="flex flex-col text-xs leading-tight text-skilltree-muted">
                <span className="text-white">{user.name}</span>
                <span>{user.headline}</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
