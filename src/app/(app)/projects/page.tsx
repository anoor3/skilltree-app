"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

import { SkillTreeCanvas } from "@/components/app/tree/skill-tree-canvas";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Modal } from "@/components/ui/modal";
import { projects } from "@/lib/mock-data";
import { useSkillStore } from "@/store/skill-store";
import { useUiStore } from "@/store/ui-store";
import { ArrowUpRight, GitBranch, Layers3 } from "lucide-react";

export default function ProjectsPage() {
  const { selectedProjectId, openProject, closeProject } = useUiStore();
  const skills = useSkillStore((state) => state.skills);
  const [viewMode, setViewMode] = useState<"overview" | "tree">("overview");
  const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? null;
  const projectSkills = useMemo(() => {
    if (!selectedProject) return [];
    const refs = new Set(selectedProject.skillRefs);
    return skills
      .filter((skill) => refs.has(skill.id))
      .map((skill) => ({
        ...skill,
        connections: skill.connections.filter((connection) => refs.has(connection)),
      }));
  }, [selectedProject, skills]);

  useEffect(() => {
    setViewMode("overview");
  }, [selectedProjectId]);

  return (
    <div className="flex flex-col gap-8 pb-10">
      <header className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-white">Projects linked to your tree</h2>
        <p className="text-sm text-skilltree-muted">Showcase outcomes powered by your skills.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <GlassCard
            key={project.id}
            className="group flex cursor-pointer flex-col gap-4 overflow-hidden p-0 transition-transform hover:-translate-y-1"
            onClick={() => openProject(project.id)}
          >
            <div className="relative h-40 w-full overflow-hidden">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 30vw"
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="space-y-3 p-5">
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-white">{project.title}</h3>
                <p className="text-sm text-skilltree-muted">{project.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-widest text-skilltree-muted">
                {project.skillRefs.map((skill) => (
                  <span key={skill} className="rounded-full bg-white/10 px-2 py-1 text-white">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <Modal open={Boolean(selectedProject)} onClose={closeProject} title={selectedProject?.title}>
        {selectedProject ? (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-xs uppercase tracking-[0.32em] text-skilltree-muted">
              <Button
                size="sm"
                variant={viewMode === "overview" ? "secondary" : "ghost"}
                className="rounded-full px-4"
                leftIcon={<Layers3 className="h-3.5 w-3.5" />}
                onClick={() => setViewMode("overview")}
              >
                Overview
              </Button>
              <Button
                size="sm"
                variant={viewMode === "tree" ? "secondary" : "ghost"}
                className="rounded-full px-4"
                leftIcon={<GitBranch className="h-3.5 w-3.5" />}
                onClick={() => setViewMode("tree")}
              >
                Skill tree view
              </Button>
            </div>

            {viewMode === "overview" ? (
              <>
                <div className="relative h-56 w-full overflow-hidden rounded-2xl">
                  <Image
                    src={selectedProject.thumbnail}
                    alt={selectedProject.title}
                    fill
                    sizes="(max-width: 768px) 90vw, 600px"
                    className="object-cover"
                  />
                </div>
                <p className="text-sm text-skilltree-muted">{selectedProject.description}</p>
                <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-widest text-skilltree-muted">
                  {selectedProject.skillRefs.map((skill) => (
                    <span key={skill} className="rounded-full bg-white/10 px-2 py-1 text-white">
                      {skill}
                    </span>
                  ))}
                </div>
                <Button asChild variant="secondary" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
                  <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                    View on GitHub
                  </a>
                </Button>
              </>
            ) : null}

            {viewMode === "tree" ? (
              <div className="space-y-4">
                <p className="text-sm text-skilltree-muted">
                  Visualising the skill stack powering <span className="text-white">{selectedProject.title}</span>.
                </p>
                {projectSkills.length ? (
                  <div className="mx-auto max-w-[620px]">
                    <SkillTreeCanvas
                      size={620}
                      readonly
                      className="mx-auto"
                      skillsOverride={projectSkills}
                    />
                  </div>
                ) : (
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-sm text-skilltree-muted">
                    No skills linked yet. Tag abilities in your Project setup to generate this tree.
                  </div>
                )}
              </div>
            ) : null}
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
