import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Brain, Code, Search, Palette, Rocket, Lightbulb, Heart, Sparkles, Terminal } from 'lucide-react';
import { BENTO_LEARNINGS } from '../data/initialData';
import { sounds } from '../utils/audio';

const iconMap: Record<string, React.ElementType> = {
  Brain,
  Code,
  Search,
  Palette,
  Rocket,
  Lightbulb,
  Heart,
};

export const WhatYouTaughtUs: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="what-you-taught-us" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-3 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Core Foundations</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight mb-4">
          What You Taught Us
        </h2>
        <p className="text-base sm:text-lg text-slate-300">
          More than algorithms and syntax rules—you gave us the mindset to architect solutions and create without fear.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {BENTO_LEARNINGS.map((item, idx) => {
          const Icon = iconMap[item.icon] || Code;
          const isHovered = hoveredIdx === idx;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              onMouseEnter={() => {
                setHoveredIdx(idx);
                sounds.playClick();
              }}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`${item.colSpan} relative rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between overflow-hidden group transition-all duration-300 ${
                isHovered
                  ? 'border-cyan-500/40 shadow-[0_15px_35px_-10px_rgba(56,189,248,0.2)] -translate-y-1'
                  : 'hover:border-slate-700'
              }`}
            >
              {/* Radial gradient spotlight inside card */}
              <div
                className={`absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl transition-opacity duration-300 pointer-events-none ${
                  isHovered ? 'opacity-40 bg-cyan-500' : 'opacity-10 bg-indigo-500'
                }`}
              />

              <div>
                {/* Header row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-display text-white">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-300 font-medium">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              {/* Code Snippet at bottom */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 font-mono text-xs text-cyan-300 flex items-center gap-2 overflow-x-auto">
                <Terminal className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{item.codeSnippet}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
