"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaArrowUp } from "react-icons/fa6";
import Button from "@/components/Button/Button";

import "./BackToTop.scss";

const MIN_PAGE_HEIGHT = 800;

// ---- here is the page height ----
function getPageHeight() {
  return Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight,
  );
}

// ---- back to top ----
export default function BackToTop() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [isTallPage, setIsTallPage] = useState(false);

  // ---- measure page height ----
  useEffect(() => {
    const measure = () => {
      setIsTallPage(getPageHeight() > MIN_PAGE_HEIGHT);
    };

    measure();
    const frame = requestAnimationFrame(measure);

    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
    };
  }, [pathname]);

  // ---- check if page is tall ----
  useEffect(() => {
    if (!isTallPage) return undefined;

    const onScroll = () => {
      setVisible(window.scrollY > MIN_PAGE_HEIGHT);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [isTallPage]);

  if (!isTallPage) return null;

  // ---- scroll to top ----
  const scrollToTop = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <div
      className={`back-to-top${visible ? " back-to-top--visible" : ""}`.trim()}
    >
      <Button
        variant="primary"
        color="primary"
        size="large"
        icon={<FaArrowUp />}
        label="Back to top"
        aria-label="Back to top"
        onPress={scrollToTop}
        className="back-to-top__button"
      />
    </div>
  );
}
