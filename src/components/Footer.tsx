import type { HeroPose } from "../data/poseMap";
import OoPixelAvatar from "./OoPixelAvatar";

type FooterProps = {
  ownerName: string;
  pose: HeroPose;
  content: {
    spanish: string;
    chinese: string;
    dedication: string;
    smallLine: string;
    stamp: string;
    fruits: string[];
  };
};

function Footer({ content, ownerName, pose }: FooterProps) {
  return (
    <footer className="site-footer pixel-postcard">
      <div className="pixel-postcard__stamp" aria-hidden="true">
        {content.stamp}
      </div>
      <OoPixelAvatar
        className="pixel-postcard__character"
        src={pose.src}
        alt={pose.alt}
        fallbackSrc={pose.fallbackSrc}
        offsetX={pose.offsetX}
        offsetY={pose.offsetY}
        poseName={pose.id}
        scale={pose.scale}
        size={112}
      />
      <p className="footer-logo">{ownerName}</p>
      <p>{content.spanish}</p>
      <p>{content.chinese}</p>
      <p className="pixel-postcard__dedication">{content.dedication}</p>
      <p className="pixel-postcard__small">{content.smallLine}</p>
      <div className="pixel-postcard__fruits" aria-hidden="true">
        {content.fruits.map((fruit, index) => (
          <span key={`${fruit}-${index}`}>{fruit}</span>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
