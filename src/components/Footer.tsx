import type { HeroPose } from "../data/siteContent";

type FooterProps = {
  ownerName: string;
  pose: HeroPose;
  content: {
    spanish: string;
    chinese: string;
    dedication: string;
    fruits: string[];
  };
};

function Footer({ content, ownerName, pose }: FooterProps) {
  return (
    <footer className="site-footer pixel-postcard">
      <div className="pixel-postcard__stamp" aria-hidden="true">
        💌
      </div>
      <img className="pixel-postcard__character" src={pose.src} alt={pose.alt} />
      <p className="footer-logo">{ownerName}</p>
      <p>{content.spanish}</p>
      <p>{content.chinese}</p>
      <p className="pixel-postcard__dedication">{content.dedication}</p>
      <div className="pixel-postcard__fruits" aria-hidden="true">
        {content.fruits.map((fruit, index) => (
          <span key={`${fruit}-${index}`}>{fruit}</span>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
