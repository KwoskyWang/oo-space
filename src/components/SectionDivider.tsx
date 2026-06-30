type SectionDividerProps =
  | {
      type: "trail";
      content: {
        label: string;
        fruits: string[];
      };
    }
  | {
      type: "message";
      content: {
        chinese: string;
        spanish: string;
      };
    }
  | {
      type: "orbit";
      content: {
        label: string;
        stars: string[];
      };
    };

function SectionDivider({ content, type }: SectionDividerProps) {
  if (type === "message") {
    return (
      <div className="section-divider section-divider--message">
        <p>{content.chinese}</p>
        <span>{content.spanish}</span>
      </div>
    );
  }

  const items = type === "trail" ? content.fruits : content.stars;

  return (
    <div className={`section-divider section-divider--${type}`} aria-label={content.label}>
      {items.map((item, index) => (
        <span key={`${item}-${index}`}>{item}</span>
      ))}
    </div>
  );
}

export default SectionDivider;
