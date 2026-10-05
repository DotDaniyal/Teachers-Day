import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';
import { sounds } from '../utils/audio';

export const FloatingAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    return () => {
      sounds.stopAmbientMusic();
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      sounds.stopAmbientMusic();
      setIsPlaying(false);
    } else {
      sounds.isAmbientMuted = isMuted;
      sounds.startAmbientMusic();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sounds.isAmbientMuted = nextMuted;
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-2xl border border-slate-800/90 bg-slate-950/90 px-3.5 py-2.5 shadow-2xl shadow-black/40 backdrop-blur-xl">
      {/* Play / Pause Button */}
      <button
        type="button"
        onClick={togglePlay}
        className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all cursor-pointer ${
          isPlaying
            ? 'bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/25'
            : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
        }`}
        title={isPlaying ? 'Pause Ambient Tribute Music' : 'Play Ambient Tribute Music'}
        aria-label={isPlaying ? 'Pause Ambient Tribute Music' : 'Play Ambient Tribute Music'}
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
      </button>

      {/* Sound Wave Visualizer & Track Info */}
      <div className="hidden sm:flex flex-col pr-1">
        <div className="flex items-center gap-1.5">
          <Music className="h-3 w-3 text-cyan-400" />
          <span className="text-[11px] font-bold font-display text-white tracking-tight">
            Gratitude Symphony
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          {isPlaying ? (isMuted ? 'Muted' : 'Ambient Loop Playing') : 'Click Play for Ambient Audio'}
        </span>
      </div>

      {/* Animated Equalizer Bars */}
      <div className="flex items-end gap-0.5 h-4 px-1" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((bar) => {
          const active = isPlaying && !isMuted;
          return (
            <motion.span
              key={bar}
              animate={
                active
                  ? {
                      height: ['4px', '15px', '7px', '14px', '5px'],
                    }
                  : { height: '4px' }
              }
              transition={
                active
                  ? {
                      duration: 0.9 + bar * 0.12,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
                  : { duration: 0.2 }
              }
              className={`w-1 rounded-full ${
                active ? 'bg-cyan-400' : 'bg-slate-700'
              }`}
            />
          );
        })}
      </div>

      {/* Mute / Unmute Button */}
      <button
        type="button"
        onClick={toggleMute}
        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
        title={isMuted ? 'Unmute Ambient Audio' : 'Mute Ambient Audio'}
        aria-label={isMuted ? 'Unmute Ambient Audio' : 'Mute Ambient Audio'}
      >
        {isMuted ? <VolumeX className="h-4 w-4 text-rose-400" /> : <Volume2 className="h-4 w-4 text-cyan-400" />}
      </button>
    </div>
  );
};
