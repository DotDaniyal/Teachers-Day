import React, { useState, useEffect } from 'react';
import { Heart, Sliders, Menu, X, Volume2, VolumeX, Sun, Moon } from 'lucide-react';
import { Teacher, CustomizationSettings } from '../types';
import { sounds } from '../utils/audio';

interface NavbarProps {
  currentTeacher: Teacher;
  onOpenCustomizer: () => void;
  onOpenEasterEgg: () => void;
  settings: CustomizationSettings;
  onToggleSound: () => void;
  onToggleThemeMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTeacher,
  onOpenCustomizer,
  onOpenEasterEgg,
  settings,
  onToggleSound,
  onToggleThemeMode,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['home', 'journey', 'teacher', 'superpowers', 'memories', 'impact', 'thankyou'];
      const scrollPos = window.scrollY + 220;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    sounds.playClick();
    const next = logoClicks + 1;
    setLogoClicks(next);
    if (next >= 5) {
      sounds.playEasterEgg();
      onOpenEasterEgg();
      setLogoClicks(0);
    }
  };

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Story', href: '#journey', id: 'journey' },
    { label: 'Superpowers', href: '#superpowers', id: 'superpowers' },
    { label: 'Memories', href: '#memories', id: 'memories' },
    { label: 'Impact', href: '#impact', id: 'impact' },
    { label: 'Thank You', href: '#thankyou', id: 'thankyou' },
  ];

  const isLight = settings.themeMode === 'light';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg shadow-black/10'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Single text element Brand mark */}
        <button
          type="button"
          onClick={handleLogoClick}
          className="group flex items-center gap-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg px-2 py-1 -ml-2 whitespace-nowrap"
          title="Click 5 times for Developer Easter Egg!"
        >
          <span className="font-mono text-base sm:text-lg font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">
            &lt;/&gt;
          </span>
          <span className="text-sm font-semibold tracking-tight text-white flex items-center gap-1.5">
            Teachers&apos; Day
            <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500 animate-pulse" />
          </span>
        </button>

        {/* Zone 2: 6 Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={() => sounds.playClick()}
                className={`relative py-1 transition-colors whitespace-nowrap ${
                  isActive ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action items (Theme Toggle, Sound Toggle, Customize Tribute) */}
        <div className="flex items-center gap-2">
          {/* Dark / Light Mode Toggle */}
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              onToggleThemeMode();
            }}
            className="rounded-lg border border-slate-800 bg-slate-900/80 p-2 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            aria-label={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {isLight ? (
              <Moon className="h-4 w-4 text-indigo-500" />
            ) : (
              <Sun className="h-4 w-4 text-amber-400" />
            )}
          </button>

          {/* Sound toggle */}
          <button
            type="button"
            onClick={() => {
              onToggleSound();
              sounds.playClick();
            }}
            className="rounded-lg border border-slate-800 bg-slate-900/80 p-2 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            title={settings.soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            aria-label="Toggle sound"
          >
            {settings.soundEnabled ? (
              <Volume2 className="h-4 w-4 text-cyan-400" />
            ) : (
              <VolumeX className="h-4 w-4 text-slate-500" />
            )}
          </button>

          {/* Honoring Teacher Customizer button */}
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              onOpenCustomizer();
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-900/50 hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(56,189,248,0.1)] whitespace-nowrap"
          >
            <Sliders className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Honoring:</span>
            <span className="font-bold text-white max-w-[110px] truncate">
              {currentTeacher.name}
            </span>
          </button>

          {/* Mobile menu hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-lg border border-slate-800 bg-slate-900 p-2 text-slate-400 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-3 pb-5 space-y-3 backdrop-blur-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => {
                  sounds.playClick();
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  activeSection === link.id
                    ? 'bg-cyan-950/60 text-cyan-300 font-semibold'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">Celebrating {currentTeacher.name}</span>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCustomizer();
              }}
              className="text-xs font-semibold text-cyan-400 hover:underline"
            >
              Change Teacher
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
