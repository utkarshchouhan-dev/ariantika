// smooth "ease-out-expo" curve for a premium, settled feel
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

export const viewportOnce = { once: true, amount: 0.29 };

// orchestrates a staggered reveal of children
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export const socialLinksStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.7 },
  },
};

// tighter stagger for dense lists / grids
export const staggerContainerFast = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

// soft blur + lift reveal (default item)
export const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(20px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

// lift reveal without blur — sections, cards, lighter blocks
export const fadeUpLight = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

export const slideInUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(16px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

// blur + lift reveal with per-item delay — pass `custom` index via the `custom` prop
export const fadeUpStagger = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT_EXPO, delay: i * 0.1 },
  }),
};

export const hoverPop = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 0, opacity: 0 },
  hover: { scale: 1, opacity: 1 },
};

// gentle fade with blur, no movement
export const fadeIn = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
  },
};

// springy pop for buttons / cards / icons
export const scaleIn = {
  hidden: { opacity: 0, scale: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 220, damping: 22, mass: 0.9 },
  },
};

// springy pop with upward lift — CTA rows, action groups
export const springPopUp = {
  hidden: { opacity: 0, y: 20, scale: 0, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 220, damping: 22, mass: 0.9 },
  },
};

// playful rotate + scale settle for small icons (pins, markers, etc.)
export const rotateSettle = {
  hidden: { rotate: -12, scale: 0.6 },
  visible: {
    rotate: 4,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 14, delay: 0.25 },
  },
};

// delayed spring pop from zero — floating badges, overlays, labels
export const springPopDelayed = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 12, delay: 0.6 },
  },
};

// cinematic scale + blur reveal for media / images
export const mediaReveal = {
  hidden: { opacity: 0, scale: 0.4, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: EASE_OUT_EXPO },
  },
};

// directional slide reveals (great for alternating layouts)
export const slideInLeft = {
  hidden: { opacity: 0, x: -60, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE_OUT_EXPO },
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 60, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE_OUT_EXPO },
  },
};

// ---- 3D carousel ----
export const CAROUSEL_SIDE_X = "60%";
export const CAROUSEL_SIDE_ROTATE_DEG = 50;
export const CAROUSEL_SIDE_DEPTH = -150;
export const CAROUSEL_SIDE_SCALE = 0.8;
export const DECK_SPREAD_DESKTOP_MEDIA = "(min-width: 1279px)";

export const carouselSlideTransition = {
  type: "spring",
  stiffness: 260,
  damping: 30,
  mass: 0.9,
};

export function getCarouselSlideStates(reduceMotion = false) {
  const sideRotate = reduceMotion ? 0 : CAROUSEL_SIDE_ROTATE_DEG;
  const sideDepth = reduceMotion ? 0 : CAROUSEL_SIDE_DEPTH;

  return {
    active: {
      x: "0%",
      rotateY: 0,
      z: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px) brightness(1)",
      zIndex: 3,
    },
    prev: {
      x: "-60%",
      rotateY: sideRotate,
      z: sideDepth,
      scale: CAROUSEL_SIDE_SCALE,
      opacity: 1,
      filter: "blur(7px) brightness(0.5)",
      zIndex: 2,
    },
    next: {
      x: CAROUSEL_SIDE_X,
      rotateY: -sideRotate,
      z: sideDepth,
      scale: CAROUSEL_SIDE_SCALE,
      opacity: 1,
      filter: "blur(7px) brightness(0.5)",
      zIndex: 2,
    },
  };
}

export const deckSpreadContainer = {
  hidden: {},
  visible: {},
};

const DECK_CENTER_DURATION = 0.9;

const deckSpreadWrapped = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(12px)",
  },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: EASE_OUT_EXPO,
      delay: index * 0.1,
    },
  }),
};

const deckSpreadSideTransition = {
  delay: 0.6 - 0.3,
  duration: 0.3,
  ease: "linear",
};

const deckSpreadCenterTransition = {
  duration: 0.6,
  ease: EASE_OUT_EXPO,
};

export const deckSpreadCard = {
  hidden: ({ index, isDesktop }) => {
    if (!isDesktop) return deckSpreadWrapped.hidden;

    switch (index) {
      case 0:
        return { opacity: 0, x: "100%", zIndex: -1 };
      case 1:
        return { opacity: 0, scale: 0.5, zIndex: 1 };
      case 2:
        return { opacity: 0, x: "-100%", zIndex: -1 };
      default:
        return {};
    }
  },

  visible: ({ index, isDesktop }) => {
    if (!isDesktop) return deckSpreadWrapped.visible(index);

    switch (index) {
      case 0:
        return {
          opacity: 1,
          x: "0%",
          scale: 1,
          zIndex: 1,
          transition: deckSpreadSideTransition,
        };
      case 1:
        return {
          opacity: 1,
          scale: 1,
          zIndex: 2,
          transition: deckSpreadCenterTransition,
        };
      case 2:
        return {
          opacity: 1,
          x: "0%",
          scale: 1,
          zIndex: 1,
          transition: deckSpreadSideTransition,
        };
      default:
        return {};
    }
  },

  hover: {},
};

// sticky bars (header, toolbar) — slide up and fade out when hidden
export const stickyBarReveal = {
  hidden: { y: -150 },
  visible: { y: 0 },
};

export const stickyBarTransition = { duration: 0.7, ease: "easeInOut" };
