import { notFound } from "next/navigation";
import { getPublicationBySlug, researchSource } from "@/data";
import { createPageMetadata } from "@/lib";

import "./page.scss";

export function generateStaticParams() {
  return researchSource.publications.map((publication) => ({
    slug: publication.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const publication = getPublicationBySlug(slug);

  if (!publication) {
    return createPageMetadata({
      path: `/research/${slug}`,
      title: "Publication Not Found",
      description:
        "This publication could not be found. View all research publications on ariantika.me.",
      robots: {
        index: false,
        follow: false,
      },
    });
  }

  return createPageMetadata({
    path: `/research/${slug}`,
    title: publication.cover.title,
    description: publication.cover.summary,
  });
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
