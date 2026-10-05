import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, Bug, CheckCircle2, MessageSquare, Sparkles, Laugh } from 'lucide-react';
import { Teacher } from '../types';
import { sounds } from '../utils/audio';

interface DebuggingLifeProps {
  currentTeacher: Teacher;
}

export const DebuggingLife: React.FC<DebuggingLifeProps> = ({ currentTeacher }) => {
  const [selectedStory, setSelectedStory] = useState(0);

  const stories = [
    {
      title: 'The Legendary Line 27',
      dialogue: [
        { role: 'student', text: `"${currentTeacher.name}, my website isn't working at all."` },
        { role: 'teacher', text: '"Show me the code."' },
        { role: 'student', text: '"Here is the repository link."' },
        { role: 'teacher', text: '"Look at line 27."' },
        { role: 'student', text: '"...oh. It was an extra bracket."' },
        { role: 'teacher', text: '"🙂"' },
      ],
      lesson: 'You saved us 6 hours of crying in front of a blank screen in 3 seconds.',
    },
    {
      title: 'The Centering a Div Odyssey',
      dialogue: [
        { role: 'student', text: '"I added 4 margins, 3 floats, position: absolute, and z-index: 9999."' },
        { role: 'teacher', text: '"Have you tried display: flex; place-items: center?"' },
        { role: 'student', text: '"...it works instantly."' },
        { role: 'teacher', text: '"Clean code is simple code. Delete those 12 overrides."' },
      ],
      lesson: 'Teaching us simplicity before complexity.',
    },
    {
      title: 'The Infinite Loop Incident',
      dialogue: [
        { role: 'student', text: '"Why is my laptop fan sounding like a Boeing 747 taking off?"' },
        { role: 'teacher', text: '"Did you forget the counter increment inside your while loop?"' },
        { role: 'student', text: '"...tab crashed."' },
        { role: 'teacher', text: '"Classic rite of passage! Grab a coffee, let\'s fix the condition."' },
      ],
      lesson: 'Never shaming our mistakes, always turning them into laughter and learning.',
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-3 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20">
          <Bug className="h-3.5 w-3.5 text-amber-400" />
          <span>Classroom Chronicles</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight mb-4">
          "The Debugging Life" 😂
        </h2>
        <p className="text-base sm:text-lg text-slate-300">
          Every developer has been here. The funniest, warmest memories from our coding lab.
        </p>
      </div>

      {/* Story tabs */}
      <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
        {stories.map((s, idx) => (
          <button
            key={s.title}
            onClick={() => {
              sounds.playClick();
              setSelectedStory(idx);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              selectedStory === idx
                ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Terminal Conversation Box */}
      <div className="max-w-2xl mx-auto rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Terminal className="h-4 w-4 text-cyan-400" />
            <span>lab_chat_log.log</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono">
            <Laugh className="h-4 w-4" />
            <span>Relatable</span>
          </div>
        </div>

        {/* Chat bubbles */}
        <div className="space-y-3.5 mb-6">
          {stories[selectedStory].dialogue.map((item, i) => {
            const isTeacher = item.role === 'teacher';
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isTeacher ? 15 : -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex flex-col ${isTeacher ? 'items-end' : 'items-start'}`}
              >
                <span className="text-[10px] font-mono text-slate-300 uppercase mb-1 px-1">
                  {isTeacher ? currentTeacher.name : 'Student'}
                </span>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    isTeacher
                      ? 'bg-cyan-950/70 border border-cyan-500/30 text-cyan-200 rounded-tr-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  {item.text}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Punchline Card */}
        <div className="rounded-xl bg-amber-950/20 border border-amber-500/30 p-4 text-center">
          <p className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-1">
            Every Developer Has Been Here. 😂
          </p>
          <p className="text-sm text-amber-200/90 font-medium">
            {stories[selectedStory].lesson}
          </p>
        </div>
      </div>
    </section>
  );
};
