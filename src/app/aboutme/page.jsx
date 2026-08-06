import Image from "next/image";
import {
  aboutMetadata,
  aboutHeader,
  aboutSource,
  quranKnowledgeVerse,
} from "@/data";
import { PageHeader, QuranVerse } from "@/components";

import "./page.scss";

// ---- about me metadata ----
export const metadata = aboutMetadata;

// ---- about me page ----
export default function AboutMe() {
  const { pageHeader } = aboutHeader;
  const { aboutPageSteps } = aboutSource;
  const quote = quranKnowledgeVerse;
  return (
    <>
      <main id="main" tabIndex={-1} className="about__me">
        {/* ---- header ---- */}
        <PageHeader header={pageHeader} />

        <div className="about__me-container">
          {/* ---- steps list ---- */}
          <div className="about__me-steps">
            {aboutPageSteps.map((step, i) => {
              const isOdd = i % 2 === 0 ? "odd" : "";
              const { id, title, image, alt, icon: Icon, text } = step;

              return (
                <section key={id} className="about__me--step">
                  <div className={`about__me--photo about__me--photo-${isOdd}`}>
                    <Image
                      src={image}
                      className="about__me--photo-img"
                      fill
                      sizes="(max-width: 700px) 280px, (max-width: 1000px) 40vw, 400px"
                      quality={65}
                      loading={i === 0 ? "eager" : "lazy"}
                      alt={alt}
                    />
                  </div>

                  {/* ---- content ---- */}
                  <div className="about__me--content">
                    <h2
                      className={`about__me--content-title about__me--content-title-${isOdd}`}
                    >
                      <span
                        className={`about__me--content-icon about__me--content-icon-${isOdd}`}
                        aria-hidden="true"
                      >
                        <Icon />
                      </span>

                      {title}
                    </h2>

                    <p className="about__me--content-text">{text}</p>
                  </div>
                </section>
              );
            })}
          </div>

          {/* ---- Quran verse ---- */}
          <QuranVerse
            arabic={quote.arabic}
            translation={quote.translation}
            source={quote.source}
            href={quote.href}
            variant="accent"
          />
        </div>
      </main>
    </>
  );
}
