import { socialLinks } from "@/data";
import { SITE_URL } from "@/lib";

/** Stable @id for the Person entity — referenced by ProfilePage on the homepage. */
export const PERSON_ID = `${SITE_URL}/#person`;

const PERSON_DESCRIPTION =
  "Epidemiology & Biostatistics researcher focused on cancer, infectious, and non-communicable diseases. Research design, SPSS analysis, and public health insights from North Sumatra, Indonesia.";

const PERSON_KNOWS_ABOUT = [
  "Epidemiology",
  "Biostatistics",
  "Cancer",
  "Infectious Diseases",
  "Non-Communicable Diseases",
  "SPSS",
  "Research Design",
  "Public Health",
  "Scientific Writing",
  "Research Methodology",
  "Data Analysis",
];

function getVerifiedSameAs() {
  return socialLinks
    .map((link) => link.href)
    .filter((href) => href.startsWith("http"));
}

export function getPersonEntity() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Ariantika",
    alternateName: ["Ariantika", "Ariantikaa", "Ariantika Effendi"],
    jobTitle: "Epidemiology & Biostatistics Researcher",
    description: PERSON_DESCRIPTION,
    url: SITE_URL,
    mainEntityOfPage: SITE_URL,
    image: `${SITE_URL}/opengraph-image.png`,
    email: "mailto:ariantikaeffendi@gmail.com",
    sameAs: getVerifiedSameAs(),
    address: {
      "@type": "PostalAddress",
      addressLocality: "North Sumatra",
      addressCountry: "Indonesia",
    },
    knowsAbout: PERSON_KNOWS_ABOUT,
  };
}

export function getPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    ...getPersonEntity(),
  };
}
