import type { HeroPose } from "../data/siteContent";

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
    abilityTitle: string;
    abilityStats: {
      id: string;
      label: string;
      value: number;
    }[];
  };
  pose: HeroPose;
};

function AboutSection({ about, pose }: AboutSectionProps) {
  return (
    <section className="page-section about-section" id="about" data-reveal data-section-nav>
      <div className="about-planet">
        <div className="about-planet__character">
          <img src={pose.src} alt={pose.alt} loading="lazy" width="280" height="340" />
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
            {about.abilityStats.map((stat) => (
              <div className="ability-stat" key={stat.id}>
                <div className="ability-stat__header">
                  <span>{stat.label}</span>
                  <strong>{stat.value}%</strong>
                </div>
                <div
                  className="ability-stat__bar"
                  aria-label={`${stat.label} ${stat.value}%`}
                  style={{ "--ability-value": `${stat.value}%` } as React.CSSProperties}
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
