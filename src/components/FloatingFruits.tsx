import type { FloatingFruit } from "../data/siteContent";

type FloatingFruitsProps = {
  fruits: FloatingFruit[];
};

function FloatingFruits({ fruits }: FloatingFruitsProps) {
  return (
    <div className="floating-fruits" aria-hidden="true">
      {fruits.map((fruit) => (
        <div
          className={`floating-fruit floating-fruit--${fruit.drift} floating-fruit--${fruit.layer}`}
          key={fruit.id}
          style={
            {
              "--fruit-x": `${fruit.startX}%`,
              "--fruit-y": `${fruit.startY}%`,
              "--fruit-size": `${fruit.size}px`,
              "--fruit-duration": `${fruit.duration}s`,
              "--fruit-delay": `${fruit.delay}s`,
            } as React.CSSProperties
          }
        >
          {fruit.kind === "dragonfruit" ? (
            <span className="pixel-fruit pixel-fruit--dragonfruit" title={fruit.label}>
              <span />
              <span />
              <span />
            </span>
          ) : (
            <span className={`pixel-emoji pixel-emoji--${fruit.kind}`}>{fruit.emoji}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default FloatingFruits;
