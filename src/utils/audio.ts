/**
 * Web Audio API synthesizer for tasteful UI micro-interactions & soothing ambient background music
 */
class SoundEffects {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private ambientInterval: number | null = null;
  public isAmbientPlaying: boolean = false;
  public isAmbientMuted: boolean = false;

  private getContext(forceCreate = false): AudioContext | null {
    if (!this.enabled && !forceCreate) return null;
    try {
      if (!this.ctx && typeof window !== 'undefined') {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  // Soft keyboard/tap click
  public playClick() {
    const ctx = this.getContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(580, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  }

  // Celebratory warm chime for "Say Thank You" or Card Open
  public playChime() {
    const ctx = this.getContext();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + index * 0.07;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.06, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.65);
    });
  }

  // Easter egg terminal retro blip
  public playEasterEgg() {
    const ctx = this.getContext();
    if (!ctx) return;
    const freqs = [330, 440, 550, 660, 880, 1100];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = ctx.currentTime + i * 0.05;
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, t);
      gain.gain.setValueAtTime(0.03, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.09);
    });
  }

  // Play a single gentle ambient chord + arpeggio note sequence
  private playAmbientBar(chordIndex: number) {
    if (!this.isAmbientPlaying || this.isAmbientMuted) return;
    const ctx = this.getContext(true);
    if (!ctx) return;

    // Warm Cmaj7 -> Am7 -> Fmaj7 -> G6 progression
    const chords = [
      [261.63, 329.63, 392.0, 493.88], // Cmaj7
      [220.0, 261.63, 329.63, 392.0],  // Am7
      [174.61, 220.0, 261.63, 329.63], // Fmaj7
      [196.0, 246.94, 293.66, 329.63], // G6
    ];

    const notes = chords[chordIndex % chords.length];
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.35);

      gain.gain.setValueAtTime(0.0001, now + idx * 0.35);
      gain.gain.linearRampToValueAtTime(0.022, now + idx * 0.35 + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.35 + 2.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.35);
      osc.stop(now + idx * 0.35 + 2.7);
    });
  }

  public startAmbientMusic() {
    if (this.isAmbientPlaying) return;
    this.isAmbientPlaying = true;
    let step = 0;
    this.playAmbientBar(step++);
    this.ambientInterval = window.setInterval(() => {
      if (this.isAmbientPlaying && !this.isAmbientMuted) {
        this.playAmbientBar(step++);
      }
    }, 2800);
  }

  public stopAmbientMusic() {
    this.isAmbientPlaying = false;
    if (this.ambientInterval !== null) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
  }
}

export const sounds = new SoundEffects();
