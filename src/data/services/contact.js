import { PiArrowUpRightBold } from "react-icons/pi";
import heroPortrait from "@/assets/images/hero/ariantika-hero-portrait.jpeg";

export const servicesContact = {
  headingId: "services-contact-heading",
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
    icon: PiArrowUpRightBold,
    variant: "primary",
    size: "small",
    ariaLabel: "Go to contact page.",
  },
};
