import * as motion from "motion/react-client";
import { Button } from "@/components";
import { socialLinks } from "@/data";
import { scaleIn, socialLinksStagger, viewportOnce } from "@/lib";

import "./SocialLinks.scss";

function isExternalHref(href) {
  return !href.startsWith("mailto:") && !href.startsWith("tel:");
}

export default function SocialLinks({
  direction = "vertical",
  className = "",
  onItemClick,
}) {
  const tooltipPlacement = direction === "vertical" ? "left" : "top";

  return (
    <motion.div
      className={`social__links social__links--${direction} ${className}`.trim()}
      aria-label="Social links"
      variants={socialLinksStagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {socialLinks.map((link) => {
        const external = isExternalHref(link.href);

        return (
          <motion.span
            key={link.id}
            className="social__links-item"
            variants={scaleIn}
          >
            <Button
              className="social__links-link"
              style={{ "--color-link": link.color }}
              href={link.href}
              icon={<link.icon />}
              aria-label={link.label}
              tooltipPlacement={tooltipPlacement}
              variant="primary"
              size="large"
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              onPress={onItemClick}
            />
          </motion.span>
        );
      })}
    </motion.div>
  );
}
