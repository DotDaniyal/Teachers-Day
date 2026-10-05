import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Code, Layers, Zap, Cpu, Compass, ShieldCheck, Sparkles, Heart } from 'lucide-react';
import { sounds } from '../utils/audio';

export const BehindEveryDev: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    { name: 'HTML', desc: 'The structural skeleton of the web', icon: Code, color: 'from-orange-500/20 to-amber-500/5', border: 'border-orange-500/30', text: 'text-orange-400' },
    { name: 'CSS', desc: 'Styling, layout & visual poetry', icon: Layers, color: 'from-blue-500/20 to-sky-500/5', border: 'border-blue-500/30', text: 'text-blue-400' },
    { name: 'JavaScript', desc: 'Dynamic logic & asynchronous flow', icon: Zap, color: 'from-yellow-500/20 to-amber-500/5', border: 'border-yellow-500/30', text: 'text-yellow-400' },
    { name: 'React', desc: 'Components, state & reactive ecosystems', icon: Cpu, color: 'from-cyan-500/20 to-blue-500/5', border: 'border-cyan-500/30', text: 'text-cyan-400' },
    { name: 'Problem Solving', desc: 'Deconstructing errors & debugging calmly', icon: Compass, color: 'from-indigo-500/20 to-purple-500/5', border: 'border-indigo-500/30', text: 'text-indigo-400' },
    { name: 'Confidence', desc: 'Believing in our capacity to ship software', icon: ShieldCheck, color: 'from-emerald-500/20 to-teal-500/5', border: 'border-emerald-500/30', text: 'text-emerald-400' },
    { name: 'Creativity', desc: 'Building products that change human lives', icon: Sparkles, color: 'from-rose-500/20 to-pink-500/5', border: 'border-rose-500/30', text: 'text-rose-400' },
  ];

  return (
    <section id="journey" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-3 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20">
          <span>The Developer Journey</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight text-balance mb-4">
          Behind Every Developer Is a Teacher.
        </h2>
        <p className="text-base sm:text-lg text-slate-300">
          We didn't just learn syntax; we evolved from confused beginners into confident builders through every step of this journey.
        </p>
      </div>

      {/* Step Progression Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3 mb-12">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isHovered = activeStep === idx;
          return (
            <motion.div
              key={step.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              onMouseEnter={() => {
                setActiveStep(idx);
                sounds.playClick();
              }}
              onMouseLeave={() => setActiveStep(null)}
              className={`relative rounded-2xl border p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 bg-slate-900/60 backdrop-blur-md cursor-pointer ${
                isHovered
                  ? `${step.border} bg-gradient-to-b ${step.color} shadow-lg shadow-cyan-500/10 scale-105 z-10`
                  : 'border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-slate-300">0{idx + 1}</span>
                  <div className={`p-2 rounded-xl bg-slate-950/60 border border-slate-800 ${step.text}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <h3 className={`text-base font-bold font-display text-white mb-1.5 ${step.text}`}>
                  {step.name}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:flex justify-end pt-3 text-slate-400">
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Culmination Statement */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-cyan-950/30 to-slate-900 p-8 text-center max-w-3xl mx-auto shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <p className="relative z-10 text-xl sm:text-2xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-indigo-200 mb-2">
          "And behind all of it... a teacher who believed in us."
        </p>
        <p className="relative z-10 text-sm text-slate-300 max-w-xl mx-auto">
          When errors felt overwhelming and test cases failed, your steady guidance turned confusion into mastery.
        </p>
      </motion.div>
    </section>
  );
};
