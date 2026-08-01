import Link from "next/link";
import { LuQuote } from "react-icons/lu";
import * as motion from "motion/react-client";
import { fadeUp, viewportOnce } from "@/lib";

import "./QuranVerse.scss";

const COLOR_VARIANTS = ["primary", "secondary", "accent"];

export default function QuoteVerse({
  arabic,
  translation,
  source,
  href,
  variant = "secondary",
}) {
  const colorVariant = COLOR_VARIANTS.includes(variant) ? variant : "secondary";

  return (
    <motion.section
      variants={{
        hidden: {
          filter: "blur(16px)",
          opacity: 0,
          scaleX: 0.95,
          translateY: "20px",
        },
        visible: {
          filter: "blur(0)",
          opacity: 1,
          scaleX: 1,
          translateY: 0,
          transition: { duration: 0.5, ease: "linear" },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={`quote-verse quote-verse--${colorVariant}`.trim()}
      aria-labelledby="quran-verse-title"
    >
      <h2 id="quran-verse-title" className="sr-only">
        Quran Verse
      </h2>

      <blockquote className="quote-verse__card">
        <LuQuote className="quote-verse__icon" aria-hidden="true" />
        <div className="quote-verse__content">
          <motion.p
            className="quote-verse__arabic"
            lang="ar"
            dir="rtl"
            variants={fadeUp}
          >
            {arabic}
          </motion.p>

          <motion.p className="quote-verse__translation" variants={fadeUp}>
            {translation}
          </motion.p>
        </div>

        <motion.cite className="quote-verse__source" variants={fadeUp}>
          <Link target="_blank" href={href}>
            [{source}]
          </Link>
        </motion.cite>
        <LuQuote className="quote-verse__icon" aria-hidden="true" />
      </blockquote>
    </motion.section>
  );
}
