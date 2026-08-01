"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { fadeIn, viewportOnce } from "@/lib";
import { banner } from "@/data";

import "./Banner.scss";

const {
  items,
  marquee: { repeatCount, scrollSpeed },
  separator: { icon: SeparatorIcon },
} = banner;

const repeatedItems = Array.from({ length: repeatCount }, () => items).flat();

export default function Banner() {
  const prefersReducedMotion = useReducedMotion();
  const groupRef = useRef(null);
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    const measure = () => {
      const width = groupRef.current?.offsetWidth;
      if (!width) return;

      setDuration((width * 2000) / scrollSpeed / 1000);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const trackStyle =
    !prefersReducedMotion && duration
      ? { "--marquee-duration": `${duration}s` }
      : undefined;

  return (
    <section className="banner" aria-hidden="true">
      <motion.div
        className="banner__surface"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <div
          className={`banner__track${duration && !prefersReducedMotion ? " banner__track--active" : ""}`}
          style={trackStyle}
        >
          {["a", "b"].map((prefix, index) => (
            <ul
              key={prefix}
              className="banner__items"
              ref={index === 0 ? groupRef : undefined}
            >
              {repeatedItems.map((item, itemIndex) => (
                <li
                  className="banner__item"
                  key={`${prefix}-${item}-${itemIndex}`}
                >
                  <span className="banner__label">{item}</span>
                  <span className="banner__separator">
                    <SeparatorIcon />
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
