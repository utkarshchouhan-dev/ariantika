import * as motion from "motion/react-client";
import { Button, ImageCarousel, SectionHeader } from "@/components";
import { aboutMePageCarousel, aboutSection } from "@/data";
import { fadeUp, viewportOnce } from "@/lib";

import "./About.scss";

export default function About() {
  // ---- about data ----
  const {
    aboutHeadingId,
    header: { prefix, accent, accentTag, subtitle },
    carousel: { ariaLabel },
    paragraphs,
    cta: { href, label, icon: Icon },
  } = aboutSection;

  return (
    // ---- about section ----
    <section className="about" aria-labelledby={aboutHeadingId}>
      {/* ---- section header ---- */}
      <SectionHeader
        headingId={aboutHeadingId}
        prefix={prefix}
        accent={accent}
        accentTag={accentTag}
        subtitle={subtitle}
      />

      {/* ---- container ---- */}
      <div className="about__container">
        {/* ---- media ---- */}
        <ImageCarousel images={aboutMePageCarousel} ariaLabel={ariaLabel} />

        {/* ---- content ---- */}
        <motion.div
          className="about__paragraphs"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          <Button
            className="about__paragraphs-link"
            href={href}
            variant="link"
            size="small"
            icon={<Icon />}
            iconPosition="right"
          >
            {label}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
