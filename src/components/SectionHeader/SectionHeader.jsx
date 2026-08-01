import * as motion from "motion/react-client";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib";

import "./SectionHeader.scss";

// ---- section header component ----
export default function SectionHeader({
  accentTag = "span",
  headingId,
  prefix,
  accent,
  suffix,
  subtitle,
  className = "",
}) {
  // ---- accent tag ----
  const Accent = accentTag === "small" ? "small" : "span";

  return (
    // ---- section header ----
    <motion.header
      className={`section__header ${className}`.trim()}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {/* ---- title ---- */}
      <motion.h2
        className="section__header-title"
        id={headingId}
        variants={fadeUp}
      >
        {prefix}
        {accent ? (
          <Accent className="section__header-title-accent">{accent}</Accent>
        ) : null}
        {suffix ? ` ${suffix}` : null}
        <span className="sr-only">.</span>
      </motion.h2>

      {/* ---- subtitle ---- */}
      {subtitle ? (
        <motion.p className="section__header-subtitle" variants={fadeUp}>
          {subtitle}
        </motion.p>
      ) : null}
    </motion.header>
  );
}
