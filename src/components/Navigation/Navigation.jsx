"use client";

import * as motion from "motion/react-client";
import { usePathname } from "next/navigation";
import { Button } from "@/components";
import { reveal } from "@/lib";

import "./Navigation.scss";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/aboutme" },
  { label: "Services", href: "/services" },
  { label: "Research", href: "/research" },
  { label: "Contact", href: "/contact" },
];

const listStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export default function Navigation({
  className = "",
  direction = "horizontal",
  animated = false,
  onNavigate,
}) {
  const pathname = usePathname();

  const isActive = (href) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const isVertical = direction === "vertical";

  const listClassName = `navigation__list ${
    isVertical ? "navigation__list--vertical" : ""
  }`.trim();

  const items = links.map((link) => {
    const active = isActive(link.href);
    const button = (
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
    );

    if (!animated) {
      return (
        <li className="navigation__list--item" key={link.href}>
          {button}
        </li>
      );
    }

    return (
      <motion.li
        className="navigation__list--item"
        key={link.href}
        variants={reveal}
      >
        {button}
      </motion.li>
    );
  });

  return (
    <nav className={`navigation navigation--${direction} ${className}`.trim()}>
      {animated ? (
        <motion.ul
          className={listClassName}
          variants={listStagger}
          initial="hidden"
          animate="visible"
        >
          {items}
        </motion.ul>
      ) : (
        <ul className={listClassName}>{items}</ul>
      )}
    </nav>
  );
}
