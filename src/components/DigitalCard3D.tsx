import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Heart, RotateCw, Share2, Check, Sparkles, Copy, Link2 } from 'lucide-react';
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
  const [isFlipped, setIsFlipped] = useState(false);
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

  const handleFlip = () => {
    if (!isFlipped) {
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
    setIsFlipped(!isFlipped);
  };

  const noteContent =
    customNote ||
    `When we first began learning ${currentTeacher.subject}, the path ahead felt complex and unfamiliar. You showed us that every system, every breakthrough, and every dream begins with understanding fundamentals and having the courage to experiment. Thank you for answering our endless questions, celebrating our progress, and helping us see what we are truly capable of achieving.`;

  const handleShareCard = async (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playChime();
    const shareTitle = `Happy Teachers' Day, ${currentTeacher.name}! ❤️`;
    const shareText = `Dear ${currentTeacher.name},\n\n${noteContent}\n\n"Behind every confident student is someone who believed in them first."\n— ${studentName || 'Your Grateful Students'}`;

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
          <span>Interactive 3D Flip Card</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight text-balance mb-4">
          Digital Teachers&apos; Day Flip Card
        </h2>
        <p className="text-base sm:text-lg text-slate-300">
          Hover to experience 3D depth and click the card to flip it 180° and reveal our appreciation letter.
        </p>
      </div>

      {/* 3D Flip + Tilt Container */}
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
          animate={{
            rotateY: (isFlipped ? 180 : 0) + (isHovered ? mousePos.x * 10 : 0),
            rotateX: isHovered ? -mousePos.y * 10 : 0,
          }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
          onClick={handleFlip}
          className="relative w-full min-h-[430px] cursor-pointer"
        >
          {/* FRONT FACE OF 3D FLIP CARD */}
          <div
            style={{ backfaceVisibility: 'hidden' }}
            className="absolute inset-0 w-full h-full rounded-3xl border border-cyan-500/35 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 sm:p-10 shadow-2xl flex flex-col items-center justify-between text-center overflow-hidden"
          >
            {/* Dynamic Cursor Light Reflection */}
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-300"
              style={{
                opacity: isHovered ? 0.35 : 0,
                background: `radial-gradient(450px circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(56, 189, 248, 0.22), transparent 60%)`,
              }}
            />

            <div className="relative z-10 flex flex-col items-center my-auto space-y-5">
              {/* Teacher Avatar + Wax Seal */}
              <div className="relative">
                <img
                  src={currentTeacher.photo}
                  alt={currentTeacher.name}
                  className="h-24 w-24 rounded-full object-cover border-2 border-cyan-400 shadow-lg shadow-cyan-500/25"
                />
                <span className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white shadow-md">
                  <Heart className="h-4 w-4 fill-white" />
                </span>
              </div>

              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold tracking-widest uppercase block mb-1.5">
                  3D TRIBUTE KEEPSAKE • CLICK TO FLIP
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
                  Happy Teachers&apos; Day, {currentTeacher.name}! 🎓
                </h3>
                <p className="text-xs sm:text-sm font-mono text-cyan-300 mt-1.5">
                  {currentTeacher.subject}
                </p>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFlip();
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-rose-500 px-7 py-3.5 font-bold text-white shadow-lg shadow-cyan-500/25 hover:opacity-95 transition-all cursor-pointer"
              >
                <RotateCw className="h-4 w-4" />
                <span>Flip Card to Read Message</span>
              </button>
            </div>
          </div>

          {/* BACK FACE OF 3D FLIP CARD (Rotated 180 deg) */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
            className="w-full min-h-[430px] rounded-3xl border border-indigo-500/40 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/50 p-7 sm:p-9 shadow-2xl flex flex-col justify-between text-left"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
              <span className="text-xs font-mono text-rose-400 font-semibold flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                <span>APPRECIATION LETTER REVEALED</span>
              </span>
              <span className="text-xs font-mono text-slate-400">
                Teachers&apos; Day 2026
              </span>
            </div>

            <div className="my-4 space-y-3">
              <h4 className="text-xl sm:text-2xl font-bold font-display text-white">
                Dear {currentTeacher.name},
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {noteContent}
              </p>

              <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-3.5 space-y-1">
                <p className="text-xs sm:text-sm font-semibold text-cyan-300 italic">
                  &ldquo;Behind every confident student is someone who believed in them first.&rdquo;
                </p>
                <div className="pt-1.5 text-right">
                  <span className="text-[11px] font-mono text-slate-400">
                    With gratitude,{' '}
                  </span>
                  <strong className="text-xs sm:text-sm font-bold text-white">
                    {studentName || 'Your Grateful Students'}
                  </strong>
                </div>
              </div>
            </div>

            {/* Action Buttons on Back of Card */}
            <div
              className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-slate-800/80"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={handleShareCard}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all cursor-pointer"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>Share</span>
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
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Copied!</span>
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
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
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
                onClick={handleFlip}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCw className="h-3.5 w-3.5" />
                <span>Flip Back</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
