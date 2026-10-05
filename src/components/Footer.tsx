import React from 'react';
import { Heart, Code2, Terminal, Sparkles } from 'lucide-react';
import { Teacher } from '../types';
import { sounds } from '../utils/audio';

interface FooterProps {
  currentTeacher: Teacher;
  onOpenCustomizer: () => void;
  onOpenEasterEgg: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentTeacher,
  onOpenCustomizer,
  onOpenEasterEgg,
}) => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Note */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 font-mono font-bold text-white text-base">
            <span className="text-cyan-400">&lt;/&gt;</span>
            <span>Teachers' Day Tribute</span>
          </div>
          <span className="hidden sm:inline text-slate-700">|</span>
          <span className="text-xs text-slate-400">
            Crafted with passion for <strong className="text-slate-200">{currentTeacher.name}</strong>
          </span>
        </div>

        {/* Quick Links & Easter Egg hint */}
        <div className="flex items-center gap-6 text-xs font-medium">
          <button
            onClick={() => {
              sounds.playClick();
              onOpenCustomizer();
            }}
            className="hover:text-cyan-400 transition-colors"
          >
            Customize Tribute
          </button>
          <button
            onClick={() => {
              sounds.playEasterEgg();
              onOpenEasterEgg();
            }}
            className="hover:text-rose-400 transition-colors inline-flex items-center gap-1 font-mono"
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>Debug Mode</span>
          </button>
          <a
            href="#home"
            onClick={() => sounds.playClick()}
            className="hover:text-white transition-colors"
          >
            Back to Top ↑
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3 text-center">
        <p>© 2026 Web Development Batch & Students. All rights to gratitude reserved.</p>
        <p className="flex items-center gap-1.5 justify-center">
          Written in TypeScript & React with <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
        </p>
      </div>
    </footer>
  );
};
