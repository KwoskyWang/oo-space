import type { HeroPose, NavItem } from "../data/siteContent";
import OoPixelAvatar from "./OoPixelAvatar";

type PixelNavProps = {
  activeSection: string;
  logoPose: HeroPose;
  navItems: NavItem[];
  siteName: string;
};

function PixelNav({ activeSection, logoPose, navItems, siteName }: PixelNavProps) {
  return (
    <nav className="pixel-nav" aria-label="主导航">
      <a className="pixel-nav__brand" href="#inicio" aria-label={siteName}>
        <OoPixelAvatar
          src={logoPose.src}
          alt=""
          fallbackSrc={logoPose.fallbackSrc}
          offsetX={logoPose.offsetX}
          offsetY={logoPose.offsetY}
          poseName={logoPose.id}
          scale={logoPose.scale}
          size={38}
        />
        <span>oo ✦</span>
      </a>

      <div className="pixel-nav__items">
        {navItems.map((item) => (
          <a
            className={`pixel-nav__item ${activeSection === item.id ? "is-active" : ""}`}
            href={item.href}
            key={item.id}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default PixelNav;
