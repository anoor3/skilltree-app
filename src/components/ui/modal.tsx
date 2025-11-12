"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
}

export function Modal({ open, onClose, title, className, children }: PropsWithChildren<ModalProps>) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            className={cn(
              "bg-skilltree-card relative w-full max-w-2xl rounded-3xl border border-white/10 p-6 shadow-[0_40px_80px_rgba(5,2,25,0.6)]",
              className,
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                {title ? <h2 className="text-xl font-semibold text-white">{title}</h2> : null}
              </div>
              <button
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-skilltree-muted"
                onClick={onClose}
              >
                Close
              </button>
            </div>
            <div className="mt-4 max-h-[60vh] overflow-y-auto pr-2">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
