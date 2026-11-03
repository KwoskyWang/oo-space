import { useState } from "react";
import type { Season, HeroPose } from "../data/poseMap";
import type { Album } from "../data/albums";
import { albums } from "../data/albums";
import AlbumLightbox from "./AlbumLightbox";
import MemoryCard from "./MemoryCard";
import { PixelSectionHeading } from "./PixelPrimitives";

type MemoryGalleryProps = {
  poseMap: Record<string, HeroPose>;
  season: Season;
  section: {
    kicker: string;
    title: string;
    description: string;
    noteChinese: string;
    noteSpanish: string;
  };
};

function MemoryGallery({ section }: MemoryGalleryProps) {
  const [activeAlbum, setActiveAlbum] = useState<Album | null>(null);

  return (
    <section className="page-section memories-section" id="memories" data-reveal data-section-nav>
      <PixelSectionHeading
        afterDescription={
          <div className="memory-note">
            <strong>{section.noteChinese}</strong>
            <span>{section.noteSpanish}</span>
          </div>
        }
        description={section.description}
        kicker={section.kicker}
        title={section.title}
      />

      <div className="memory-grid memory-grid--albums">
        {albums.map((album) => (
          <MemoryCard album={album} onOpen={setActiveAlbum} key={album.id} />
        ))}
      </div>

      {activeAlbum && <AlbumLightbox album={activeAlbum} onClose={() => setActiveAlbum(null)} />}
    </section>
  );
}

export default MemoryGallery;
