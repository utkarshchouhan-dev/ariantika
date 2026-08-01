import { aboutCarouselStepIds } from "./config";
import { aboutMePageStepsSource } from "./source";

// ---- about steps by id ----
export const aboutMePageStepsById = Object.fromEntries(
  aboutMePageStepsSource.map((step) => [step.id, step]),
);

// ---- about carousel ----
export const aboutMePageCarousel = aboutCarouselStepIds
  .map((id) => aboutMePageStepsById[id])
  .filter(Boolean)
  .map(({ image, alt, caption }) => ({
    src: image,
    alt,
    caption,
  }));
