import { PiArrowUpRightBold, PiCalendarDotsLight } from "react-icons/pi";

import lungCancerImage from "@/assets/images/research/lung-cancer.webp";
import dyspneaImage from "@/assets/images/research/dyspnea.webp";
import hospitalInfectionImage from "@/assets/images/research/hospital-infection.webp";
import tuberculosisLungsImage from "@/assets/images/research/tuberculosis-lungs.webp";

export const PUBLICATION_STATUS = {
  published: {
    id: "published",
    label: "Published",
    accent: "primary",
  },
  accepted: {
    id: "accepted",
    label: "Accepted",
    accent: "accent",
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
      title:
        "Assessment of Quality of Life in Advanced-Stage Lung Cancer Patients Using EORTC QLQ-C30 Questionnaire",
      summary:
        "Cross-sectional study assessing quality of life in patients with advanced-stage lung cancer using the EORTC QLQ-C30 questionnaire.",
      image: lungCancerImage,
      imageAlt: "Medical illustration representing advanced-stage lung cancer.",
    },
    publication: {
      year: 2024,
      type: "Journal Article",
      quartile: null,
      label: "Journal Respirologi Indonesia",
      tooltip: "Journal Respirologi Indonesia (National Accredited)",
    },
  },
  {
    id: "factors-qol-advanced-lung-cancer",
    slug: "clinical-sociodemographic-psychosocial-factors-quality-of-life-advanced-lung-cancer",
    status: PUBLICATION_STATUS.accepted.id,
    cover: {
      title:
        "Clinical, Sociodemographic, and Psychosocial Factors Associated with Quality of Life in Advanced Lung Cancer: Implications for Respiratory Therapy Practice",
      summary:
        "Examines clinical, sociodemographic, and psychosocial factors associated with quality of life in advanced lung cancer, with implications for respiratory therapy practice.",
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
    slug: "longitudinal-trends-healthcare-associated-infections-indonesian-university-teaching-hospital",
    status: PUBLICATION_STATUS["under-review"].id,
    cover: {
      title:
        "Longitudinal Trends in Healthcare-Associated Infections at an Indonesian University Teaching Hospital: An Active Surveillance Study, 2022-2025",
      summary:
        "Active surveillance study examining longitudinal trends in healthcare-associated infections at an Indonesian university teaching hospital from 2022 to 2025.",
      image: hospitalInfectionImage,
      imageAlt:
        "Medical illustration representing healthcare-associated infection surveillance.",
    },
    publication: {
      year: 2026,
      type: "Journal Article",
      quartile: "Q2",
      label: "Infection Prevention in Practice",
      tooltip: "Infection Prevention in Practice",
    },
  },
  {
    id: "supportive-tb-isolation-room",
    slug: "designing-supportive-tuberculosis-isolation-room-patient-experience-infection-control",
    status: PUBLICATION_STATUS["under-review"].id,
    cover: {
      title:
        "Designing a More Supportive Tuberculosis Isolation Room: Patient Experience and Infection Control Considerations",
      summary:
        "Examines patient experience and infection control considerations in designing a more supportive tuberculosis isolation room.",
      image: tuberculosisLungsImage,
      imageAlt:
        "Medical illustration representing pulmonary tuberculosis research.",
    },
    publication: {
      year: 2026,
      type: "Journal Article",
      quartile: "Q2",
      label: "Journal of Patient Experience",
      tooltip: "Journal of Patient Experience",
    },
  },
];

const publicationStatusPriority = [
  "published",
  "accepted",
  "under-review",
  "submitted",
];

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