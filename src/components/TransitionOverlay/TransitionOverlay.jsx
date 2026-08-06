"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  EASE_OUT_EXPO,
  PAGE_TRANSITION_ENTER_DURATION,
  PAGE_TRANSITION_ENTER_STAGGER,
  PAGE_TRANSITION_EXIT_DURATION,
  PAGE_TRANSITION_EXIT_STAGGER,
  PAGE_TRANSITION_HOLD,
  PAGE_TRANSITION_SHEET_COUNT,
  PAGE_TRANSITION_TOTAL_MS,
  markPageTransitionDone,
} from "@/lib";

import "./TransitionOverlay.scss";

// ---- sheets ----
const SHEETS = ["accent", "secondary", "primary"];

// ---- last sheet ----
const LAST = PAGE_TRANSITION_SHEET_COUNT - 1;

// ---- enter span ----
const ENTER_SPAN =
  LAST * PAGE_TRANSITION_ENTER_STAGGER + PAGE_TRANSITION_ENTER_DURATION;

// ---- exit at ----
const EXIT_AT = ENTER_SPAN + PAGE_TRANSITION_HOLD;

// ---- transition overlay ----
export default function TransitionOverlay({ onComplete }) {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState("entering");

  // ---- it is time to exit ----
  useEffect(() => {
    delete document.documentElement.dataset.pageTransition;

    if (reduceMotion) {
      markPageTransitionDone();
      onComplete?.();
      return undefined;
    }

    const toExit = setTimeout(() => setPhase("leaving"), EXIT_AT * 1000);
    const toDone = setTimeout(() => {
      setPhase("done");
      markPageTransitionDone();
      onComplete?.();
    }, PAGE_TRANSITION_TOTAL_MS);

    return () => {
      clearTimeout(toExit);
      clearTimeout(toDone);
    };
  }, [reduceMotion, onComplete]);

  if (reduceMotion || phase === "done") return null;

  const isLeaving = phase === "leaving";

  return (
    <div className="transition-overlay" aria-hidden="true">
      {SHEETS.map((tone, index) => (
        <motion.div
          key={tone}
          className={`transition-overlay__sheet transition-overlay__sheet--${tone}`}
          initial={{ y: "100%" }}
          animate={{ y: isLeaving ? "-100%" : "0%" }}
          transition={{
            duration: isLeaving
              ? PAGE_TRANSITION_EXIT_DURATION
              : PAGE_TRANSITION_ENTER_DURATION,
            ease: EASE_OUT_EXPO,
            delay: isLeaving
              ? (LAST - index) * PAGE_TRANSITION_EXIT_STAGGER
              : index * PAGE_TRANSITION_ENTER_STAGGER,
          }}
        >
          <span className="transition-overlay__fill" />
        </motion.div>
      ))}
    </div>
  );
}
