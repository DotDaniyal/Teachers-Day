import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Lightbulb,
  GraduationCap,
  PenTool,
  Monitor,
  Notebook,
  Compass,
  Sparkles,
} from 'lucide-react';
import { Teacher } from '../types';
import { sounds } from '../utils/audio';

interface InteractiveClassroomProps {
  currentTeacher: Teacher;
}

export const InteractiveClassroom: React.FC<InteractiveClassroomProps> = ({ currentTeacher }) => {
  const [selectedArtifact, setSelectedArtifact] = useState(0);

  const artifacts = [
    {
      id: 'blackboard',
      name: 'The Interactive Board',
      subtitle: 'Where complex logic became crystal clear',
      icon: Monitor,
      formula: 'f(Curiosity) + Mentorship = Mastery',
      story: `Every diagram drawn by ${currentTeacher.name} turned abstract ${currentTeacher.subject} concepts into visual intuition we could immediately build with.`,
      accent: 'text-cyan-400',
      border: 'border-cyan-500/40',
    },
    {
      id: 'lightbulb',
      name: 'The "Aha!" Lightbulb',
      subtitle: 'Sparking breakthroughs when we felt stuck',
      icon: Lightbulb,
      formula: 'while (confused) { askQuestion(); illuminate(); }',
      story: 'Instead of just handing us the answer, you asked the exact question that made the lightbulb click inside our own minds.',
      accent: 'text-amber-400',
      border: 'border-amber-500/40',
    },
    {
      id: 'notebook',
      name: 'The Architecture Notebook',
      subtitle: 'Pages of foundational notes & wisdom',
      icon: Notebook,
      formula: 'Chapter 01: Think Before You Code',
      story: 'Our notebooks are filled not just with syntax and formulas, but with timeless advice on how to approach unfamiliar problems fearlessly.',
      accent: 'text-indigo-400',
      border: 'border-indigo-500/40',
    },
    {
      id: 'books',
      name: 'The Library of Fundamentals',
      subtitle: 'Deep roots that outlast every framework',
      icon: BookOpen,
      formula: 'Fundamentals > Fleeting Trends',
      story: 'Tools and frameworks evolve every year, but the core engineering and analytical principles you taught us will last our entire careers.',
      accent: 'text-emerald-400',
      border: 'border-emerald-500/40',
    },
    {
      id: 'pencil',
      name: 'The Precision Pencil',
      subtitle: 'Sketching ideas and iterating without fear',
      icon: PenTool,
      formula: 'Draft -> Critique -> Refine -> Ship',
      story: 'You taught us that first drafts and mistakes are natural steps in the creative process—every great system starts as a rough sketch.',
      accent: 'text-rose-400',
      border: 'border-rose-500/40',
    },
    {
      id: 'graduation',
      name: 'The Graduation Cap',
      subtitle: 'Stepping into the world as creators',
      icon: GraduationCap,
      formula: 'status: "Ready to Shape the Future"',
      story: `Because of your dedication in ${currentTeacher.subject}, we leave the classroom not merely as students, but as builders and innovators.`,
      accent: 'text-purple-400',
      border: 'border-purple-500/40',
    },
  ];

  const active = artifacts[selectedArtifact];
  const ActiveIcon = active.icon;

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="flex items-center justify-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-3">
          <Compass className="h-3.5 w-3.5" />
          <span>Interactive Classroom Studio</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight text-balance mb-4">
          More Than a Classroom—A Launchpad for Dreams
        </h2>
        <p className="text-base sm:text-lg text-slate-300">
          Explore the everyday instruments of learning that transformed our curiosity into lifelong capability.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* Left Interactive Artifact Grid (Desk, Books, Notebook, Pencil, Lightbulb, Cap) */}
        <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3.5">
          {artifacts.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = selectedArtifact === idx;
            return (
              <motion.button
                key={item.id}
                type="button"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06, duration: 0.4 }}
                onClick={() => {
                  sounds.playClick();
                  setSelectedArtifact(idx);
                }}
                className={`text-left p-4 rounded-2xl border transition-all flex flex-col justify-between group cursor-pointer ${
                  isSelected
                    ? `${item.border} bg-slate-900 shadow-lg shadow-cyan-500/10 -translate-y-0.5`
                    : 'border-slate-800/80 bg-slate-900/50 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 ${item.accent} group-hover:scale-110 transition-transform`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">0{idx + 1}</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold font-display text-white mb-0.5">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Right Interactive Blackboard / Studio Desk View */}
        <div className="lg:col-span-7 flex">
          <div className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 p-6 sm:p-10 shadow-2xl backdrop-blur-xl flex flex-col justify-between relative overflow-hidden">
            {/* Subtle architectural blackboard grid */}
            <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                  Classroom Artifact Inspector • {currentTeacher.subject}
                </span>
              </div>
              <span className="text-xs font-mono text-cyan-400">
                ∑ · Δ · λ · ∞
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="relative z-10 my-auto space-y-5"
              >
                <div className="inline-flex items-center gap-3">
                  <div className={`p-3.5 rounded-2xl bg-slate-900 border border-slate-800 ${active.accent}`}>
                    <ActiveIcon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                      {active.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400">
                      {active.subtitle}
                    </p>
                  </div>
                </div>

                {/* Chalkboard Formula Banner */}
                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 font-mono text-xs sm:text-sm text-cyan-300">
                  {active.formula}
                </div>

                <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
                  "{active.story}"
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Desk Surface Bar */}
            <div className="relative z-10 mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Click any classroom element on the left to inspect its memory</span>
              <span className="font-mono text-cyan-400 font-semibold">
                {selectedArtifact + 1} / {artifacts.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
