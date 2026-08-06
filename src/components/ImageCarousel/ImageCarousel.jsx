"use client";

import Image from "next/image";
import * as motion from "motion/react-client";
import { useCallback, useEffect, useState } from "react";

import "./ImageCarousel.scss";

// ---- autoplay milliseconds ----
const AUTOPLAY_MS = 2500;
const SWIPE_THRESHOLD = 1;

// ---- function for getting the slide role ----
function getSlideRole(index, active, total) {
  if (index === active) return "active";
  if (index === (active - 1 + total) % total) return "prev";
  return "next";
}

// ---- image carousel ----
export default function ImageCarousel({ images = [], ariaLabel }) {
  // ---- slides ----
  const slides = images.slice(0, 3);
  // ---- total ----
  const total = slides.length;
  // ---- active ----
  const [active, setActive] = useState(0);
  // ---- is paused ----
  const [isPaused, setIsPaused] = useState(false);

  // ---- go to ----
  const goTo = useCallback(
    (next) => setActive(((next % total) + total) % total),
    [total],
  );

  // ---- useEffect for autoplay ----
  useEffect(() => {
    if (isPaused || total <= 1) return undefined;
    const id = window.setTimeout(() => goTo(active + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [active, isPaused, total, goTo]);

  // ---- handle drag end ----
  const handleDragEnd = (_event, info) => {
    const projected = info.offset.x + info.velocity.x * 0.2;
    if (projected < -SWIPE_THRESHOLD) goTo(active + 1);
    else if (projected > SWIPE_THRESHOLD) goTo(active - 1);
  };

  // ---- handle key down ----
  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(active + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(active - 1);
    }
  };

  // ---- if no slides, return null ----
  if (total === 0) return null;

  return (
    <motion.div
      className="image-carousel"
      role="region"
      aria-label={ariaLabel}
      aria-roledescription="carousel"
      tabIndex={0}
      onPointerDown={() => setIsPaused(true)}
      onPointerUp={() => setIsPaused(false)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
    >
      <div className="image-carousel__stage">
        {/* ---- slides ---- */}
        {slides.map((img, idx) => {
          // ---- get slide role ----
          const role = getSlideRole(idx, active, total);
          // ---- is active ----
          const isActive = role === "active";

          return (
            <figure
              key={img.alt}
              className={`image-carousel__card image-carousel__card--${role}`}
              onClick={() => !isActive && goTo(idx)}
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} of ${total}`}
              aria-hidden={!isActive}
            >
              <motion.span
                className="image-carousel__card-surface"
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0}
                dragMomentum={false}
                onDragStart={() => setIsPaused(true)}
                onDragEnd={handleDragEnd}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={520}
                  height={640}
                  className="image-carousel__image"
                  draggable={false}
                  sizes="(max-width: 768px) 300px, 400px"
                  quality={70}
                  priority={idx === 0}
                  loading={idx === 0 ? "eager" : "lazy"}
                />
              </motion.span>
            </figure>
          );
        })}
      </div>

      {total > 1 && (
        <div
          className="image-carousel__dots"
          role="tablist"
          aria-label="Select slide"
        >
          {slides.map((img, idx) => {
            const isCurrent = idx === active;
            return (
              <button
                key={img.alt}
                role="tab"
                aria-selected={isCurrent}
                aria-label={`Image ${idx + 1} of ${img.alt}`}
                className={`image-carousel__dot ${
                  isCurrent ? "image-carousel__dot--active" : ""
                }`}
                onClick={() => goTo(idx)}
              ></button>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
