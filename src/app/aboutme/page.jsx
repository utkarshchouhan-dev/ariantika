import Image from "next/image";
import * as motion from "motion/react-client";
import { aboutMetadata, aboutMePageSteps } from "@/data";
import { PageHeader, QuranVerse } from "@/components";
import { fadeUp, slideInLeft, slideInRight } from "@/lib";

import "./page.scss";

// ---- about me metadata ----
export const metadata = aboutMetadata;

// ---- about me page ----
export default function AboutMe() {
  const { header, steps, quote } = aboutMePageSteps;
  return (
    <>
      <main id="main" tabIndex={-1} className="about__me">
        {/* ---- header ---- */}
        <PageHeader header={header} />

        <div className="about__me-container">
          {/* ---- steps list ---- */}
          <div className="about__me-steps">
            {steps.map((step, i) => {
              const isOdd = i % 2 === 0 ? "odd" : "";
              const photoVariant = isOdd === "odd" ? slideInRight : slideInLeft;
              const contentVariant =
                isOdd === "odd" ? slideInLeft : slideInRight;
              const IconVariant = step.icon;

              return (
                <motion.section key={step.id} className="about__me--step">
                  <motion.div
                    className={`about__me--photo about__me--photo-${isOdd}`}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                  >
                    <Image
                      src={step.image}
                      className="about__me--photo-img"
                      width={800}
                      height={800}
                      sizes="(max-width: 768px) 100vw, 800px"
                      alt={step.alt}
                    />
                  </motion.div>

                  {/* ---- content ---- */}
                  <motion.div
                    className="about__me--content"
                    variants={fadeUp}
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
                        <IconVariant />
                      </span>

                      {step.title}
                    </h2>

                    <p className="about__me--content-text">{step.text}</p>
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
