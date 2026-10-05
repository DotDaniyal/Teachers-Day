import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Heart,
  Send,
  PlusCircle,
  Check,
  Trash2,
  Edit3,
  RotateCcw,
  X,
} from 'lucide-react';
import { TributeMessage, Teacher } from '../types';
import { sounds } from '../utils/audio';

interface CommunityMemoriesWallProps {
  tributes: TributeMessage[];
  currentTeacher: Teacher;
  onAddTribute: (tribute: Omit<TributeMessage, 'id' | 'createdAt' | 'likes'>) => void;
  onEditTribute: (id: string, updated: { teacherName: string; authorName: string; message: string; category: TributeMessage['category'] }) => void;
  onLikeTribute: (id: string) => void;
  onRemoveTribute: (id: string) => void;
  onClearTributes: () => void;
  onRestoreDefaultTributes: () => void;
}

export const CommunityMemoriesWall: React.FC<CommunityMemoriesWallProps> = ({
  tributes,
  currentTeacher,
  onAddTribute,
  onEditTribute,
  onLikeTribute,
  onRemoveTribute,
  onClearTributes,
  onRestoreDefaultTributes,
}) => {
  const [filter, setFilter] = useState<'all' | 'gratitude' | 'memories' | 'lesson' | 'humor'>('all');
  const [teacherNameInput, setTeacherNameInput] = useState(currentTeacher.name);
  const [authorName, setAuthorName] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<'gratitude' | 'memories' | 'lesson' | 'humor'>('gratitude');
  const [showForm, setShowForm] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);

  // Inline Editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTeacherName, setEditTeacherName] = useState('');
  const [editAuthorName, setEditAuthorName] = useState('');
  const [editMessage, setEditMessage] = useState('');
  const [editCategory, setEditCategory] = useState<TributeMessage['category']>('gratitude');

  useEffect(() => {
    setTeacherNameInput(currentTeacher.name);
  }, [currentTeacher.name]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    sounds.playChime();
    onAddTribute({
      teacherId: currentTeacher.id,
      teacherName: teacherNameInput.trim() || currentTeacher.name,
      authorName: authorName.trim() || 'Grateful Student',
      message: message.trim(),
      category,
      avatarSeed: (authorName.trim() || 'S').charAt(0).toUpperCase(),
    });
    setMessage('');
    setJustSubmitted(true);
    setTimeout(() => {
      setJustSubmitted(false);
      setShowForm(false);
    }, 1200);
  };

  const startEditing = (tribute: TributeMessage) => {
    sounds.playClick();
    setEditingId(tribute.id);
    setEditTeacherName(tribute.teacherName || currentTeacher.name);
    setEditAuthorName(tribute.authorName);
    setEditMessage(tribute.message);
    setEditCategory(tribute.category);
  };

  const saveEdit = (id: string) => {
    if (!editMessage.trim()) return;
    sounds.playChime();
    onEditTribute(id, {
      teacherName: editTeacherName.trim() || currentTeacher.name,
      authorName: editAuthorName.trim() || 'Grateful Student',
      message: editMessage.trim(),
      category: editCategory,
    });
    setEditingId(null);
  };

  const filteredTributes = tributes.filter((t) => {
    if (filter === 'all') return true;
    return t.category === filter;
  });

  return (
    <section id="memories" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="flex items-center justify-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-3">
          <MessageSquare className="h-3.5 w-3.5" />
          <span>Student Appreciation Wall</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight text-balance mb-4">
          Heartfelt Memories & Thank You Notes
        </h2>
        <p className="text-base sm:text-lg text-slate-300">
          Add, edit, or curate appreciation messages dedicated to our teachers—saved directly in your browser.
        </p>
      </div>

      {/* Filter and Action Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto w-full md:w-auto">
          {(['all', 'gratitude', 'memories', 'lesson', 'humor'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                sounds.playClick();
                setFilter(cat);
              }}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors whitespace-nowrap ${
                filter === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Action Controls: Clear / Restore + Add Message */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
          {tributes.length > 0 ? (
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                onClearTributes();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-rose-500/30 bg-rose-950/20 text-xs font-semibold text-rose-300 hover:bg-rose-950/40 transition-colors whitespace-nowrap"
              title="Clear all messages"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear Messages</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                onRestoreDefaultTributes();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-xs font-semibold text-slate-300 hover:text-white transition-colors whitespace-nowrap"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Restore Sample Notes</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              setShowForm(!showForm);
            }}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all whitespace-nowrap"
          >
            <PlusCircle className="h-4 w-4" />
            <span>{showForm ? 'Close Form' : 'Add Message'}</span>
          </button>
        </div>
      </div>

      {/* Note Creation Form Drawer */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-10 overflow-hidden"
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-cyan-500/30 bg-slate-900/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold font-display text-white">
                  Write an Appreciation Message ❤️
                </h3>
                <span className="text-xs font-mono text-cyan-400">Saved to LocalStorage</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1">
                    Teacher Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sir Zuhaib"
                    value={teacherNameInput}
                    onChange={(e) => setTeacherNameInput(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1">
                    Student Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Daniyal, Batch of 2026"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as typeof category)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="gratitude">Gratitude & Thank You</option>
                    <option value="memories">Classroom Memory</option>
                    <option value="lesson">Best Life/Coding Lesson</option>
                    <option value="humor">Funny Coding Moment</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1">
                  Message
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder={`Dear ${teacherNameInput || currentTeacher.name}, thank you for teaching us...`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={justSubmitted}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-xs font-bold text-white shadow-lg shadow-cyan-500/25 hover:opacity-95"
                >
                  {justSubmitted ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Tribute Posted!</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Post Tribute Note ❤️</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State when Cleared */}
      {filteredTributes.length === 0 ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-12 text-center max-w-lg mx-auto">
          <MessageSquare className="h-10 w-10 text-cyan-400/50 mx-auto mb-3" />
          <h3 className="text-lg font-bold font-display text-white mb-1">
            No Appreciation Messages Yet
          </h3>
          <p className="text-sm text-slate-400 mb-6">
            Be the first to write a heartfelt note for {currentTeacher.name}, or restore the sample notes.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition-colors"
            >
              Write a Message
            </button>
            <button
              type="button"
              onClick={onRestoreDefaultTributes}
              className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
            >
              Restore Defaults
            </button>
          </div>
        </div>
      ) : (
        /* Tribute Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTributes.map((tribute, idx) => {
            const isEditing = editingId === tribute.id;
            return (
              <motion.div
                key={tribute.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl flex flex-col justify-between hover:border-slate-700 transition-all group"
              >
                {isEditing ? (
                  /* Inline Edit Mode */
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-mono text-cyan-400 font-semibold">Edit Note</span>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="text-slate-400 hover:text-white"
                        aria-label="Cancel editing"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">To Teacher:</label>
                      <input
                        type="text"
                        value={editTeacherName}
                        onChange={(e) => setEditTeacherName(e.target.value)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">From Student:</label>
                      <input
                        type="text"
                        value={editAuthorName}
                        onChange={(e) => setEditAuthorName(e.target.value)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Message:</label>
                      <textarea
                        rows={3}
                        value={editMessage}
                        onChange={(e) => setEditMessage(e.target.value)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none resize-none"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => saveEdit(tribute.id)}
                        className="px-4 py-1.5 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      {/* Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-md shrink-0">
                            {tribute.avatarSeed}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white">{tribute.authorName}</h4>
                            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                              <span>To: {tribute.teacherName || currentTeacher.name}</span>
                              <span>·</span>
                              <span>{tribute.createdAt}</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                          {tribute.category}
                        </span>
                      </div>

                      {/* Message */}
                      <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                        "{tribute.message}"
                      </p>
                    </div>

                    {/* Footer / Like, Edit & Delete Controls */}
                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-mono">Dedicated with ❤️</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            sounds.playClick();
                            onLikeTribute(tribute.id);
                          }}
                          className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-rose-400 transition-colors p-1.5 rounded-lg hover:bg-slate-800/50"
                          title="Like this tribute"
                        >
                          <Heart className="h-3.5 w-3.5 fill-rose-500/20 text-rose-400 group-hover:scale-110" />
                          <span className="font-mono tabular-nums">{tribute.likes}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => startEditing(tribute)}
                          className="inline-flex items-center text-xs font-medium text-slate-400 hover:text-cyan-400 transition-colors p-1.5 rounded-lg hover:bg-slate-800/50"
                          title="Edit this message"
                          aria-label="Edit message"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            sounds.playClick();
                            onRemoveTribute(tribute.id);
                          }}
                          className="inline-flex items-center text-xs font-medium text-slate-400 hover:text-rose-400 transition-colors p-1.5 rounded-lg hover:bg-slate-800/50"
                          title="Delete this message"
                          aria-label="Delete message"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
};
