import { SITE_URL } from "@/lib";
import { PERSON_ID } from "./person";

export function getProfilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profilepage`,
    url: SITE_URL,
    mainEntity: {
      "@id": PERSON_ID,
    },
  };
}
