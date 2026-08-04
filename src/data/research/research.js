import { PiArrowUpRightBold, PiCalendarDotsLight } from "react-icons/pi";

import lungCancerImage from "@/assets/images/research/lung-cancer.png";
import dyspneaImage from "@/assets/images/research/dyspnea.png";
import hospitalInfectionImage from "@/assets/images/research/hospital-infection.png";
import tuberculosisLungsImage from "@/assets/images/research/tuberculosis-lungs.png";

export const PUBLICATION_STATUS = {
  published: {
    id: "published",
    label: "Published",
    accent: "primary",
  },
  "under-review": {
    id: "under-review",
    label: "Under Review",
    accent: "secondary",
  },
  submitted: {
    id: "submitted",
    label: "Submitted",
    accent: "accent",
  },
};

const publications = [
  {
    id: "qol-advanced-lung-cancer",
    slug: "quality-of-life-in-advanced-stage-lung-cancer",
    status: PUBLICATION_STATUS.published.id,
    cover: {
      title: "Assessment of Quality of Life in Advanced Lung Cancer",
      summary:
        "Cross-sectional study assessing patient quality of life using the EORTC QLQ-C30 questionnaire.",
      image: lungCancerImage,
      imageAlt: "Medical illustration representing advanced-stage lung cancer.",
    },
    publication: {
      year: 2024,
      type: "Journal Article",
      quartile: null,
      label: "Journal Respirologi",
      tooltip: "Journal Respirologi Indonesia",
    },
  },
  {
    id: "dyspnea-family-support-qol",
    slug: "dyspnea-family-support-quality-of-life-advanced-lung-cancer",
    status: PUBLICATION_STATUS["under-review"].id,
    cover: {
      title: "Dyspnea and Family Support in Advanced Lung Cancer",
      summary:
        "Investigates how dyspnea and family support influence quality of life in advanced lung cancer.",
      image: dyspneaImage,
      imageAlt:
        "Medical illustration representing respiratory therapy research.",
    },
    publication: {
      year: 2026,
      type: "Journal Article",
      quartile: "Q2",
      label: "CJRT",
      tooltip: "Canadian Journal of Respiratory Therapy",
    },
  },
  {
    id: "hai-indonesian-teaching-hospital",
    slug: "healthcare-associated-infections-indonesian-teaching-hospital",
    status: PUBLICATION_STATUS["under-review"].id,
    cover: {
      title:
        "Healthcare-Associated Infections in an Indonesian Teaching Hospital",
      summary:
        "Five-year surveillance study examining trends and incidence of healthcare-associated infections.",
      image: hospitalInfectionImage,
      imageAlt:
        "Medical illustration representing healthcare-associated infection surveillance.",
    },
    publication: {
      year: 2026,
      type: "Journal Article",
      quartile: "Q2",
      label: "Epidemiologia",
      tooltip: "Epidemiologia",
    },
  },
  {
    id: "biophilic-tb-isolation",
    slug: "biophilic-elements-pulmonary-tuberculosis-isolation-rooms",
    status: PUBLICATION_STATUS.submitted.id,
    cover: {
      title: "Biophilic Design for Tuberculosis Isolation Rooms",
      summary:
        "Explores biophilic design strategies to reduce transmission risk and improve patient well-being.",
      image: tuberculosisLungsImage,
      imageAlt:
        "Medical illustration representing pulmonary tuberculosis research.",
    },
    publication: {
      year: 2026,
      type: "Journal Article",
      quartile: "Q1",
      label: "Health & Place",
      tooltip: "Health & Place",
    },
  },
];

const publicationStatusPriority = ["published", "under-review", "submitted"];

export const researchSource = {
  researchHeadingId: "research-heading",
  publications,
  card: {
    yearIcon: PiCalendarDotsLight,
    detailsIcon: PiArrowUpRightBold,
    detailsAriaLabel: "Read Publication",
  },
};

export function getPublicationStatus(status) {
  const config = PUBLICATION_STATUS[status];

  if (!config) {
    throw new Error(
      `Unknown publication status "${status}". Expected one of: ${Object.keys(PUBLICATION_STATUS).join(", ")}.`,
    );
  }

  return config;
}

export function getPublicationAccentVars(status) {
  const { accent } = getPublicationStatus(status);

  return {
    "--card-accent": `var(--${accent})`,
    "--card-accent-soft": `var(--${accent}-soft)`,
  };
}

export function getOrderedPublications() {
  return publicationStatusPriority.flatMap((status) =>
    publications.filter((publication) => publication.status === status),
  );
}

export function getFeaturedPublications(limit = 3) {
  return getOrderedPublications().slice(0, limit);
}

export function getPublicationBySlug(slug) {
  return publications.find((publication) => publication.slug === slug);
}
