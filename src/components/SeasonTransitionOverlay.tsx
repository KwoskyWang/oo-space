import { useEffect, useState } from "react";
import type { Season } from "../data/poseMap";

type SeasonTransitionOverlayProps = {
  season: Season;
};

function SeasonTransitionOverlay({ season }: SeasonTransitionOverlayProps) {
  const [activeSeason, setActiveSeason] = useState<Season | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setActiveSeason(season);
    const timer = window.setTimeout(() => setActiveSeason(null), 680);
    return () => window.clearTimeout(timer);
  }, [season]);

  if (!activeSeason) return null;

  return (
    <div className={`season-transition season-transition--${activeSeason}`} aria-hidden="true">
      {Array.from({ length: 14 }, (_, index) => (
        <span
          key={index}
          style={
            {
              "--transition-delay": `${index * 18}ms`,
              "--transition-x": `${(index * 7 + 8) % 96}vw`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export default SeasonTransitionOverlay;
