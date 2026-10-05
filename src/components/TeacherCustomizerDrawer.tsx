import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sliders, User, BookOpen, Sparkles, Volume2, VolumeX, Plus, Check, Trash2, RotateCcw, Upload, Camera, Image as ImageIcon, Sun, Moon } from 'lucide-react';
import { Teacher, CustomizationSettings } from '../types';
import { sounds } from '../utils/audio';
import { processImageFile } from '../utils/imageUpload';

const PRESET_PHOTOS = [
  { label: 'Sir Zuhaib', url: '/src/assets/images/teacher_portrait_zuhaib_1791170048296.jpg' },
  { label: 'Portrait 1', url: '/src/assets/images/teacher_portrait_ahmed_1791166057857.jpg' },
  { label: 'Portrait 2', url: '/src/assets/images/teacher_portrait_sarah_1791166076570.jpg' },
  { label: 'Portrait 3', url: '/src/assets/images/teacher_portrait_chen_1791166090446.jpg' },
];

interface TeacherCustomizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  teachers: Teacher[];
  currentTeacher: Teacher;
  onUpdateTeacher: (updated: Teacher) => void;
  onAddNewTeacher: (newTeacher: Teacher) => void;
  onRemoveTeacher: (teacherId: string) => void;
  onResetTeachers: () => void;
  settings: CustomizationSettings;
  onUpdateSettings: (settings: CustomizationSettings) => void;
}

