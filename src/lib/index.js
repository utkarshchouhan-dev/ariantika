// Motion
export {
  EASE_OUT_EXPO,
  hoverCursor,
  revealDeck,
  viewportOnce,
} from "./motion/motion";

// Site
export { getSiteUrl, SITE_URL } from "./site";

// JSON-LD
export { PERSON_ID, getPersonEntity, getPersonJsonLd } from "./json-ld/person";

// Profile Page JSON-LD
export { getProfilePageJsonLd } from "./json-ld/profile-page";

// JSON-LD Component
export { default as JsonLd } from "./json-ld/JsonLd";

// Metadata
export {
  SITE_NAME,
  SITE_SHORT_NAME,
  SITE_TITLE_TEMPLATE,
  SITE_DEFAULT_TITLE,
  SITE_DEFAULT_DESCRIPTION,
  OPEN_GRAPH_IMAGE,
  SITE_KEYWORDS,
} from "./metadata/constants";

// Create Page Metadata
export { createPageMetadata } from "./metadata/create-page-metadata";

// Submit Contact Form
export { submitContactForm } from "./contact/submit-contact";
