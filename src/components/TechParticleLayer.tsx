import { useEffect, useRef } from "react";
import type { Season } from "../data/poseMap";

type TechParticleLayerProps = {
  season: Season;
};

type Particle = {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;
  pulse: number;
};

const palettes: Record<Season, string[]> = {
  summer: ["#ff8fab", "#ffc857", "#8ccf7e", "#e84a8a"],
  winter: ["#bde7f7", "#ffffff", "#d9d7ff", "#c99a6b"],
};

function TechParticleLayer({ season }: TechParticleLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const canvasElement = canvas;
    const context = ctx;

    let frameId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;
    let isPageVisible = !document.hidden;
    let particles: Particle[] = [];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvasElement.width = width * dpr;
      canvasElement.height = height * dpr;
      canvasElement.style.width = `${width}px`;
      canvasElement.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 720 ? 28 : 72;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1 + Math.random() * 2.4,
        vx: -0.08 + Math.random() * 0.16,
        vy: -0.05 + Math.random() * 0.1,
        alpha: 0.22 + Math.random() * 0.34,
        pulse: Math.random() * Math.PI * 2,
      }));
    }

    function handleScroll() {
      const current = window.scrollY;
      scrollVelocity = Math.max(-5, Math.min(5, current - lastScrollY));
      lastScrollY = current;
    }

    function draw(now: number) {
      if (!isPageVisible) {
        frameId = window.requestAnimationFrame(draw);
        return;
      }

      context.clearRect(0, 0, width, height);
      const palette = palettes[season];
      scrollVelocity *= 0.92;

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy - scrollVelocity * 0.08;
        particle.pulse += 0.035;

        if (particle.x < -12) particle.x = width + 12;
        if (particle.x > width + 12) particle.x = -12;
        if (particle.y < -12) particle.y = height + 12;
        if (particle.y > height + 12) particle.y = -12;

        const glow = 0.56 + Math.sin(particle.pulse) * 0.26;
        context.globalAlpha = particle.alpha * glow;
        context.fillStyle = palette[index % palette.length];
        context.fillRect(Math.round(particle.x), Math.round(particle.y), particle.size, particle.size);

        if (index % 7 === 0) {
          context.globalAlpha = particle.alpha * 0.28;
          context.strokeStyle = palette[(index + 1) % palette.length];
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(particle.x + Math.sin(now / 1200 + index) * 18, particle.y + 10);
          context.stroke();
        }
      });

      context.globalAlpha = 1;
      frameId = window.requestAnimationFrame(draw);
    }

    function handleVisibilityChange() {
      isPageVisible = !document.hidden;
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    frameId = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [season]);

  return <canvas className="tech-particle-layer" ref={canvasRef} aria-hidden="true" />;
}

export default TechParticleLayer;
