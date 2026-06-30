import { useEffect, useRef, useState } from "react";

export function useEasterEggClick(clicksToTrigger = 5, visibleMs = 2500) {
  const [isVisible, setIsVisible] = useState(false);
  const clickCount = useRef(0);
  const hideTimer = useRef<number | null>(null);
  const resetTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
      if (resetTimer.current) window.clearTimeout(resetTimer.current);
    };
  }, []);

  function handleClick() {
    clickCount.current += 1;

    if (resetTimer.current) window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => {
      clickCount.current = 0;
    }, 1400);

    if (clickCount.current < clicksToTrigger) return;

    clickCount.current = 0;
    setIsVisible(false);
    window.setTimeout(() => setIsVisible(true), 20);

    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      setIsVisible(false);
    }, visibleMs);
  }

  return { isVisible, handleClick };
}
