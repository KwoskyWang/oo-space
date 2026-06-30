import type { MemoryCard as MemoryCardType } from "../data/siteContent";
import PixelVideoPlaceholder from "./PixelVideoPlaceholder";

type MemoryCardProps = {
  memory: MemoryCardType;
};

function MemoryImagePlaceholder({ memory }: { memory: MemoryCardType }) {
  if (memory.assetUrl) {
    return <img className="memory-real-media" src={memory.assetUrl} alt={memory.title} />;
  }

  return (
    <div className={`memory-art memory-art--${memory.placeholderTheme}`} aria-label={`${memory.title} 占位图`}>
      <span className="memory-art__sun" />
      <span className="memory-art__street" />
      <span className="memory-art__building memory-art__building--left" />
      <span className="memory-art__building memory-art__building--right" />
      <span className="memory-art__cup" />
      <span className="memory-art__desk" />
      <span className="memory-art__ticket" />
      <span className="memory-art__path" />
      <span className="memory-art__snow memory-art__snow--one" />
      <span className="memory-art__snow memory-art__snow--two" />
      <span className="memory-art__fruit memory-art__fruit--one" />
      <span className="memory-art__fruit memory-art__fruit--two" />
      <span className="memory-art__spark memory-art__spark--one" />
      <span className="memory-art__spark memory-art__spark--two" />
      <span className="memory-art__label">{memory.subtitleEs}</span>
    </div>
  );
}

function MemoryCard({ memory }: MemoryCardProps) {
  const hasVideoAsset = memory.type === "video" && memory.assetUrl;

  return (
    <article className={`pixel-card memory-card memory-card--${memory.placeholderTheme}`}>
      <span className="pixel-sticker memory-card__sticker" aria-hidden="true">
        {memory.sticker}
      </span>

      <div className="memory-media">
        {hasVideoAsset ? (
          <video className="memory-real-media" controls src={memory.assetUrl} />
        ) : memory.type === "video" ? (
          <PixelVideoPlaceholder palette={memory.placeholderTheme} title={memory.title} />
        ) : (
          <MemoryImagePlaceholder memory={memory} />
        )}
      </div>

      <div className="memory-card__body">
        <div className="tag-row">
          <span className="pixel-tag">{memory.dateLabel}</span>
          <span className="mini-tag">{memory.subtitleEs}</span>
        </div>
        <h3>{memory.title}</h3>
        <p>{memory.description}</p>
        <p className="spanish-line">{memory.quoteEs}</p>
        <div className="tag-row">
          {memory.tags.map((tag) => (
            <span className="mini-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default MemoryCard;
