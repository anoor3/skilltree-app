import { GlassCard } from "@/components/ui/glass-card";
import { ProgressRing } from "@/components/ui/progress-ring";
import { aiSuggestions, projects, skillNodes } from "@/lib/mock-data";
import { Flame, Leaf, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const summaryItems = [
  {
    id: "skills",
    label: "Skills mapped",
    value: skillNodes.length,
    icon: Leaf,
    accent: "from-[#8b5cf6] to-[#ec4899]",
  },
  {
    id: "projects",
    label: "Projects linked",
    value: projects.length,
    icon: Rocket,
    accent: "from-[#22d3ee] to-[#818cf8]",
  },
  {
    id: "streak",
    label: "Streak days",
    value: 7,
    icon: Flame,
    accent: "from-[#fb7185] to-[#f97316]",
  },
];

export function SummaryCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {summaryItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.45, ease: "easeOut" }}
        >
          <GlassCard className="group relative flex items-center gap-5 overflow-hidden p-6">
            <div
              className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${item.accent} text-white shadow-lg transition-transform group-hover:-translate-y-1`}
            >
              <item.icon className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm uppercase tracking-[0.3em] text-skilltree-muted">{item.label}</span>
              <span className="text-2xl font-semibold text-white">{item.value}</span>
            </div>
            <div className="pointer-events-none absolute -right-12 top-0 h-24 w-24 rotate-12 rounded-full bg-gradient-to-br from-white/20 via-transparent to-transparent blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-70" />
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}

export function MomentumCard() {
  const averageProgress =
    skillNodes.reduce((acc, node) => acc + node.progress, 0) / Math.max(skillNodes.length, 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <GlassCard className="group flex flex-col gap-6 overflow-hidden p-6 sm:flex-row sm:items-center">
        <div className="relative">
          <ProgressRing value={averageProgress} label="Momentum" />
          <motion.span
            className="pointer-events-none absolute inset-[-10%] -z-10 rounded-full bg-skilltree-gradient opacity-30 blur-3xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-white">Momentum looks strong!</h3>
          <p className="text-sm text-skilltree-muted">
            Keep adding skills to maintain your streak. You’re {Math.round(averageProgress * 100)}% of the way
            through this week’s goals.
          </p>
          <div className="flex flex-wrap gap-2 text-xs uppercase tracking-widest text-skilltree-muted">
            {aiSuggestions.slice(0, 3).map((suggestion) => (
              <span key={suggestion.id} className="rounded-full bg-white/10 px-3 py-1 text-white">
                {suggestion.title}
              </span>
            ))}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
