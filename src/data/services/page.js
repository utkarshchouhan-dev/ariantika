import { GrCertificate } from "react-icons/gr";
import {
  LuPlus,
  LuMinus,
  LuBadgeCheck,
  LuBookOpenCheck,
  LuListChecks,
  LuMessagesSquare,
  LuShieldCheck,
} from "react-icons/lu";
import { PiArrowUpRightBold } from "react-icons/pi";
import { getExperienceDuration } from "@/lib";

import heroPortrait from "@/assets/images/hero/ariantika-hero-portrait.jpeg";

import { quranTrustsVerse } from "@/data";
import { servicesSource } from "./source";

const duration = getExperienceDuration();

// ---- services page ----
export const servicesPage = {
  header: {
    eyebrow: "What I Offer",
    title: {
      prefix: "Research",
      accent: "Services",
    },
    subtitle:
      "End-to-end research support to help you design stronger studies, analyze data accurately, and publish in high-impact journals.",
  },

  services: servicesSource,

  quran: quranTrustsVerse,

  whyChooseMe: {
    header: {
      prefix: "Why Choose",
      accent: "Me",
      suffix: "?",
      subtitle:
        "Choosing the right research partner matters. Here's what you can expect when working with me.",
    },
    items: [
      {
        icon: LuBadgeCheck,
        title: `${duration.years}+ Years Experience`,
      },
      {
        icon: GrCertificate,
        title: "MPH Qualified",
      },
      {
        icon: LuBookOpenCheck,
        title: "Published Research",
      },
      {
        icon: LuListChecks,
        title: "End-to-End Support",
      },
      {
        icon: LuMessagesSquare,
        title: "Tailored Guidance",
      },
      {
        icon: LuShieldCheck,
        title: "Ethical & Evidence-Based",
      },
    ],
  },

  faq: {
    header: {
      prefix: "FA",
      accent: "Q",
      subtitle:
        "Common questions about working together, timelines, confidentiality, and how I support your research.",
    },
    icons: {
      plus: LuPlus,
      minus: LuMinus,
    },
    items: [
      {
        question: "How do we get started?",
        answer:
          "Simply contact me with your research topic, objectives, and any available materials. I'll review your project and recommend the best way to proceed.",
      },
      {
        question: "What types of research do you support?",
        answer:
          "I primarily support epidemiology, public health, and medical research, but I also assist with other academic disciplines depending on the project's requirements.",
      },
      {
        question: "Do you write the research for clients?",
        answer:
          "No. My role is to provide professional guidance, editing, statistical analysis, and publication support while maintaining academic integrity and ethical research practices.",
      },
      {
        question: "Which statistical software do you use?",
        answer:
          "SPSS is my primary statistical software, and I can assist with descriptive, inferential, and regression analyses.",
      },
      {
        question: "Can you help prepare a manuscript for journal submission?",
        answer:
          "Yes. I assist with formatting, journal selection, responding to reviewers, and ensuring manuscripts meet submission requirements.",
      },
      {
        question: "Do you offer revisions?",
        answer:
          "Yes. Revisions are included according to the agreed scope to ensure the final work meets your expectations.",
      },
      {
        question: "Is my research confidential?",
        answer:
          "Absolutely. All client information and research materials are treated with strict confidentiality.",
      },
      {
        question: "How long does a project take?",
        answer:
          "Project timelines vary depending on complexity and scope. After reviewing your requirements, I'll provide an estimated delivery schedule.",
      },
    ],
  },

  contactCta: {
    image: {
      src: heroPortrait,
      alt: "Ariantika smiling in an outdoor graduation portrait.",
    },
    title: "Still Have Questions?",
    subtitle:
      "If anything is unclear about services, timelines, or how we can work together, I'd be happy to hear from you.",
    cta: {
      label: "Get In Touch",
      href: "/contact",
      icon: <PiArrowUpRightBold />,
      variant: "primary",
      size: "small",
      ariaLabel: "Go to contact page.",
    },
  },
};
