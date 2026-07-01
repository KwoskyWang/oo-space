import { useEffect, useState } from "react";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import MemoryGallery from "./components/MemoryGallery";
import PixelNav from "./components/PixelNav";
import SectionDivider from "./components/SectionDivider";
import WorksSection from "./components/WorksSection";
import { ooPoseSets } from "./data/poseMap";
import { seasonContent } from "./data/seasonContent";
import { siteContent } from "./data/siteContent";
import { useSeasonTheme } from "./hooks/useSeasonTheme";

function App() {
  const [activeSection, setActiveSection] = useState("inicio");
  const { season, toggleSeason } = useSeasonTheme();
  const seasonal = seasonContent[season];
  const poseSet = ooPoseSets[season];
  const poseFallbackSet = season === "winter" ? ooPoseSets.summer : ooPoseSets.winter;
  const poseLookup = { ...poseFallbackSet, ...poseSet };

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section-nav]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-32% 0px -52% 0px", threshold: [0.08, 0.22, 0.42] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-shell" data-season={season}>
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
          memories={siteContent.memoryCards}
          poseMap={poseSet}
          section={seasonal.memorySection}
        />
        <SectionDivider type="message" content={siteContent.transitions.memoriesToWorks} />
        <WorksSection content={siteContent} poseMap={poseLookup} seasonal={seasonal.workSection} />
        <SectionDivider type="orbit" content={siteContent.transitions.worksToAbout} />
        <AboutSection
          abilityStats={siteContent.aboutContent.abilityStats}
          about={seasonal.aboutContent}
          miniPose={
            season === "winter"
              ? ooPoseSets.summer[seasonal.aboutContent.seasonalMiniPoseId]
              : ooPoseSets.winter[seasonal.aboutContent.seasonalMiniPoseId]
          }
          pose={poseSet[seasonal.aboutContent.poseId]}
        />
      </main>
      <Footer
        content={seasonal.footerContent}
        ownerName={siteContent.owner.name}
        pose={poseSet[seasonal.footerContent.poseId]}
      />
    </div>
  );
}

export default App;
