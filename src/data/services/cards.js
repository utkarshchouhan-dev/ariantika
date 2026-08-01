import { FaCircleCheck } from "react-icons/fa6";
import { PiArrowUpRightBold } from "react-icons/pi";

import scientificWritingImg from "@/assets/images/services/scientific-writing.svg";
import researchDesignImg from "@/assets/images/services/research-design.svg";
import copyEditingImg from "@/assets/images/services/copy-editing.svg";

import { servicesSource } from "./source";

// ---- services section cards ----
export const servicesCards = [
  {
    id: 0,
    href: `/services#${servicesSource[0].id}`,
    image: scientificWritingImg,
    imageAlt: "Illustration of a person working at a laptop.",
    title: "Scientific Writing & Publication",
    description:
      "Supporting academic writing and journal submission in line with publication standards.",
    icon: FaCircleCheck,
    bullets: [
      "Structure research papers for journal submission",
      "Write and improve key sections",
      "Format manuscripts based on journal guidelines",
      "Support literature review and references",
      "Assist with revisions and reviewer responses",
    ],
  },
  {
    id: 1,
    href: `/services#${servicesSource[1].id}`,
    image: researchDesignImg,
    imageAlt: "Illustration of a browser dashboard with bar charts.",
    title: "Research Design & Data Analysis",
    description:
      "Building reliable research through stronger methodology, data analysis, and statistical interpretation.",
    icon: FaCircleCheck,
    bullets: [
      "Design epidemiological and public health studies",
      "Analyze data using SPSS",
      "Clean and prepare datasets",
      "Apply appropriate statistical methods",
      "Interpret results for research and publication",
    ],
  },
  {
    id: 2,
    href: `/services#${servicesSource[2].id}`,
    image: copyEditingImg,
    imageAlt: "Illustration of a document with editing marks.",
    title: "Copy Editing & Translation",
    description:
      "Improving clarity, consistency, and readability for international academic communication.",
    icon: FaCircleCheck,
    bullets: [
      "Improve clarity and structure of academic writing",
      "Align manuscripts with publication standards",
      "Edit grammar and technical language",
      "Translate research for international use",
      "Ensure accuracy and context in translations",
    ],
  },
];

// ---- services section cursor ----
export const servicesCursor = {
  text: "Click",
  icon: PiArrowUpRightBold,
};
