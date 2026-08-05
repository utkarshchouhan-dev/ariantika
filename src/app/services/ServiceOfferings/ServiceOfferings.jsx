"use client";

import Image from "next/image";
import * as motion from "motion/react-client";
import { servicesSource } from "@/data";
import {
  reveal,
  revealSlideLeft,
  revealSlideRight,
  stagger,
  viewportOnce,
} from "@/lib";

import "./ServiceOfferings.scss";

export default function ServiceOfferings() {
  const { servicesPage, checkIcon: CheckIcon } = servicesSource;

  return servicesPage.map((service, i) => {
    const isReversed = i % 2 === 0;
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
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <Image
            className="service__offerings-image--img"
            src={image}
            alt={imageAlt}
            width={500}
            height={500}
            sizes="(max-width: 1024px) 280px, 500px"
            quality={70}
            loading={i === 0 ? "eager" : "lazy"}
          />
        </motion.div>

        <motion.div
          className="service__offerings-content"
          variants={contentVariant}
        >
          <motion.h2
            className="service__offerings-title"
            id={`${id}-title`}
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {title}:
          </motion.h2>
          <motion.p
            className="service__offerings-description"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {description}
          </motion.p>

          <motion.ul className="service__offerings-list" variants={stagger}>
            {bullets.map((item) => (
              <motion.li
                key={item}
                className="service__offerings-item"
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
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
