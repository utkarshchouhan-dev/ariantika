import Image from "next/image";
import { Button, TooltipText } from "@/components";
import { hero } from "@/data";

import "./Hero.scss";

export default function Hero() {
  // ---- data ----
  const {
    greeting: { text: greetingText, icon: greetingIcon },
    title: { name, highlightSrOnly, highlight },
    location: { icon: locationIcon, text: locationText },
    description: { beforeAbbr, abbr, afterAbbr },
    actions,
    image: { src, alt },
    badge: { ringText, years, yearsLabel },
  } = hero;

  const LocationIcon = locationIcon;

  return (
    // ---- hero section ----
    <section className="hero " aria-label="Introduction">
      <div className="hero__container">
        {/* ---- hero content ---- */}
        <div className="hero__content">
          {/* ---- greeting ---- */}
          <p className="hero__greeting">
            {greetingText}
            <span className="hero__greeting-icon" aria-hidden="true">
              {greetingIcon}
            </span>
          </p>

          {/* ---- title ---- */}
          <h1
            className="hero__title"
            aria-label={`${name}${highlightSrOnly} ${highlight}`}
          >
            <span className="hero__title-name" aria-hidden="true">
              {name}
            </span>

            <mark className="hero__title-highlight">{highlight}</mark>
          </h1>

          {/* ---- location ---- */}
          <address className="hero__location">
            <span className="hero__location-icon" aria-hidden="true">
              <LocationIcon />
            </span>
            {locationText}
          </address>

          {/* ---- description ---- */}
          <p
            className="hero__description"
            aria-label={`${beforeAbbr}${abbr.title}${afterAbbr}`}
          >
            {beforeAbbr}
            <TooltipText
              as="abbr"
              className="hero__description-abbr"
              content={abbr.title}
              aria-hidden="true"
            >
              {abbr.label}
            </TooltipText>
            {afterAbbr}
          </p>

          {/* ---- actions ---- */}
          <div className="hero__actions">
            {actions.map((action) => (
              <Button
                key={action.id}
                className="hero__actions-button"
                variant={action.variant}
                size="default"
                href={action.href}
                icon={<action.icon />}
                aria-label={action.ariaLabel}
                download={action.download}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>

        {/* ---- media ---- */}
        <div className="hero__visual">
          <div className="hero__image">
            <Image
              src={src}
              alt={alt}
              width={500}
              height={500}
              sizes="(max-width: 625px) 250px, (max-width: 1250px) 40vw, 500px"
              quality={75}
              priority
              fetchPriority="high"
            />

            {/* ---- badge ---- */}
            <span className="hero__badge" aria-hidden="true">
              <svg className="hero__badge-svg" viewBox="0 0 200 200">
                <defs>
                  <path
                    id="hero-badge-curve"
                    d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
                  />
                </defs>
                <text className="hero__badge-text">
                  <textPath href="#hero-badge-curve" startOffset="0">
                    {ringText}
                  </textPath>
                </text>
              </svg>

              {/* ---- badge center ---- */}
              <div className="hero__badge-center">
                <span className="hero__badge-number">{years}+</span>
                <span className="hero__badge-label">{yearsLabel}</span>
              </div>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
