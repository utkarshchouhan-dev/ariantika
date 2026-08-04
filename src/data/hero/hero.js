import {
  PiArrowUpRightBold,
  PiDownloadSimpleBold,
  PiMapPinBold,
} from "react-icons/pi";
import { getExperienceDuration } from "@/utils";

import heroPortrait from "@/assets/images/hero/ariantika-hero-portrait.jpeg";

const duration = getExperienceDuration();

export const hero = {
  heroHeadingId: "hero-heading",

  greeting: {
    text: "hi there!",
    icon: "👋",
  },

  title: {
    name: "I'm Ariantika",
    highlightSrOnly: ", an",
    highlight: "Epidemiology & Biostatistics Researcher.",
  },

  location: {
    icon: PiMapPinBold,
    text: "based in North Sumatra, Indonesia.",
  },

  description: {
    beforeAbbr:
      "Conducting research in cancer, infectious, and non\u2011communicable diseases. Experienced in research design, statistical analysis using ",
    abbr: {
      label: "SPSS",
      title: "Statistical Package for the Social Sciences.",
    },
    afterAbbr:
      ", and translating data into insights that strengthen public health systems.",
  },

  actions: [
    {
      id: "contact",
      label: "Contact",
      href: "/contact",
      icon: PiArrowUpRightBold,
      variant: "primary",
      ariaLabel: "contact page.",
    },
    {
      id: "resume",
      label: "Resume",
      href: "/documents/ARIANTIKA_PUBLIC_HEALTH_RESUME.pdf",
      icon: PiDownloadSimpleBold,
      variant: "secondary",
      download: true,
      ariaLabel: "download my resume PDF.",
    },
  ],

  image: {
    src: heroPortrait,
    alt: "Ariantika smiling in an outdoor graduation portrait.",
  },

  badge: {
    ringText: "Research Experience • Researcher • Public Health •",
    years: duration.years,
    yearsLabel: "Years",
  },
};
