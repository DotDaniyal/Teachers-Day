import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Brain, Search, BookOpen, Compass, Flame, Sparkles, Users, Heart, Shield } from 'lucide-react';
import { SUPERPOWERS } from '../data/initialData';
import { sounds } from '../utils/audio';

const iconMap: Record<string, React.ElementType> = {
  Brain,
  Search,
  BookOpen,
  Compass,
  Flame,
  Sparkles,
  Users,
  Heart,
};

export const TeacherSuperpowers: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-3 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20">
          <Shield className="h-3.5 w-3.5" />
          <span>Faculty Skillset</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight mb-4">
          Teacher Superpowers
        </h2>
        <p className="text-base sm:text-lg text-slate-300">
          The superpowers that make learning web development feel like an adventure instead of a struggle.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {SUPERPOWERS.map((power, idx) => {
          const Icon = iconMap[power.icon] || Sparkles;
          const isHovered = hoveredIdx === idx;

          return (
            <motion.div
              key={power.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06, duration: 0.4 }}
              onMouseEnter={() => {
                setHoveredIdx(idx);
                sounds.playClick();
              }}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`relative rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 bg-slate-900/60 backdrop-blur-xl group cursor-pointer ${
                isHovered
                  ? `${power.borderColor} bg-gradient-to-br ${power.color} shadow-lg shadow-cyan-500/10 -translate-y-1.5`
                  : 'border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-mono text-cyan-300/80 font-semibold px-2 py-0.5 rounded bg-slate-950/40 border border-slate-800">
                    {power.metric}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-display text-white mb-2 group-hover:text-cyan-200 transition-colors">
                  {power.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {power.tagline}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-300">
                <span>Power 0{idx + 1}</span>
                <span className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Active
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
