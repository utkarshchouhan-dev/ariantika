import { GrCertificate } from "react-icons/gr";
import {
  LuBadgeCheck,
  LuBookOpenCheck,
  LuListChecks,
  LuMessagesSquare,
  LuShieldCheck,
} from "react-icons/lu";
import { getExperienceDuration } from "@/utils";

const duration = getExperienceDuration();

export const servicesWhyChooseMe = {
  headingId: "why-choose-me-heading",
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
};
