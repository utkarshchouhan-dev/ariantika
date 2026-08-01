export const BUTTON_COLORS = [
  "primary",
  "secondary",
  "tertiary",
  "accent",
  "info",
  "success",
  "warning",
  "danger",
  "neutral",
  "surface",
];

export function resolveButtonColor(color) {
  if (BUTTON_COLORS.includes(color)) {
    return { colorClass: `button--color-${color}`, colorStyle: undefined };
  }

  return {
    colorClass: "button--color-custom",
    colorStyle: { "--button-custom-color": color },
  };
}

export function isInternalHref(href) {
  return (
    typeof href === "string" && href.startsWith("/") && !href.startsWith("//")
  );
}

export function getDownloadAttr(download) {
  if (download === undefined || download === false) return undefined;
  return typeof download === "string" ? download : "";
}
