import Image from "next/image";
import Link from "next/link";
import { HoverCard, SectionHeader } from "@/components";
import { servicesHeader, servicesSource } from "@/data";

import "./Services.scss";

export default function Services() {
  const {
    servicesSection,
    checkIcon: CheckIcon,
    arrowIcon: ArrowIcon,
  } = servicesSource;
  const {
    sectionHeader: { prefix, accent, suffix, subtitle, headingId },
  } = servicesHeader;

  return (
    <section className="services" aria-labelledby={headingId}>
      {/* ---- section header ---- */}
      <SectionHeader
        headingId={headingId}
        prefix={prefix}
        accent={accent}
        suffix={suffix}
        subtitle={subtitle}
      />

      {/* ---- services container ---- */}
      <ul className="services__container">
        {servicesSection.map((service) => (
          <HoverCard
            key={service.id}
            index={service.id}
            cursorIcon={<ArrowIcon />}
            className="services__card"
          >
            <Link
              href={service.href}
              className="services__link"
              aria-label={`This link leads to the ${service.title} service.`}
            >
              <div className="services__media">
                <Image
                  className="services__media-image"
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes={service.imageSizes}
                />
              </div>

              <div className="services__content">
                <h3 className="services__title">
                  {service.title}
                  <span className="sr-only">.</span>
                </h3>
                <p className="services__description">{service.description}</p>

                <ul className="services__bullets">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="services__bullet">
                      <span
                        className="services__bullet-icon"
                        aria-hidden="true"
                      >
                        <CheckIcon />
                      </span>
                      {bullet}.
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          </HoverCard>
        ))}
      </ul>
    </section>
  );
}
