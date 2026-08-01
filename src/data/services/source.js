import { FaCircleCheck } from "react-icons/fa6";

import scientificWritingImgPage from "@/assets/images/services_page/scientific-writing.png";
import researchDesignImgPage from "@/assets/images/services_page/research-design.png";
import copyEditingImgPage from "@/assets/images/services_page/copy-editing.png";

const figcaption = "photo by @storyset";

// ---- services source ----
export const servicesSource = [
  {
    id: "scientific-writing",
    theme: "primary",
    title: "Scientific Writing & Publication Support",
    description:
      "Publishing research requires more than presenting results. Journals expect clear scientific communication, logical structure, accurate formatting, and a manuscript that aligns with editorial and reviewer expectations. The focus here is refining research into a polished, submission-ready paper suitable for peer-reviewed academic publication.",
    image: scientificWritingImgPage,
    imageAlt:
      "Illustration of hands typing on a laptop beside a notepad and pen, representing scientific writing and manuscript preparation.",
    figcaption,
    list: {
      icon: FaCircleCheck,
      items: [
        "Manuscript structuring and academic writing support",
        "Journal selection for Scopus and Web of Science indexed outlets",
        "Responding to reviewer comments with evidence-based revisions",
        "Formatting and compliance with each journal's guidelines",
        "Submission, resubmission, and follow-through to acceptance",
      ],
    },
  },
  {
    id: "research-design",
    theme: "secondary",
    title: "Research Design & Data Analysis",
    description:
      "The quality of a study is determined long before the final manuscript is written. Careful methodology, reliable data handling, and appropriate statistical analysis are essential for producing findings that are credible, defensible, and academically meaningful. This work supports researchers through study planning, SPSS analysis, interpretation, and publication-ready reporting.",
    image: researchDesignImgPage,
    imageAlt:
      "Illustration of researchers reviewing charts, graphs, and data dashboards, representing study design and statistical analysis.",
    figcaption,
    list: {
      icon: FaCircleCheck,
      items: [
        "Study design and methodology for epidemiological and public-health research",
        "Sample size estimation and sampling strategy",
        "Data management, cleaning, and preparation in SPSS",
        "Descriptive, inferential, and regression analysis",
        "Publication-ready tables, figures, and written interpretation",
      ],
    },
  },
  {
    id: "copy-editing",
    theme: "accent",
    title: "Copy Editing & Translation",
    description:
      "Clear academic language plays a critical role in how research is understood and evaluated. Editing and translation are approached with attention to clarity, consistency, technical accuracy, and readability while preserving the original scientific meaning and professional tone of the document for an international academic audience.",
    image: copyEditingImgPage,
    imageAlt:
      "Illustration of an editor at a laptop with greetings in multiple languages and a world map, representing copy editing and translation.",
    figcaption,
    list: {
      icon: FaCircleCheck,
      items: [
        "Copy editing and proofreading (grammar, clarity, style, formatting)",
        "Academic editing for structure, flow, and consistency",
        "English to Indonesian translation for academic content",
        "Tone, terminology, and reference checks",
        "Suitable for manuscripts, theses, reports, and scholarly books",
      ],
    },
  },
];
