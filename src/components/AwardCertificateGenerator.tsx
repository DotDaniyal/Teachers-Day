import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Award, Download, Share2, Check, Sparkles, Palette, User, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Teacher } from '../types';
import { sounds } from '../utils/audio';

interface AwardCertificateGeneratorProps {
  currentTeacher: Teacher;
  defaultStudentName: string;
}

const AWARD_TITLES = [
  { id: 'patient', title: 'Most Patient Mentor 🏆', badge: 'PATIENCE & EMPATHY EXCELLENCE' },
  { id: 'ai', title: 'Master of AI & Innovation 🧠', badge: 'VISIONARY AI & TECH EDUCATOR' },
  { id: 'code', title: 'Code & Architecture Legend 💻', badge: 'DISTINGUISHED ENGINEERING MENTOR' },
  { id: 'heart', title: 'Heart of Gold Educator ❤️', badge: 'DEDICATION BEYOND THE CLASSROOM' },
  { id: 'inspire', title: 'Lifetime Inspiration Award 🌟', badge: 'SHAPING FUTURE CREATORS' },
];

const CERTIFICATE_THEMES = [
  {
    id: 'cyan-gold',
    name: 'Royal Cyan & Gold',
    border: 'border-amber-400/50',
    bg: 'from-slate-900 via-slate-950 to-cyan-950/60',
    accentText: 'text-amber-300',
    sealBg: 'from-amber-400 via-yellow-500 to-amber-600',
    canvasPrimary: '#38bdf8',
    canvasSecondary: '#fbbf24',
  },
  {
    id: 'emerald',
    name: 'Midnight Emerald',
    border: 'border-emerald-400/50',
    bg: 'from-slate-900 via-slate-950 to-emerald-950/60',
    accentText: 'text-emerald-300',
    sealBg: 'from-emerald-400 via-teal-500 to-emerald-600',
    canvasPrimary: '#34d399',
    canvasSecondary: '#38bdf8',
  },
  {
    id: 'rose-indigo',
    name: 'Imperial Rose & Indigo',
    border: 'border-rose-400/50',
    bg: 'from-slate-900 via-indigo-950/50 to-rose-950/50',
    accentText: 'text-rose-300',
    sealBg: 'from-rose-500 via-pink-500 to-indigo-500',
    canvasPrimary: '#fb7185',
    canvasSecondary: '#818cf8',
  },
];

