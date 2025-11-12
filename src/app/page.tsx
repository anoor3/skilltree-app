import { FlowSummary } from "@/components/landing/flow-summary";
import { FeatureCards } from "@/components/landing/feature-cards";
import { Hero } from "@/components/landing/hero";
import { LandingHeader } from "@/components/landing/header";
import { LoginPanel } from "@/components/landing/login-panel";
import { TreePreview } from "@/components/landing/tree-preview";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <LandingHeader />
      <main className="relative mx-auto flex max-w-6xl flex-col gap-16 pb-24">
        <Hero />
        <TreePreview />
        <FeatureCards />
        <LoginPanel />
        <FlowSummary />
      </main>
      <div className="pointer-events-none absolute inset-x-0 bottom-[-20%] h-[40vh] bg-[radial-gradient(circle_at_bottom,_rgba(82,229,255,0.18),_transparent_65%)]" />
    </div>
  );
}
