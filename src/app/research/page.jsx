import { PageHeader, ResearchCard } from "@/components";
import {
  getOrderedPublications,
  researchPage,
  researchPageMetadata,
} from "@/data";

import "./page.scss";

export const metadata = researchPageMetadata;

export default function ResearchPage() {
  const publications = getOrderedPublications();

  return (
    <main id="main" tabIndex={-1} className="research-page">
      <PageHeader header={researchPage.header} />

      <div className="research-page__container">
        <div className="research-page__items">
          {publications.map((publication, index) => (
            <ResearchCard
              key={publication.id}
              publication={publication}
              index={index}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
