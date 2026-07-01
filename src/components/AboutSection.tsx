import type { CSSProperties } from "react";
import type { HeroPose } from "../data/poseMap";
import OoPixelAvatar from "./OoPixelAvatar";

type AboutSectionProps = {
  about: {
    kicker: string;
    title: string;
    chinese: string;
    spanish: string;
    tags: string[];
    keywordTitle: string;
    keywordTitleEs: string;
    keywords: string[];
    seasonLabels: string[];
    abilityTitle: string;
  };
  abilityStats: {
    id: string;
    label: string;
    value: number;
  }[];
  miniPose: HeroPose;
  pose: HeroPose;
};

function AboutSection({ abilityStats, about, miniPose, pose }: AboutSectionProps) {
  return (
    <section className="page-section about-section" id="about" data-reveal data-section-nav>
      <div className="about-planet">
        <div className="about-planet__character">
          <OoPixelAvatar
            className="about-planet__main-avatar"
            src={pose.src}
            alt={pose.alt}
            fallbackSrc={pose.fallbackSrc}
            offsetX={pose.offsetX}
            offsetY={pose.offsetY}
            poseName={pose.id}
            scale={pose.scale}
            size="min(280px, 78vw)"
          />
          <div className="about-season-card">
            <OoPixelAvatar
              src={miniPose.src}
              alt={miniPose.alt}
              fallbackSrc={miniPose.fallbackSrc}
              offsetX={miniPose.offsetX}
              offsetY={miniPose.offsetY}
              poseName={miniPose.id}
              scale={miniPose.scale}
              size={58}
            />
            <span>{about.seasonLabels.join(" / ")}</span>
          </div>
          <div className="about-floating-tags" aria-hidden="true">
            {about.tags.slice(0, 4).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <span className="about-planet__spark about-planet__spark--one" aria-hidden="true" />
          <span className="about-planet__spark about-planet__spark--two" aria-hidden="true" />
        </div>

        <div className="pixel-card about-card">
          <p className="pixel-kicker">{about.kicker}</p>
          <h2 className="pixel-title">{about.title}</h2>
          <p>{about.chinese}</p>
          <p className="spanish-line">{about.spanish}</p>

          <div className="tag-row">
            {about.tags.map((tag) => (
              <span className="pixel-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>

          <div className="keyword-board">
            <h3>{about.keywordTitle} / {about.keywordTitleEs}</h3>
            <div className="keyword-board__grid">
              {about.keywords.map((keyword) => (
                <span key={keyword}>{keyword}</span>
              ))}
            </div>
          </div>

          <div className="ability-board">
            <h3>{about.abilityTitle}</h3>
            {abilityStats.map((stat) => (
              <div className="ability-stat" key={stat.id}>
                <div className="ability-stat__header">
                  <span>{stat.label}</span>
                  <strong>{stat.value}%</strong>
                </div>
                <div
                  className="ability-stat__bar"
                  aria-label={`${stat.label} ${stat.value}%`}
                  style={{ "--ability-value": `${stat.value}%` } as CSSProperties}
                >
                  <span />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
