import { PiArrowUpRightBold, PiCheckCircleBold } from "react-icons/pi";

import scientificWritingImgPage from "@/assets/images/services_page/scientific-writing.png";
import researchDesignImgPage from "@/assets/images/services_page/research-design.png";
import copyEditingImgPage from "@/assets/images/services_page/copy-editing.png";
import scientificWritingImg from "@/assets/images/services/scientific-writing.svg";
import researchDesignImg from "@/assets/images/services/research-design.svg";
import copyEditingImg from "@/assets/images/services/copy-editing.svg";

const servicesPage = [
  {
    id: "scientific-writing",
    theme: "primary",
    title: "Scientific Writing & Publication Support",
    description:
      "Publishing research requires more than presenting results. Journals expect clear scientific communication, logical structure, accurate formatting, and a manuscript that aligns with editorial and reviewer expectations. The focus here is refining research into a polished, submission-ready paper suitable for peer-reviewed academic publication.",
    image: scientificWritingImgPage,
    imageAlt:
      "Illustration of hands typing on a laptop beside a notepad and pen.",
    bullets: [
      "Manuscript structuring and academic writing support",
      "Journal selection for Scopus and Web of Science indexed outlets",
      "Responding to reviewer comments with evidence-based revisions",
      "Formatting and compliance with each journal's guidelines",
      "Submission, resubmission, and follow-through to acceptance",
    ],
  },
  {
    id: "research-design",
    theme: "secondary",
    title: "Research Design & Data Analysis",
    description:
      "The quality of a study is determined long before the final manuscript is written. Careful methodology, reliable data handling, and appropriate statistical analysis are essential for producing findings that are credible, defensible, and academically meaningful. This work supports researchers through study planning, SPSS analysis, interpretation, and publication-ready reporting.",
    image: researchDesignImgPage,
    imageAlt:
      "Illustration of researchers reviewing charts, graphs, and data dashboards.",
    bullets: [
      "Study design and methodology for epidemiological and public-health research",
      "Sample size estimation and sampling strategy",
      "Data management, cleaning, and preparation in SPSS",
      "Descriptive, inferential, and regression analysis",
      "Publication-ready tables, figures, and written interpretation",
    ],
  },
  {
    id: "copy-editing",
    theme: "accent",
    title: "Copy Editing & Translation",
    description:
      "Clear academic language plays a critical role in how research is understood and evaluated. Editing and translation are approached with attention to clarity, consistency, technical accuracy, and readability while preserving the original scientific meaning and professional tone of the document for an international academic audience.",
    image: copyEditingImgPage,
    imageAlt:
      "Illustration of an editor at a laptop with greetings in multiple languages.",
    bullets: [
      "Copy editing and proofreading (grammar, clarity, style, formatting)",
      "Academic editing for structure, flow, and consistency",
      "English to Indonesian translation for academic content",
      "Tone, terminology, and reference checks",
      "Suitable for manuscripts, theses, reports, and scholarly books",
    ],
  },
];

const servicesSectionContent = [
  {
    image: scientificWritingImg,
    imageAlt: "Illustration of a person working at a laptop.",
    title: "Scientific Writing & Publication",
    description:
      "Supporting academic writing and journal submission in line with publication standards.",
    bullets: [
      "Structure research papers for journal submission",
      "Write and improve key sections",
      "Format manuscripts based on journal guidelines",
      "Support literature review and references",
      "Assist with revisions and reviewer responses",
    ],
  },
  {
    image: researchDesignImg,
    imageAlt: "Illustration of a browser dashboard with bar charts.",
    title: "Research Design & Data Analysis",
    description:
      "Building reliable research through stronger methodology, data analysis, and statistical interpretation.",
    bullets: [
      "Design epidemiological and public health studies",
      "Analyze data using SPSS",
      "Clean and prepare datasets",
      "Apply appropriate statistical methods",
      "Interpret results for research and publication",
    ],
  },
  {
    image: copyEditingImg,
    imageAlt: "Illustration of a document with editing marks.",
    title: "Copy Editing & Translation",
    description:
      "Improving clarity, consistency, and readability for international academic communication.",
    bullets: [
      "Improve clarity and structure of academic writing",
      "Align manuscripts with publication standards",
      "Edit grammar and technical language",
      "Translate research for international use",
      "Ensure accuracy and context in translations",
    ],
  },
];

export const servicesSource = {
  checkIcon: PiCheckCircleBold,
  arrowIcon: PiArrowUpRightBold,
  servicesPage,
  servicesSection: servicesSectionContent.map((section, i) => ({
    id: i,
    href: `/services#${servicesPage[i].id}`,
    ...section,
  })),
};
