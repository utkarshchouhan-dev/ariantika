"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT_EXPO } from "@/lib";

import "./TransitionOverlay.scss";

const SHEETS = ["accent", "secondary", "primary"];

const ENTER_DURATION = 0.28;
const ENTER_STAGGER = 0.05;
const HOLD = 0.03;
const EXIT_DURATION = 0.34;
const EXIT_STAGGER = 0.06;

const LAST = SHEETS.length - 1;
const ENTER_SPAN = LAST * ENTER_STAGGER + ENTER_DURATION;
const EXIT_AT = ENTER_SPAN + HOLD;
const TOTAL = EXIT_AT + LAST * EXIT_STAGGER + EXIT_DURATION;

export default function TransitionOverlay() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState("entering");

  useEffect(() => {
    if (reduceMotion) return undefined;

    const toExit = setTimeout(() => setPhase("leaving"), EXIT_AT * 1000);
    const toDone = setTimeout(() => setPhase("done"), TOTAL * 1000);

    return () => {
      clearTimeout(toExit);
      clearTimeout(toDone);
    };
  }, [reduceMotion]);

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
            duration: isLeaving ? EXIT_DURATION : ENTER_DURATION,
            ease: EASE_OUT_EXPO,
            delay: isLeaving
              ? (LAST - index) * EXIT_STAGGER
              : index * ENTER_STAGGER,
          }}
        >
          <span className="transition-overlay__fill" />
        </motion.div>
      ))}
    </div>
  );
}
