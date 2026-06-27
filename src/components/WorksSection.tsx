import type { WorkItem } from "../data/siteContent";
import WorkCard from "./WorkCard";

type WorksSectionProps = {
  works: WorkItem[];
};

function WorksSection({ works }: WorksSectionProps) {
  return (
    <section className="page-section works-section" id="works" data-reveal>
      <div className="section-heading">
        <p className="pixel-kicker">El pequeño universo de IA de oo</p>
        <h2>oo 的 AI 小宇宙</h2>
        <p>这里先放入 3 个 vibe coding 作品介绍，内容支持 Markdown 风格展示和展开查看。</p>
      </div>

      <div className="works-list">
        {works.map((work) => (
          <WorkCard work={work} key={work.id} />
        ))}
      </div>
    </section>
  );
}

export default WorksSection;
