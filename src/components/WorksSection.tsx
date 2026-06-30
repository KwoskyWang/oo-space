import type { siteContent } from "../data/siteContent";
import WorkCard from "./WorkCard";

type WorksSectionProps = {
  content: typeof siteContent;
};

function WorksSection({ content }: WorksSectionProps) {
  return (
    <section className="page-section works-section" id="works" data-reveal data-section-nav>
      <div className="section-heading section-heading--with-character">
        <div>
          <p className="pixel-kicker">{content.workSection.kicker}</p>
          <h2 className="pixel-title">{content.workSection.title}</h2>
          <p>{content.workSection.description}</p>
        </div>
        <img
          className="section-heading__character"
          src={content.ooPoses[content.workSection.characterPoseId].src}
          alt={content.ooPoses[content.workSection.characterPoseId].alt}
          loading="lazy"
          width="168"
          height="168"
        />
      </div>

      <div className="works-list">
        {content.workCards.map((work) => (
          <WorkCard
            collapseLabel={content.workSection.collapseLabel}
            expandLabel={content.workSection.expandLabel}
            pose={content.ooPoses[work.characterPoseId]}
            work={work}
            key={work.id}
          />
        ))}
      </div>
    </section>
  );
}

export default WorksSection;
