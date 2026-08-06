export const PAGE_TRANSITION_ENTER_DURATION = 0.28;
export const PAGE_TRANSITION_ENTER_STAGGER = 0.05;
export const PAGE_TRANSITION_HOLD = 0.03;
export const PAGE_TRANSITION_EXIT_DURATION = 0.34;
export const PAGE_TRANSITION_EXIT_STAGGER = 0.06;
export const PAGE_TRANSITION_SHEET_COUNT = 3;

const LAST = PAGE_TRANSITION_SHEET_COUNT - 1;
const ENTER_SPAN =
  LAST * PAGE_TRANSITION_ENTER_STAGGER + PAGE_TRANSITION_ENTER_DURATION;
const EXIT_AT = ENTER_SPAN + PAGE_TRANSITION_HOLD;

export const PAGE_TRANSITION_TOTAL_MS =
  (EXIT_AT +
    LAST * PAGE_TRANSITION_EXIT_STAGGER +
    PAGE_TRANSITION_EXIT_DURATION) *
  1000;

export const PAGE_TRANSITION_DONE_EVENT = "page-transition:done";

export function markPageTransitionDone() {
  document.documentElement.dataset.pageTransition = "done";
  window.dispatchEvent(new CustomEvent(PAGE_TRANSITION_DONE_EVENT));
}
