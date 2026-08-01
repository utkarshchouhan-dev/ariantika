import { ResearchCard, SectionHeader } from "@/components";
import { getFeaturedPublications, researchSection } from "@/data";

import "./Research.scss";

export default function Research() {
  const {
    researchHeadingId,
    header: { prefix, accent, subtitle },
  } = researchSection;
  const featuredPublications = getFeaturedPublications(3);

  return (
    <section className="research" aria-labelledby={researchHeadingId}>
      <SectionHeader
        className="research__header"
        headingId={researchHeadingId}
        prefix={prefix}
        accent={accent}
        subtitle={subtitle}
      />

      <div className="research__container">
        <div className="research__items">
          {featuredPublications.map((publication, index) => (
            <ResearchCard
              key={publication.id}
              publication={publication}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
