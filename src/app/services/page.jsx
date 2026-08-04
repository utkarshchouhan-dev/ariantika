import { PageHeader, QuranVerse, ContactCta } from "@/components";
import {
  servicesMetadata,
  servicesHeader,
  quranTrustsVerse,
  servicesContact,
} from "@/data";
import ServiceOfferings from "./ServiceOfferings/ServiceOfferings";
import WhyChooseMe from "./WhyChooseMe/WhyChooseMe";
import FAQ from "./FAQ/FAQ";

import "./page.scss";

export const metadata = servicesMetadata;

export default function ServicesPage() {
  const { pageHeader } = servicesHeader;

  return (
    <main id="main" tabIndex={-1} className="services__page">
      {/* ---- page header ---- */}
      <PageHeader header={pageHeader} />

      <div className="services__page-container">
        {/* ---- service offerings ---- */}
        <ServiceOfferings />

        {/* ---- quran verse ---- */}
        <QuranVerse
          arabic={quranTrustsVerse.arabic}
          translation={quranTrustsVerse.translation}
          source={quranTrustsVerse.source}
          href={quranTrustsVerse.href}
          variant="secondary"
        />

        {/* ---- why choose me ---- */}
        <WhyChooseMe />

        {/* ---- faq ---- */}
        <FAQ />

        {/* ---- contact cta ---- */}
        <ContactCta
          image={servicesContact.image}
          title={servicesContact.title}
          subtitle={servicesContact.subtitle}
          cta={servicesContact.cta}
          headingId={servicesContact.headingId}
        />
      </div>
    </main>
  );
}
