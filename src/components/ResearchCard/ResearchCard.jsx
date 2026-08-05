import Image from "next/image";
import * as motion from "motion/react-client";
import { Button, TooltipText } from "@/components";
import {
  getPublicationAccentVars,
  getPublicationStatus,
  researchSource,
} from "@/data";

import "./ResearchCard.scss";

export default function ResearchCard({
  publication: card,
  index = 0,
  className = "",
}) {
  const {
    cover: { title, summary, image, imageAlt },
    publication: { year, label, tooltip, quartile },
    status,
    slug,
  } = card;

  const {
    card: { yearIcon: YearIcon, detailsIcon: DetailsIcon, detailsAriaLabel },
  } = researchSource;

  const labelWithQuartile = quartile ? `${label} (${quartile})` : label;
  const { label: statusLabel } = getPublicationStatus(status);
  const accentVars = getPublicationAccentVars(status);

  return (
    <motion.article
      className={`research-card ${className}`.trim()}
      style={accentVars}
      initial={{ opacity: 0, y: 70, filter: "blur(20px)" }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          delay: index * 0.2,
        },
      }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="research-card__media">
        {image ? (
          <Image
            className="research-card__media-image"
            src={image}
            alt={imageAlt ?? ""}
            width={800}
            height={800}
            sizes="(max-width: 768px) 350px, 400px"
            quality={70}
            loading="lazy"
          />
        ) : null}
      </div>

      <span className="research-card__badge">{statusLabel}</span>

      <div className="research-card__content">
        <h3 className="research-card__title">{title}</h3>
        <p className="research-card__summary">{summary}</p>

        <div className="research-card__meta-container">
          <div className="research-card__meta">
            {year ? (
              <time
                className="research-card__meta-year"
                dateTime={String(year)}
              >
                {YearIcon ? (
                  <YearIcon
                    className="research-card__meta-year-icon"
                    aria-hidden="true"
                  />
                ) : null}
                <span className="research-card__meta-year-label">{year}</span>
              </time>
            ) : null}

            {year && labelWithQuartile ? (
              <span className="research-card__meta-sep" aria-hidden="true">
                |
              </span>
            ) : null}

            {labelWithQuartile ? (
              <TooltipText
                as="span"
                className="research-card__meta-journal"
                content={tooltip}
              >
                {labelWithQuartile}
              </TooltipText>
            ) : null}
          </div>

          {slug ? (
            <Button
              className="research-card__action"
              variant="primary"
              size="large"
              href={`/publications/${slug}`}
              icon={<DetailsIcon />}
              aria-label={detailsAriaLabel}
            />
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
