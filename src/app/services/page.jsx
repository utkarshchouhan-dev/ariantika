import Image from "next/image";
import * as motion from "motion/react-client";
import { PageHeader, SectionHeader, QuranVerse, Button } from "@/components";
import { servicesPage, servicesMetaData } from "@/data";
import {
  fadeUp,
  fadeUpLight,
  scaleIn,
  slideInLeft,
  slideInRight,
  springPopUp,
  staggerContainer,
  staggerContainerFast,
  viewportOnce,
} from "@/lib";
import FAQSection from "./FAQSection";

import "./page.scss";

// ---- services page metadata ----
export const metadata = servicesMetaData;

export default function ServicesPage() {
  const {
    header,
    services,
    quran,
    whyChooseMe: { header: whyChooseHeader, items: whyChooseItems },
    faq: { header: faqHeader },
    contactCta,
  } = servicesPage;

  return (
    <>
      <main id="main" tabIndex={-1} className="services__page">
        {/* ---- page header ---- */}
        <PageHeader header={header} />

        {/* ---- container ---- */}
        <div className="services__page-container">
          {services.map((service, i) => {
            const isReversed = i % 2 === 0;
            const imageVariant = isReversed ? slideInLeft : slideInRight;
            const contentVariant = isReversed ? slideInRight : slideInLeft;

            return (
              <motion.section
                key={service.id}
                id={service.id}
                className={`services__page-section services__page-section--${service.theme}`}
                aria-labelledby={`${service.id}-title`}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                <motion.figure
                  className="services__page--wrapper"
                  variants={imageVariant}
                >
                  <Image
                    className="services__page-image"
                    src={service.image}
                    alt={service.imageAlt}
                    width={1000}
                    height={1000}
                    sizes="(max-width: 1024px) 80vw, 420px"
                  />

                  <figcaption>{service.figcaption}</figcaption>
                </motion.figure>

                <motion.div
                  className="services__page--content"
                  variants={contentVariant}
                >
                  <motion.h2
                    className="services__page-title"
                    id={`${service.id}-title`}
                    variants={fadeUp}
                  >
                    {service.title}:
                  </motion.h2>
                  <motion.p
                    className="services__page-description"
                    variants={fadeUp}
                  >
                    {service.description}
                  </motion.p>

                  <motion.ul
                    className="services__page--items"
                    variants={staggerContainerFast}
                  >
                    {service.list.items.map((item) => (
                      <motion.li
                        key={item}
                        className="services__page-item"
                        variants={fadeUp}
                      >
                        <span
                          className="services__page-item-icon"
                          aria-hidden="true"
                        >
                          <service.list.icon />
                        </span>
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </motion.section>
            );
          })}

          {/* ---- Quran verse ---- */}
          <QuranVerse
            arabic={quran.arabic}
            translation={quran.translation}
            source={quran.source}
            href={quran.href}
            variant="secondary"
          />

          {/* ---- why choose me ---- */}
          <section
            className="services__page--why-choose"
            aria-labelledby="why-choose-me-heading"
          >
            <SectionHeader
              prefix={whyChooseHeader.prefix}
              accent={whyChooseHeader.accent}
              suffix={whyChooseHeader.suffix}
              subtitle={whyChooseHeader.subtitle}
            />

            <motion.ul
              className="services__page--why-choose-grid"
              variants={staggerContainerFast}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {whyChooseItems.map(({ title: itemTitle, icon: Icon }) => (
                <motion.li
                  key={itemTitle}
                  className="services__page--why-choose-item"
                  variants={fadeUp}
                >
                  <span
                    className="services__page--why-choose-iconItem"
                    aria-hidden="true"
                  >
                    <Icon />
                  </span>
                  <h3 className="services__page--why-choose-titleItem">
                    {itemTitle}
                  </h3>
                </motion.li>
              ))}
            </motion.ul>
          </section>

          {/* ---- FAQ section ---- */}
          <section
            className="services__page--faq"
            aria-labelledby="faq-heading"
          >
            <SectionHeader
              prefix={faqHeader.prefix}
              accent={faqHeader.accent}
              subtitle={faqHeader.subtitle}
            />

            <motion.div
              variants={fadeUpLight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <FAQSection />
            </motion.div>
          </section>

          {/* contact section */}
          <section
            className="services__page--contact"
            aria-labelledby="services-contact-heading"
          >
            <motion.div
              className="services__page--contact-card"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <motion.div
                variants={scaleIn}
                className="services__page--contact-avatar"
              >
                <Image
                  className="services__page--contact-avatar-img"
                  src={contactCta.image.src}
                  alt={contactCta.image.alt}
                  width={100}
                  height={100}
                />
              </motion.div>

              <motion.h2
                className="services__page--contact-title"
                id="services-contact-heading"
                variants={fadeUp}
              >
                {contactCta.title}
              </motion.h2>

              <motion.p
                className="services__page--contact-subtitle"
                variants={fadeUp}
              >
                {contactCta.subtitle}
              </motion.p>

              <motion.div variants={springPopUp}>
                <Button
                  className="services__page--contact-button"
                  href={contactCta.cta.href}
                  variant={contactCta.cta.variant}
                  size={contactCta.cta.size}
                  icon={contactCta.cta.icon}
                  aria-label={contactCta.cta.ariaLabel}
                >
                  {contactCta.cta.label}
                </Button>
              </motion.div>
            </motion.div>
          </section>
        </div>
      </main>
    </>
  );
}
