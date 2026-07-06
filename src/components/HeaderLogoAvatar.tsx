import type { HeroPose } from "../data/poseMap";
import OoPixelAvatar from "./OoPixelAvatar";

type HeaderLogoAvatarProps = {
  pose: HeroPose;
};

function HeaderLogoAvatar({ pose }: HeaderLogoAvatarProps) {
  return (
    <span className="header-logo-avatar" aria-hidden="true">
      <OoPixelAvatar decorative pose={pose} size="nav" />
    </span>
  );
}

export default HeaderLogoAvatar;
