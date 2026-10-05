import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Sparkles, X, Heart, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacherName: string;
}

export const EasterEggModal: React.FC<EasterEggModalProps> = ({
  isOpen,
  onClose,
  teacherName,
}) => {
  const triggerAppreciationFix = () => {
    sounds.playChime();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#818cf8', '#f43f5e', '#fbbf24'],
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-rose-500/40 bg-slate-950 shadow-[0_0_50px_rgba(244,63,94,0.25)]"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-rose-500/20 bg-slate-900/90 px-4 py-3">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-rose-400" />
                <span className="text-xs font-mono font-semibold tracking-wider text-rose-300">
                  DEVELOPER_EASTER_EGG.sh
                </span>
              </div>
              <button
                onClick={onClose}
                className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Terminal Content */}
            <div className="p-6 font-mono text-sm space-y-4">
              <div className="flex items-center gap-3 text-amber-400">
                <AlertTriangle className="h-5 w-5 shrink-0 animate-bounce" />
                <span className="text-base font-bold tracking-wide">
                  DEBUG MODE ACTIVATED 😂
                </span>
              </div>

              <div className="rounded-xl bg-slate-900/90 p-4 border border-rose-500/20 text-rose-300 space-y-2">
                <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                  Runtime Exception:
                </p>
                <p className="font-bold text-rose-400">
                  Error 404: Teacher Appreciation Level Too Low.
                </p>
                <p className="text-xs text-slate-300">
                  Stack trace: Student at <span className="text-cyan-300">src/learning/journey.ts</span> failed to express maximum gratitude to <span className="text-amber-300">{teacherName}</span>.
                </p>
              </div>

              <div className="rounded-xl bg-cyan-950/40 p-4 border border-cyan-500/30 text-cyan-200">
                <p className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-1">
                  Proposed Solution:
                </p>
                <p className="text-sm font-semibold flex items-center gap-2">
                  Say THANK YOU ❤️ and deploy unlimited appreciation!
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={triggerAppreciationFix}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 px-5 py-3 font-sans font-bold text-white shadow-lg shadow-rose-500/25 hover:opacity-95 active:scale-98 transition-all"
                >
                  <Heart className="h-4 w-4 fill-white" />
                  <span>Fix Bug: Say THANK YOU ❤️</span>
                </button>
                <button
                  onClick={onClose}
                  className="rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 font-sans font-medium text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  Close Console
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
