"use client";

import { MomentumCard, SummaryCards } from "@/components/app/dashboard/summary-cards";
import { RecommendedCarousel } from "@/components/app/dashboard/recommended-carousel";
import { GlassCard } from "@/components/ui/glass-card";
import { projects } from "@/lib/mock-data";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 pb-10">
      <SummaryCards />
      <MomentumCard />

      <section className="mt-4">
        <header className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Recent projects</h2>
          <span className="text-xs uppercase tracking-[0.4em] text-skilltree-muted">Linked to skills</span>
        </header>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <GlassCard key={project.id} className="flex flex-col gap-4 overflow-hidden p-0">
              <div className="relative h-40 w-full">
                <Image src={project.thumbnail} alt={project.title} fill className="object-cover" />
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
      </section>

      <RecommendedCarousel />
    </div>
  );
}
