import { useEffect, useState } from "react";
import type { Season } from "../data/poseMap";

const STORAGE_KEY = "oo-season";

function readInitialSeason(): Season {
  if (typeof window === "undefined") return "summer";

  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "winter" ? "winter" : "summer";
}

export function useSeasonTheme() {
  const [season, setSeason] = useState<Season>(readInitialSeason);

  useEffect(() => {
    document.documentElement.dataset.season = season;
    window.localStorage.setItem(STORAGE_KEY, season);
  }, [season]);

  function toggleSeason() {
    setSeason((current) => (current === "summer" ? "winter" : "summer"));
  }

  return { season, setSeason, toggleSeason };
}
