import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Teacher } from '../types';
import { sounds } from '../utils/audio';

interface CinematicFinaleProps {
  currentTeacher: Teacher;
}

export const CinematicFinale: React.FC<CinematicFinaleProps> = ({ currentTeacher }) => {
  const [surpriseRevealed, setSurpriseRevealed] = useState(false);

  const lines = [
    'Every website we build...',
    'Every problem we solve...',
    'Every project we create...',
    'Every line of code we write...',
  ];

  const handleRevealSurprise = () => {
    sounds.playChime();
    setSurpriseRevealed(true);
    confetti({
      particleCount: 90,
      spread: 85,
      origin: { y: 0.65 },
      colors: ['#38bdf8', '#818cf8', '#f43f5e', '#fbbf24'],
    });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center py-28 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
      {/* Background ambient light rays */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-cyan-500/15 via-rose-500/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center space-y-10">
        {/* Progressive lines */}
        <div className="space-y-4 sm:space-y-5">
          {lines.map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.2, duration: 0.55 }}
              className="text-xl sm:text-3xl md:text-4xl font-display font-medium text-slate-400"
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Climax Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.85, duration: 0.7 }}
          className="pt-4"
        >
          <p className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-display text-white max-w-3xl leading-snug text-balance">
            Carries a little bit of what you taught us.
          </p>
        </motion.div>

        {/* Final Surprise Section ("One more thing...") */}
        <div className="pt-8 w-full flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!surpriseRevealed ? (
              <motion.div
                key="one-more-thing"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true }}
                className="flex flex-col items-center space-y-4"
              >
                <p className="text-sm font-mono uppercase tracking-widest text-cyan-400">
                  Before you go...
                </p>
                <button
                  type="button"
                  onClick={handleRevealSurprise}
                  className="group relative inline-flex items-center gap-3 rounded-2xl border border-cyan-500/40 bg-slate-900/90 px-8 py-4 font-display font-bold text-lg sm:text-xl text-white shadow-[0_0_30px_rgba(56,189,248,0.2)] hover:border-cyan-400 hover:shadow-[0_0_45px_rgba(56,189,248,0.35)] transition-all cursor-pointer"
                >
                  <Sparkles className="h-5 w-5 text-amber-300 group-hover:rotate-12 transition-transform" />
                  <span>One more thing...</span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="final-surprise-revealed"
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-3xl border border-cyan-500/30 bg-slate-900/80 p-8 sm:p-12 backdrop-blur-xl shadow-[0_0_60px_rgba(56,189,248,0.2)] max-w-3xl w-full overflow-hidden"
              >
                {/* Radiant Light Rays Effect */}
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-b from-cyan-400/25 via-indigo-500/15 to-transparent blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-5 w-5 text-amber-400 animate-pulse" />
                    <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase font-bold">
                      FOREVER GRATEFUL
                    </span>
                    <Sparkles className="h-5 w-5 text-amber-400 animate-pulse" />
                  </div>

                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-display text-white tracking-tight mb-4">
                    Thank You, Teachers.
                  </h2>

                  <p className="text-lg sm:text-2xl font-medium text-slate-200 max-w-xl leading-relaxed mb-6">
                    "You don&apos;t just teach lessons.
                    <br />
                    You help shape futures."
                  </p>

                  <div className="pt-6 border-t border-slate-800/80 w-full flex flex-col items-center">
                    <div className="text-xl sm:text-3xl font-extrabold font-display text-white flex items-center gap-2.5">
                      <span>HAPPY TEACHERS&apos; DAY</span>
                      <Heart className="h-7 w-7 fill-rose-500 text-rose-500 animate-pulse" />
                    </div>
                    <p className="mt-2 text-lg sm:text-2xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-rose-400">
                      Thank you, {currentTeacher.name}.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
