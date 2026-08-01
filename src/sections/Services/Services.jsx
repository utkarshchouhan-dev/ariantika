import Image from "next/image";
import Link from "next/link";
import { HoverCard, SectionHeader } from "@/components";
import { servicesSection } from "@/data";

import "./Services.scss";

export default function Services() {
  const {
    servicesHeadingId,
    header,
    cards,
    cursor: { icon: CursorIcon },
  } = servicesSection;

  return (
    <section className="services" aria-labelledby={servicesHeadingId}>
      {/* ---- section header ---- */}
      <SectionHeader
        headingId={servicesHeadingId}
        prefix={header.prefix}
        accent={header.accent}
        suffix={header.suffix}
        subtitle={header.subtitle}
      />

      {/* ---- services container ---- */}
      <ul className="services__container">
        {cards.map((card) => (
          <HoverCard
            key={card.id}
            index={card.id}
            cursorIcon={<CursorIcon />}
            className="services__card"
          >
            <Link
              href={card.href}
              className="services__link"
              aria-label={`This link leads to the ${card.title} service.`}
            >
              <div className="services__media">
                <Image
                  className="services__media-image"
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  sizes={card.imageSizes}
                />
              </div>

              <div className="services__content">
                <h3 className="services__title">{card.title}</h3>
                <p className="services__description">{card.description}</p>

                {card.bullets.length > 0 && (
                  <ul className="services__bullets">
                    {card.bullets.map((bullet) => (
                      <li key={bullet} className="services__bullet">
                        <span
                          className="services__bullet-icon"
                          aria-hidden="true"
                        >
                          <card.icon />
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Link>
          </HoverCard>
        ))}
      </ul>
    </section>
  );
}
