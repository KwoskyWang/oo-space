import { useCallback, useEffect, useRef, useState } from "react";
import type { FloatingFruit } from "../data/siteContent";

type FloatingFruitsProps = {
  fruits: FloatingFruit[];
};

function FloatingFruits({ fruits }: FloatingFruitsProps) {
  const [activeFruitId, setActiveFruitId] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      // E3: 确保清理所有 timer
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  // D1 + E3: 明确的 role、清理旧 timer
  const showBubble = useCallback((id: string) => {
    setActiveFruitId(id);
    // E3: 清除旧 timer 再设新的
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setActiveFruitId(null);
      timerRef.current = null;
    }, 1500);
  }, []);

  return (
    <div className="floating-fruits" aria-label="水果互动层" role="group">
      {fruits.map((fruit) => (
        <button
          className={`floating-fruit floating-fruit--${fruit.drift} floating-fruit--${fruit.layer}`}
          key={fruit.id}
          type="button"
          aria-label={fruit.bubble}
          aria-pressed={activeFruitId === fruit.id}
          onClick={() => showBubble(fruit.id)}
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
          {activeFruitId === fruit.id ? <span className="fruit-bubble">{fruit.bubble}</span> : null}
        </button>
      ))}
    </div>
  );
}

export default FloatingFruits;