export const AwardCertificateGenerator: React.FC<AwardCertificateGeneratorProps> = ({
  currentTeacher,
  defaultStudentName,
}) => {
  const [recipientName, setRecipientName] = useState(currentTeacher.name);
  const [subjectName, setSubjectName] = useState(currentTeacher.subject);
  const [selectedAwardId, setSelectedAwardId] = useState(AWARD_TITLES[0].id);
  const [selectedThemeId, setSelectedThemeId] = useState(CERTIFICATE_THEMES[0].id);
  const [presentedBy, setPresentedBy] = useState(defaultStudentName || 'Batch of 2026');
  const [citation, setCitation] = useState(
    'In grateful recognition of extraordinary mentorship, boundless patience, and for inspiring students to think fearlessly and build the future.'
  );
  const [sharedToast, setSharedToast] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    setRecipientName(currentTeacher.name);
    setSubjectName(currentTeacher.subject);
  }, [currentTeacher]);

  const currentAward = AWARD_TITLES.find((a) => a.id === selectedAwardId) || AWARD_TITLES[0];
  const currentTheme =
    CERTIFICATE_THEMES.find((t) => t.id === selectedThemeId) || CERTIFICATE_THEMES[0];

  const handleDownloadCertificate = () => {
    sounds.playChime();
    setDownloading(true);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 820;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 1200, 820);
      bgGrad.addColorStop(0, '#090d16');
      bgGrad.addColorStop(0.5, '#0f172a');
      bgGrad.addColorStop(1, '#090d16');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1200, 820);

      // Outer decorative border
      ctx.strokeStyle = currentTheme.canvasSecondary;
      ctx.lineWidth = 4;
      ctx.strokeRect(36, 36, 1128, 748);

      // Inner hairline border
      ctx.strokeStyle = currentTheme.canvasPrimary;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(52, 52, 1096, 716);

      // Header Kicker
      ctx.fillStyle = currentTheme.canvasPrimary;
      ctx.font = 'bold 18px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('OFFICIAL TEACHERS’ DAY TRIBUTE • 2026', 600, 130);

      // Main Certificate Title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 46px sans-serif';
      ctx.fillText('CERTIFICATE OF APPRECIATION', 600, 195);

      // Award Badge Title
      ctx.fillStyle = currentTheme.canvasSecondary;
      ctx.font = 'bold 30px sans-serif';
      ctx.fillText(currentAward.title, 600, 260);

      // "PROUDLY PRESENTED TO"
      ctx.fillStyle = '#94a3b8';
      ctx.font = '16px monospace';
      ctx.fillText('PROUDLY PRESENTED TO', 600, 325);

      // Recipient Teacher Name
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 64px sans-serif';
      ctx.fillText(recipientName || currentTeacher.name, 600, 405);

      // Subject Line
      ctx.fillStyle = currentTheme.canvasPrimary;
      ctx.font = 'bold 22px monospace';
      ctx.fillText(subjectName || currentTeacher.subject, 600, 450);

      // Citation Paragraph (word-wrapped)
      ctx.fillStyle = '#cbd5e1';
      ctx.font = 'italic 22px sans-serif';
      const words = citation.split(' ');
      let line = '';
      let y = 525;
      const maxWidth = 860;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText(line.trim(), 600, y);
          line = words[n] + ' ';
          y += 34;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line.trim(), 600, y);

      // Footer Signatures
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(180, 685);
      ctx.lineTo(440, 685);
      ctx.moveTo(760, 685);
      ctx.lineTo(1020, 685);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText(presentedBy || 'Your Grateful Students', 310, 670);
      ctx.fillText('Happy Teachers’ Day ❤️', 890, 670);

      ctx.fillStyle = '#64748b';
      ctx.font = '14px monospace';
      ctx.fillText('PRESENTED BY', 310, 712);
      ctx.fillText('CLASS OF 2026 SEAL', 890, 712);

      // Trigger download
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `Teachers_Day_Certificate_${(recipientName || 'Teacher').replace(/\s+/g, '_')}.png`;
      link.href = dataUrl;
      link.click();

      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.7 },
      });
    } finally {
      setTimeout(() => setDownloading(false), 600);
    }
  };

  const handleShareCertificate = async () => {
    sounds.playChime();
    const text = `🏆 Official Teachers' Day Award: "${currentAward.title}" proudly presented to ${recipientName} (${subjectName}) by ${presentedBy}! ❤️`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Award Certificate for ${recipientName}`,
          text,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(text);
      setSharedToast(true);
      setTimeout(() => setSharedToast(false), 2500);
    } catch {
      // ignore
    }
  };

  return (
    <section id="certificate" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="flex items-center justify-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-amber-400 mb-3">
          <Award className="h-4 w-4" />
          <span>Interactive Award Certificate Builder</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight text-balance mb-4">
          Present an Official Mentor Award 🏆
        </h2>
        <p className="text-base sm:text-lg text-slate-300">
          Customize a high-resolution digital certificate of appreciation for {recipientName} and download or share it immediately.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Controls Builder Panel (5 Cols) */}
        <div className="lg:col-span-5 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-7 backdrop-blur-xl shadow-xl space-y-5">
          <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span>Customize Certificate</span>
          </h3>

          {/* Recipient Teacher Name */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1.5">
              Recipient Teacher Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-4 text-sm text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Award Title Selector */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1.5">
              Select Award Title
            </label>
            <div className="space-y-2">
              {AWARD_TITLES.map((award) => {
                const isSelected = award.id === selectedAwardId;
                return (
                  <button
                    key={award.id}
                    type="button"
                    onClick={() => {
                      sounds.playClick();
                      setSelectedAwardId(award.id);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-amber-400 bg-amber-950/30 text-amber-200 shadow-sm'
                        : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span>{award.title}</span>
                    {isSelected && <Check className="h-4 w-4 text-amber-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Certificate Design Theme */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1.5">
              <Palette className="inline h-3.5 w-3.5 mr-1 text-cyan-400" />
              Certificate Style
            </label>
            <div className="grid grid-cols-3 gap-2">
              {CERTIFICATE_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    setSelectedThemeId(theme.id);
                  }}
                  className={`px-3 py-2 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                    selectedThemeId === theme.id
                      ? 'border-cyan-400 bg-cyan-950/50 text-white'
                      : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:text-white'
                  }`}
                >
                  {theme.name}
                </button>
              ))}
            </div>
          </div>

          {/* Presented By */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1">
                Subject / Specialty
              </label>
              <input
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1">
                Presented By
              </label>
              <input
                type="text"
                value={presentedBy}
                onChange={(e) => setPresentedBy(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleDownloadCertificate}
              disabled={downloading}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-amber-500/20 hover:opacity-95 transition-all cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>{downloading ? 'Generating PNG...' : 'Download Certificate (PNG)'}</span>
            </button>

            <button
              type="button"
              onClick={handleShareCertificate}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
            >
              {sharedToast ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4 text-cyan-400" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Live Certificate Preview (7 Cols) */}
        <motion.div
          key={`${selectedAwardId}-${selectedThemeId}`}
          initial={{ opacity: 0.9, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className={`lg:col-span-7 rounded-3xl border-2 ${currentTheme.border} bg-gradient-to-br ${currentTheme.bg} p-6 sm:p-10 shadow-2xl relative overflow-hidden`}
        >
          {/* Inner Ornamental Frame */}
          <div className="rounded-2xl border border-white/15 bg-slate-950/65 p-6 sm:p-10 text-center relative backdrop-blur-md">
            {/* Official Gold Seal */}
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-amber-400 via-yellow-500 to-amber-600 p-1 shadow-lg shadow-amber-500/30">
              <div className="flex h-full w-full items-center justify-center rounded-full border border-amber-200/60 bg-slate-950/90">
                <Award className="h-8 w-8 text-amber-400" />
              </div>
            </div>

            <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-cyan-400 font-semibold mb-2">
              OFFICIAL TEACHERS&apos; DAY TRIBUTE • 2026
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-wider uppercase mb-3">
              Certificate of Appreciation
            </h3>

            <div className={`inline-block rounded-full border border-white/10 bg-slate-900/90 px-4 py-1 text-sm sm:text-base font-bold ${currentTheme.accentText} mb-6`}>
              {currentAward.title}
            </div>

            <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
              PROUDLY PRESENTED TO
            </p>

            <h4 className="text-3xl sm:text-5xl font-extrabold font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-amber-200 tracking-tight mb-2">
              {recipientName || currentTeacher.name}
            </h4>

            <p className="text-xs sm:text-sm font-mono text-cyan-400 font-semibold mb-6">
              {subjectName || currentTeacher.subject}
            </p>

            <p className="text-sm sm:text-base text-slate-300 italic max-w-xl mx-auto leading-relaxed mb-8">
              &ldquo;{citation}&rdquo;
            </p>

            {/* Signatures Footer */}
            <div className="pt-6 border-t border-slate-800/90 grid grid-cols-2 gap-6 text-center">
              <div>
                <p className="text-sm font-bold text-white mb-1">
                  {presentedBy || 'Your Grateful Students'}
                </p>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block border-t border-slate-800 pt-1.5 max-w-[180px] mx-auto">
                  PRESENTED BY
                </span>
              </div>
              <div>
                <p className="text-sm font-bold text-amber-300 mb-1 flex items-center justify-center gap-1">
                  <ShieldCheck className="h-4 w-4 text-amber-400" />
                  <span>Verified Honor</span>
                </p>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block border-t border-slate-800 pt-1.5 max-w-[180px] mx-auto">
                  CLASS OF 2026 SEAL
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
