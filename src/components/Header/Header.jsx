"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import * as motion from "motion/react-client";
import { Logo, Navigation, Menu, Button } from "@/components";
import { useHideOnScrollDown, useMediaQuery } from "@/hooks";
import { revealBar, barTransition } from "@/lib";
import { mediaQueries } from "@/utils";

import "./Header.scss";

export default function Header() {
  const pathname = usePathname();
  const isMobileNav = useMediaQuery(mediaQueries.mobile);

  const [isMounted, setIsMounted] = useState(false);
  const headerRef = useRef(null);
  const hidden = useHideOnScrollDown();

  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);
  const isMobileMenuOpen = isMobileNav && menuOpen;

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <motion.header
      ref={headerRef}
      data-react-aria-top-layer=""
      variants={revealBar}
      initial="hidden"
      animate={hidden ? "hidden" : "visible"}
      transition={barTransition}
      className={`header ${isMobileMenuOpen ? "header--mobile-menu-open" : ""}`}
    >
      <div
        className={`header__container ${isMobileMenuOpen ? "header__container--mobile-menu-open" : ""}`}
      >
        {/* logo */}
        <Logo />

        {/* menu open button */}
        {isMounted && isMobileNav ? (
          <Button
            type="button"
            variant="secondary"
            className={`header__menu-open ${
              isMobileMenuOpen ? "header__menu-open--active" : ""
            }`}
            aria-expanded={isMobileMenuOpen}
            aria-haspopup="dialog"
            aria-controls={
              isMobileMenuOpen ? "site-navigation-menu" : undefined
            }
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            onPress={toggleMenu}
          >
            <span className="header__menu-line" aria-hidden="true" />
            <span className="header__menu-line" aria-hidden="true" />
            <span className="header__menu-line" aria-hidden="true" />
          </Button>
        ) : null}

        {/* navigation */}
        {isMounted && !isMobileNav ? (
          <Navigation className="header__navigation" />
        ) : null}
      </div>

      {/* mobile menu */}
      <Menu isOpen={isMobileMenuOpen} onClose={closeMenu} />
    </motion.header>
  );
}
