import { TfiArrowTopRight } from "react-icons/tfi";

// ---- about section ----
export const aboutSection = {
  aboutHeadingId: "about-heading",

  header: {
    prefix: "About",
    accent: "Me",
    subtitle:
      "A bit about my background and what led me into public health research.",
    accentTag: "small",
  },

  carousel: {
    ariaLabel:
      "Photos from my life as a researcher and student. Tap to navigate through the photos.",
  },

  paragraphs: [
    "Before I ever studied epidemiology, I was already close to research.",
    "I spent several years working as a teaching and research assistant in a clinical setting. It wasn’t something distant or abstract. I was part of the daily work, helping with studies, joining discussions, and seeing how research actually develops from an idea into something useful.",
    "Over time, I started paying less attention to results alone and more to the questions behind them. Why do some diseases appear more in certain populations? What increases risk? And how much of it could be understood earlier or even prevented?",
    "That shift is what led me to epidemiology. It gave me a way to explore those questions with structure, not just curiosity.",
    "Since then, my work has focused on cancer and public health research, especially in understanding how disease affects people beyond clinical outcomes, including quality of life.",
  ],

  cta: {
    href: "/aboutme",
    label:
      "If you want to understand how this path really started and what shaped it, you can continue reading my story.",
    icon: TfiArrowTopRight,
  },
};
