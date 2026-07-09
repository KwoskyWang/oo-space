import type { siteContent } from "../data/siteContent";
import type { Season, HeroPose } from "../data/poseMap";
import type { SeasonalContent } from "../data/seasonContent";
import MarqueeText from "./MarqueeText";
import OoPixelAvatar from "./OoPixelAvatar";
import { PixelLinkButton } from "./PixelPrimitives";
import PixelGirl from "./PixelGirl";
import SeasonalDecorLayer from "./SeasonalDecorLayer";

type HeroSectionProps = {
  content: typeof siteContent;
  poseSet: Record<string, HeroPose>;
  season: Season;
  seasonal: SeasonalContent;
};

function HeroSection({ content, poseSet, season, seasonal }: HeroSectionProps) {
  const stickerPose = poseSet[seasonal.hero.sticker.poseId];
  const heroPoses = seasonal.hero.characterPoseIds
    .map((poseId) => poseSet[poseId])
    .filter(Boolean);
  const eggAvatars = content.easterEgg.avatarPoseIds
    .map((poseId) => poseSet[poseId])
    .filter(Boolean);

  return (
    <section className="hero-section" id="inicio" data-section-nav aria-label={content.siteName}>
      <SeasonalDecorLayer items={seasonal.decorItems} season={season} />
      <div className="hero-pixel-grid" aria-hidden="true" />
      <div className="hero-cloud hero-cloud--left" aria-hidden="true" />
      <div className="hero-cloud hero-cloud--right" aria-hidden="true" />
      {stickerPose ? (
        <div className="hero-mini-sticker">
          <OoPixelAvatar
            pose={stickerPose}
            size="card"
          />
          <span>{seasonal.hero.sticker.label}</span>
        </div>
      ) : null}
      <MarqueeText lines={seasonal.hero.marqueeItems} />

      <div className="hero-content">
        <p className="pixel-kicker">{content.owner.greeting}</p>
        <h1 className="hero-title">{seasonal.hero.title}</h1>
        <p className="hero-planet-title">{seasonal.hero.planetTitle}</p>
        <PixelGirl
          easterEgg={content.easterEgg}
          easterEggAvatars={eggAvatars}
          name={content.owner.name}
          poses={heroPoses}
          season={seasonal.hero.dragonMode}
          statusItems={seasonal.hero.statusItems}
        />
        <p className="hero-subtitle-cn">{seasonal.hero.subtitleChinese}</p>
        <p className="hero-subtitle">{seasonal.hero.subtitleSpanish}</p>

        <div className="hero-cta-row">
          {content.hero.ctas.map((cta) => (
            <PixelLinkButton href={cta.href} key={cta.href}>
              {cta.label}
            </PixelLinkButton>
          ))}
        </div>
      </div>

      <a className="scroll-cue" href="#memories" aria-label={seasonal.hero.scrollHintChinese}>
        <span>{seasonal.hero.scrollHintChinese}</span>
        <small>{seasonal.hero.scrollHintSpanish}</small>
      </a>
    </section>
  );
}

export default HeroSection;
