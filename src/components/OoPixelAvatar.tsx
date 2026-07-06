import { useEffect, useState } from "react";
import type { HeroPose } from "../data/poseMap";

type AvatarSize = "hero" | "section" | "card" | "mini" | "nav" | "footer";

type OoPixelAvatarProps = {
  src?: string;
  alt?: string;
  pose?: HeroPose;
  size?: AvatarSize | number | string;
  poseName?: string;
  offsetX?: string;
  offsetY?: string;
  scale?: number;
  className?: string;
  animated?: boolean;
  decorative?: boolean;
  fallbackSrc?: string;
  loading?: "eager" | "lazy";
};

const avatarSizeTokens: Record<AvatarSize, string> = {
  hero: "var(--hero-avatar-size-desktop)",
  section: "var(--section-avatar-size)",
  card: "var(--card-avatar-size)",
  mini: "var(--mini-avatar-size)",
  nav: "var(--nav-avatar-size)",
  footer: "var(--footer-avatar-size)",
};

function OoPixelAvatar({
  alt,
  animated = false,
  className = "",
  decorative = false,
  fallbackSrc,
  loading = "lazy",
  offsetX = "0px",
  offsetY = "0px",
  pose,
  poseName,
  scale = 1,
  size = 96,
  src,
}: OoPixelAvatarProps) {
  const resolvedSrc = pose?.src ?? src ?? "";
  const resolvedAlt = decorative ? "" : alt ?? pose?.alt ?? "";
  const resolvedFallback = pose?.fallbackSrc ?? fallbackSrc;
  const resolvedOffsetX = pose?.offsetX ?? offsetX;
  const resolvedOffsetY = pose?.offsetY ?? offsetY;
  const resolvedPoseName = pose?.id ?? poseName;
  const resolvedScale = pose?.scale ?? scale;
  const [imageSrc, setImageSrc] = useState(resolvedSrc);
  const numericSize =
    typeof size === "number" ? `${size}px` : avatarSizeTokens[size as AvatarSize] ?? size;

  useEffect(() => {
    setImageSrc(resolvedSrc);
  }, [resolvedSrc]);

  return (
    <span
      className={`oo-avatar oo-avatar--${typeof size === "string" && avatarSizeTokens[size as AvatarSize] ? size : "custom"} ${animated ? "oo-avatar--animated" : ""} ${className}`}
      data-pose={resolvedPoseName}
      style={
        {
          "--oo-avatar-size": numericSize,
          "--oo-avatar-offset-x": resolvedOffsetX,
          "--oo-avatar-offset-y": resolvedOffsetY,
          "--oo-avatar-scale": resolvedScale,
        } as React.CSSProperties
      }
    >
      <img
        src={imageSrc}
        alt={resolvedAlt}
        loading={loading}
        width="512"
        height="512"
        onError={() => {
          if (resolvedFallback && imageSrc !== resolvedFallback) {
            setImageSrc(resolvedFallback);
          }
        }}
      />
    </span>
  );
}

export default OoPixelAvatar;
