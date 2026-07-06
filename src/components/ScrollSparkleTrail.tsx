import { useEffect, useState } from "react";
import type { Season } from "../data/poseMap";

type Sparkle = {
  driftY: string;
  id: number;
  x: number;
  y: number;
};

type ScrollSparkleTrailProps = {
  season: Season;
};

function ScrollSparkleTrail({ season }: ScrollSparkleTrailProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lastScrollY = window.scrollY;
    let lastSpawnedAt = 0;
    let cleanupTimer = 0;
    let id = 0;

    function handleScroll() {
      const now = performance.now();
      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;

      if (now - lastSpawnedAt < 72 || Math.abs(delta) < 2) return;
      lastSpawnedAt = now;

      const side = Math.random() > 0.5 ? 1 : 0;
      const count = window.innerWidth < 720 ? 1 : 2;
      const next = Array.from({ length: count }, () => ({
        driftY: `${delta > 0 ? -22 : 22}px`,
        id: id++,
        x: side ? window.innerWidth - 24 - Math.random() * 76 : 24 + Math.random() * 76,
        y: 80 + Math.random() * (window.innerHeight - 160),
      }));

      setSparkles((current) => [...current.slice(-14), ...next]);
      window.clearTimeout(cleanupTimer);
      cleanupTimer = window.setTimeout(() => {
        setSparkles((current) => current.slice(-4));
      }, 400);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(cleanupTimer);
    };
  }, [season]);

  return (
    <div className={`scroll-sparkle-trail scroll-sparkle-trail--${season}`} aria-hidden="true">
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          style={
            {
              "--sparkle-x": `${sparkle.x}px`,
              "--sparkle-y": `${sparkle.y}px`,
              "--sparkle-drift-y": sparkle.driftY,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export default ScrollSparkleTrail;
