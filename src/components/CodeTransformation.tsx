import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Sparkles, ArrowRight, CheckCircle2, RefreshCw, Cpu, Layers } from 'lucide-react';
import { sounds } from '../utils/audio';

export const CodeTransformation: React.FC = () => {
  const [stage, setStage] = useState<number>(0);

  const stages = [
    {
      label: 'CODE',
      title: 'Raw Lines & Syntax',
      desc: 'Beginning with simple tags and confusing compiler warnings.',
      code: `const student = {
  curiosity: true,
  mistakes: true,
  dreams: "unlimited"
};

function startLearning() {
  console.log("Hello World");
}`,
      accent: 'cyan',
    },
    {
      label: 'KNOWLEDGE',
      title: 'Mental Models & Architecture',
      desc: 'Understanding asynchronous loops, data structures, and state management.',
      code: `interface DeveloperMindset {
  principles: "Deep Understanding";
  architecture: "Scalable";
  mentorship: "Everlasting";
}

const mastery = learnWithGuidance();`,
      accent: 'blue',
    },
    {
      label: 'SKILLS',
      title: 'Production Engineering',
      desc: 'Writing maintainable, accessible, and high-performance software.',
      code: `export async function buildRealWorldProduct() {
  const system = await deployEngine({
    resilience: 1.0,
    accessibility: "WCAG_AAA",
    passion: true
  });
  return system;
}`,
      accent: 'indigo',
    },
    {
      label: 'CONFIDENCE',
      title: 'Resilience Against Errors',
      desc: 'Facing mysterious production bugs with a calm, methodical smile.',
      code: `try {
  shipFearlessly();
} catch (hardProblem) {
  // Remember teacher's advice:
  isolateVariables();
  solveWithGrace();
}`,
      accent: 'purple',
    },
    {
      label: 'FUTURE',
      title: 'Infinite Possibilities',
      desc: 'Empowered to build companies, open-source revolutions, and impactful careers.',
      code: `const myFuture = {
  createdWith: "Teacher's Inspiration ❤️",
  impact: Infinity,
  status: "Ready to change the world"
};`,
      accent: 'rose',
    },
  ];

  const handleNextStage = () => {
    sounds.playClick();
    setStage((prev) => (prev + 1) % stages.length);
  };

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-rose-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-3 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20">
          <Cpu className="h-3.5 w-3.5" />
          <span>The Alchemy of Mentorship</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight mb-4">
          Code → Knowledge → Future
        </h2>
        <p className="text-base sm:text-lg text-slate-300">
          Watch how simple keystrokes transform into lifelong careers under the right mentor.
        </p>
      </div>

      {/* Stage Flow Stepper */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-10 overflow-x-auto pb-2">
        {stages.map((stg, i) => {
          const isActive = stage === i;
          return (
            <button
              key={stg.label}
              onClick={() => {
                sounds.playClick();
                setStage(i);
              }}
              className={`px-4 py-2 rounded-xl font-mono text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-[0_0_20px_rgba(56,189,248,0.3)] scale-105'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <span>{stg.label}</span>
              {isActive && <Sparkles className="h-3.5 w-3.5" />}
            </button>
          );
        })}
      </div>

      {/* Interactive Code Transformation Frame */}
      <div className="max-w-4xl mx-auto rounded-2xl border border-cyan-500/30 bg-slate-950/90 shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Editor Window Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-xs font-mono text-slate-400">
              src/evolution/{stages[stage].label.toLowerCase()}.ts
            </span>
          </div>
          <button
            onClick={handleNextStage}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-medium px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30 transition-colors"
          >
            <span>Next Stage</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        {/* Code Content Area */}
        <div className="p-6 sm:p-8">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Stage 0{stage + 1}
              </span>
              <span className="text-slate-600">·</span>
              <h3 className="text-lg font-bold font-display text-white">
                {stages[stage].title}
              </h3>
            </div>
            <p className="text-sm text-slate-400">{stages[stage].desc}</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.pre
              key={stage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-xs sm:text-sm text-cyan-200 overflow-x-auto leading-relaxed shadow-inner"
            >
              <code>{stages[stage].code}</code>
            </motion.pre>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
