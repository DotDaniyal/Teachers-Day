import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Camera,
  Upload,
  PlusCircle,
  Trash2,
  Image as ImageIcon,
  RotateCcw,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { MemoryPolaroid, Teacher } from '../types';
import { sounds } from '../utils/audio';
import { processImageFile } from '../utils/imageUpload';

interface MemoryGalleryProps {
  polaroids: MemoryPolaroid[];
  currentTeacher: Teacher;
  onAddPolaroid: (polaroid: Omit<MemoryPolaroid, 'id'>) => void;
  onUpdatePolaroidPhoto: (id: string, imageUrl: string) => void;
  onRemovePolaroid: (id: string) => void;
  onResetPolaroids: () => void;
}

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({
  polaroids,
  currentTeacher,
  onAddPolaroid,
  onUpdatePolaroidPhoto,
  onRemovePolaroid,
  onResetPolaroids,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [dateLabel, setDateLabel] = useState('Class of 2026');
  const [teacherName, setTeacherName] = useState(currentTeacher.name);
  const [newPhoto, setNewPhoto] = useState<string | undefined>(undefined);
  const [activeFilter, setActiveFilter] = useState<'all' | 'photos' | 'placeholders'>('all');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const newPhotoInputRef = useRef<HTMLInputElement | null>(null);
  const cardFileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleNewFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      sounds.playClick();
      const dataUrl = await processImageFile(file, 650);
      setNewPhoto(dataUrl);
    } catch {
      // ignore
    }
  };

  const handleCardPhotoChange = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      sounds.playChime();
      const dataUrl = await processImageFile(file, 650);
      onUpdatePolaroidPhoto(id, dataUrl);
    } catch {
      // ignore
    }
  };

  const handleCreatePolaroid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    sounds.playChime();
    onAddPolaroid({
      title: title.trim(),
      caption:
        caption.trim() ||
        `A special classroom memory with ${teacherName.trim() || currentTeacher.name}.`,
      dateLabel: dateLabel.trim() || '2026',
      teacherName: teacherName.trim() || currentTeacher.name,
      imageUrl: newPhoto,
      placeholderTheme: 'from-cyan-500/20 via-indigo-500/15 to-slate-900',
      rotation: (Math.random() - 0.5) * 4,
    });
    setTitle('');
    setCaption('');
    setNewPhoto(undefined);
    setShowAddForm(false);
  };

  const filteredPolaroids = polaroids.filter((item) => {
    if (activeFilter === 'photos') return Boolean(item.imageUrl);
    if (activeFilter === 'placeholders') return !item.imageUrl;
    return true;
  });

  const activeLightboxItem =
    lightboxIdx !== null && filteredPolaroids[lightboxIdx]
      ? filteredPolaroids[lightboxIdx]
      : null;

  return (
    <section id="memories" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-3">
            <Camera className="h-3.5 w-3.5" />
            <span>Polaroid Memory Gallery &amp; Lightbox</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight text-balance mb-3">
            Snapshots From Our Journey
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Click any snapshot to view it in fullscreen Lightbox mode, or upload your own classroom memories with {currentTeacher.name}.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              onResetPolaroids();
            }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:border-slate-700 hover:text-white transition-colors cursor-pointer"
            title="Restore default gallery snapshots"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              setShowAddForm(!showAddForm);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all cursor-pointer"
          >
            <PlusCircle className="h-4 w-4" />
            <span>{showAddForm ? 'Close Form' : 'Add Memory Polaroid'}</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
        {(
          [
            { id: 'all', label: `All Snapshots (${polaroids.length})` },
            { id: 'photos', label: 'Captured Photos' },
            { id: 'placeholders', label: 'Open Frames' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              sounds.playClick();
              setActiveFilter(tab.id);
              setLightboxIdx(null);
            }}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeFilter === tab.id
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Add Polaroid Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-12 overflow-hidden"
          >
            <form
              onSubmit={handleCreatePolaroid}
              className="rounded-2xl border border-cyan-500/30 bg-slate-900/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-4 max-w-2xl mx-auto"
            >
              <h3 className="text-lg font-bold font-display text-white">
                Create a Memory Polaroid
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1">
                    Memory Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. First AI Model Deployment"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1">
                    Optional Teacher Name
                  </label>
                  <input
                    type="text"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    placeholder="e.g. Sir Zuhaib"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1">
                    Optional Date
                  </label>
                  <input
                    type="text"
                    value={dateLabel}
                    onChange={(e) => setDateLabel(e.target.value)}
                    placeholder="e.g. Autumn 2026"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1">
                  Caption
                </label>
                <textarea
                  rows={2}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Describe this classroom moment..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <input
                    ref={newPhotoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleNewFileChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => newPhotoInputRef.current?.click()}
                    className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-950/40 px-4 py-2 text-xs font-semibold text-cyan-200 hover:bg-cyan-900/50 transition-colors cursor-pointer"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    <span>{newPhoto ? 'Change Uploaded Photo' : 'Upload Optional Photo'}</span>
                  </button>
                  {newPhoto && (
                    <img
                      src={newPhoto}
                      alt="Preview"
                      className="h-9 w-9 rounded-lg object-cover border border-cyan-400"
                    />
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:opacity-95 cursor-pointer"
                >
                  Save Polaroid
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
        {filteredPolaroids.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24, rotate: item.rotation }}
            whileInView={{ opacity: 1, y: 0, rotate: item.rotation }}
            whileHover={{ rotate: 0, y: -8, scale: 1.02 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.07, duration: 0.45 }}
            className="group relative rounded-2xl border border-slate-800 bg-slate-900/90 p-3.5 pb-5 shadow-2xl backdrop-blur-xl flex flex-col justify-between transition-shadow hover:shadow-[0_20px_40px_-15px_rgba(56,189,248,0.2)]"
          >
            <div>
              {/* Polaroid Image Slot */}
              <div
                onClick={() => {
                  sounds.playClick();
                  setLightboxIdx(idx);
                }}
                className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80 mb-4 cursor-pointer"
              >
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div
                    className={`h-full w-full bg-gradient-to-br ${
                      item.placeholderTheme || 'from-cyan-500/20 via-indigo-500/15 to-slate-900'
                    } flex flex-col items-center justify-center p-4 text-center`}
                  >
                    <ImageIcon className="h-8 w-8 text-cyan-400/60 mb-2" />
                    <span className="text-xs font-mono font-semibold text-slate-200">
                      Memory Photo Placeholder
                    </span>
                    <span className="text-[11px] text-slate-400 mt-0.5">
                      Click to inspect or upload a photo
                    </span>
                  </div>
                )}

                {/* Lightbox Expand Icon */}
                <span
                  className="absolute top-2.5 left-2.5 rounded-lg bg-slate-950/75 p-1.5 text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity border border-slate-700/70"
                  title="Open in Fullscreen Lightbox"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                </span>

                {/* Upload / Replace Photo Overlay Button */}
                <input
                  ref={(el) => {
                    cardFileInputRefs.current[item.id] = el;
                  }}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleCardPhotoChange(item.id, e)}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    cardFileInputRefs.current[item.id]?.click();
                  }}
                  className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 rounded-lg bg-slate-950/85 border border-cyan-500/40 px-2.5 py-1 text-[11px] font-medium text-cyan-200 hover:bg-cyan-950 hover:text-white transition-all backdrop-blur-md cursor-pointer"
                  title="Upload photo for this Polaroid"
                >
                  <Camera className="h-3 w-3 text-cyan-400" />
                  <span>{item.imageUrl ? 'Change Photo' : 'Add Photo'}</span>
                </button>
              </div>

              {/* Polaroid Caption Area */}
              <div className="px-1">
                <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 mb-1">
                  <span className="truncate">
                    {item.teacherName ? `${item.teacherName} · ` : ''}
                    {item.dateLabel}
                  </span>
                  {polaroids.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        sounds.playClick();
                        onRemovePolaroid(item.id);
                      }}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-0.5 cursor-pointer"
                      title="Remove Polaroid"
                      aria-label={`Remove ${item.title}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
                <h3 className="text-base font-bold font-display text-white mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxItem && lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
            onClick={() => setLightboxIdx(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Memory Lightbox"
          >
            <motion.div
              initial={{ scale: 0.94, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-7 shadow-2xl"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setLightboxIdx(null)}
                className="absolute top-4 right-4 z-10 rounded-full bg-slate-950/80 border border-slate-700 p-2 text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Image or Placeholder */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 mb-5 flex items-center justify-center">
                {activeLightboxItem.imageUrl ? (
                  <img
                    src={activeLightboxItem.imageUrl}
                    alt={activeLightboxItem.title}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="text-center p-8">
                    <ImageIcon className="h-12 w-12 text-cyan-400/50 mx-auto mb-3" />
                    <p className="text-base font-bold text-white mb-1">
                      {activeLightboxItem.title}
                    </p>
                    <p className="text-xs text-slate-400 mb-4">
                      Upload a classroom photo to customize this Polaroid frame.
                    </p>
                    <button
                      type="button"
                      onClick={() => cardFileInputRefs.current[activeLightboxItem.id]?.click()}
                      className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400 cursor-pointer"
                    >
                      <Camera className="h-4 w-4" />
                      <span>Upload Photo Now</span>
                    </button>
                  </div>
                )}

                {/* Prev / Next Navigation Buttons */}
                {filteredPolaroids.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        sounds.playClick();
                        setLightboxIdx(
                          (lightboxIdx - 1 + filteredPolaroids.length) % filteredPolaroids.length
                        );
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-950/80 border border-slate-700 p-2 text-white hover:border-cyan-400 transition-colors cursor-pointer"
                      aria-label="Previous Memory"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        sounds.playClick();
                        setLightboxIdx((lightboxIdx + 1) % filteredPolaroids.length);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-950/80 border border-slate-700 p-2 text-white hover:border-cyan-400 transition-colors cursor-pointer"
                      aria-label="Next Memory"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Caption Details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-mono text-cyan-400">
                    {activeLightboxItem.teacherName
                      ? `${activeLightboxItem.teacherName} · `
                      : ''}
                    {activeLightboxItem.dateLabel}
                  </span>
                  <h3 className="text-xl font-bold font-display text-white mt-0.5">
                    {activeLightboxItem.title}
                  </h3>
                  <p className="text-sm text-slate-300 mt-1">
                    {activeLightboxItem.caption}
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-400 shrink-0">
                  {lightboxIdx + 1} / {filteredPolaroids.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
