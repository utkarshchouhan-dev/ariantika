import { PUBLICATION_STATUS } from "./status";
import { researchPublications } from "./source";

const PUBLICATION_STATUS_PRIORITY = ["published", "under-review", "submitted"];

// ---- get publication status ----
export function getPublicationStatus(status) {
  const config = PUBLICATION_STATUS[status];

  if (!config) {
    throw new Error(
      `Unknown publication status "${status}". Expected one of: ${Object.keys(PUBLICATION_STATUS).join(", ")}.`,
    );
  }

  return config;
}

// ---- get publication accent vars ----
export function getPublicationAccentVars(status) {
  const { accent } = getPublicationStatus(status);

  return {
    "--card-accent": `var(--${accent})`,
    "--card-accent-soft": `var(--${accent}-soft)`,
  };
}

// ---- get ordered publications ----
export function getOrderedPublications() {
  return PUBLICATION_STATUS_PRIORITY.flatMap((status) =>
    researchPublications.filter((publication) => publication.status === status),
  );
}

// ---- get featured publications ----
export function getFeaturedPublications(limit = 3) {
  return getOrderedPublications().slice(0, limit);
}

// ---- get publication by slug ----
export function getPublicationBySlug(slug) {
  return researchPublications.find((publication) => publication.slug === slug);
}
