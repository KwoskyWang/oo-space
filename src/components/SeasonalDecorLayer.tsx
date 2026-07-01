import type { CSSProperties } from "react";
import type { DecorItem } from "../data/seasonContent";
import type { Season } from "../data/poseMap";

type SeasonalDecorLayerProps = {
  items: DecorItem[];
  season: Season;
};

function SeasonalDecorLayer({ items, season }: SeasonalDecorLayerProps) {
  return (
    <div className={`seasonal-decor seasonal-decor--${season}`} aria-hidden="true">
      {items.map((item) => (
        <span
          className={`seasonal-decor__item seasonal-decor__item--${item.layer}`}
          key={item.id}
          style={
            {
              "--decor-x": `${item.x}%`,
              "--decor-y": `${item.y}%`,
              "--decor-size": `${item.size}px`,
              "--decor-delay": `${item.delay}s`,
              "--decor-duration": `${item.duration}s`,
            } as CSSProperties
          }
        >
          {item.symbol}
        </span>
      ))}
    </div>
  );
}

export default SeasonalDecorLayer;
