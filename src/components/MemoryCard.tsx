import type { Season, HeroPose } from "../data/poseMap";
import type { MemoryCard as MemoryCardType } from "../data/siteContent";
import OoPixelAvatar from "./OoPixelAvatar";
import { PixelTag } from "./PixelPrimitives";
import PixelVideoPlaceholder from "./PixelVideoPlaceholder";

type MemoryCardProps = {
  memory: MemoryCardType;
  pose?: HeroPose;
  season: Season;
};

function MemoryImagePlaceholder({ memory, pose }: { memory: MemoryCardType; pose?: HeroPose }) {
  if (memory.assetUrl) {
    return (
      <img
        className="memory-real-media"
        src={memory.assetUrl}
        alt={memory.title}
        loading="lazy"
      />
    );
  }

  return (
    <div className={`memory-art memory-art--${memory.placeholderTheme}`} aria-label={`${memory.title} 占位图`}>
      <span className="memory-art__sun" />
      <span className="memory-art__flag" />
      <span className="memory-art__street" />
      <span className="memory-art__building memory-art__building--left" />
      <span className="memory-art__building memory-art__building--right" />
      <span className="memory-art__cup" />
      <span className="memory-art__lamp" />
      <span className="memory-art__desk" />
      <span className="memory-art__note" />
      <span className="memory-art__ticket" />
      <span className="memory-art__path" />
      <span className="memory-art__planet" />
      <span className="memory-art__snow memory-art__snow--one" />
      <span className="memory-art__snow memory-art__snow--two" />
      <span className="memory-art__fruit memory-art__fruit--one" />
      <span className="memory-art__fruit memory-art__fruit--two" />
      {pose ? (
        <OoPixelAvatar
          className="memory-art__avatar"
          pose={pose}
          size="card"
        />
      ) : null}
      <span className="memory-art__spark memory-art__spark--one" />
      <span className="memory-art__spark memory-art__spark--two" />
      <span className="memory-art__label">{memory.subtitleEs}</span>
    </div>
  );
}

const winterStickers: Record<string, string> = {
  "spain-sun": "❄",
  "hangzhou-days": "◇",
  "fruit-planet": "✹",
  "work-oo": "☕",
  "weekend-happy": "🧣",
  "coffee-winter": "☃",
};

function MemoryCard({ memory, pose, season }: MemoryCardProps) {
  const hasVideoAsset = memory.type === "video" && memory.assetUrl;
  const sticker = season === "winter" ? winterStickers[memory.id] ?? "❄" : memory.sticker;

  return (
    <article className={`pixel-card memory-card memory-card--${memory.placeholderTheme}`}>
      <span className="pixel-sticker memory-card__sticker" aria-hidden="true">
        {season === "winter" && memory.id === "coffee-winter" && pose ? (
          <OoPixelAvatar
            pose={pose}
            size="mini"
            decorative
          />
        ) : (
          sticker
        )}
      </span>

      <div className="memory-media">
        {hasVideoAsset ? (
          <video className="memory-real-media" controls src={memory.assetUrl} preload="metadata" />
        ) : memory.type === "video" ? (
          <PixelVideoPlaceholder palette={memory.placeholderTheme} title={memory.title} />
        ) : (
          <MemoryImagePlaceholder memory={memory} pose={pose} />
        )}
      </div>

      <div className="memory-card__body">
        <div className="tag-row">
          <PixelTag>{memory.dateLabel}</PixelTag>
          <PixelTag variant="mini">{memory.subtitleEs}</PixelTag>
        </div>
        <h3>{memory.title}</h3>
        <p>{memory.description}</p>
        <p className="spanish-line">{memory.quoteEs}</p>
        <div className="tag-row">
          {memory.tags.map((tag) => (
            <PixelTag variant="mini" key={tag}>
              {tag}
            </PixelTag>
          ))}
        </div>
      </div>
    </article>
  );
}

export default MemoryCard;
