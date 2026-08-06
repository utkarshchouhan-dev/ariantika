"use client";

import Image from "next/image";
import {
  Button,
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  Heading,
} from "react-aria-components";
import { SectionHeader } from "@/components";
import { experienceSection } from "@/data";

import "./Experience.scss";

export default function Experience() {
  // ---- data ----
  const {
    experienceHeadingId,
    header: { prefix, accent, subtitle },
    icon: ChevronIcon,
    items,
  } = experienceSection;

  // ---- default expanded key ----
  const defaultExpandedKey = items[0]?.id;

  return (
    // ---- experience section ----
    <section className="experience" aria-labelledby={experienceHeadingId}>
      {/* ---- wrapper ---- */}
      <div className="experience__wrapper">
        {/* ---- section header ---- */}
        <SectionHeader
          headingId={experienceHeadingId}
          className="experience__header"
          prefix={prefix}
          accent={accent}
          subtitle={subtitle}
          aria-label="my experience"
        />

        {/* ---- container ---- */}
        <DisclosureGroup
          className="experience__container"
          aria-label="Experience list"
          defaultExpandedKeys={
            defaultExpandedKey ? [defaultExpandedKey] : undefined
          }
        >
          {items.map((item) => (
            // ---- item ----
            <Disclosure
              key={item.id}
              id={item.id}
              className={({ isExpanded }) =>
                `experience__item${isExpanded ? " experience__item--open" : ""}`
              }
            >
              {({ isExpanded }) => (
                <>
                  {/* ---- head summary ---- */}
                  <Heading>
                    <Button
                      slot="trigger"
                      className="experience__head"
                      aria-label={`Experience ${item.role} at ${item.company}`}
                    >
                      {/* ---- image ---- */}
                      <div className="experience__image" aria-hidden="true">
                        {item.logo ? (
                          <Image
                            className="experience__image-logo"
                            src={item.logo}
                            alt={item.logoAlt}
                            width={56}
                            height={56}
                            sizes="56px"
                            quality={75}
                          />
                        ) : (
                          // ---- initial is for fallback ----
                          <span
                            className="experience__image-initials"
                            aria-hidden="true"
                          >
                            {item.initials}
                          </span>
                        )}
                      </div>
                      {/* ---- info ---- */}
                      <div className="experience__info">
                        {/* ---- identity ---- */}
                        <div className="experience__identity">
                          {/* ---- role ---- */}
                          <span className="experience__role">{item.role}</span>

                          {/* ---- company ---- */}
                          <p className="experience__company">{item.company}</p>

                          {/* ---- employment ---- */}
                          {item.employmentType && (
                            <div className="experience__employment">
                              {/* ---- type ---- */}
                              <span className="experience__employment-type">
                                {item.employmentType},
                              </span>

                              {/* ---- duration ---- */}
                              {item.duration && (
                                <span className="experience__employment-duration">
                                  {` (+${item.duration.years} years)`}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        {/* ---- meta ---- */}
                        <div className="experience__meta">
                          {/* ---- head summary -> meta - period ---- */}
                          <p className="experience__period">{item.period}</p>

                          {/* ---- head summary -> meta - location ---- */}
                          <p className="experience__location">
                            {item.location}
                          </p>
                        </div>
                      </div>

                      {/* ---- chevron ---- */}
                      <div
                        className="experience__chevron-container"
                        aria-hidden="true"
                        data-expanded={isExpanded ? "true" : "false"}
                      >
                        <ChevronIcon className="experience__chevron" />
                      </div>
                    </Button>
                  </Heading>

                  {/* ---- content ---- */}
                  <DisclosurePanel className="experience__content">
                    {/* ---- details ---- */}
                    {item.details?.length > 0 ? (
                      <ul className="experience__details">
                        {item.details.map((detail, detailIndex) => (
                          // ---- list ----
                          <li
                            key={`${item.id}-detail-${detailIndex}`}
                            className="experience__detail"
                          >
                            {detail}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          ))}
        </DisclosureGroup>
      </div>
    </section>
  );
}
