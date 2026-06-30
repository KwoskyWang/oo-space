import type { MemoryCard as MemoryCardType } from "../data/siteContent";
import MemoryCard from "./MemoryCard";

type MemoryGalleryProps = {
  memories: MemoryCardType[];
  section: {
    kicker: string;
    title: string;
    description: string;
  };
};

function MemoryGallery({ memories, section }: MemoryGalleryProps) {
  return (
    <section className="page-section memories-section" id="memories" data-reveal data-section-nav>
      <div className="section-heading">
        <p className="pixel-kicker">{section.kicker}</p>
        <h2 className="pixel-title">{section.title}</h2>
        <p>{section.description}</p>
      </div>

      <div className="memory-grid">
        {memories.map((memory) => (
          <MemoryCard memory={memory} key={memory.id} />
        ))}
      </div>
    </section>
  );
}

export default MemoryGallery;
