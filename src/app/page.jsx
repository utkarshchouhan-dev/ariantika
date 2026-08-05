import {
  Hero,
  Banner,
  About,
  Services,
  Experience,
  Publication,
  Contact,
} from "@/sections";
import { JsonLd, getProfilePageJsonLd } from "@/lib";
import { QuranVerse } from "@/components";
import { homeMetadata, quranSaveLifeVerse } from "@/data";

import "./page.scss";

export const metadata = homeMetadata;

// ---- home page ----
export default function Home() {
  return (
    <>
      <JsonLd data={getProfilePageJsonLd()} />

      {/* ---- main container ---- */}
      <main id="main" tabIndex={-1} className="home__main">
        {/* ---- hero section ---- */}
        <Hero />

        {/* ---- banner section ---- */}
        <Banner />

        {/* ---- about section ---- */}
        <About />

        {/* ---- services section ---- */}
        <Services />

        {/* ---- experience section ---- */}
        <Experience />

        {/* ---- publication section ---- */}
        <Publication />

        {/* ---- quran save life ---- */}
        <QuranVerse
          arabic={quranSaveLifeVerse.arabic}
          translation={quranSaveLifeVerse.translation}
          source={quranSaveLifeVerse.source}
          href={quranSaveLifeVerse.href}
          variant="primary"
        />

        {/* ---- contact section ---- */}
        <Contact />
      </main>
    </>
  );
}