export const TeacherCustomizerDrawer: React.FC<TeacherCustomizerDrawerProps> = ({
  isOpen,
  onClose,
  teachers,
  currentTeacher,
  onUpdateTeacher,
  onAddNewTeacher,
  onRemoveTeacher,
  onResetTeachers,
  settings,
  onUpdateSettings,
}) => {
  const [formData, setFormData] = useState<Teacher>(currentTeacher);
  const [studentName, setStudentName] = useState(settings.studentName);
  const [customNote, setCustomNote] = useState(settings.customNote);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTeacherName, setNewTeacherName] = useState('');
  const [newTeacherSubject, setNewTeacherSubject] = useState('');
  const [newTeacherPhoto, setNewTeacherPhoto] = useState(PRESET_PHOTOS[0].url);

  const editFileInputRef = useRef<HTMLInputElement | null>(null);
  const newFileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setFormData(currentTeacher);
  }, [currentTeacher]);

  const handleEditPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      sounds.playClick();
      const dataUrl = await processImageFile(file);
      const updated = { ...formData, photo: dataUrl };
      setFormData(updated);
      onUpdateTeacher(updated);
    } catch {
      // ignore
    }
  };

  const handleNewPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      sounds.playClick();
      const dataUrl = await processImageFile(file);
      setNewTeacherPhoto(dataUrl);
    } catch {
      // ignore
    }
  };

  const handleSaveCurrent = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playChime();
    onUpdateTeacher(formData);
    onUpdateSettings({
      ...settings,
      studentName,
      customNote,
    });
    onClose();
  };

  const handleCreateNewTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacherName.trim()) return;
    sounds.playChime();
    const newT: Teacher = {
      id: `teacher-${Date.now()}`,
      name: newTeacherName.trim(),
      subject: newTeacherSubject.trim() || 'Web Development',
      photo: newTeacherPhoto || PRESET_PHOTOS[0].url,
      quote: 'Thank you for inspiring us to build the future with code and heart.',
      message: 'Every student carries the potential to build incredible things. Keep learning, keep pushing boundaries.',
      specialty: 'Web Development & Programming Mentorship',
      stats: [
        { label: 'Lines Reviewed', value: '50k+' },
        { label: 'Patience Level', value: '100%' },
        { label: 'Gratitude', value: 'Maximum' },
        { label: 'Impact', value: 'Infinite' },
      ],
    };
    onAddNewTeacher(newT);
    setFormData(newT);
    setIsAddingNew(false);
    setNewTeacherName('');
    setNewTeacherSubject('');
    setNewTeacherPhoto(PRESET_PHOTOS[0].url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md border-l border-slate-800 bg-slate-950 p-6 md:p-8 shadow-2xl flex flex-col justify-between overflow-y-auto"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Sliders className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      Tribute Configuration
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      config.teachers.json
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Theme, Sound, and Background Particles quick options */}
              <div className="mb-6 space-y-2.5">
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {settings.themeMode === 'light' ? (
                      <Sun className="h-4 w-4 text-amber-500" />
                    ) : (
                      <Moon className="h-4 w-4 text-cyan-400" />
                    )}
                    <span className="text-xs font-medium text-slate-300">
                      Theme Mode ({settings.themeMode === 'light' ? 'Light' : 'Dark'})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playClick();
                      onUpdateSettings({
                        ...settings,
                        themeMode: settings.themeMode === 'light' ? 'dark' : 'light',
                      });
                    }}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.themeMode !== 'light' ? 'bg-cyan-500' : 'bg-amber-500'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.themeMode !== 'light' ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {settings.soundEnabled ? (
                      <Volume2 className="h-4 w-4 text-cyan-400" />
                    ) : (
                      <VolumeX className="h-4 w-4 text-slate-400" />
                    )}
                    <span className="text-xs font-medium text-slate-300">
                      Micro-interaction Sounds
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      sounds.enabled = !settings.soundEnabled;
                      onUpdateSettings({
                        ...settings,
                        soundEnabled: !settings.soundEnabled,
                      });
                    }}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.soundEnabled ? 'bg-cyan-500' : 'bg-slate-800'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className={`h-4 w-4 ${settings.particlesEnabled !== false ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span className="text-xs font-medium text-slate-300">
                      Background Star Particles
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playClick();
                      onUpdateSettings({
                        ...settings,
                        particlesEnabled: settings.particlesEnabled === false ? true : false,
                      });
                    }}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.particlesEnabled !== false ? 'bg-cyan-500' : 'bg-slate-800'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.particlesEnabled !== false ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Active Teacher Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-slate-300">
                    Active Teacher Profile
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        sounds.playClick();
                        onResetTeachers();
                      }}
                      className="text-xs font-medium text-slate-400 hover:text-slate-200 inline-flex items-center gap-1"
                      title="Restore default teachers"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span>Reset</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingNew(!isAddingNew)}
                      className="text-xs font-medium text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1"
                    >
                      <Plus className="h-3 w-3" />
                      <span>{isAddingNew ? 'Cancel' : 'Add Teacher'}</span>
                    </button>
                  </div>
                </div>

                {isAddingNew ? (
                  <form onSubmit={handleCreateNewTeacher} className="p-3.5 rounded-xl border border-cyan-500/30 bg-cyan-950/20 space-y-3 mb-3">
                    <p className="text-xs text-cyan-300 font-medium">Add New Teacher to Config:</p>
                    
                    {/* New Teacher Photo Picker */}
                    <div className="flex items-center gap-3">
                      <img
                        src={newTeacherPhoto}
                        alt="New Teacher Preview"
                        className="h-12 w-12 rounded-xl object-cover border border-cyan-500/40 bg-slate-900 shrink-0"
                      />
                      <div className="flex-1 space-y-1.5">
                        <input
                          ref={newFileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleNewPhotoUpload}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => newFileInputRef.current?.click()}
                          className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950/50 px-2.5 py-1.5 text-xs font-medium text-cyan-200 hover:bg-cyan-900/50 transition-colors"
                        >
                          <Upload className="h-3.5 w-3.5" />
                          <span>Upload Picture</span>
                        </button>
                      </div>
                    </div>

                    <input
                      type="text"
                      required
                      placeholder="Teacher Name (e.g. Mr. David)"
                      value={newTeacherName}
                      onChange={(e) => setNewTeacherName(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                    />
                    <input
                      type="text"
                      placeholder="Subject (e.g. Frontend Engineering)"
                      value={newTeacherSubject}
                      onChange={(e) => setNewTeacherSubject(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                    />
                    <button
                      type="submit"
                      className="w-full py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-semibold text-xs hover:bg-cyan-400 transition-colors"
                    >
                      Save & Switch to Teacher
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {teachers.map((t) => {
                      const isActive = t.id === formData.id;
                      return (
                        <div
                          key={t.id}
                          className={`inline-flex items-center rounded-lg text-xs font-medium border transition-all ${
                            isActive
                              ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200'
                              : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              sounds.playClick();
                              setFormData(t);
                              onUpdateTeacher(t);
                            }}
                            className="inline-flex items-center gap-2 px-3 py-1.5"
                          >
                            <img
                              src={t.photo}
                              alt=""
                              className="h-4 w-4 rounded-full object-cover"
                            />
                            <span>{t.name}</span>
                            {isActive && <Check className="h-3 w-3 text-cyan-400" />}
                          </button>
                          {teachers.length > 1 && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                sounds.playClick();
                                onRemoveTeacher(t.id);
                              }}
                              className="pr-2.5 pl-1 py-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                              title={`Remove ${t.name}`}
                              aria-label={`Remove ${t.name}`}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Edit Details Form */}
              <form onSubmit={handleSaveCurrent} className="space-y-4">
                {/* Teacher Picture Upload & Presets */}
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 space-y-3">
                  <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Teacher Picture / Photo
                  </label>
                  <div className="flex items-center gap-3.5">
                    <div className="relative h-16 w-16 rounded-2xl overflow-hidden border border-cyan-500/40 bg-slate-950 shrink-0">
                      <img
                        src={formData.photo}
                        alt={formData.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        ref={editFileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleEditPhotoUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => editFileInputRef.current?.click()}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-950/50 px-3 py-2 text-xs font-semibold text-cyan-200 hover:bg-cyan-900/60 hover:border-cyan-400 transition-all"
                      >
                        <Upload className="h-3.5 w-3.5" />
                        <span>Upload Picture from Device</span>
                      </button>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-slate-400 mr-1">Presets:</span>
                        {PRESET_PHOTOS.map((preset, idx) => (
                          <button
                            key={preset.label}
                            type="button"
                            onClick={() => {
                              sounds.playClick();
                              const updated = { ...formData, photo: preset.url };
                              setFormData(updated);
                              onUpdateTeacher(updated);
                            }}
                            className={`h-6 w-6 rounded-full overflow-hidden border transition-transform ${
                              formData.photo === preset.url
                                ? 'border-cyan-400 scale-110 ring-1 ring-cyan-400'
                                : 'border-slate-700 opacity-70 hover:opacity-100'
                            }`}
                            title={`Use Preset ${idx + 1}`}
                          >
                            <img src={preset.url} alt={preset.label} className="h-full w-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={formData.photo.startsWith('data:') ? '' : formData.photo}
                      onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                      placeholder={formData.photo.startsWith('data:') ? 'Custom uploaded picture active (or paste URL)...' : 'Or paste image URL...'}
                      className="w-full rounded-lg border border-slate-800 bg-slate-950/90 py-1.5 pl-8 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">
                    Teacher Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/90 py-2.5 pl-9 pr-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">
                    Subject / Focus
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/90 py-2.5 pl-9 pr-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">
                    Your Name or Class Batch
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Daniyal & The Class of 2026"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/90 py-2.5 px-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">
                    Dedicated Teacher Message
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/90 p-3 text-sm text-white focus:border-cyan-400 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">
                    Custom Student Note (for 3D Card)
                  </label>
                  <textarea
                    rows={3}
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="Personal heartfelt message..."
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/90 p-3 text-sm text-white focus:border-cyan-400 focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col gap-2.5">
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 hover:opacity-95 active:scale-98 transition-all"
                  >
                    Apply & Save Settings
                  </button>
                  {teachers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        sounds.playClick();
                        onRemoveTeacher(formData.id);
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-950/20 py-2.5 text-xs font-semibold text-rose-300 hover:bg-rose-950/40 hover:border-rose-500/50 transition-all"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Remove {formData.name}</span>
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="pt-6 border-t border-slate-800/80 text-center">
              <p className="text-xs text-slate-400">
                All settings are stored safely in your browser LocalStorage.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
