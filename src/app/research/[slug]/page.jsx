import { notFound } from "next/navigation";
import { getPublicationBySlug, researchPublications } from "@/data";

import "./page.scss";

export function generateStaticParams() {
  return researchPublications.map((publication) => ({
    slug: publication.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const publication = getPublicationBySlug(slug);

  if (!publication) {
    return {
      title: "Publication Not Found",
    };
  }

  return {
    title: publication.cover.title,
    description: publication.cover.summary,
  };
}

export default async function ResearchPublicationPage({ params }) {
  const { slug } = await params;
  const publication = getPublicationBySlug(slug);

  if (!publication) {
    notFound();
  }

  return (
    <main id="main" tabIndex={-1} className="research-publication">
      <div className="research-publication__container">
        <p className="research-publication__status">Coming soon</p>
      </div>
    </main>
  );
}
