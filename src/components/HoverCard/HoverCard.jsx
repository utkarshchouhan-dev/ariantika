"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useMediaQuery } from "react-responsive";
import {
  deckSpreadCard,
  DECK_SPREAD_DESKTOP_MEDIA,
  hoverPop,
  viewportOnce,
} from "@/lib";

import "./HoverCard.scss";

const SPRING = { stiffness: 300, damping: 30, mass: 0.7 };

export default function HoverCard({
  children,
  index = 0,
  cursorIcon,
  className = "",
  as = "li",
}) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  const setCursorPosition = (event, immediate = false) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;

    if (immediate) {
      x.jump(px);
      y.jump(py);
      springX.jump(px);
      springY.jump(py);
      return;
    }

    x.set(px);
    y.set(py);
  };

  const matchesDesktop = useMediaQuery({ query: DECK_SPREAD_DESKTOP_MEDIA });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const isDesktop = mounted && matchesDesktop;
  const MotionTag = motion[as] ?? motion.li;

  return (
    <MotionTag
      key={`${index}-${isDesktop}`}
      ref={cardRef}
      className={`hover-card ${className}`.trim()}
      onMouseEnter={(event) => setCursorPosition(event, true)}
      onMouseMove={(event) => setCursorPosition(event, false)}
      variants={deckSpreadCard}
      custom={{ index, isDesktop }}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={viewportOnce}
    >
      {children}

      {cursorIcon ? (
        <motion.span
          className="hover-card__cursor"
          style={{ x: springX, y: springY }}
          variants={hoverPop}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          aria-hidden="true"
        >
          {cursorIcon}
        </motion.span>
      ) : null}
    </MotionTag>
  );
}
