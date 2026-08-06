import { Button, ImageCarousel, SectionHeader } from "@/components";
import { aboutHeader, aboutSection, aboutSource } from "@/data";

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
        <div className="about__media">
          <ImageCarousel images={aboutSource.carousel} ariaLabel={ariaLabel} />
        </div>
        {/* ---- content ---- */}
        <div className="about__paragraphs">
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
        </div>
      </div>
    </section>
  );
}
