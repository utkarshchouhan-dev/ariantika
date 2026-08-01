import { BiSolidVirus } from "react-icons/bi";

// ---- banner section ----
export const banner = {
  ariaLabel: "Research expertise marquee",

  items: [
    "Epidemiology",
    "Biostatistics",
    "Public Health",
    "Cancer Research",
    "Infectious Diseases",
    "Data-Driven Insights",
    "Healthcare Impact",
  ],

  marquee: {
    repeatCount: 2,
    scrollSpeed: 80,
  },

  separator: {
    icon: BiSolidVirus,
    ariaLabel: "Separator",
  },
};
