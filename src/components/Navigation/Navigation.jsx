"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components";

import "./Navigation.scss";

// ---- navigation links ----
const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/aboutme" },
  { label: "Services", href: "/services" },
  { label: "Publications", href: "/publications" },
  { label: "Contact", href: "/contact" },
];

// ---- navigation ----
export default function Navigation({
  className = "",
  direction = "horizontal",
  animated = false,
  onNavigate,
}) {
  // ---- pathname ----
  const pathname = usePathname();

  // ---- is active ----
  const isActive = (href) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  // ---- is vertical ----
  const isVertical = direction === "vertical";

  // ---- list class name ----
  const listClassName = `navigation__list ${
    isVertical ? "navigation__list--vertical" : ""
  }${animated ? " navigation__list--animated" : ""}`.trim();

  // ---- return navigation ----
  return (
    <nav className={`navigation navigation--${direction} ${className}`.trim()}>
      <ul className={listClassName}>
        {/* ---- links ---- */}
        {links.map((link) => {
          // ---- is active ----
          const active = isActive(link.href);

          return (
            <li className="navigation__list--item" key={link.href}>
              <Button
                href={link.href}
                variant="ghost"
                size="default"
                className="navigation__list--link"
                aria-current={active ? "page" : undefined}
                onPress={onNavigate}
              >
                {link.label}
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
