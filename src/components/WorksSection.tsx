import type { siteContent } from "../data/siteContent";
import type { HeroPose } from "../data/poseMap";
import type { SeasonalContent } from "../data/seasonContent";
import OoPixelAvatar from "./OoPixelAvatar";
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
      <div className="section-heading section-heading--with-character">
        <div>
          <p className="pixel-kicker">{seasonal.kicker}</p>
          <h2 className="pixel-title">{seasonal.title}</h2>
          <p>{seasonal.description}</p>
        </div>
        {headingPose ? (
          <OoPixelAvatar
            className="section-heading__character"
            src={headingPose.src}
            alt={headingPose.alt}
            fallbackSrc={headingPose.fallbackSrc}
            offsetX={headingPose.offsetX}
            offsetY={headingPose.offsetY}
            poseName={headingPose.id}
            scale={headingPose.scale}
            size="clamp(112px, 15vw, 168px)"
          />
        ) : null}
      </div>

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
