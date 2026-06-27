import { useEffect } from "react";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import MemoryGallery from "./components/MemoryGallery";
import WorksSection from "./components/WorksSection";
import { siteContent } from "./data/siteContent";

function App() {
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

  return (
    <div className="site-shell">
      <HeroSection content={siteContent} />
      <main>
        <MemoryGallery memories={siteContent.memories} />
        <WorksSection works={siteContent.works} />
      </main>
      <Footer footer={siteContent.footer} ownerName={siteContent.owner.name} />
    </div>
  );
}

export default App;
