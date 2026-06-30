import type { HeroPose, NavItem } from "../data/siteContent";

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
        <img src={logoPose.src} alt="" aria-hidden="true" width="38" height="38" />
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
