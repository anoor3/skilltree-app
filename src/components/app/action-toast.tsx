"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useUiStore } from "@/store/ui-store";
import { Sparkles } from "lucide-react";

export function ActionToast() {
  const { lastActionMessage, setLastActionMessage } = useUiStore();

  useEffect(() => {
    if (!lastActionMessage) return;
    const timeout = setTimeout(() => setLastActionMessage(null), 3200);
    return () => clearTimeout(timeout);
  }, [lastActionMessage, setLastActionMessage]);

  return (
    <AnimatePresence>
      {lastActionMessage ? (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-28 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-skilltree-card px-4 py-3 text-sm text-white shadow-[0_20px_60px_rgba(5,2,20,0.6)]"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-skilltree-gradient text-skilltree-night shadow-lg">
              <Sparkles className="h-4 w-4" />
            </span>
            <p className="text-sm text-white">{lastActionMessage}</p>
            <button
              className="ml-auto rounded-full border border-white/10 px-2 py-1 text-xs text-skilltree-muted"
              onClick={() => setLastActionMessage(null)}
            >
              Dismiss
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
