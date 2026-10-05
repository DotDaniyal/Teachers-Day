import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Network, BookOpen, ShieldCheck, Compass, Rocket, UserCheck } from 'lucide-react';
import { Teacher } from '../types';
import { sounds } from '../utils/audio';

interface TeacherImpactNetworkProps {
  currentTeacher: Teacher;
}

export const TeacherImpactNetwork: React.FC<TeacherImpactNetworkProps> = ({ currentTeacher }) => {
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);
  const [activeNode, setActiveNode] = useState<string>('AI & ML Engineers');

  const impactPipeline = [
    {
      stage: 'TEACHER',
      subtitle: currentTeacher.name,
      desc: `Igniting the spark through ${currentTeacher.subject} with patience, wisdom, and unwavering belief.`,
      icon: UserCheck,
      color: 'from-cyan-500 to-blue-500',
    },
    {
      stage: 'KNOWLEDGE',
      subtitle: 'Deep Understanding',
      desc: 'Turning confusing syntax, algorithms, and models into clear mental frameworks.',
      icon: BookOpen,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      stage: 'CONFIDENCE',
      subtitle: 'Fearless Problem Solving',
      desc: 'Overcoming imposter syndrome and approaching complex engineering challenges with calm resolve.',
      icon: ShieldCheck,
      color: 'from-indigo-500 to-purple-500',
    },
    {
      stage: 'DREAMS',
      subtitle: 'Ambitious Vision',
      desc: 'Daring to imagine products, startups, and intelligent systems that make a difference.',
      icon: Compass,
      color: 'from-purple-500 to-rose-500',
    },
    {
      stage: 'FUTURE',
      subtitle: 'Lifelong Impact',
      desc: 'Carrying your lessons into every line of code we write and every breakthrough we ship.',
      icon: Rocket,
      color: 'from-rose-500 to-amber-500',
    },
  ];

  const nodes = [
    {
      id: 'AI & ML Engineers',
      role: 'AI & ML Engineers',
      count: '180+ Alumni',
      desc: 'Building intelligent systems, neural architectures, and modern AI applications.',
      color: '#38bdf8',
      x: 200,
      y: 95,
    },
    {
      id: 'Full-Stack Developers',
      role: 'Full-Stack Developers',
      count: '140+ Alumni',
      desc: 'Architecting scalable APIs, cloud databases, and high-performance server logic.',
      color: '#818cf8',
      x: 600,
      y: 95,
    },
    {
      id: 'UI/UX Architects',
      role: 'UI/UX Architects',
      count: '95+ Alumni',
      desc: 'Crafting intuitive user journeys, motion prototypes, and human-centric design.',
      color: '#f43f5e',
      x: 185,
      y: 315,
    },
    {
      id: 'Tech Startup Founders',
      role: 'Tech Founders',
      count: '25+ Startups',
      desc: 'Transforming ideas seeded during class hackathons into venture-backed companies.',
      color: '#fbbf24',
      x: 615,
      y: 315,
    },
    {
      id: 'Open-Source Creators',
      role: 'Open-Source Creators',
      count: '500+ Repos',
      desc: 'Contributing back to global dev libraries, frameworks, and developer tooling.',
      color: '#34d399',
      x: 400,
      y: 375,
    },
  ];

  const selectedNodeObj = nodes.find((n) => n.id === activeNode) || nodes[0];

  return (
    <section id="impact" className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
        <div className="flex items-center justify-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-3">
          <Network className="h-3.5 w-3.5" />
          <span>The Ripple Effect of Mentorship</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight text-balance mb-4">
          The Impact of a Teacher
        </h2>
        <p className="text-sm sm:text-lg text-slate-300">
          Trace the luminous path from {currentTeacher.name}&apos;s guidance to the future we build.
        </p>
      </div>

      {/* Part 1: Animated Glowing Path (TEACHER -> KNOWLEDGE -> CONFIDENCE -> DREAMS -> FUTURE) */}
      <div className="max-w-4xl mx-auto mb-16 sm:mb-20 relative">
        {/* Vertical Glowing Line with Animated Traveling Particles */}
        <div className="absolute left-5 sm:left-1/2 top-6 bottom-6 w-0.5 -translate-x-1/2 bg-slate-800 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
            className="w-full h-1/3 bg-gradient-to-b from-transparent via-cyan-400 to-rose-400"
          />
        </div>

        <div className="space-y-5 sm:space-y-6 relative z-10">
          {impactPipeline.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = activeStageIdx === idx;
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={item.stage}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.45 }}
                onClick={() => {
                  sounds.playClick();
                  setActiveStageIdx(idx);
                }}
                className={`relative flex items-center gap-4 sm:gap-6 cursor-pointer ${
                  isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Card Side */}
                <div className={`flex-1 pl-12 sm:pl-0 ${isEven ? 'sm:text-right' : 'sm:text-left'}`}>
                  <div
                    className={`inline-block w-full sm:max-w-md rounded-2xl border p-4 sm:p-5 text-left transition-all ${
                      isSelected
                        ? 'border-cyan-400 bg-slate-900/95 shadow-[0_0_25px_rgba(56,189,248,0.2)]'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-1 mb-1.5">
                      <span className="text-xs font-mono font-bold tracking-wider text-cyan-400">
                        0{idx + 1} · {item.stage}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{item.subtitle}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Center Glowing Node on Path */}
                <div className="absolute left-5 sm:static sm:left-auto -translate-x-1/2 sm:translate-x-0 flex items-center justify-center shrink-0">
                  <div
                    className={`h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-gradient-to-tr ${item.color} p-0.5 shadow-[0_0_20px_rgba(56,189,248,0.35)] transition-transform ${
                      isSelected ? 'scale-110' : 'scale-100'
                    }`}
                  >
                    <div className="h-full w-full rounded-full bg-slate-950 flex items-center justify-center text-white">
                      <Icon className="h-4 w-4 text-cyan-300" />
                    </div>
                  </div>
                </div>

                {/* Spacer for opposite column on desktop */}
                <div className="hidden sm:block flex-1" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Part 2: Interactive Alumni Constellation (Responsive Mobile + Desktop) */}
      <div className="relative rounded-3xl border border-slate-800 bg-slate-950/80 p-5 sm:p-10 shadow-2xl backdrop-blur-xl max-w-5xl mx-auto overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

        <div className="relative z-10 text-center mb-6">
          <h3 className="text-lg sm:text-xl font-bold font-display text-white">
            Interactive Mentorship Constellation
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Tap or hover any node to inspect how {currentTeacher.name}&apos;s lessons branch out across careers
          </p>
        </div>

        {/* MOBILE & SMALL SCREEN LAYOUT (< 768px): Clean Connected Hub + Grid */}
        <div className="md:hidden relative z-10 flex flex-col items-center mb-6">
          {/* Center Teacher Hub */}
          <div className="flex flex-col items-center">
            <div className="p-1 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-rose-500 shadow-[0_0_25px_rgba(56,189,248,0.35)]">
              <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-slate-950 bg-slate-900">
                <img
                  src={currentTeacher.photo}
                  alt={currentTeacher.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <span className="font-bold text-sm text-white mt-2">{currentTeacher.name}</span>
            <span className="text-[11px] font-mono text-cyan-400 font-semibold">
              {currentTeacher.subject}
            </span>
          </div>

          {/* Glowing Vertical Connector Stem */}
          <div className="w-0.5 h-6 bg-gradient-to-b from-cyan-400 to-indigo-500 my-2" />

          {/* Responsive Grid of Alumni Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
            {nodes.map((node) => {
              const isSelected = activeNode === node.id;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    setActiveNode(node.id);
                  }}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-cyan-400 bg-slate-900 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="h-3 w-3 rounded-full shrink-0"
                      style={{ backgroundColor: node.color }}
                    />
                    <span className="text-xs font-bold text-white truncate">
                      {node.role}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-300 shrink-0 ml-2">
                    {node.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* DESKTOP & TABLET RADIAL SVG CONSTELLATION (md: and up) */}
        <div className="hidden md:flex relative w-full h-[420px] items-center justify-center">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 440">
            {nodes.map((node) => {
              const isActive = activeNode === node.id;
              return (
                <g key={node.id}>
                  <line
                    x1="400"
                    y1="210"
                    x2={node.x}
                    y2={node.y}
                    stroke={isActive ? node.color : '#334155'}
                    strokeWidth={isActive ? '2.5' : '1.5'}
                    strokeDasharray={isActive ? 'none' : '4,4'}
                    className="transition-all duration-300"
                  />
                  {isActive && (
                    <circle r="4" fill={node.color}>
                      <animateMotion
                        path={`M400,210 L${node.x},${node.y}`}
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Center Teacher Node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <div className="relative group p-1 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-rose-500 shadow-[0_0_35px_rgba(56,189,248,0.4)]">
              <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-slate-950 bg-slate-900">
                <img
                  src={currentTeacher.photo}
                  alt={currentTeacher.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="mt-2 text-center">
              <span className="font-bold text-base text-white block">
                {currentTeacher.name}
              </span>
              <span className="text-[11px] font-mono text-cyan-400 font-semibold">
                {currentTeacher.subject}
              </span>
            </div>
          </div>

          {/* Connected Outer Nodes */}
          {nodes.map((node) => {
            const isSelected = activeNode === node.id;
            const leftPct = (node.x / 800) * 100;
            const topPct = (node.y / 440) * 100;

            return (
              <motion.button
                key={node.id}
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setActiveNode(node.id);
                }}
                onMouseEnter={() => {
                  setActiveNode(node.id);
                }}
                style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center p-3 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-cyan-400 bg-slate-900 shadow-[0_0_25px_rgba(56,189,248,0.35)] scale-105'
                    : 'border-slate-800 bg-slate-950/90 hover:border-slate-700 opacity-85 hover:opacity-100'
                }`}
              >
                <div
                  className="h-2.5 w-2.5 rounded-full mb-1"
                  style={{ backgroundColor: node.color }}
                />
                <span className="text-xs font-bold text-white whitespace-nowrap">
                  {node.role}
                </span>
                <span className="text-[10px] font-mono text-cyan-300 whitespace-nowrap">
                  {node.count}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Node Details Box */}
        <div className="relative z-10 mt-2 sm:mt-4 p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-cyan-400">
                {selectedNodeObj.count}
              </span>
              <span className="text-slate-600">·</span>
              <h4 className="text-sm sm:text-base font-bold text-white">
                {selectedNodeObj.role}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              {selectedNodeObj.desc}
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 sm:text-slate-300 shrink-0">
            Direct Mentorship Impact ✓
          </span>
        </div>
      </div>
    </section>
  );
};
