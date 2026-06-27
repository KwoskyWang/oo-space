import type { MemoryCard as MemoryCardType } from "../data/siteContent";
import PixelVideoPlaceholder from "./PixelVideoPlaceholder";

type MemoryCardProps = {
  memory: MemoryCardType;
};

function MemoryImagePlaceholder({ palette, title }: Pick<MemoryCardType, "palette" | "title">) {
  return (
    <div className={`memory-art memory-art--${palette}`} aria-label={`${title} 占位图`}>
      {/* TODO: 把这里替换成真实图片时，可以改为 <img src="/your-photo.jpg" alt="..." />。 */}
      <span className="memory-art__sun" />
      <span className="memory-art__hill memory-art__hill--left" />
      <span className="memory-art__hill memory-art__hill--right" />
      <span className="memory-art__spark memory-art__spark--one" />
      <span className="memory-art__spark memory-art__spark--two" />
      <span className="memory-art__label">{palette}</span>
    </div>
  );
}

function MemoryCard({ memory }: MemoryCardProps) {
  return (
    <article className="pixel-card memory-card">
      <div className="memory-media">
        {memory.type === "video" ? (
          <PixelVideoPlaceholder palette={memory.palette} title={memory.title} />
        ) : (
          <MemoryImagePlaceholder palette={memory.palette} title={memory.title} />
        )}
      </div>

      <div className="memory-card__body">
        <div className="tag-row">
          <span className="pixel-tag">{memory.dateLabel}</span>
        </div>
        <h3>{memory.title}</h3>
        <p>{memory.description}</p>
        <p className="spanish-line">{memory.spanishLine}</p>
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
