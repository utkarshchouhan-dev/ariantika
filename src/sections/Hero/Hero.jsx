import Image from "next/image";
import * as motion from "motion/react-client";
import { Button, TooltipText } from "@/components";
import { hero } from "@/data";
import {
  fadeUp,
  mediaReveal,
  rotateSettle,
  springPopDelayed,
  staggerContainer,
  viewportOnce,
} from "@/lib";

import "./Hero.scss";

export default function Hero() {
  // ---- hero data ----
  const {
    greeting: { text: greetingText, icon: greetingIcon },
    title: { name, highlightSrOnly, highlight },
    location: { icon: locationIcon, text: locationText },
    description: { beforeAbbr, abbr, afterAbbr },
    actions,
    image: { src, alt, width, height, sizes },
    badge: { ringText, years, yearsLabel },
  } = hero;

  const LocationIcon = locationIcon;

  return (
    // ---- hero section ----
    <section className="hero " aria-label="Introduction">
      <div className="hero__container">
        {/* ---- hero content ---- */}
        <motion.div
          className="hero__content"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* ---- greeting ---- */}
          <motion.p className="hero__greeting" variants={fadeUp}>
            {greetingText}
            <span className="hero__greeting-icon" aria-hidden="true">
              {greetingIcon}
            </span>
          </motion.p>

          {/* ---- title ---- */}
          <motion.h1
            className="hero__title"
            variants={fadeUp}
            aria-label={`${name}${highlightSrOnly} ${highlight}`}
          >
            <span className="hero__title-name" aria-hidden="true">
              {name}
            </span>

            <mark className="hero__title-highlight">{highlight}</mark>
          </motion.h1>

          {/* ---- location ---- */}
          <motion.address className="hero__location" variants={fadeUp}>
            <motion.span
              className="hero__location-icon"
              variants={rotateSettle}
              aria-hidden="true"
            >
              <LocationIcon />
            </motion.span>
            {locationText}
          </motion.address>

          {/* ---- description ---- */}
          <motion.p className="hero__description" variants={fadeUp}>
            {beforeAbbr}
            <TooltipText
              as="abbr"
              className="hero__description-abbr"
              content={abbr.title}
            >
              {abbr.label}
            </TooltipText>
            {afterAbbr}
          </motion.p>

          {/* ---- actions ---- */}
          <div className="hero__actions">
            {/* ---- contact button ---- */}
            {actions.map((action) => {
              return (
                <motion.div key={action.id} variants={fadeUp}>
                  <Button
                    className="hero__actions-button"
                    variant={action.variant}
                    size="default"
                    href={action.href}
                    icon={<action.icon />}
                    aria-label={action.ariaLabel}
                    download={action.download}
                  >
                    {action.label}
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ---- media ---- */}
        <div className="hero__visual">
          <motion.div
            className="hero__image"
            variants={mediaReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {/* ---- images ---- */}
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              sizes={sizes}
              priority
              fetchPriority="high"
            />

            {/* ---- badge ---- */}
            <motion.span
              className="hero__badge"
              variants={springPopDelayed}
              aria-hidden="true"
            >
              <svg className="hero__badge-svg" viewBox="0 0 200 200">
                <defs>
                  <path
                    id="hero-badge-curve"
                    d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
                  />
                </defs>
                <text className="hero__badge-text">
                  <textPath href="#hero-badge-curve" startOffset="0">
                    {ringText}
                  </textPath>
                </text>
              </svg>

              {/* ---- badge center ---- */}
              <div className="hero__badge-center">
                <span className="hero__badge-number">{years}+</span>
                <span className="hero__badge-label">{yearsLabel}</span>
              </div>
            </motion.span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
