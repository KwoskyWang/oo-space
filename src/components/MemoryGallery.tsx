import type { Season, HeroPose } from "../data/poseMap";
import type { MemoryCard as MemoryCardType } from "../data/siteContent";
import MemoryCard from "./MemoryCard";
import { PixelSectionHeading } from "./PixelPrimitives";

type MemoryGalleryProps = {
  memories: MemoryCardType[];
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

function MemoryGallery({ memories, poseMap, season, section }: MemoryGalleryProps) {
  return (
    <section className="page-section memories-section" id="memories" data-reveal data-section-nav>
      <PixelSectionHeading
        afterDescription={(
          <div className="memory-note">
          <strong>{section.noteChinese}</strong>
          <span>{section.noteSpanish}</span>
          </div>
        )}
        description={section.description}
        kicker={section.kicker}
        title={section.title}
      />

      <div className="memory-grid">
        {memories.map((memory) => (
          <MemoryCard
            memory={memory}
            pose={memory.avatarPoseId ? poseMap[memory.avatarPoseId] : undefined}
            season={season}
            key={memory.id}
          />
        ))}
      </div>
    </section>
  );
}

export default MemoryGallery;
