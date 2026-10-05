import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, Heart, Sparkles, Terminal, UserCheck, Share2, Check, FastForward } from 'lucide-react';
import { Teacher } from '../types';
import { sounds } from '../utils/audio';

interface HeroProps {
  currentTeacher: Teacher;
  onOpenPersonalizer: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentTeacher, onOpenPersonalizer }) => {
  const [introPhase, setIntroPhase] = useState<'quote' | 'terminal' | 'ready'>('quote');
  const [terminalStep, setTerminalStep] = useState(0);
  const [shareCopied, setShareCopied] = useState(false);

  const bootLogs = [
    'booting gratitude...',
    'loading memories...',
    'compiling knowledge...',
    'initializing teacher_appreciation...',
    'success ✓',
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIntroPhase('ready');
      return;
    }

    const quoteTimer = setTimeout(() => {
      setIntroPhase((prev) => (prev === 'quote' ? 'terminal' : prev));
    }, 1500);

    return () => clearTimeout(quoteTimer);
  }, []);

  useEffect(() => {
    if (introPhase !== 'terminal') return;

    const timer = setInterval(() => {
      setTerminalStep((prev) => {
        if (prev < bootLogs.length) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(() => setIntroPhase('ready'), 350);
          return prev;
        }
      });
    }, 220);

    return () => clearInterval(timer);
  }, [introPhase]);

  const handleSkipIntro = () => {
    sounds.playClick();
    setIntroPhase('ready');
  };

  const scrollToSection = (id: string) => {
    sounds.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShareTribute = async () => {
    sounds.playChime();
    const shareTitle = `Happy Teachers' Day, ${currentTeacher.name}! ❤️`;
    const shareText = `Happy Teachers' Day, ${currentTeacher.name}! Thank you for inspiring us through ${currentTeacher.subject}. "You taught us how to code. You taught us how to think. You helped us build our future."`;
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
        // Fallback to clipboard copy if user cancels or share fails
      }
    }

    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    } catch {
      // ignore
    }
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

      {/* Floating subtle educational & developer symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none text-slate-500/20 font-mono text-sm">
        <motion.span
          animate={{ y: [0, -25, 0], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-28 left-[10%]"
        >
          &lt;Wisdom /&gt;
        </motion.span>
        <motion.span
          animate={{ y: [0, 20, 0], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-44 right-[12%]"
        >
          async function inspire()
        </motion.span>
        <motion.span
          animate={{ y: [0, -18, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-36 left-[15%]"
        >
          git commit -m "gratitude"
        </motion.span>
        <motion.span
          animate={{ y: [0, 22, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-28 right-[16%]"
        >
          npm run build-future
        </motion.span>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center flex flex-col items-center w-full">
        <AnimatePresence mode="wait">
          {introPhase === 'quote' && (
            <motion.div
              key="intro-quote"
              initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(6px)' }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center py-16 px-4 max-w-2xl"
            >
              <Sparkles className="h-6 w-6 text-cyan-400 mb-4 animate-pulse" />
              <p className="text-2xl sm:text-4xl font-display font-semibold text-white tracking-tight leading-snug text-balance mb-8">
                "Every dream begins with someone who believes in us."
              </p>
              <button
                type="button"
                onClick={handleSkipIntro}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/80 px-4 py-1.5 text-xs font-mono text-slate-300 hover:border-cyan-400 hover:text-white transition-colors"
              >
                <span>Skip Intro</span>
                <FastForward className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          )}

          {introPhase === 'terminal' && (
            <motion.div
              key="intro-terminal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              className="w-full max-w-md flex flex-col items-center"
            >
              <div className="w-full rounded-xl border border-cyan-500/30 bg-slate-950/90 p-5 font-mono text-xs text-left shadow-2xl shadow-cyan-500/10 mb-5 backdrop-blur-md">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                    <span>tribute_engine_v2026.sh</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                </div>
                <div className="space-y-1.5 min-h-[110px]">
                  {bootLogs.slice(0, terminalStep).map((log, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-2 ${
                        idx === bootLogs.length - 1
                          ? 'text-emerald-400 font-bold'
                          : 'text-cyan-300'
                      }`}
                    >
                      <span className="text-slate-500">&gt;</span>
                      <span>{log}</span>
                    </div>
                  ))}
                  {terminalStep < bootLogs.length && (
                    <div className="flex items-center gap-2 text-slate-400">
                      <span className="text-slate-500">&gt;</span>
                      <span className="inline-block h-3.5 w-2 bg-cyan-400 animate-pulse" />
                    </div>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={handleSkipIntro}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/80 px-4 py-1.5 text-xs font-mono text-slate-300 hover:border-cyan-400 hover:text-white transition-colors"
              >
                <span>Skip Intro</span>
                <FastForward className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          )}

          {introPhase === 'ready' && (
            <motion.div
              key="hero-ready"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              {/* Year Meta Kicker */}
              <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-cyan-400 mb-5">
                <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                <span>TEACHERS' DAY • 2026</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-300">Interactive Digital Tribute</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-display text-white max-w-4xl text-balance leading-[1.1] mb-3">
                HAPPY TEACHERS' DAY
              </h1>

              {/* Dynamic Personalized Teacher Name */}
              <motion.button
                type="button"
                key={currentTeacher.name}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="mb-4 inline-flex items-center gap-3 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-xl px-3 py-1"
                onClick={onOpenPersonalizer}
                title="Click to personalize teacher name & subject"
              >
                <span className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-rose-400 drop-shadow-[0_0_25px_rgba(56,189,248,0.25)]">
                  {currentTeacher.name}
                </span>
                <Heart className="h-7 w-7 sm:h-9 sm:w-9 fill-rose-500 text-rose-500 group-hover:scale-110 transition-transform duration-200" />
              </motion.button>

              {/* Dynamic Subject Appreciation Banner */}
              <p className="text-sm sm:text-base font-mono text-cyan-300 mb-5">
                Thank you for inspiring us through <strong className="font-bold underline decoration-cyan-500/40 underline-offset-4">{currentTeacher.subject}</strong>.
              </p>

              {/* Subtitle */}
              <p className="text-lg sm:text-2xl font-medium text-slate-200 max-w-2xl text-balance mb-3 leading-relaxed">
                "Thank you for teaching us more than just code."
              </p>

              {/* Secondary Text */}
              <p className="text-sm sm:text-base text-slate-400 max-w-2xl text-balance mb-9 leading-relaxed">
                You helped turn curiosity into knowledge, ideas into projects, and students into creators.
              </p>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => scrollToSection('journey')}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-blue-600 px-7 py-3.5 font-semibold text-white shadow-[0_0_25px_rgba(56,189,248,0.25)] hover:shadow-[0_0_35px_rgba(56,189,248,0.4)] hover:brightness-110 active:scale-98 transition-all whitespace-nowrap"
                >
                  <span>Begin the Journey</span>
                  <ArrowDown className="h-4 w-4 animate-bounce" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('teacher')}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3.5 font-semibold text-slate-200 hover:bg-slate-800 hover:border-slate-600 hover:text-white transition-all backdrop-blur-md whitespace-nowrap"
                >
                  <UserCheck className="h-4 w-4 text-cyan-400" />
                  <span>Meet Our Teacher</span>
                </button>

                <button
                  type="button"
                  onClick={handleShareTribute}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-950/40 px-5 py-3.5 font-semibold text-cyan-200 hover:bg-cyan-900/50 hover:border-cyan-400 transition-all backdrop-blur-md whitespace-nowrap"
                  title="Share this personalized tribute"
                >
                  {shareCopied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span>Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="h-4 w-4 text-cyan-400" />
                      <span>Share Tribute</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle bottom scroll indicator */}
      {introPhase === 'ready' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-400 text-xs font-mono"
        >
          <span>scroll to explore</span>
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
        </motion.div>
      )}
    </section>
  );
};
