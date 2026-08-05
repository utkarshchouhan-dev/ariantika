import Image from "next/image";
import * as motion from "motion/react-client";
import { Button } from "@/components";
import { reveal, revealSpring, stagger, viewportOnce } from "@/lib";

import "./ContactCta.scss";

export default function ContactCta({
  image,
  title,
  subtitle,
  cta,
  headingId = "contact-cta-heading",
  className = "",
}) {
  return (
    <section
      className={`contact__cta ${className}`.trim()}
      aria-labelledby={headingId}
    >
      <motion.div
        className="contact__cta-card"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.div variants={revealSpring} className="contact__cta-avatar">
          <Image
            className="contact__cta-avatar--img"
            src={image.src}
            alt={image.alt}
            width={80}
            height={80}
            sizes="80px"
            quality={70}
            loading="lazy"
          />
        </motion.div>

        <motion.h2
          className="contact__cta-title"
          id={headingId}
          variants={reveal}
        >
          {title}
        </motion.h2>

        <motion.p className="contact__cta-subtitle" variants={reveal}>
          {subtitle}
        </motion.p>

        <motion.div variants={revealSpring}>
          <Button
            className="contact__cta-button"
            href={cta.href}
            variant={cta.variant}
            size={cta.size}
            icon={<cta.icon />}
            aria-label={cta.ariaLabel}
          >
            {cta.label}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
