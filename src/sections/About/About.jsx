import * as motion from "motion/react-client";
import { Button, ImageCarousel, SectionHeader } from "@/components";
import { aboutHeader, aboutSection, aboutSource } from "@/data";
import { viewportOnce } from "@/lib";

import "./About.scss";

export default function About() {
  // ---- about data ----
  const {
    carousel: { ariaLabel },
    paragraphs,
    cta: { href, label, icon: Icon },
  } = aboutSection;
  const {
    sectionHeader: { headingId, prefix, accent, accentTag, subtitle },
  } = aboutHeader;

  return (
    // ---- about section ----
    <section className="about" aria-labelledby={headingId}>
      {/* ---- section header ---- */}
      <SectionHeader
        headingId={headingId}
        prefix={prefix}
        accent={accent}
        accentTag={accentTag}
        subtitle={subtitle}
      />

      {/* ---- container ---- */}
      <div className="about__container">
        {/* ---- media ---- */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={viewportOnce}
        >
          <ImageCarousel images={aboutSource.carousel} ariaLabel={ariaLabel} />
        </motion.div>
        {/* ---- content ---- */}
        <motion.div
          className="about__paragraphs"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
