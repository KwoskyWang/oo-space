import type { siteContent } from "../data/siteContent";
import FloatingFruits from "./FloatingFruits";
import MarqueeText from "./MarqueeText";
import OoPixelAvatar from "./OoPixelAvatar";
import PixelGirl from "./PixelGirl";

type HeroSectionProps = {
  content: typeof siteContent;
};

function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="hero-section" id="inicio" data-section-nav aria-label={content.siteName}>
      <FloatingFruits fruits={content.floatingFruits} />
      <div className="hero-pixel-grid" aria-hidden="true" />
      <div className="hero-cloud hero-cloud--left" aria-hidden="true" />
      <div className="hero-cloud hero-cloud--right" aria-hidden="true" />
      <div className="hero-mini-sticker">
        <OoPixelAvatar
          src={content.ooPoses[content.hero.sticker.poseId].src}
          alt={content.ooPoses[content.hero.sticker.poseId].alt}
          fallbackSrc={content.ooPoses[content.hero.sticker.poseId].fallbackSrc}
          offsetX={content.ooPoses[content.hero.sticker.poseId].offsetX}
          offsetY={content.ooPoses[content.hero.sticker.poseId].offsetY}
          poseName={content.ooPoses[content.hero.sticker.poseId].id}
          scale={content.ooPoses[content.hero.sticker.poseId].scale}
          size={64}
        />
        <span>{content.hero.sticker.label}</span>
      </div>
      <MarqueeText lines={content.hero.marqueeItems} />

      <div className="hero-content">
        <p className="pixel-kicker">{content.owner.greeting}</p>
        <h1 className="hero-title">{content.hero.title}</h1>
        <p className="hero-planet-title">{content.hero.planetTitle}</p>
        <PixelGirl
          easterEgg={content.easterEgg}
          easterEggAvatars={content.easterEgg.avatarPoseIds.map((poseId) => content.ooPoses[poseId])}
          poses={content.hero.characterPoses}
          name={content.owner.name}
          statusItems={content.hero.statusItems}
        />
        <p className="hero-subtitle-cn">{content.hero.subtitleChinese}</p>
        <p className="hero-subtitle">{content.hero.subtitleSpanish}</p>

        <div className="hero-cta-row">
          {content.hero.ctas.map((cta) => (
            <a className="pixel-button" href={cta.href} key={cta.href}>
              {cta.label}
            </a>
          ))}
        </div>
      </div>

      <a className="scroll-cue" href="#memories" aria-label="向下滑，继续认识 oo">
        <span>{content.hero.scrollHintChinese}</span>
        <small>{content.hero.scrollHintSpanish}</small>
      </a>
    </section>
  );
}

export default HeroSection;
