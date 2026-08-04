import { isDesktop } from "@/utils";

// ---- tokens ----
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

const DURATION = 0.8;
const BLUR = 12;
const LIFT = 30;
const SLIDE_X = 60;
const STAGGER_STEP = 0.1;
const SPRING = { type: "spring", stiffness: 220, damping: 22, mass: 0.9 };
const EASE_TRANSITION = { duration: DURATION, ease: EASE_OUT_EXPO };
const BLUR_HIDDEN = `blur(${BLUR}px)`;
const BLUR_VISIBLE = "blur(0px)";

export const viewportOnce = { once: true, amount: 0.29 };

function createStagger() {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: STAGGER_STEP,
        delayChildren: STAGGER_STEP,
      },
    },
  };
}

const DECK_SIDE_OFFSET = {
  0: "100%",
  2: "-100%",
};

const DECK_VISIBLE = {
  side: {
    opacity: 1,
    x: "0%",
    scale: 1,
    zIndex: 1,
    transition: EASE_TRANSITION,
  },
  center: {
    opacity: 1,
    scale: 1,
    zIndex: 2,
    transition: EASE_TRANSITION,
  },
};

// ---- stagger ----
export const stagger = createStagger();

// ---- reveals ----
export const reveal = {
  hidden: { opacity: 0, y: LIFT, filter: BLUR_HIDDEN },
  visible: {
    opacity: 1,
    y: 0,
    filter: BLUR_VISIBLE,
    transition: EASE_TRANSITION,
  },
};

// parent shell — triggers children; pair with revealStagger + custom index
export const staggerList = {
  hidden: {},
  visible: {},
};

// child reveal with per-index delay — pass custom={index} on each item
export const revealStagger = {
  hidden: reveal.hidden,
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    filter: BLUR_VISIBLE,
    transition: {
      ...EASE_TRANSITION,
      delay: index * STAGGER_STEP,
    },
  }),
};

export const revealSpring = {
  hidden: { opacity: 0, scale: 0, filter: BLUR_HIDDEN },
  visible: {
    opacity: 1,
    scale: 1,
    filter: BLUR_VISIBLE,
    transition: SPRING,
  },
};

export const revealRotate = {
  hidden: { rotate: -12, scale: 0.6 },
  visible: {
    rotate: 4,
    scale: 1,
    transition: SPRING,
  },
};

export const revealMedia = {
  hidden: { opacity: 0, scale: 0.4, filter: BLUR_HIDDEN },
  visible: {
    opacity: 1,
    scale: 1,
    filter: BLUR_VISIBLE,
    transition: EASE_TRANSITION,
  },
};

function createSlideReveal(side) {
  const offset = side === "left" ? -SLIDE_X : SLIDE_X;
  const slideHidden = { opacity: 0, x: offset, filter: BLUR_HIDDEN };
  const slideVisible = {
    opacity: 1,
    x: 0,
    filter: BLUR_VISIBLE,
    transition: EASE_TRANSITION,
  };

  return {
    hidden: () => (isDesktop() ? slideHidden : reveal.hidden),
    visible: () => (isDesktop() ? slideVisible : reveal.visible),
  };
}

export const revealSlideLeft = createSlideReveal("left");
export const revealSlideRight = createSlideReveal("right");

export const revealDeck = {
  hidden: ({ index, isDesktop: isDeckLayout } = {}) => {
    if (!isDeckLayout) return reveal.hidden;

    if (index === 1) {
      return { opacity: 0, scale: 0.5, zIndex: 1 };
    }

    const x = DECK_SIDE_OFFSET[index];
    if (x) {
      return { opacity: 0, x, zIndex: -1 };
    }

    return {};
  },

  visible: ({ index, isDesktop: isDeckLayout } = {}) => {
    if (!isDeckLayout) return reveal.visible;

    if (index === 1) return DECK_VISIBLE.center;
    if (DECK_SIDE_OFFSET[index]) return DECK_VISIBLE.side;

    return {};
  },

  hover: {},
};

export const revealBar = {
  hidden: { y: -150 },
  visible: { y: 0 },
};

export const barTransition = EASE_TRANSITION;

// ---- interaction ----
export const hoverCursor = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 0, opacity: 0 },
  hover: { scale: 1, opacity: 1 },
};
