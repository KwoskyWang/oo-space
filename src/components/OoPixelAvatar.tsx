import { useState } from "react";

type OoPixelAvatarProps = {
  src: string;
  alt: string;
  size?: number | string;
  poseName?: string;
  offsetX?: string;
  offsetY?: string;
  scale?: number;
  className?: string;
  animated?: boolean;
  fallbackSrc?: string;
  loading?: "eager" | "lazy";
};

function OoPixelAvatar({
  alt,
  animated = false,
  className = "",
  fallbackSrc,
  loading = "lazy",
  offsetX = "0px",
  offsetY = "0px",
  poseName,
  scale = 1,
  size = 96,
  src,
}: OoPixelAvatarProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const numericSize = typeof size === "number" ? `${size}px` : size;

  return (
    <span
      className={`oo-avatar ${animated ? "oo-avatar--animated" : ""} ${className}`}
      data-pose={poseName}
      style={
        {
          "--oo-avatar-size": numericSize,
          "--oo-avatar-offset-x": offsetX,
          "--oo-avatar-offset-y": offsetY,
          "--oo-avatar-scale": scale,
        } as React.CSSProperties
      }
    >
      <img
        src={imageSrc}
        alt={alt}
        loading={loading}
        width="512"
        height="512"
        onError={() => {
          if (fallbackSrc && imageSrc !== fallbackSrc) {
            setImageSrc(fallbackSrc);
          }
        }}
      />
    </span>
  );
}

export default OoPixelAvatar;
