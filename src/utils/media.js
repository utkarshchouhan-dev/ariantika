// Matches src/assets/styles/tokens/_breakpoints.scss
export const BREAKPOINTS = {
  sm: 450,
  md: 768,
  lg: 1024,
  xl: 1279,
  xxl: 1536,
};

export function mediaUp(name) {
  return `(min-width: ${BREAKPOINTS[name] + 1}px)`;
}

export function mediaDown(name) {
  return `(max-width: ${BREAKPOINTS[name]}px)`;
}

export function mediaBetween(min, max) {
  return `(min-width: ${BREAKPOINTS[min] + 1}px) and (max-width: ${BREAKPOINTS[max]}px)`;
}

export const mediaQueries = {
  mobile: mediaDown("md"),
  tablet: mediaBetween("md", "lg"),
  desktop: mediaUp("md"),
  largeDesktop: mediaUp("lg"),
  deckDesktop: mediaUp("xl"),
};

export function matchesMedia(query) {
  if (typeof window === "undefined") return false;
  return window.matchMedia(query).matches;
}

export function isMobile() {
  return matchesMedia(mediaQueries.mobile);
}

export function isTablet() {
  return matchesMedia(mediaQueries.tablet);
}

export function isDesktop() {
  return matchesMedia(mediaQueries.desktop);
}

export function isLargeDesktop() {
  return matchesMedia(mediaQueries.largeDesktop);
}

export function isDeckDesktop() {
  return matchesMedia(mediaQueries.deckDesktop);
}
