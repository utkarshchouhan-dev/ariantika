"use client";

import { useEffect, useState } from "react";
import { matchesMedia } from "@/utils";

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    setMatches(matchesMedia(query));

    const mediaQuery = window.matchMedia(query);
    const onChange = (event) => setMatches(event.matches);

    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
