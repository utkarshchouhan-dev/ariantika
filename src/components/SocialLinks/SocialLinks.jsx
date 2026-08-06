import { Button } from "@/components";
import { socialLinks } from "@/data";

import "./SocialLinks.scss";

// ---- is external href ----
function isExternalHref(href) {
  return !href.startsWith("mailto:") && !href.startsWith("tel:");
}

// ---- social links ----
export default function SocialLinks({
  direction = "vertical",
  className = "",
  onItemClick,
}) {
  const tooltipPlacement = direction === "vertical" ? "left" : "top";

  return (
    <div
      className={`social__links social__links--${direction} ${className}`.trim()}
      aria-label="Social links"
    >
      {socialLinks.map((link) => {
        const external = isExternalHref(link.href);

        return (
          <span key={link.id} className="social__links-item">
            <Button
              className="social__links-link"
              style={{ "--color-link": link.color }}
              href={link.href}
              icon={<link.icon />}
              aria-label={link.label}
              tooltipPlacement={tooltipPlacement}
              variant="primary"
              size="default"
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              onPress={onItemClick}
            />
          </span>
        );
      })}
    </div>
  );
}
