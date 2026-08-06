import Link from "next/link";
import { LuQuote } from "react-icons/lu";

import "./QuranVerse.scss";

// ---- color variants ----
const COLOR_VARIANTS = ["primary", "secondary", "accent"];

export default function QuoteVerse({
  arabic,
  translation,
  source,
  href,
  variant = "secondary",
}) {
  // ---- color variant ----
  const colorVariant = COLOR_VARIANTS.includes(variant) ? variant : "secondary";

  return (
    <section
      className={`quote-verse quote-verse--${colorVariant}`.trim()}
      aria-labelledby="quran-verse-title"
    >
      {/* ---- title ---- */}
      <h2 id="quran-verse-title" className="sr-only">
        Quran Verse
      </h2>

      {/* ---- card ---- */}
      <blockquote className="quote-verse__card">
        {/* ---- icon ---- */}
        <LuQuote className="quote-verse__icon" aria-hidden="true" />
        {/* ---- content ---- */}
        <div className="quote-verse__content">
          <p className="quote-verse__arabic" lang="ar" dir="rtl">
            {arabic}
          </p>

          <p className="quote-verse__translation">{translation}</p>
        </div>

        {/* ---- source ---- */}
        <cite className="quote-verse__source">
          <Link target="_blank" href={href}>
            [{source}]
          </Link>
        </cite>
        <LuQuote className="quote-verse__icon" aria-hidden="true" />
      </blockquote>
    </section>
  );
}
