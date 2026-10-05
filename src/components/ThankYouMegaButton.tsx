import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, PartyPopper, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Teacher } from '../types';
import { sounds } from '../utils/audio';

interface ThankYouMegaButtonProps {
  currentTeacher: Teacher;
}

interface FloatingHeart {
  id: number;
  left: number;
  scale: number;
}

export const ThankYouMegaButton: React.FC<ThankYouMegaButtonProps> = ({ currentTeacher }) => {
  const [thankCount, setThankCount] = useState<number>(() => {
    const saved = localStorage.getItem(`thanks_${currentTeacher.id}`);
    return saved ? parseInt(saved, 10) : 128;
  });
  const [isExploding, setIsExploding] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);

  const handleSayThankYou = () => {
    sounds.playChime();
    const newCount = thankCount + 1;
    setThankCount(newCount);
    localStorage.setItem(`thanks_${currentTeacher.id}`, newCount.toString());

    setIsExploding(true);

    // Multi-stage confetti cannon
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#818cf8', '#f43f5e', '#fbbf24', '#34d399'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#38bdf8', '#f43f5e'],
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#818cf8', '#fbbf24'],
      });
    }, 200);

    // Spawn floating upward hearts
    const hearts = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      left: 10 + Math.random() * 80,
      scale: 0.8 + Math.random() * 0.8,
    }));
    setFloatingHearts(hearts);

    setTimeout(() => {
      setFloatingHearts([]);
      setIsExploding(false);
    }, 4000);
  };

  return (
    <section id="thankyou" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center overflow-hidden">
      {/* Floating Hearts Container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        <AnimatePresence>
          {floatingHearts.map((h) => (
            <motion.div
              key={h.id}
              initial={{ y: 250, opacity: 1, scale: h.scale }}
              animate={{ y: -300, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.8, ease: 'easeOut' }}
              style={{ left: `${h.left}%` }}
              className="absolute bottom-10"
            >
              <Heart className="h-8 w-8 fill-rose-500 text-rose-400 drop-shadow-[0_0_15px_rgba(244,63,94,0.6)]" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Radiant Background Glow when exploding */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 ${
          isExploding
            ? 'bg-rose-500/25 scale-125'
            : 'bg-gradient-to-r from-cyan-500/10 via-rose-500/10 to-indigo-500/10'
        }`}
      />

      <div className="relative z-10 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-rose-400 mb-4 px-4 py-1.5 rounded-full bg-rose-950/40 border border-rose-500/30">
          <PartyPopper className="h-3.5 w-3.5" />
          <span>Gratitude Trigger</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight mb-4">
          Send Your Appreciation
        </h2>
        <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto mb-10">
          Every single tap adds to our collective student standing ovation. Let's make it echo!
        </p>

        {/* The Mega Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSayThankYou}
          className="group relative inline-flex items-center justify-center gap-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 px-10 sm:px-14 py-5 sm:py-6 font-display font-extrabold text-lg sm:text-2xl text-white shadow-[0_0_40px_rgba(244,63,94,0.35)] hover:shadow-[0_0_60px_rgba(244,63,94,0.6)] transition-all cursor-pointer"
        >
          <Heart className="h-6 w-6 sm:h-8 sm:w-8 fill-white text-white group-hover:scale-125 transition-transform duration-200" />
          <span>SAY THANK YOU ❤️</span>
          <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-amber-200 animate-spin" style={{ animationDuration: '4s' }} />
        </motion.button>

        {/* Live Thank You Counter */}
        <div className="mt-6 flex items-center gap-2 text-sm font-mono text-slate-400">
          <Trophy className="h-4 w-4 text-amber-400" />
          <span>
            <strong className="text-white font-bold">{thankCount.toLocaleString()}</strong> heartfelt thank-yous sent today
          </span>
        </div>

        {/* Thank You Celebration Reveal */}
        <AnimatePresence>
          {isExploding && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-10 rounded-2xl border border-rose-500/40 bg-slate-900/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl max-w-2xl"
            >
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-cyan-300 mb-2">
                THANK YOU, {currentTeacher.name}! ❤️
              </h3>
              <p className="text-base sm:text-lg font-medium text-slate-200">
                "Your lessons will stay with us long after the classroom."
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
