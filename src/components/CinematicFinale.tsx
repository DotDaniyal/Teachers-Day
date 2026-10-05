import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Terminal, Code2 } from 'lucide-react';
import { Teacher } from '../types';

interface CinematicFinaleProps {
  currentTeacher: Teacher;
}

export const CinematicFinale: React.FC<CinematicFinaleProps> = ({ currentTeacher }) => {
  const lines = [
    'Every website we build...',
    'Every problem we solve...',
    'Every project we create...',
    'Every line of code we write...',
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center py-28 px-4 sm:px-6 lg:px-8 text-center overflow-hidden bg-gradient-to-b from-transparent via-slate-950/80 to-black">
      {/* Background ambient stars / dots */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-cyan-500/10 via-rose-500/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center space-y-10">
        {/* Progressive lines */}
        <div className="space-y-4 sm:space-y-6">
          {lines.map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.25, duration: 0.6 }}
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
          transition={{ delay: 1.1, duration: 0.8 }}
          className="pt-6"
        >
          <p className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-indigo-200 max-w-3xl leading-snug">
            Carries a little bit of what you taught us.
          </p>
        </motion.div>

        {/* Grand Final Dedication */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="pt-10 flex flex-col items-center"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-amber-300 animate-pulse" />
            <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase font-bold">
              FOREVER GRATEFUL
            </span>
            <Sparkles className="h-5 w-5 text-amber-300 animate-pulse" />
          </div>

          <h3 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display text-white tracking-tight flex items-center gap-3">
            HAPPY TEACHERS' DAY
            <Heart className="h-9 w-9 sm:h-12 sm:w-12 fill-rose-500 text-rose-500 animate-pulse" />
          </h3>

          <p className="mt-4 text-xl sm:text-3xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-rose-400">
            Thank you, {currentTeacher.name}.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
