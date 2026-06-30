import { useEffect, useMemo, useState } from "react";
import type { HeroPose } from "../data/siteContent";
import { useEasterEggClick } from "../hooks/useEasterEggClick";

type PixelGirlProps = {
  easterEgg: {
    chinese: string;
    spanish: string;
  };
  poses: HeroPose[];
  name: string;
};

const SWAP_INTERVAL = 1800;

function PixelGirl({ easterEgg, poses, name }: PixelGirlProps) {
  const safePoses = useMemo(() => poses.slice(0, 7), [poses]);
  const [index, setIndex] = useState(0);
  const { handleClick, isVisible } = useEasterEggClick(2);

  useEffect(() => {
    if (safePoses.length <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % safePoses.length);
    }, SWAP_INTERVAL);

    return () => window.clearInterval(timer);
  }, [safePoses.length]);

  return (
    <figure className="pixel-girl" aria-label={`像素风小女孩 ${name}`}>
      <div className="pixel-girl__halo" aria-hidden="true" />
      <button className="pixel-girl__stage" type="button" onClick={handleClick}>
        <span className="pixel-girl__island" aria-hidden="true" />
        <span className="pixel-girl__hover-stars" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        {/* TODO: 以后要替换姿势图时，只需要改 src/data/siteContent.ts 里的 characterPoses。 */}
        {safePoses.map((pose, poseIndex) => (
          <img
            className={`pixel-girl__image ${poseIndex === index ? "is-active" : ""}`}
            src={pose.src}
            alt={pose.alt}
            aria-hidden={poseIndex !== index}
            key={pose.id}
            width="420"
            height="480"
            style={{ "--pose-offset-x": `${pose.offsetX ?? 0}px`, "--pose-offset-y": `${pose.offsetY ?? 0}px` } as React.CSSProperties}
          />
        ))}
      </button>

      {isVisible ? (
        <div className="pixel-toast" role="status">
          <strong>{easterEgg.chinese}</strong>
          <span>{easterEgg.spanish}</span>
        </div>
      ) : null}

      <div className="pixel-girl__dots" aria-hidden="true">
        {safePoses.map((pose, dotIndex) => (
          <span
            key={pose.id}
            className={`pixel-girl__dot ${dotIndex === index ? "is-active" : ""}`}
          />
        ))}
      </div>

      <figcaption className="pixel-girl__label">Encantada de conocerte</figcaption>
    </figure>
  );
}

export default PixelGirl;
