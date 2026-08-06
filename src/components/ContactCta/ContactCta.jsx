import Image from "next/image";
import { Button } from "@/components";

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
      {/* ---- contact cta card ---- */}
      <div className="contact__cta-card">
        <div className="contact__cta-avatar">
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
        </div>

        <h2 className="contact__cta-title" id={headingId}>
          {title}
        </h2>

        <p className="contact__cta-subtitle">{subtitle}</p>

        <div className="contact__cta-action">
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
        </div>
      </div>
    </section>
  );
}
