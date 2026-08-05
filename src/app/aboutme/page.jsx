import Image from "next/image";
import * as motion from "motion/react-client";
import {
  aboutMetadata,
  aboutHeader,
  aboutSource,
  quranKnowledgeVerse,
} from "@/data";
import { PageHeader, QuranVerse } from "@/components";
import { reveal } from "@/lib";

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
                <motion.section key={id} className="about__me--step">
                  <motion.div
                    className={`about__me--photo about__me--photo-${isOdd}`}
                    variants={reveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                  >
                    <Image
                      src={image}
                      className="about__me--photo-img"
                      width={400}
                      height={400}
                      sizes="(max-width: 768px) 280px, 400px"
                      quality={70}
                      loading={i === 0 ? "eager" : "lazy"}
                      alt={alt}
                    />
                  </motion.div>

                  {/* ---- content ---- */}
                  <motion.div
                    className="about__me--content"
                    variants={reveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                  >
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
                  </motion.div>
                </motion.section>
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
