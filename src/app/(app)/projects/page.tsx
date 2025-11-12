"use client";

import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Modal } from "@/components/ui/modal";
import { projects } from "@/lib/mock-data";
import { useUiStore } from "@/store/ui-store";
import Image from "next/image";

export default function ProjectsPage() {
  const { selectedProjectId, openProject, closeProject } = useUiStore();
  const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? null;

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
              <Image src={project.thumbnail} alt={project.title} fill className="object-cover transition-transform group-hover:scale-105" />
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
          <div className="space-y-4">
            <div className="relative h-56 w-full overflow-hidden rounded-2xl">
              <Image src={selectedProject.thumbnail} alt={selectedProject.title} fill className="object-cover" />
            </div>
            <p className="text-sm text-skilltree-muted">{selectedProject.description}</p>
            <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-widest text-skilltree-muted">
              {selectedProject.skillRefs.map((skill) => (
                <span key={skill} className="rounded-full bg-white/10 px-2 py-1 text-white">
                  {skill}
                </span>
              ))}
            </div>
            <Button asChild variant="secondary">
              <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                View on GitHub ↗
              </a>
            </Button>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
