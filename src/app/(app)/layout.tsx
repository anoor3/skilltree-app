import type { ReactNode } from "react";
import { ActionToast } from "@/components/app/action-toast";
import { BottomNav } from "@/components/app/navigation/bottom-nav";
import { TopBar } from "@/components/app/navigation/top-bar";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-dvh pb-28">
      <TopBar />
      <main className="mx-auto w-full max-w-6xl px-6 pb-16">{children}</main>
      <BottomNav />
      <ActionToast />
    </div>
  );
}
