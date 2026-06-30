import type { HeroPose, MemoryCard as MemoryCardType } from "../data/siteContent";
import MemoryCard from "./MemoryCard";

type MemoryGalleryProps = {
  memories: MemoryCardType[];
  poseMap: Record<string, HeroPose>;
  section: {
    kicker: string;
    title: string;
    description: string;
    noteChinese: string;
    noteSpanish: string;
  };
};

function MemoryGallery({ memories, poseMap, section }: MemoryGalleryProps) {
  return (
    <section className="page-section memories-section" id="memories" data-reveal data-section-nav>
      <div className="section-heading">
        <p className="pixel-kicker">{section.kicker}</p>
        <h2 className="pixel-title">{section.title}</h2>
        <p>{section.description}</p>
        <div className="memory-note">
          <strong>{section.noteChinese}</strong>
          <span>{section.noteSpanish}</span>
        </div>
      </div>

      <div className="memory-grid">
        {memories.map((memory) => (
          <MemoryCard memory={memory} pose={memory.avatarPoseId ? poseMap[memory.avatarPoseId] : undefined} key={memory.id} />
        ))}
      </div>
    </section>
  );
}

export default MemoryGallery;
