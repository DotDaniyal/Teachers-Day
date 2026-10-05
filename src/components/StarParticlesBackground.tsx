import React, { useEffect, useRef } from 'react';

interface StarParticle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  alphaSpeed: number;
  color: string;
}

const STAR_COLORS_DARK = [
  '255, 255, 255',   // Pure soft white
  '56, 189, 248',    // Electric cyan
  '129, 140, 248',   // Soft indigo
  '251, 191, 36',    // Subtle warm gold
];

const STAR_COLORS_LIGHT = [
  '2, 132, 199',     // Deep sky cyan
  '79, 70, 229',     // Indigo
  '217, 119, 6',     // Warm amber gold
  '100, 116, 139',   // Slate
];

interface StarParticlesBackgroundProps {
  themeMode?: 'dark' | 'light';
}

export const StarParticlesBackground: React.FC<StarParticlesBackgroundProps> = ({
  themeMode = 'dark',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    let animationFrameId: number;
    let isPageVisible = !document.hidden;
    let particles: StarParticle[] = [];
    const mouse = { x: -1000, y: -1000 };

    const palette = themeMode === 'light' ? STAR_COLORS_LIGHT : STAR_COLORS_DARK;

    const initParticles = (width: number, height: number) => {
      const isMobile = width < 768;
      const count = isMobile ? 32 : 75;

      particles = Array.from({ length: count }, () => {
        const radius = Math.random() * 1.5 + 0.5;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius,
          vx: (Math.random() - 0.5) * 0.18,
          vy: -Math.random() * 0.2 - 0.03,
          alpha: Math.random() * 0.55 + 0.15,
          alphaSpeed: (Math.random() * 0.005 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
          color: palette[Math.floor(Math.random() * palette.length)],
        };
      });
    };

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(width, height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchDevice) return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible && !prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    if (!isTouchDevice) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (!isPageVisible) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle connecting constellation lines between nearby particles
      const maxConnectDist = width < 768 ? 85 : 120;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < maxConnectDist * maxConnectDist) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / maxConnectDist) * (themeMode === 'light' ? 0.07 : 0.09);
            ctx.strokeStyle =
              themeMode === 'light'
                ? `rgba(2, 132, 199, ${lineAlpha})`
                : `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha += p.alphaSpeed;

          // Subtle cursor interaction on desktop
          if (!isTouchDevice && mouse.x > 0) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < 14000 && distSq > 1) {
              const dist = Math.sqrt(distSq);
              const force = (118 - dist) / 118;
              p.x += (dx / dist) * force * 0.35;
              p.y += (dy / dist) * force * 0.35;
            }
          }

          if (p.alpha <= 0.12 || p.alpha >= 0.8) {
            p.alphaSpeed = -p.alphaSpeed;
            p.alpha = Math.max(0.12, Math.min(0.8, p.alpha));
          }

          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }

        const effectiveAlpha = themeMode === 'light' ? p.alpha * 0.55 : p.alpha;

        if (p.radius > 1.2) {
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3.5);
          gradient.addColorStop(0, `rgba(${p.color}, ${effectiveAlpha * 0.45})`);
          gradient.addColorStop(1, `rgba(${p.color}, 0)`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = `rgba(${p.color}, ${effectiveAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!prefersReducedMotion && isPageVisible) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [themeMode]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
};
