import Image from "next/image";
import { Button, TooltipText } from "@/components";
import {
  getPublicationAccentVars,
  getPublicationStatus,
  researchSource,
} from "@/data";

import "./ResearchCard.scss";

// ---- research card ----
export default function ResearchCard({
  publication: card,
  priority = false,
  className = "",
  as: Heading = "h3",
}) {
  // ---- data ----
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
    <article
      className={`research__card ${className}`.trim()}
      style={accentVars}
    >
      {/* ---- media ---- */}
      <div className="research__card--media">
        {image ? (
          <Image
            className="research__card--media-image"
            src={image}
            alt={imageAlt ?? ""}
            width={800}
            height={800}
            sizes="(max-width: 768px) 350px, 400px"
            quality={70}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
          />
        ) : null}
      </div>

      {/* ---- badge ---- */}
      <span className="research__card--badge">{statusLabel}</span>

      {/* ---- content ---- */}
      <div className="research__card--content">
        <Heading className="research__card--title">{title}</Heading>
        <p className="research__card--summary">{summary}</p>

        <div className="research__card--meta-container">
          <div className="research__card--meta">
            {year ? (
              <time
                className="research__card--meta-year"
                dateTime={String(year)}
              >
                {YearIcon ? (
                  <YearIcon
                    className="research__card--meta-year-icon"
                    aria-hidden="true"
                  />
                ) : null}
                <span className="research__card--meta-year-label">{year}</span>
              </time>
            ) : null}

            {year && labelWithQuartile ? (
              <span className="research__card--meta-sep" aria-hidden="true">
                |
              </span>
            ) : null}

            {labelWithQuartile ? (
              <TooltipText
                as="span"
                className="research__card--meta-journal"
                content={tooltip}
              >
                {labelWithQuartile}
              </TooltipText>
            ) : null}
          </div>

          {slug ? (
            <Button
              className="research__card--action"
              variant="primary"
              size="large"
              href={`/publications/${slug}`}
              icon={<DetailsIcon />}
              aria-label={detailsAriaLabel}
            />
          ) : null}
        </div>
      </div>
    </article>
  );
}
