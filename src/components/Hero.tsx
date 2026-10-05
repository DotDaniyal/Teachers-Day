import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowDown,
  Heart,
  Sparkles,
  Share2,
  Check,
  BookOpen,
  PenTool,
  GraduationCap,
  Lightbulb,
  Edit3,
  RotateCcw,
  Copy,
  Link2,
  Play,
  PartyPopper,
  Music,
  Star,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Teacher } from '../types';
import { sounds } from '../utils/audio';

interface HeroProps {
  currentTeacher: Teacher;
  studentName: string;
  customNote: string;
  onOpenPersonalizer: () => void;
  onResetTribute: () => void;
  onReplayIntro: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentTeacher,
  studentName,
  customNote,
  onOpenPersonalizer,
  onResetTribute,
  onReplayIntro,
}) => {
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Trigger a tasteful welcome confetti burst once on load
  useEffect(() => {
    const timer = setTimeout(() => {
      confetti({
        particleCount: 55,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#818cf8', '#fb7185', '#fbbf24'],
      });
    }, 650);
    return () => clearTimeout(timer);
  }, []);

  const handleCelebrateClick = () => {
    sounds.playChime();
    confetti({
      particleCount: 70,
      angle: 60,
      spread: 60,
      origin: { x: 0.15, y: 0.65 },
      colors: ['#38bdf8', '#818cf8', '#fb7185', '#fbbf24', '#34d399'],
    });
    confetti({
      particleCount: 70,
      angle: 120,
      spread: 60,
      origin: { x: 0.85, y: 0.65 },
      colors: ['#38bdf8', '#818cf8', '#fb7185', '#fbbf24', '#34d399'],
    });
  };

  const scrollToSection = (id: string) => {
    sounds.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getFormattedMessage = () => {
    const base = `Happy Teachers' Day, ${currentTeacher.name}! ❤️\nThank you for inspiring us through ${currentTeacher.subject}.`;
    const extra = customNote ? `\n"${customNote}"` : `\n"${currentTeacher.quote}"`;
    const from = `\n— ${studentName || 'Your Grateful Students'}`;
    return `${base}${extra}${from}`;
  };

  const handleCopyMessage = async () => {
    sounds.playClick();
    try {
      await navigator.clipboard.writeText(getFormattedMessage());
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2200);
    } catch {
      // ignore
    }
  };

  const handleCopyLink = async () => {
    sounds.playClick();
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    } catch {
      // ignore
    }
  };

  const handleShareTribute = async () => {
    sounds.playChime();
    const shareTitle = `Happy Teachers' Day, ${currentTeacher.name}! ❤️`;
    const shareText = getFormattedMessage();
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to copy message
      }
    }

    handleCopyMessage();
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-grid-pattern"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/15 via-indigo-500/15 to-rose-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute -top-32 left-10 w-72 h-72 bg-blue-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 blur-[120px] pointer-events-none" />

      {/* Subtle floating hearts, stars, musical notes & educational symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none text-slate-500/25 font-mono text-xs sm:text-sm">
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-28 left-[8%] flex items-center gap-1.5"
        >
          <BookOpen className="h-4 w-4 text-cyan-400/50" />
          <span className="hidden sm:inline">&lt;Knowledge /&gt;</span>
        </motion.div>

        <motion.div
          animate={{ y: [0, -24, 0], x: [0, 8, 0], opacity: [0.2, 0.55, 0.2] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          className="absolute top-24 left-[24%] text-rose-400/50"
        >
          <Heart className="h-4 w-4 fill-rose-400/30" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 18, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-36 right-[9%] flex items-center gap-1.5"
        >
          <Lightbulb className="h-4 w-4 text-amber-400/50" />
          <span className="hidden sm:inline">inspire()</span>
        </motion.div>

        <motion.div
          animate={{ y: [0, -22, 0], rotate: [0, 12, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          className="absolute top-48 right-[22%] text-indigo-400/50"
        >
          <Music className="h-4 w-4" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -16, 0], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-32 left-[10%] flex items-center gap-1.5"
        >
          <PenTool className="h-4 w-4 text-indigo-400/45" />
          <span className="hidden sm:inline">craft_future</span>
        </motion.div>

        <motion.div
          animate={{ y: [0, -20, 0], scale: [1, 1.15, 1], opacity: [0.2, 0.55, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
          className="absolute bottom-40 left-[23%] text-amber-400/50"
        >
          <Star className="h-4 w-4 fill-amber-400/30" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 18, 0], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-28 right-[11%] flex items-center gap-1.5"
        >
          <GraduationCap className="h-4 w-4 text-rose-400/45" />
          <span className="hidden sm:inline">mentorship ✓</span>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center flex flex-col items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center w-full"
        >
          {/* Year Meta Kicker + Replay Intro option */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono font-semibold tracking-wider text-cyan-400 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            <span>HAPPY TEACHERS&apos; DAY • 2026</span>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                onReplayIntro();
              }}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
              title="Replay Cinematic Intro"
            >
              <Play className="h-3 w-3" />
              <span>Replay Intro</span>
            </button>
          </div>

          {/* Main Animated Heading */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-display text-white max-w-4xl text-balance leading-[1.08] mb-3"
          >
            Happy Teacher&apos;s Day! 🎓
          </motion.h1>

          {/* Editorial Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl text-balance mb-7 leading-relaxed">
            A tribute to the people who guide us, inspire us and help shape our future.
          </p>

          {/* Primary Hero Actions ("Celebrate", "Create a Tribute", "Explore the Story") */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
            <button
              type="button"
              onClick={handleCelebrateClick}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 px-6 py-3.5 font-bold text-white shadow-[0_0_25px_rgba(244,63,94,0.3)] hover:brightness-110 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
            >
              <PartyPopper className="h-4 w-4" />
              <span>Celebrate! 🎉</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                onOpenPersonalizer();
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-blue-600 px-6 py-3.5 font-semibold text-white shadow-[0_0_25px_rgba(56,189,248,0.25)] hover:brightness-110 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>Create a Tribute</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('journey')}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3.5 font-semibold text-slate-200 hover:bg-slate-800 hover:border-slate-600 hover:text-white transition-all backdrop-blur-md whitespace-nowrap cursor-pointer"
            >
              <span>Explore the Story</span>
              <ArrowDown className="h-4 w-4" />
            </button>
          </div>

          {/* Personalized Animated Digital Tribute Card */}
          <motion.div
            key={`${currentTeacher.id}-${currentTeacher.name}-${currentTeacher.subject}`}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="w-full max-w-2xl rounded-2xl border border-cyan-500/30 bg-slate-900/80 p-5 sm:p-6 backdrop-blur-xl shadow-2xl text-left"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-3.5">
                <img
                  src={currentTeacher.photo}
                  alt={currentTeacher.name}
                  className="h-14 w-14 rounded-2xl object-cover border border-cyan-500/40 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-extrabold font-display text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-rose-400">
                      Happy Teachers&apos; Day, {currentTeacher.name}
                    </h2>
                    <Heart className="h-4 w-4 fill-rose-500 text-rose-500 shrink-0" />
                  </div>
                  <p className="text-xs sm:text-sm font-mono text-cyan-300 mt-0.5">
                    Thank you for inspiring us through <strong>{currentTeacher.subject}</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Custom / Teacher Message */}
            <p className="mt-4 text-sm text-slate-300 italic leading-relaxed">
              &ldquo;{customNote || currentTeacher.quote}&rdquo;
            </p>

            <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono text-slate-400">
                From: <strong className="text-slate-200">{studentName || 'Your Grateful Students'}</strong>
              </span>

              {/* Card Actions: Edit, Reset, Copy Message, Copy Link, Share */}
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    onOpenPersonalizer();
                  }}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/70 px-2.5 py-1.5 text-xs font-medium text-slate-200 hover:border-cyan-400 hover:text-white transition-colors cursor-pointer"
                  title="Edit Personalized Tribute"
                >
                  <Edit3 className="h-3 w-3 text-cyan-400" />
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    onResetTribute();
                  }}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/70 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-600 hover:text-white transition-colors cursor-pointer"
                  title="Reset Tribute"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/70 px-2.5 py-1.5 text-xs font-medium text-slate-200 hover:border-cyan-400 hover:text-white transition-colors cursor-pointer"
                  title="Copy Tribute Message"
                >
                  {copiedMessage ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 text-cyan-400" />
                      <span>Copy Message</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/70 px-2.5 py-1.5 text-xs font-medium text-slate-200 hover:border-cyan-400 hover:text-white transition-colors cursor-pointer"
                  title="Copy Website Link"
                >
                  {copiedLink ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span>Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Link2 className="h-3 w-3 text-indigo-400" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleShareTribute}
                  className="inline-flex items-center gap-1 rounded-lg bg-cyan-500/20 border border-cyan-500/40 px-3 py-1.5 text-xs font-semibold text-cyan-200 hover:bg-cyan-500/30 transition-colors cursor-pointer"
                  title="Share Tribute"
                >
                  <Share2 className="h-3 w-3 text-cyan-400" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
