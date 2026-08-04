"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";

const DEFAULT_SCROLL_OFFSET = 150;

export function useHideOnScrollDown(offset = DEFAULT_SCROLL_OFFSET) {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    if (latest > previous && latest > offset) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return hidden;
}
