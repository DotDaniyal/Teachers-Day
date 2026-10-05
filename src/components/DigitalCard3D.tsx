import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Sparkles, Heart, Check, Lock, Unlock, X, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Teacher } from '../types';
import { sounds } from '../utils/audio';

interface DigitalCard3DProps {
  currentTeacher: Teacher;
  studentName: string;
  customNote: string;
}

export const DigitalCard3D: React.FC<DigitalCard3DProps> = ({
  currentTeacher,
  studentName,
  customNote,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOpen = () => {
    if (!isOpen) {
      sounds.playChime();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#38bdf8', '#818cf8', '#fb7185', '#fbbf24'],
      });
    } else {
      sounds.playClick();
    }
    setIsOpen(!isOpen);
  };

  const noteContent =
    customNote ||
    `When we first sat down in your web development class, code seemed like an impenetrable wall of symbols. You showed us that every website, every application, and every digital dream begins with understanding fundamentals and having the courage to try. Thank you for answering our endless questions, celebrating our breakthroughs, and helping us see what we are truly capable of achieving.`;

  return (
    <section id="card" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-3 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20">
          <Mail className="h-3.5 w-3.5" />
          <span>Interactive Envelope</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight mb-4">
          Digital Teachers' Day Card
        </h2>
        <p className="text-base sm:text-lg text-slate-300">
          An interactive commemorative card sealed with infinite gratitude from our class.
        </p>
      </div>

      {/* 3D Card Area */}
      <div className="max-w-xl mx-auto flex flex-col items-center">
        <motion.div
          layout
          className="w-full rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden"
        >
          {/* Ambient Lighting */}
          <div className="absolute -right-20 -top-20 w-60 h-60 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {!isOpen ? (
            /* Closed Card Front */
            <div className="text-center flex flex-col items-center py-6 space-y-6">
              {/* Wax Seal Icon */}
              <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 p-1 shadow-lg shadow-rose-500/30 flex items-center justify-center animate-pulse">
                <div className="h-full w-full rounded-full border border-rose-300/40 flex items-center justify-center bg-rose-950/40">
                  <Heart className="h-8 w-8 fill-white text-white" />
                </div>
              </div>

              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold tracking-widest uppercase block mb-1">
                  SEALED WITH GRATITUDE
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
                  HAPPY TEACHERS' DAY ❤️
                </h3>
                <p className="text-sm text-slate-400 mt-2">
                  Special Tribute Edition for <span className="text-cyan-300 font-semibold">{currentTeacher.name}</span>
                </p>
              </div>

              <button
                onClick={handleToggleOpen}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-rose-500 px-8 py-3.5 font-bold text-white shadow-lg shadow-cyan-500/25 hover:opacity-95 active:scale-98 transition-all"
              >
                <Unlock className="h-4 w-4" />
                <span>Open Card</span>
              </button>
            </div>
          ) : (
            /* Open Card Inside */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 text-left"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs font-mono text-rose-400 font-semibold">
                  TRIBUTE_LETTER_UNSEALED ✓
                </span>
                <span className="text-xs font-mono text-slate-300">
                  Teacher's Day 2026
                </span>
              </div>

              <div>
                <h4 className="text-2xl font-bold font-display text-white mb-4">
                  Dear {currentTeacher.name},
                </h4>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed space-y-4">
                  {noteContent}
                </p>
              </div>

              <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-4">
                <p className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300 italic">
                  "Thank you for helping us write the first lines of our future."
                </p>
                <div className="mt-3 text-right">
                  <span className="text-xs font-mono text-slate-300">
                    With endless respect and gratitude,
                  </span>
                  <p className="text-sm font-bold text-white">
                    {studentName || 'Your Grateful Web Dev Students'}
                  </p>
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  onClick={handleToggleOpen}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-6 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <Lock className="h-3.5 w-3.5" />
                  <span>Close Card</span>
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
