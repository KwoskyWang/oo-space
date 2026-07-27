import type { siteContent } from "../data/siteContent";
import type { HeroPose } from "../data/poseMap";
import type { SeasonalContent } from "../data/seasonContent";
import OoPixelAvatar from "./OoPixelAvatar";
import { PixelSectionHeading } from "./PixelPrimitives";
import WorkCard from "./WorkCard";

type WorksSectionProps = {
  content: typeof siteContent;
  poseMap: Record<string, HeroPose>;
  seasonal: SeasonalContent["workSection"];
};

function WorksSection({ content, poseMap, seasonal }: WorksSectionProps) {
  const headingPose = poseMap[seasonal.characterPoseId];

  return (
    <section className="page-section works-section" id="works" data-reveal data-section-nav>
      <PixelSectionHeading
        description={seasonal.description}
        kicker={seasonal.kicker}
        side={headingPose ? (
          <OoPixelAvatar
            className="section-heading__character"
            pose={headingPose}
            size="section"
          />
        ) : null}
        title={seasonal.title}
      />

      <div className="works-list">
        {content.workCards.map((work) => (
          <WorkCard
            collapseLabel={content.workSection.collapseLabel}
            expandLabel={content.workSection.expandLabel}
            noteExtraSpanish={seasonal.noteExtraSpanish}
            pose={poseMap[seasonal.projectPoseIds[work.id]] ?? headingPose}
            work={work}
            key={work.id}
          />
        ))}
      </div>
    </section>
  );
}

export default WorksSection;
