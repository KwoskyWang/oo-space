import type { Season } from "../data/poseMap";

type SeasonToggleProps = {
  season: Season;
  onToggle: () => void;
};

function SeasonToggle({ season, onToggle }: SeasonToggleProps) {
  const isWinter = season === "winter";
  const fullLabel = isWinter ? "切换夏季 / Cambiar a verano" : "切换冬季 / Cambiar a invierno";
  const shortLabel = isWinter ? "夏季 / Verano" : "冬季 / Invierno";

  return (
    <button
      className="season-toggle"
      type="button"
      aria-label={`切换季节 / Cambiar estación：${fullLabel}`}
      aria-pressed={isWinter}
      onClick={onToggle}
    >
      <span className="season-toggle__icon" aria-hidden="true">
        {isWinter ? "☀" : "❄"}
      </span>
      <span className="season-toggle__full">{fullLabel}</span>
      <span className="season-toggle__short">{shortLabel}</span>
    </button>
  );
}

export default SeasonToggle;
