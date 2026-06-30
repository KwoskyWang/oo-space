import { useEffect, useMemo, useState } from "react";
import type { HeroPose } from "../data/siteContent";
import { useEasterEggClick } from "../hooks/useEasterEggClick";
import OoPixelAvatar from "./OoPixelAvatar";

type PixelGirlProps = {
  easterEgg: {
    chinese: string;
    spanish: string;
  };
  easterEggAvatars: HeroPose[];
  poses: HeroPose[];
  name: string;
  statusItems: {
    label: string;
    shortLabel: string;
  }[];
};

const SWAP_INTERVAL = 1800;

function PixelGirl({ easterEgg, easterEggAvatars, poses, name, statusItems }: PixelGirlProps) {
  const safePoses = useMemo(() => poses.slice(0, 7), [poses]);
  const [index, setIndex] = useState(0);
  const [eggAvatarIndex, setEggAvatarIndex] = useState(0);
  const { handleClick, isVisible } = useEasterEggClick(2);
  const eggAvatar = easterEggAvatars[eggAvatarIndex % easterEggAvatars.length];

  useEffect(() => {
    if (safePoses.length <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % safePoses.length);
    }, SWAP_INTERVAL);

    return () => window.clearInterval(timer);
  }, [safePoses.length]);

  function handleStageClick() {
    if (easterEggAvatars.length > 1) {
      setEggAvatarIndex((current) => (current + 1) % easterEggAvatars.length);
    }

    handleClick();
  }

  return (
    <figure className="pixel-girl" aria-label={`像素风小女孩 ${name}`}>
      <div className="pixel-girl__halo" aria-hidden="true" />
      <button className="pixel-girl__stage" type="button" onClick={handleStageClick}>
        <span className="pixel-girl__island" aria-hidden="true">
          {statusItems.map((item) => (
            <span className="pixel-girl__status" key={item.label}>
              <i />
              <span className="pixel-girl__status-full">{item.label}</span>
              <span className="pixel-girl__status-short">{item.shortLabel}</span>
            </span>
          ))}
        </span>
        <span className="pixel-girl__hover-stars" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        {/* TODO: 以后要替换姿势图时，只需要改 src/data/siteContent.ts 里的 characterPoses。 */}
        {safePoses.map((pose, poseIndex) => (
          <OoPixelAvatar
            className={`pixel-girl__image ${poseIndex === index ? "is-active" : ""}`}
            src={pose.src}
            alt={pose.alt}
            key={pose.id}
            loading="eager"
            offsetX={pose.offsetX}
            offsetY={pose.offsetY}
            poseName={pose.id}
            scale={pose.scale}
            fallbackSrc={pose.fallbackSrc}
            size="100%"
          />
        ))}
      </button>

      {isVisible ? (
        <div className="pixel-toast" role="status">
          {eggAvatar ? (
            <OoPixelAvatar
              className="pixel-toast__avatar"
              src={eggAvatar.src}
              alt=""
              fallbackSrc={eggAvatar.fallbackSrc}
              offsetX={eggAvatar.offsetX}
              offsetY={eggAvatar.offsetY}
              poseName={eggAvatar.id}
              scale={eggAvatar.scale}
              size={46}
            />
          ) : null}
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
