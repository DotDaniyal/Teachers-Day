import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Network, Sparkles, UserCheck, Code2, Globe, Heart } from 'lucide-react';
import { Teacher } from '../types';
import { sounds } from '../utils/audio';

interface TeacherImpactNetworkProps {
  currentTeacher: Teacher;
}

export const TeacherImpactNetwork: React.FC<TeacherImpactNetworkProps> = ({ currentTeacher }) => {
  const [activeNode, setActiveNode] = useState<string | null>('Frontend Engineers');

  const nodes = [
    {
      id: 'Frontend Engineers',
      role: 'Frontend Engineers',
      count: '180+ Alumni',
      desc: 'Building modern interfaces, reactive applications, and accessible design systems.',
      color: '#38bdf8',
      x: 180,
      y: 100,
    },
    {
      id: 'Full-Stack Developers',
      role: 'Full-Stack Developers',
      count: '140+ Alumni',
      desc: 'Architecting scalable APIs, cloud databases, and high-performance server logic.',
      color: '#818cf8',
      x: 620,
      y: 90,
    },
    {
      id: 'UI/UX Architects',
      role: 'UI/UX Architects',
      count: '95+ Alumni',
      desc: 'Crafting intuitive user journeys, motion prototypes, and human-centric design.',
      color: '#f43f5e',
      x: 130,
      y: 320,
    },
    {
      id: 'Tech Startup Founders',
      role: 'Tech Founders',
      count: '25+ Startups',
      desc: 'Transforming ideas seeded during class hackathons into venture-backed companies.',
      color: '#fbbf24',
      x: 670,
      y: 310,
    },
    {
      id: 'Open-Source Creators',
      role: 'Open-Source Creators',
      count: '500+ Repos',
      desc: 'Contributing back to global dev libraries, frameworks, and developer tooling.',
      color: '#34d399',
      x: 400,
      y: 370,
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-3 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20">
          <Network className="h-3.5 w-3.5" />
          <span>Ripple Effect of Mentorship</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight mb-4">
          Teacher Impact Network
        </h2>
        <p className="text-base sm:text-lg text-slate-300">
          One classroom, infinite trajectories. Explore the constellation of creators empowered by {currentTeacher.name}.
        </p>
      </div>

      {/* Network Canvas & Interactive Container */}
      <div className="relative rounded-3xl border border-slate-800 bg-slate-950/80 p-6 sm:p-10 shadow-2xl backdrop-blur-xl max-w-5xl mx-auto overflow-hidden">
        {/* Ambient Grid Glow */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

        {/* SVG Network Lines */}
        <div className="relative w-full h-[400px] sm:h-[440px] flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 440">
            {/* Center coordinates 400, 210 */}
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
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden border-2 border-slate-950 bg-slate-900">
                <img
                  src={currentTeacher.photo}
                  alt={currentTeacher.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="mt-2 text-center">
              <span className="font-bold text-sm sm:text-base text-white block">
                {currentTeacher.name}
              </span>
              <span className="text-[11px] font-mono text-cyan-400 font-semibold">
                Central Node (Mentor)
              </span>
            </div>
          </div>

          {/* Connected Outer Nodes */}
          {nodes.map((node) => {
            const isSelected = activeNode === node.id;
            // Percent position from 800x440 viewBox
            const leftPct = (node.x / 800) * 100;
            const topPct = (node.y / 440) * 100;

            return (
              <motion.button
                key={node.id}
                onClick={() => {
                  sounds.playClick();
                  setActiveNode(node.id);
                }}
                onMouseEnter={() => {
                  sounds.playClick();
                  setActiveNode(node.id);
                }}
                style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center p-3 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-cyan-400 bg-slate-900 shadow-[0_0_25px_rgba(56,189,248,0.35)] scale-110'
                    : 'border-slate-800 bg-slate-950/90 hover:border-slate-700 opacity-80 hover:opacity-100'
                }`}
              >
                <div
                  className="h-3 w-3 rounded-full mb-1"
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
        {activeNode && (
          <div className="mt-6 p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-cyan-400">
                  {nodes.find((n) => n.id === activeNode)?.count}
                </span>
                <span className="text-slate-600">·</span>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  {activeNode}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                {nodes.find((n) => n.id === activeNode)?.desc}
              </p>
            </div>
            <span className="text-xs font-mono text-slate-300 shrink-0">
              Direct Mentorship Impact ✓
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
