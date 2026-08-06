export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

const DURATION = 0.8;
const BLUR = 12;
const LIFT = 30;
const EASE_TRANSITION = { duration: DURATION, ease: EASE_OUT_EXPO };
const BLUR_HIDDEN = `blur(${BLUR}px)`;
const BLUR_VISIBLE = "blur(0px)";

export const viewportOnce = { once: true, amount: 0.29 };

const reveal = {
  hidden: { opacity: 0, y: LIFT, filter: BLUR_HIDDEN },
  visible: {
    opacity: 1,
    y: 0,
    filter: BLUR_VISIBLE,
    transition: EASE_TRANSITION,
  },
};

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

export const hoverCursor = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 0, opacity: 0 },
  hover: { scale: 1, opacity: 1 },
};
