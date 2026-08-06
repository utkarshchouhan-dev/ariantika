"use client";

import { useLayoutEffect } from "react";

// ---- view threshold ----
const VIEW_THRESHOLD = 0.29;

// ---- is in viewport ----
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const visibleHeight =
    Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

  return visibleHeight > 0 && visibleHeight / rect.height >= VIEW_THRESHOLD;
}

// ---- reveal element ----
function revealElement(element, observer) {
  element.dataset.inView = "true";
  observer.unobserve(element);
}

// ---- observe reveal elements ----
function observeRevealElements(root, observer, seen) {
  const nodes =
    root instanceof Element
      ? [root, ...root.querySelectorAll("*")]
      : root.querySelectorAll("*");

  nodes.forEach((element) => {
    if (!(element instanceof HTMLElement) || seen.has(element)) return;

    const styles = getComputedStyle(element);
    if (styles.getPropertyValue("--reveal-active").trim() !== "1") return;

    seen.add(element);

    if (styles.getPropertyValue("--reveal-eager").trim() === "1") {
      revealElement(element, observer);
      return;
    }

    if (isInViewport(element)) {
      revealElement(element, observer);
      return;
    }

    observer.observe(element);
  });
}

// ---- reveal observer ----
export default function RevealObserver({ enabled = false }) {
  useLayoutEffect(() => {
    if (!enabled) return undefined;

    const seen = new WeakSet();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealElement(entry.target, observer);
        });
      },
      { threshold: VIEW_THRESHOLD },
    );

    observeRevealElements(document, observer, seen);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            observeRevealElements(node, observer, seen);
          }
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [enabled]);

  return null;
}
