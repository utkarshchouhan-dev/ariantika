import * as motion from "motion/react-client";
import { reveal, stagger, viewportOnce } from "@/lib";

import "./PageHeader.scss";

export default function PageHeader({ header, className = "" }) {
  const { eyebrow, title, subtitle } = header;

  return (
    <motion.header
      className={`page__header ${className}`.trim()}
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.span className="page__header-eyebrow" variants={reveal}>
        {eyebrow}
      </motion.span>
      <motion.h1 className="page__header-title" variants={reveal}>
        {title.prefix ? `${title.prefix} ` : null}
        {title.accent ? (
          <span className="page__header-title-accent">{title.accent}</span>
        ) : null}
        {title.suffix ? ` ${title.suffix}` : null}
      </motion.h1>
      <motion.p className="page__header-subtitle" variants={reveal}>
        {subtitle}
      </motion.p>
      <div
        className="custom-shape-divider-bottom-1785504141"
        variants={reveal}
        aria-hidden="true"
      >
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </motion.header>
  );
}
