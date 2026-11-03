import type { Album } from "../data/albums";
import { PixelCard, PixelTag } from "./PixelPrimitives";

type MemoryCardProps = {
  album: Album;
  onOpen: (album: Album) => void;
};

function MemoryCard({ album, onOpen }: MemoryCardProps) {
  return (
    <PixelCard as="article" className="memory-album-card">
      <span className="pixel-sticker memory-album-card__sticker" aria-hidden="true">
        {album.sticker}
      </span>

      <button
        type="button"
        className="memory-album-card__cover"
        aria-label={`打开${album.title}相册`}
        onClick={() => onOpen(album)}
      >
        <img
          src={album.cover}
          alt={`${album.title}封面`}
          loading="lazy"
          width="750"
          height="1000"
          style={{ objectPosition: album.position }}
        />
        <span className="memory-album-card__label" lang="es">
          {album.label}
        </span>
      </button>

      <div className="memory-album-card__body">
        <div className="tag-row">
          <PixelTag>{album.date}</PixelTag>
          <PixelTag variant="mini">{album.label}</PixelTag>
        </div>
        <h3>{album.title}</h3>
        <p>{album.description}</p>
        <p className="spanish-line">{album.quote}</p>
        <div className="tag-row">
          {album.tags.map((tag) => (
            <PixelTag variant="mini" key={tag}>
              {tag}
            </PixelTag>
          ))}
        </div>
        <div className="memory-album-card__bottom">
          <button
            type="button"
            className="pixel-button memory-album-card__open"
            onClick={() => onOpen(album)}
          >
            🖼️ 打开相册
          </button>
        </div>
      </div>
    </PixelCard>
  );
}

export default MemoryCard;
