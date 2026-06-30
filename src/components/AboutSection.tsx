import type { HeroPose } from "../data/siteContent";

type AboutSectionProps = {
  about: {
    title: string;
    chinese: string;
    spanish: string;
    tags: string[];
    keywordTitle: string;
    keywords: string[];
  };
  pose: HeroPose;
};

function AboutSection({ about, pose }: AboutSectionProps) {
  return (
    <section className="page-section about-section" id="about" data-reveal>
      <div className="about-planet">
        <div className="about-planet__character">
          <img src={pose.src} alt={pose.alt} />
          <span className="about-planet__spark about-planet__spark--one" aria-hidden="true" />
          <span className="about-planet__spark about-planet__spark--two" aria-hidden="true" />
        </div>

        <div className="pixel-card about-card">
          <p className="pixel-kicker">Sobre oo</p>
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
            <h3>{about.keywordTitle}</h3>
            <div className="keyword-board__grid">
              {about.keywords.map((keyword) => (
                <span key={keyword}>{keyword}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
