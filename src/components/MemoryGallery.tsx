import type { MemoryCard as MemoryCardType } from "../data/siteContent";
import MemoryCard from "./MemoryCard";

type MemoryGalleryProps = {
  memories: MemoryCardType[];
};

function MemoryGallery({ memories }: MemoryGalleryProps) {
  return (
    <section className="page-section memories-section" id="memories" data-reveal>
      <div className="section-heading">
        <p className="pixel-kicker">Recuerdos de oo</p>
        <h2>像素相册 / Dulce vida</h2>
        <p>一些先用占位素材保存好的回忆位置，之后可以换成真实照片和视频。</p>
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
