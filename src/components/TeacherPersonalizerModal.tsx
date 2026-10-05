import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, User, BookOpen, Check, X, Upload } from 'lucide-react';
import { Teacher } from '../types';
import { sounds } from '../utils/audio';
import { processImageFile } from '../utils/imageUpload';

interface TeacherPersonalizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, subject: string, photo?: string, studentName?: string) => void;
  teachers: Teacher[];
  currentTeacher: Teacher;
  onSelectTeacher: (teacher: Teacher) => void;
  defaultStudentName?: string;
}

export const TeacherPersonalizerModal: React.FC<TeacherPersonalizerModalProps> = ({
  isOpen,
  onClose,
  onSave,
  teachers,
  currentTeacher,
  onSelectTeacher,
  defaultStudentName = 'Your Grateful Students',
}) => {
  const [name, setName] = useState(currentTeacher.name);
  const [subject, setSubject] = useState(currentTeacher.subject);
  const [photo, setPhoto] = useState(currentTeacher.photo);
  const [studentName, setStudentName] = useState(defaultStudentName);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setName(currentTeacher.name);
    setSubject(currentTeacher.subject);
    setPhoto(currentTeacher.photo);
  }, [currentTeacher]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      sounds.playClick();
      const dataUrl = await processImageFile(file);
      setPhoto(dataUrl);
    } catch {
      // ignore
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      sounds.playChime();
      onSave(
        name.trim(),
        subject.trim() || 'Web Development & AI',
        photo,
        studentName.trim() || 'Your Grateful Students'
      );
      onClose();
    }
  };

  const handleSelectExisting = (t: Teacher) => {
    sounds.playClick();
    onSelectTeacher(t);
    setName(t.name);
    setSubject(t.subject);
    setPhoto(t.photo);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="w-full max-w-lg rounded-2xl border border-cyan-500/30 bg-slate-900/95 p-6 md:p-8 shadow-[0_0_60px_rgba(56,189,248,0.2)] text-left relative overflow-hidden"
          >
            {/* Ambient background glow */}
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 h-48 w-48 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />

            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-2">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Personalize Your Experience</span>
                </div>
                <h2 className="text-2xl font-bold font-display text-white tracking-tight">
                  Who are we celebrating today?
                </h2>
                <p className="text-sm text-slate-300 mt-1">
                  Customize the dedication so the entire experience honors your specific teacher.
                </p>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick preset selector */}
            <div className="mb-6">
              <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-2.5">
                Quick Select or Switch Teacher:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {teachers.map((t) => {
                  const isSelected = t.id === currentTeacher.id || t.name === name;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleSelectExisting(t)}
                      className={`relative flex flex-col items-center p-2.5 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                          : 'border-slate-800 bg-slate-800/40 text-slate-300 hover:border-slate-700 hover:bg-slate-800'
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-slate-950">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </span>
                      )}
                      <img
                        src={t.photo}
                        alt={t.name}
                        className="h-10 w-10 rounded-full object-cover border border-slate-700 mb-1.5"
                      />
                      <span className="text-xs font-semibold truncate w-full">{t.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Picture Upload Row */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1.5">
                  Teacher Picture
                </label>
                <div className="flex items-center gap-3.5 rounded-xl border border-slate-800 bg-slate-950/60 p-2.5">
                  <img
                    src={photo}
                    alt={name}
                    className="h-12 w-12 rounded-xl object-cover border border-cyan-500/40 shrink-0"
                  />
                  <div className="flex-1">
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
                      className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-950/40 py-2 px-3 text-xs font-semibold text-cyan-200 hover:bg-cyan-900/50 hover:border-cyan-400 transition-all"
                    >
                      <Upload className="h-3.5 w-3.5" />
                      <span>Upload Teacher Picture</span>
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1.5">
                  Teacher Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Sir Ahmed, Prof. Sarah"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/80 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1.5">
                  Optional Subject
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g., Artificial Intelligence, Web Development"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/80 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1.5">
                  Student Name / Batch
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g., Daniyal & Batch of 2026"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/80 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
                  />
                </div>
              </div>

              {/* Dynamic Preview Banner */}
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-3.5 text-center space-y-1">
                <p className="text-sm font-bold font-display text-white">
                  Happy Teachers' Day, {name || 'Teacher'} ❤️
                </p>
                <p className="text-xs text-cyan-300">
                  "Thank you for inspiring us through {subject || 'your guidance'}."
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-rose-500 py-3 px-6 font-semibold text-white shadow-lg shadow-cyan-500/25 hover:opacity-95 active:scale-98 transition-all"
                >
                  <Heart className="h-4 w-4 fill-white" />
                  <span>Create Tribute ❤️</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
