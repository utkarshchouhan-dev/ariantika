import { quranKnowledgeVerse } from "@/data";
import { aboutMePageStepsSource } from "./source";

// ---- about page ----
export const aboutMePageSteps = {
  header: {
    eyebrow: "My Story",
    title: {
      prefix: "How",
      accent: "I",
      suffix: "Got Here",
    },
    subtitle:
      "This is where I share the experiences that shaped not only what I study, but why I chose to study it.",
  },

  steps: aboutMePageStepsSource,

  quote: quranKnowledgeVerse,
};
