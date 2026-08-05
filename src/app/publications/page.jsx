import { PageHeader, ResearchCard } from "@/components";
import {
  getOrderedPublications,
  researchHeader,
  researchPageMetadata,
} from "@/data";

import "./page.scss";

export const metadata = researchPageMetadata;

export default function ResearchPage() {
  const publications = getOrderedPublications();

  return (
    <main id="main" tabIndex={-1} className="research-page">
      <PageHeader header={researchHeader.pageHeader} />

      <div className="research-page__container">
        <div className="research-page__items">
          {publications.map((publication, index) => (
            <ResearchCard
              key={publication.id}
              publication={publication}
              index={index}
              priority={index === 0}
              as="h2"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
