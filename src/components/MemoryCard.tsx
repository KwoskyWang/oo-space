import type { Season, HeroPose } from "../data/poseMap";
import type { MemoryCard as MemoryCardType } from "../data/siteContent";
import OoPixelAvatar from "./OoPixelAvatar";
import { PixelCard, PixelTag } from "./PixelPrimitives";
import PixelVideoPlaceholder from "./PixelVideoPlaceholder";

type MemoryCardProps = {
  memory: MemoryCardType;
  pose?: HeroPose;
  season: Season;
};

// Perf-19: elements to render per theme (replaces CSS display:none)
const themeElements: Record<string, Set<string>> = {
  spain:   new Set(["sun", "flag", "street", "building-left", "building-right", "cup", "lamp", "desk", "note", "ticket", "path", "planet", "snow-one", "snow-two", "fruit-one", "fruit-two"]),
  hangzhou: new Set(["building-left", "building-right", "cup", "desk", "note", "path", "planet", "snow-one", "snow-two", "fruit-one", "fruit-two"]),
  fruit:   new Set(["street", "building-left", "building-right", "cup", "lamp", "desk", "note", "ticket", "path", "planet", "fruit-one", "fruit-two"]),
  work:    new Set(["sun", "flag", "street", "building-left", "building-right", "cup", "lamp", "desk", "note", "ticket", "path", "planet", "snow-one", "snow-two"]),
  weekend: new Set(["sun", "flag", "street", "building-left", "building-right", "cup", "lamp", "desk", "note", "ticket", "path", "planet", "fruit-one", "fruit-two"]),
  coffee:  new Set(["street", "building-left", "building-right", "cup", "lamp", "desk", "note", "ticket", "path", "planet", "snow-one", "snow-two"]),
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

  const allowed = themeElements[memory.placeholderTheme] ?? new Set();
  const hidden = (id: string) => allowed.has(id) ? undefined : "true";

  return (
    <div className={`memory-art memory-art--${memory.placeholderTheme}`} aria-label={`${memory.title} 占位图`}>
      <span className="memory-art__sun" data-art-hidden={hidden("sun")} />
      <span className="memory-art__flag" data-art-hidden={hidden("flag")} />
      <span className="memory-art__street" data-art-hidden={hidden("street")} />
      <span className="memory-art__building memory-art__building--left" data-art-hidden={hidden("building-left")} />
      <span className="memory-art__building memory-art__building--right" data-art-hidden={hidden("building-right")} />
      <span className="memory-art__cup" data-art-hidden={hidden("cup")} />
      <span className="memory-art__lamp" data-art-hidden={hidden("lamp")} />
      <span className="memory-art__desk" data-art-hidden={hidden("desk")} />
      <span className="memory-art__note" data-art-hidden={hidden("note")} />
      <span className="memory-art__ticket" data-art-hidden={hidden("ticket")} />
      <span className="memory-art__path" data-art-hidden={hidden("path")} />
      <span className="memory-art__planet" data-art-hidden={hidden("planet")} />
      <span className="memory-art__snow memory-art__snow--one" data-art-hidden={hidden("snow-one")} />
      <span className="memory-art__snow memory-art__snow--two" data-art-hidden={hidden("snow-two")} />
      <span className="memory-art__fruit memory-art__fruit--one" data-art-hidden={hidden("fruit-one")} />
      <span className="memory-art__fruit memory-art__fruit--two" data-art-hidden={hidden("fruit-two")} />
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
    <PixelCard as="article" className={`memory-card memory-card--${memory.placeholderTheme}`}>
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
    </PixelCard>
  );
}

export default MemoryCard;
