import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Heart, Lock, Unlock, Share2, Check, Sparkles, Copy, Link2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Teacher } from '../types';
import { sounds } from '../utils/audio';

interface DigitalCard3DProps {
  currentTeacher: Teacher;
  studentName: string;
  customNote: string;
}

export const DigitalCard3D: React.FC<DigitalCard3DProps> = ({
  currentTeacher,
  studentName,
  customNote,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleToggleOpen = () => {
    if (!isOpen) {
      sounds.playChime();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#38bdf8', '#818cf8', '#fb7185', '#fbbf24'],
      });
    } else {
      sounds.playClick();
    }
    setIsOpen(!isOpen);
  };

  const noteContent =
    customNote ||
    `When we first began learning ${currentTeacher.subject}, the path ahead felt complex and unfamiliar. You showed us that every system, every breakthrough, and every dream begins with understanding fundamentals and having the courage to experiment. Thank you for answering our endless questions, celebrating our progress, and helping us see what we are truly capable of achieving.`;

  const handleShareCard = async () => {
    sounds.playChime();
    const shareTitle = `Happy Teachers' Day, ${currentTeacher.name}! ❤️`;
    const shareText = `Dear ${currentTeacher.name},\n\n${noteContent}\n\n"Thank you for inspiring us through ${currentTeacher.subject} and helping us write the first lines of our future."\n— ${studentName || 'Your Grateful Students'}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  return (
    <section id="card" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="flex items-center justify-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-3">
          <Mail className="h-3.5 w-3.5" />
          <span>Interactive 3D Keepsake</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight text-balance mb-4">
          Digital Teachers' Day Card
        </h2>
        <p className="text-base sm:text-lg text-slate-300">
          Move your cursor to tilt the card in 3D space, and click to unseal our personal letter.
        </p>
      </div>

      {/* 3D Tilt Wrapper */}
      <div
        className="max-w-xl mx-auto perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePos({ x: 0, y: 0 });
        }}
      >
        <motion.div
          layout
          animate={{
            rotateY: isHovered ? mousePos.x * 12 : 0,
            rotateX: isHovered ? -mousePos.y * 12 : 0,
          }}
          transition={{ type: 'spring', damping: 22, stiffness: 220 }}
          className="w-full rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden"
        >
          {/* Dynamic Cursor Light Reflection Layer */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.35 : 0,
              background: `radial-gradient(450px circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(56, 189, 248, 0.22), transparent 60%)`,
            }}
          />

          {/* Ambient Corner Glows */}
          <div className="absolute -right-20 -top-20 w-60 h-60 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Inner Architectural Frame Border */}
          <div className="relative z-10 rounded-2xl border border-slate-800/80 p-5 sm:p-7 bg-slate-950/40">
            {!isOpen ? (
              /* Closed Card Front */
              <div className="text-center flex flex-col items-center py-6 space-y-6">
                {/* Wax Seal Icon */}
                <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 p-1 shadow-lg shadow-rose-500/30 flex items-center justify-center animate-pulse">
                  <div className="h-full w-full rounded-full border border-rose-300/40 flex items-center justify-center bg-rose-950/40">
                    <Heart className="h-8 w-8 fill-white text-white" />
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono text-cyan-400 font-semibold tracking-widest uppercase block mb-1.5">
                    SEALED WITH GRATITUDE
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
                    HAPPY TEACHERS' DAY ❤️
                  </h3>
                  <p className="text-sm text-slate-300 mt-2">
                    Dedicated to <strong className="text-cyan-300 font-semibold">{currentTeacher.name}</strong>
                  </p>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    {currentTeacher.subject}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleToggleOpen}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-rose-500 px-8 py-3.5 font-bold text-white shadow-lg shadow-cyan-500/25 hover:opacity-95 active:scale-98 transition-all"
                >
                  <Unlock className="h-4 w-4" />
                  <span>Open Card</span>
                </button>
              </div>
            ) : (
              /* Open Card Inside */
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="space-y-6 text-left"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <span className="text-xs font-mono text-rose-400 font-semibold flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>TRIBUTE_LETTER_UNSEALED ✓</span>
                  </span>
                  <span className="text-xs font-mono text-slate-300">
                    Teachers' Day 2026
                  </span>
                </div>

                <div>
                  <h4 className="text-2xl font-bold font-display text-white mb-2">
                    Dear {currentTeacher.name},
                  </h4>
                  <p className="text-xs font-mono text-cyan-400 mb-4">
                    Thank you for inspiring us through {currentTeacher.subject}.
                  </p>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {noteContent}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-4 space-y-1.5">
                  <p className="text-sm font-semibold text-cyan-300 italic">
                    &ldquo;Behind every confident student is someone who believed in them first.&rdquo;
                  </p>
                  <p className="text-xs text-slate-300 italic">
                    &ldquo;Thank you for helping us write the first lines of our future.&rdquo;
                  </p>
                  <div className="mt-2 pt-2 border-t border-slate-800/80 text-right">
                    <span className="text-xs font-mono text-slate-400">
                      With endless respect and gratitude,
                    </span>
                    <p className="text-sm font-bold text-white">
                      {studentName || 'Your Grateful Students'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={handleShareCard}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Share Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={async () => {
                      sounds.playClick();
                      try {
                        await navigator.clipboard.writeText(
                          `Dear ${currentTeacher.name},\n\n${noteContent}\n\n"Behind every confident student is someone who believed in them first."\n— ${studentName || 'Your Grateful Students'}`
                        );
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2200);
                      } catch {
                        // ignore
                      }
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Message Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-cyan-400" />
                        <span>Copy Message</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={async () => {
                      sounds.playClick();
                      try {
                        await navigator.clipboard.writeText(window.location.href);
                        setCopiedLink(true);
                        setTimeout(() => setCopiedLink(false), 2200);
                      } catch {
                        // ignore
                      }
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Link2 className="h-3.5 w-3.5 text-indigo-400" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleToggleOpen}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                  >
                    <Lock className="h-3.5 w-3.5" />
                    <span>Close</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
