"use client";

import Image from "next/image";
import * as motion from "motion/react-client";
import { servicesSource } from "@/data";
import {
  reveal,
  revealEager,
  revealInView,
  revealSlideLeft,
  revealSlideRight,
  stagger,
} from "@/lib";

import "./ServiceOfferings.scss";

export default function ServiceOfferings() {
  const { servicesPage, checkIcon: CheckIcon } = servicesSource;

  return servicesPage.map((service, i) => {
    const isReversed = i % 2 === 0;
    const isAboveFold = i === 0;
    const sectionMotion = isAboveFold ? revealEager : revealInView;
    const imageVariant = isReversed ? revealSlideLeft : revealSlideRight;
    const contentVariant = isReversed ? revealSlideRight : revealSlideLeft;
    const { id, title, description, bullets, theme, image, imageAlt } = service;

    return (
      <motion.section
        key={id}
        id={id}
        className={`service__offerings service__offerings--${theme}`}
        aria-labelledby={`${id}-title`}
        variants={stagger}
      >
        <motion.div
          className="service__offerings-image"
          variants={imageVariant}
          {...sectionMotion}
        >
          <Image
            className="service__offerings-image--img"
            src={image}
            alt={imageAlt}
            width={500}
            height={500}
            sizes="(max-width: 1024px) 280px, 500px"
            quality={70}
            priority={isAboveFold}
            loading={isAboveFold ? "eager" : "lazy"}
            fetchPriority={isAboveFold ? "high" : undefined}
          />
        </motion.div>

        <motion.div
          className="service__offerings-content"
          variants={contentVariant}
          {...sectionMotion}
        >
          <motion.h2
            className="service__offerings-title"
            id={`${id}-title`}
            variants={reveal}
            {...sectionMotion}
          >
            {title}:
          </motion.h2>
          <motion.p
            className="service__offerings-description"
            variants={reveal}
            {...sectionMotion}
          >
            {description}
          </motion.p>

          <motion.ul className="service__offerings-list" variants={stagger}>
            {bullets.map((item) => (
              <motion.li
                key={item}
                className="service__offerings-item"
                variants={reveal}
                {...(isAboveFold ? revealEager : revealInView)}
              >
                <span
                  className="service__offerings-item-icon"
                  aria-hidden="true"
                >
                  <CheckIcon />
                </span>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.section>
    );
  });
}
