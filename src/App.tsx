import { useEffect, useState } from "react";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import MemoryGallery from "./components/MemoryGallery";
import PixelNav from "./components/PixelNav";
import SectionDivider from "./components/SectionDivider";
import WorksSection from "./components/WorksSection";
import { siteContent } from "./data/siteContent";

function App() {
  const [activeSection, setActiveSection] = useState("inicio");

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
    <div className="site-shell">
      <PixelNav
        activeSection={activeSection}
        logoPose={siteContent.ooPoses.wave}
        navItems={siteContent.navItems}
        siteName={siteContent.siteName}
      />
      <HeroSection content={siteContent} />
      <main>
        <SectionDivider type="trail" content={siteContent.transitions.heroToMemories} />
        <MemoryGallery
          memories={siteContent.memoryCards}
          poseMap={siteContent.ooPoses}
          section={siteContent.memorySection}
        />
        <SectionDivider type="message" content={siteContent.transitions.memoriesToWorks} />
        <WorksSection content={siteContent} />
        <SectionDivider type="orbit" content={siteContent.transitions.worksToAbout} />
        <AboutSection
          about={siteContent.aboutContent}
          pose={siteContent.ooPoses[siteContent.aboutContent.poseId]}
          winterPose={siteContent.ooPoses[siteContent.aboutContent.winterMiniPoseId]}
        />
      </main>
      <Footer
        content={siteContent.footerContent}
        ownerName={siteContent.owner.name}
        pose={siteContent.ooPoses[siteContent.footerContent.poseId]}
      />
    </div>
  );
}

export default App;
