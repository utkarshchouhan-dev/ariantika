import Image from "next/image";
import { servicesSource } from "@/data";

import "./ServiceOfferings.scss";

export default function ServiceOfferings() {
  // ---- data ----
  const { servicesPage, checkIcon: CheckIcon } = servicesSource;

  return servicesPage.map((service, i) => {
    const isReversed = i % 2 === 0;
    const isAboveFold = i === 0;
    const { id, title, description, bullets, theme, image, imageAlt } = service;

    return (
      <section
        key={id}
        id={id}
        className={`service__offerings service__offerings--${theme}${
          isReversed ? " service__offerings--reversed" : ""
        }`}
        aria-labelledby={`${id}-title`}
      >
        {/* ---- image ---- */}
        <div className="service__offerings-image">
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
        </div>

        {/* ---- content ---- */}
        <div className="service__offerings-content">
          <h2 className="service__offerings-title" id={`${id}-title`}>
            {title}:
          </h2>
          <p className="service__offerings-description">{description}</p>

          <ul className="service__offerings-list">
            {bullets.map((item) => (
              <li key={item} className="service__offerings-item">
                <span
                  className="service__offerings-item-icon"
                  aria-hidden="true"
                >
                  <CheckIcon />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  });
}
