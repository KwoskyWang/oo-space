import { useEffect, useRef } from "react";
import type { Season } from "../data/poseMap";

type ScrollSparkleTrailProps = {
  season: Season;
};

function ScrollSparkleTrail({ season }: ScrollSparkleTrailProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 480) return;

    let lastScrollY = window.scrollY;
    let lastSpawnedAt = 0;
    let cleanupTimer = 0;
    let id = 0;

    function handleScroll() {
      if (!container) return;
      const now = performance.now();
      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;

      if (now - lastSpawnedAt < 72 || Math.abs(delta) < 2) return;
      lastSpawnedAt = now;

      const side = Math.random() > 0.5 ? 1 : 0;
      const count = window.innerWidth < 860 ? 1 : 2;

      for (let i = 0; i < count; i++) {
        const sparkle = document.createElement("span");
        const x = side ? window.innerWidth - 24 - Math.random() * 76 : 24 + Math.random() * 76;
        const y = 80 + Math.random() * (window.innerHeight - 160);
        const driftY = `${delta > 0 ? -22 : 22}px`;
        sparkle.style.cssText = `--sparkle-x:${x}px;--sparkle-y:${y}px;--sparkle-drift-y:${driftY}`;
        container.appendChild(sparkle);
        sparkle.addEventListener("animationend", () => sparkle.remove());
      }

      window.clearTimeout(cleanupTimer);
      cleanupTimer = window.setTimeout(() => {
        if (!container) return;
        const children = container.children;
        while (children.length > 4) {
          (children[0] as HTMLElement).remove();
        }
      }, 400);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(cleanupTimer);
      if (container) container.innerHTML = "";
    };
  }, [season]);

  return (
    <div
      className={`scroll-sparkle-trail scroll-sparkle-trail--${season}`}
      ref={containerRef}
      aria-hidden="true"
    />
  );
}

export default ScrollSparkleTrail;
