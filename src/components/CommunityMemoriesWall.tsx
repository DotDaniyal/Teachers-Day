import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Heart, Sparkles, Send, Tag, ThumbsUp, PlusCircle, Check, Trash2 } from 'lucide-react';
import { TributeMessage, Teacher } from '../types';
import { sounds } from '../utils/audio';

interface CommunityMemoriesWallProps {
  tributes: TributeMessage[];
  currentTeacher: Teacher;
  onAddTribute: (tribute: Omit<TributeMessage, 'id' | 'createdAt' | 'likes'>) => void;
  onLikeTribute: (id: string) => void;
  onRemoveTribute: (id: string) => void;
}

export const CommunityMemoriesWall: React.FC<CommunityMemoriesWallProps> = ({
  tributes,
  currentTeacher,
  onAddTribute,
  onLikeTribute,
  onRemoveTribute,
}) => {
  const [filter, setFilter] = useState<'all' | 'gratitude' | 'memories' | 'lesson' | 'humor'>('all');
  const [authorName, setAuthorName] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<'gratitude' | 'memories' | 'lesson' | 'humor'>('gratitude');
  const [showForm, setShowForm] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    sounds.playChime();
    onAddTribute({
      teacherId: currentTeacher.id,
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
    }, 1500);
  };

  const filteredTributes = tributes.filter((t) => {
    if (filter === 'all') return true;
    return t.category === filter;
  });

  return (
    <section id="memories" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-3 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20">
          <MessageSquare className="h-3.5 w-3.5" />
          <span>Shared Gratitude Board</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight mb-4">
          Heartfelt Memories & Thank You Notes
        </h2>
        <p className="text-base sm:text-lg text-slate-300">
          Stories, funny classroom anecdotes, and eternal appreciation from current students and alumni.
        </p>
      </div>

      {/* Filter and Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto w-full sm:w-auto">
          {(['all', 'gratitude', 'memories', 'lesson', 'humor'] as const).map((cat) => (
            <button
              key={cat}
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

        <button
          onClick={() => {
            sounds.playClick();
            setShowForm(!showForm);
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Write a Note for {currentTeacher.name}</span>
        </button>
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
                  Write Something for {currentTeacher.name} ❤️
                </h3>
                <span className="text-xs font-mono text-cyan-400">Stored locally</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1">
                    Your Name or Batch
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex, Class of 2026"
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
                  Your Message
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder={`Dear ${currentTeacher.name}, thank you for teaching us...`}
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

      {/* Tribute Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTributes.map((tribute, idx) => (
          <motion.div
            key={tribute.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.06 }}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl flex flex-col justify-between hover:border-slate-700 transition-all group"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-md">
                    {tribute.avatarSeed}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{tribute.authorName}</h4>
                    <span className="text-[11px] font-mono text-slate-400">{tribute.createdAt}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/20">
                  {tribute.category}
                </span>
              </div>

              {/* Message */}
              <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                "{tribute.message}"
              </p>
            </div>

            {/* Footer / Like & Remove Controls */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-300 font-mono">Dedicated with ❤️</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sounds.playClick();
                    onLikeTribute(tribute.id);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-rose-400 transition-colors p-1"
                  title="Like this tribute"
                >
                  <Heart className="h-3.5 w-3.5 fill-rose-500/20 text-rose-400 group-hover:scale-110" />
                  <span className="font-mono">{tribute.likes}</span>
                </button>
                <button
                  onClick={() => {
                    sounds.playClick();
                    onRemoveTribute(tribute.id);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-rose-400 transition-colors p-1"
                  title="Remove this note"
                  aria-label="Remove this note"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
