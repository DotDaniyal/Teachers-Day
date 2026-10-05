import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Quote, Sparkles, Code2, X, Camera } from 'lucide-react';
import { Teacher } from '../types';
import { sounds } from '../utils/audio';
import { processImageFile } from '../utils/imageUpload';

interface TeacherSpotlightProps {
  teachers: Teacher[];
  currentTeacher: Teacher;
  onSelectTeacher: (teacher: Teacher) => void;
  onRemoveTeacher?: (teacherId: string) => void;
  onUpdateTeacher?: (updated: Teacher) => void;
}

export const TeacherSpotlight: React.FC<TeacherSpotlightProps> = ({
  teachers,
  currentTeacher,
  onSelectTeacher,
  onRemoveTeacher,
  onUpdateTeacher,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onUpdateTeacher) return;
    try {
      sounds.playChime();
      const dataUrl = await processImageFile(file);
      onUpdateTeacher({ ...currentTeacher, photo: dataUrl });
    } catch {
      // ignore
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section id="teacher" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-3 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Faculty Spotlight</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight mb-4">
          Meet the Mentors Shaping the Web
        </h2>
        <p className="text-base sm:text-lg text-slate-300">
          More than instructors—architects of our thinking, cheerleaders of our milestones, and beacons in our confusion.
        </p>
      </div>

      {/* Multi-Teacher Tabs Navigation */}
      {teachers.length > 1 && (
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-12 flex-wrap">
          {teachers.map((t, idx) => {
            const isSelected = t.id === currentTeacher.id;
            return (
              <div
                key={t.id}
                className={`group relative flex items-center rounded-xl border text-sm font-medium transition-all ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/50 text-white shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    onSelectTeacher(t);
                  }}
                  className="flex items-center gap-3 pl-4 pr-3 py-2.5"
                >
                  <span className="font-mono text-xs text-cyan-400 font-bold">
                    0{idx + 1}
                  </span>
                  <span className="font-semibold">{t.name}</span>
                </button>
                {onRemoveTeacher && teachers.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      sounds.playClick();
                      onRemoveTeacher(t.id);
                    }}
                    className="pr-3 pl-1 py-2.5 text-slate-500 hover:text-rose-400 transition-colors"
                    title={`Remove ${t.name}`}
                    aria-label={`Remove ${t.name}`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
                {isSelected && (
                  <motion.div
                    layoutId="activeTeacherTab"
                    className="absolute inset-0 rounded-xl border border-cyan-400 pointer-events-none"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Featured Spotlight 3D Card */}
      <div
        className="max-w-5xl mx-auto perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePos({ x: 0, y: 0 });
        }}
      >
        <motion.div
          animate={{
            rotateY: isHovered ? mousePos.x * 10 : 0,
            rotateX: isHovered ? -mousePos.y * 10 : 0,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          className="relative rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/90 via-slate-950/95 to-slate-900/90 p-6 sm:p-10 shadow-2xl backdrop-blur-xl overflow-hidden"
        >
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Teacher Portrait */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group w-64 sm:w-72 aspect-square">
                {/* Glowing border ring */}
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-rose-500 opacity-60 blur-md group-hover:opacity-90 transition-opacity duration-300" />
                <div className="relative h-full w-full rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-900">
                  <img
                    src={currentTeacher.photo}
                    alt={currentTeacher.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Resilient fallback
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Direct Change Picture Button */}
                  {onUpdateTeacher && (
                    <>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-xl bg-slate-950/85 border border-cyan-500/40 px-3 py-1.5 text-xs font-medium text-cyan-200 hover:bg-cyan-950 hover:text-white hover:border-cyan-400 transition-all backdrop-blur-md shadow-lg"
                        title="Upload or change teacher picture"
                      >
                        <Camera className="h-3.5 w-3.5 text-cyan-400" />
                        <span>Add / Change Picture</span>
                      </button>
                    </>
                  )}
                  
                  <div className="absolute bottom-3 left-3 right-3 text-center">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 backdrop-blur-sm">
                      {currentTeacher.specialty}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content & Details */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider mb-2">
                  <Code2 className="h-4 w-4" />
                  <span>{currentTeacher.subject}</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight mb-4">
                  {currentTeacher.name}
                </h3>

                {/* Main Message Quote */}
                <div className="relative rounded-2xl bg-slate-950/60 border border-slate-800 p-5 mb-6">
                  <Quote className="h-6 w-6 text-cyan-400/40 mb-2" />
                  <p className="text-base sm:text-lg font-medium text-slate-200 italic leading-relaxed">
                    "{currentTeacher.quote}"
                  </p>
                  <p className="mt-3 text-sm text-slate-400">
                    — {currentTeacher.message}
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
                {currentTeacher.stats.map((st, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 text-center">
                    <div className="text-lg sm:text-xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300">
                      {st.value}
                    </div>
                    <div className="text-xs text-slate-300 mt-0.5 truncate">{st.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
