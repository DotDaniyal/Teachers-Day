import React from 'react';
import { motion } from 'motion/react';
import { Code, Terminal, Cpu, Zap, Brain, Shield, Sparkles, ChevronRight } from 'lucide-react';
import { sounds } from '../utils/audio';

export const BehindEveryDev: React.FC = () => {
  const storyChapters = [
    {
      num: '01',
      title: 'A Teacher Is More Than A Teacher',
      desc: 'Behind every confident developer, scientist, and creator is a mentor who saw their potential long before they saw it in themselves.',
    },
    {
      num: '02',
      title: 'They Give Us Knowledge',
      desc: 'Transforming intimidating syntax, algorithms, and AI models into clear building blocks we can understand and wield.',
    },
    {
      num: '03',
      title: 'They Give Us Confidence',
      desc: 'Teaching us that red console errors and broken builds are not failures—they are stepping stones to mastery.',
    },
    {
      num: '04',
      title: 'They Inspire Our Dreams',
      desc: 'Encouraging us to look beyond textbook exercises and dare to build applications that solve real human problems.',
    },
    {
      num: '05',
      title: 'They Shape Our Future',
      desc: 'Every project we ship, every career milestone we reach, carries the permanent fingerprint of your mentorship.',
    },
    {
      num: '06',
      title: 'Thank You',
      desc: 'For every patient explanation, every extra minute after class, and every moment you believed in our growth.',
    },
  ];

  const steps = [
    {
      name: 'HTML',
      label: 'Structure & Foundations',
      desc: 'Where you taught us how the web is built from the ground up.',
      icon: Code,
      color: 'from-orange-500 to-amber-500',
      border: 'border-orange-500/30',
    },
    {
      name: 'CSS',
      label: 'Style & Visual Craft',
      desc: 'Turning plain documents into expressive, responsive interfaces.',
      icon: Sparkles,
      color: 'from-cyan-500 to-blue-500',
      border: 'border-cyan-500/30',
    },
    {
      name: 'JavaScript',
      label: 'Logic & Interactivity',
      desc: 'Breathing life, state, and dynamic behavior into our creations.',
      icon: Terminal,
      color: 'from-yellow-400 to-amber-500',
      border: 'border-yellow-500/30',
    },
    {
      name: 'React & AI',
      label: 'Modern Intelligent Systems',
      desc: 'Thinking in components, state flows, and intelligent AI workflows.',
      icon: Cpu,
      color: 'from-sky-400 to-indigo-500',
      border: 'border-sky-500/30',
    },
    {
      name: 'Problem Solving',
      label: 'Algorithmic Mindset',
      desc: 'Breaking down impossible challenges into clear, solvable steps.',
      icon: Brain,
      color: 'from-purple-500 to-indigo-500',
      border: 'border-purple-500/30',
    },
    {
      name: 'Confidence',
      label: 'Overcoming Self-Doubt',
      desc: 'Believing we can debug any error and master any new technology.',
      icon: Shield,
      color: 'from-emerald-400 to-teal-500',
      border: 'border-emerald-500/30',
    },
    {
      name: 'Creativity',
      label: 'Building the Future',
      desc: 'Transforming from students following tutorials into independent creators.',
      icon: Zap,
      color: 'from-rose-500 to-pink-500',
      border: 'border-rose-500/30',
    },
  ];

  return (
    <section id="journey" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-3"
        >
          <span>THE VISUAL STORY</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight text-balance mb-6"
        >
          Behind Every Developer Is a Teacher
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 leading-relaxed"
        >
          We didn&apos;t just learn syntax and tags. Through your patience and mentorship, we evolved step by step from writing our first <code className="text-cyan-300 font-mono">&lt;h1&gt;Hello World&lt;/h1&gt;</code> to architecting real-world solutions.
        </motion.p>
      </div>

      {/* 6 Story Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
        {storyChapters.map((ch, idx) => (
          <motion.div
            key={ch.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: idx * 0.06, duration: 0.45 }}
            className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl hover:border-cyan-500/30 transition-all"
          >
            <div className="text-xs font-mono font-bold text-cyan-400 mb-2">
              {ch.num} — STORY CHAPTER
            </div>
            <h3 className="text-lg font-bold font-display text-white mb-2">
              {ch.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {ch.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Progressive Evolution Timeline */}
      <div className="relative">
        {/* Connecting line on desktop */}
        <div className="hidden lg:block absolute top-1/2 left-6 right-6 h-0.5 bg-gradient-to-r from-cyan-500/20 via-indigo-500/40 to-rose-500/30 -translate-y-1/2 pointer-events-none" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 relative z-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.07, duration: 0.45 }}
                onMouseEnter={() => sounds.playClick()}
                className={`group relative rounded-2xl border ${step.border} bg-slate-900/80 p-5 backdrop-blur-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-xl`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} text-slate-950 shadow-md group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="h-5 w-5 stroke-[2.2]" />
                    </div>
                    <span className="font-mono text-xs text-slate-400 font-semibold">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-display text-white mb-1 group-hover:text-cyan-300 transition-colors">
                    {step.name}
                  </h3>
                  <p className="text-xs font-mono text-cyan-400/90 mb-2">
                    {step.label}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-end text-slate-400 group-hover:text-cyan-400 transition-colors lg:hidden">
                    <span className="text-[10px] font-mono mr-1">next stage</span>
                    <ChevronRight className="h-3 w-3" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
