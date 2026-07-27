import { useEffect, useState } from "react";

type MarqueeTextProps = {
  lines: string[];
};

function MarqueeText({ lines }: MarqueeTextProps) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const text = lines.join("   ✦ 🍓 ✦   ");

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(query.matches);

    function handleChange(event: MediaQueryListEvent) {
      setReduceMotion(event.matches);
    }

    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="marquee-wrap" aria-label={text}>
      <div className={`marquee-track ${reduceMotion ? "is-static" : ""}`}>
        <span>{text}</span>
        {reduceMotion ? null : (
          <>
            <span>{text}</span>
            <span>{text}</span>
          </>
        )}
      </div>
    </div>
  );
}

export default MarqueeText;
