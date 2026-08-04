import {
  FaStethoscope,
  FaLightbulb,
  FaHeartPulse,
  FaVirusSlash,
  FaSeedling,
} from "react-icons/fa6";
import { TfiArrowTopRight } from "react-icons/tfi";

import campusOutdoor from "@/assets/images/about/ariantika-usu-campus-outdoor.jpeg";
import mphGraduation from "@/assets/images/about/ariantika-master-public-health-graduation-2024.jpeg";
import mabipConference from "@/assets/images/about/ariantika-mabip-conference-2025.jpg";
import genomicsScienceDay from "@/assets/images/about/ariantika-genomics-science-day.jpeg";
import scienceMuseumBacteria from "@/assets/images/about/ariantika-science-museum-bacteria-exhibit.jpeg";

const carouselStepIds = ["05", "02", "03"];

const aboutPageSteps = [
  {
    id: "01",
    title: "The Question",
    image: campusOutdoor,
    alt: "Ariantika smiling at the university campus.",
    icon: FaStethoscope,
    text: "I don't think my journey into epidemiology began in a classroom. Looking back, it began with a question. During my early years working as a teaching and research assistant in a hospital, I often found myself wondering why people facing similar illnesses could experience completely different outcomes. Some patients recovered more quickly than expected, while others struggled despite receiving similar care. I couldn't explain it, but I couldn't stop thinking about it either. At first, I believed the answers would come from medicine alone. The longer I spent in clinical environments, however, the more I realized that health was shaped by far more than what happened inside hospital walls. Every patient carried a different story, influenced by circumstances that couldn't always be measured during a consultation.",
  },
  {
    id: "02",
    title: "Finding Direction",
    image: mphGraduation,
    alt: "Ariantika wearing a maroon graduation sash labeled Master of Public Health.",
    icon: FaLightbulb,
    text: "That curiosity gradually led me toward epidemiology. For the first time, I began looking beyond individual cases and started asking bigger questions. Instead of asking why one patient became ill, I became interested in understanding why entire communities experienced disease differently. Epidemiology gave me a new way of thinking. Research was no longer just about collecting data or applying statistical methods, it became a way of exploring questions that mattered.",
  },
  {
    id: "03",
    title: "A Turning Point",
    image: mabipConference,
    alt: "Ariantika in conference lanyard gesturing toward the 9th MABIP 2025.",
    icon: FaHeartPulse,
    text: "One project, in particular, changed the way I approached research. While studying the quality of life of patients with advanced lung cancer, I found myself reading responses that revealed much more than numbers ever could. Behind every questionnaire was a person adapting to uncertainty, treatment, family, and everyday life. That experience reminded me that research is most meaningful when it never loses sight of the people behind the evidence.",
  },
  {
    id: "04",
    title: "Looking Beyond Disease",
    image: scienceMuseumBacteria,
    alt: "Ariantika smiling while pointing at a museum exhibit panel about bacteria.",
    icon: FaVirusSlash,
    text: "Since then, my interests have continued to grow beyond understanding disease itself. I became increasingly drawn to prevention, population health, and the factors that influence well-being long before someone arrives at a hospital. The more I learned, the more convinced I became that good research has the power not only to explain health problems but also to help prevent them. Today, I continue building my experience in epidemiology, biostatistics, scientific writing, and research methodology through collaboration and ongoing research. Every project challenges me to think differently, refine my approach, and ask better questions than I asked before. ",
  },
  {
    id: "05",
    title: "Still Curious",
    image: genomicsScienceDay,
    alt: "Ariantika at a Genomics Science Day event.",
    icon: FaSeedling,
    text: "My next goal is to pursue a PhD in epidemiology, where I hope to continue investigating the questions that first sparked my curiosity years ago. For me, earning a doctorate isn't simply about another academic milestone. It's an opportunity to contribute to research that informs public health decisions, supports evidence-based practice, and ultimately improves people's lives. When I look back, I don't measure my journey by degrees, publications, or professional titles. I measure it by the questions that refused to leave me. Those questions continue to shape the researcher I am today, and I hope they will continue guiding the work I do in the years ahead.",
  },
];

export const aboutSection = {
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

const stepsById = Object.fromEntries(
  aboutPageSteps.map((step) => [step.id, step]),
);

export const aboutSource = {
  aboutPageSteps,
  carousel: carouselStepIds
    .map((id) => stepsById[id])
    .filter(Boolean)
    .map(({ image, alt, caption }) => ({
      src: image,
      alt,
      caption,
    })),
};
