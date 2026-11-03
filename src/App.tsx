import { useEffect, useState } from "react";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import MemoryGallery from "./components/MemoryGallery";
import PixelNav from "./components/PixelNav";
import ScrollSparkleTrail from "./components/ScrollSparkleTrail";
import SectionDivider from "./components/SectionDivider";
import SeasonTransitionOverlay from "./components/SeasonTransitionOverlay";
import TechParticleLayer from "./components/TechParticleLayer";
import WorksSection from "./components/WorksSection";
import { ooPoseSets } from "./data/poseMap";
import { preloadDragonAssets } from "./effects/dragonEffect";
import { seasonContent } from "./data/seasonContent";
import { siteContent } from "./data/siteContent";
import { useSeasonTheme } from "./hooks/useSeasonTheme";

function App() {
  const [activeSection, setActiveSection] = useState("inicio");
  const { season, toggleSeason } = useSeasonTheme();
  const seasonal = seasonContent[season];
  const poseSet = ooPoseSets[season];

  useEffect(() => {
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const navEls = Array.from(document.querySelectorAll<HTMLElement>("[data-section-nav]"));
    const allEls = [...revealEls, ...navEls];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (el.dataset.reveal !== undefined && entry.isIntersecting) {
            el.classList.add("is-visible");
          }
          if (el.dataset.sectionNav !== undefined && entry.isIntersecting && el.id) {
            setActiveSection(el.id);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: [0.08, 0.12, 0.22, 0.42] },
    );

    allEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // A3: 空闲时预加载火龙资源
  useEffect(() => {
    preloadDragonAssets();
  }, []);

  // F1: 返回顶部按钮可见性
  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    function onScroll() {
      setShowBackToTop(window.scrollY > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Perf-21: pause infinite animations while scrolling
  useEffect(() => {
    let timer = 0;
    function onScroll() {
      document.body.classList.add("is-scrolling");
      window.clearTimeout(timer);
      timer = window.setTimeout(() => document.body.classList.remove("is-scrolling"), 180);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="site-shell" data-season={season}>
      {/* D2: skip-to-content 跳转链接 */}
      <a className="skip-link" href="#memories">
        跳过导航 / Saltar navegación
      </a>
      <TechParticleLayer season={season} />
      <ScrollSparkleTrail season={season} />
      <SeasonTransitionOverlay season={season} />
      <PixelNav
        activeSection={activeSection}
        logoPose={season === "winter" ? poseSet.cuteFace : poseSet.wave}
        navItems={siteContent.navItems}
        onToggleSeason={toggleSeason}
        season={season}
        siteName={siteContent.siteName}
      />
      <HeroSection content={siteContent} poseSet={poseSet} season={season} seasonal={seasonal} />
      <main>
        <SectionDivider type="trail" content={siteContent.transitions.heroToMemories} />
        <MemoryGallery
          poseMap={poseSet}
          season={season}
          section={seasonal.memorySection}
        />
        <SectionDivider type="message" content={siteContent.transitions.memoriesToWorks} />
        <WorksSection content={siteContent} poseMap={poseSet} seasonal={seasonal.workSection} />
        <SectionDivider type="orbit" content={siteContent.transitions.worksToAbout} />
        <AboutSection
          abilityStats={siteContent.aboutContent.abilityStats}
          about={seasonal.aboutContent}
          miniPose={poseSet[seasonal.aboutContent.seasonalMiniPoseId]}
          pose={poseSet[seasonal.aboutContent.poseId]}
        />
      </main>
      <Footer
        content={seasonal.footerContent}
        ownerName={siteContent.owner.name}
        pose={poseSet[seasonal.footerContent.poseId]}
      />
      {/* F1: 返回顶部按钮 */}
      <button
        className={`back-to-top ${showBackToTop ? "is-visible" : ""}`}
        type="button"
        aria-label="返回顶部 / Volver arriba"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>
    </div>
  );
}

export default App;
