import type { siteContent } from "../data/siteContent";
import FloatingFruits from "./FloatingFruits";
import MarqueeText from "./MarqueeText";
import PixelGirl from "./PixelGirl";

type HeroSectionProps = {
  content: typeof siteContent;
};

function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="hero-section" aria-label="oo 的主页首屏">
      <FloatingFruits fruits={content.floatingFruits} />
      <div className="hero-pixel-grid" aria-hidden="true" />
      <MarqueeText lines={content.hero.marqueeLines} />

      <div className="hero-content">
        <p className="pixel-kicker">{content.owner.greeting}</p>
        <h1 className="hero-title">{content.hero.title}</h1>
        <PixelGirl poses={content.hero.characterPoses} name={content.owner.name} />
        <p className="hero-subtitle">{content.hero.subtitleSpanish}</p>
        <p className="hero-subtitle-cn">{content.hero.subtitleChinese}</p>
      </div>

      <a className="scroll-cue" href="#memories" aria-label="向下滑，继续认识 oo">
        <span>{content.hero.scrollHintChinese}</span>
        <small>{content.hero.scrollHintSpanish}</small>
      </a>
    </section>
  );
}

export default HeroSection;
