import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Terminal, FastForward } from 'lucide-react';
import { Teacher } from '../types';
import { sounds } from '../utils/audio';

interface CinematicIntroProps {
  isOpen: boolean;
  currentTeacher: Teacher;
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({
  isOpen,
  currentTeacher,
  onComplete,
}) => {
  const [stage, setStage] = useState<'quote' | 'greeting' | 'terminal'>('quote');
  const [terminalLines, setTerminalLines] = useState<number>(0);

  const bootLogs = [
    'booting gratitude...',
    'loading classroom_memories...',
    'compiling knowledge & wisdom...',
    `initializing tribute_for("${currentTeacher.name}")...`,
    'ready ✓',
  ];

  // Reset and run sequence whenever isOpen becomes true
  useEffect(() => {
    if (!isOpen) return;
    setStage('quote');
    setTerminalLines(0);

    const toGreetingTimer = setTimeout(() => {
      setStage('greeting');
    }, 2200);

    const toTerminalTimer = setTimeout(() => {
      setStage('terminal');
    }, 4300);

    return () => {
      clearTimeout(toGreetingTimer);
      clearTimeout(toTerminalTimer);
    };
  }, [isOpen]);

  // Run terminal lines when stage === 'terminal'
  useEffect(() => {
    if (!isOpen || stage !== 'terminal') return;

    const interval = setInterval(() => {
      setTerminalLines((prev) => {
        if (prev < bootLogs.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 450);
          return prev;
        }
      });
    }, 240);

    return () => clearInterval(interval);
  }, [isOpen, stage, bootLogs.length, onComplete]);

  const handleSkip = () => {
    sounds.playClick();
    onComplete();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="cinematic-intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, filter: 'blur(10px)' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 px-4 text-center overflow-hidden select-none"
        >
          {/* Subtle Ambient Radial Light Movement */}
          <motion.div
            animate={{
              scale: [1, 1.18, 1],
              opacity: [0.25, 0.45, 0.25],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] rounded-full bg-gradient-to-tr from-cyan-500/25 via-indigo-500/20 to-rose-500/15 blur-[120px]"
          />

          {/* Subtle Floating Light Particles */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[...Array(14)].map((_, i) => (
              <motion.span
                key={i}
                initial={{
                  opacity: 0.15,
                  x: `${(i * 19) % 100}vw`,
                  y: `${(i * 29) % 100}vh`,
                }}
                animate={{
                  y: [`${(i * 29) % 100}vh`, `${((i * 29) % 100) - 12}vh`],
                  opacity: [0.15, 0.6, 0.15],
                }}
                transition={{
                  duration: 3.5 + (i % 3),
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#38bdf8]"
              />
            ))}
          </div>

          {/* Top-Right Skip Intro Button */}
          <div className="absolute top-6 right-6 z-20">
            <button
              type="button"
              onClick={handleSkip}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-700/80 bg-slate-900/80 px-4 py-2 text-xs font-mono font-medium text-slate-300 hover:border-cyan-400 hover:text-white transition-all backdrop-blur-md cursor-pointer"
            >
              <span>Skip Intro</span>
              <FastForward className="h-3.5 w-3.5 text-cyan-400" />
            </button>
          </div>

          {/* Center Sequence Container */}
          <div className="relative z-10 max-w-3xl w-full flex flex-col items-center justify-center min-h-[260px]">
            <AnimatePresence mode="wait">
              {stage === 'quote' && (
                <motion.div
                  key="stage-quote"
                  initial={{ opacity: 0, y: 20, filter: 'blur(10px)', scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                  exit={{ opacity: 0, y: -18, filter: 'blur(8px)', scale: 1.02 }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center px-4"
                >
                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-mono text-cyan-300 mb-6">
                    <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
                    <span>A Digital Tribute</span>
                  </div>
                  <p className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-snug text-balance">
                    &ldquo;Every dream begins with someone who believes in us.&rdquo;
                  </p>
                </motion.div>
              )}

              {stage === 'greeting' && (
                <motion.div
                  key="stage-greeting"
                  initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center px-4"
                >
                  <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-cyan-400 font-semibold mb-3">
                    Celebrating Mentorship &amp; Wisdom
                  </span>
                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-indigo-300 tracking-tight mb-4 flex items-center justify-center gap-3 flex-wrap">
                    <span>Happy Teachers&apos; Day</span>
                    <Heart className="h-9 w-9 sm:h-12 sm:w-12 fill-rose-500 text-rose-500 animate-pulse inline-block" />
                  </h1>
                  <p className="text-base sm:text-xl font-medium text-slate-300">
                    Honoring <strong className="text-cyan-300">{currentTeacher.name}</strong> ·{' '}
                    <span className="font-mono text-sm text-slate-400">{currentTeacher.subject}</span>
                  </p>
                </motion.div>
              )}

              {stage === 'terminal' && (
                <motion.div
                  key="stage-terminal"
                  initial={{ opacity: 0, y: 15, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-md mx-auto"
                >
                  <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/90 p-5 font-mono text-xs text-left shadow-[0_0_50px_rgba(56,189,248,0.15)] backdrop-blur-xl">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400">
                      <div className="flex items-center gap-2">
                        <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                        <span>tribute_engine_v2026.sh</span>
                      </div>
                      <div className="flex gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                    </div>
                    <div className="space-y-2 min-h-[120px]">
                      {bootLogs.slice(0, terminalLines).map((log, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center gap-2 ${
                            idx === bootLogs.length - 1
                              ? 'text-emerald-400 font-bold'
                              : 'text-cyan-300'
                          }`}
                        >
                          <span className="text-slate-500">&gt;</span>
                          <span>{log}</span>
                        </div>
                      ))}
                      {terminalLines < bootLogs.length && (
                        <div className="flex items-center gap-2 text-slate-400">
                          <span className="text-slate-500">&gt;</span>
                          <span className="inline-block h-3.5 w-2 bg-cyan-400 animate-pulse" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Progress Dots & Bottom Skip Button */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20">
            <div className="flex items-center gap-2">
              {(['quote', 'greeting', 'terminal'] as const).map((s) => (
                <span
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    stage === s ? 'w-6 bg-cyan-400' : 'w-1.5 bg-slate-700'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleSkip}
              className="text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Click anywhere or press Skip Intro to enter immediately →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
