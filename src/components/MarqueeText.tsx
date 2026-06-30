type MarqueeTextProps = {
  lines: string[];
};

function MarqueeText({ lines }: MarqueeTextProps) {
  const text = lines.join("   ✦ 🍓 ✦   ");

  return (
    <div className="marquee-wrap" aria-label={text}>
      <div className="marquee-track">
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}

export default MarqueeText;
