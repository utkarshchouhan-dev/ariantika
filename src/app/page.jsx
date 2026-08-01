import {
  Hero,
  Banner,
  About,
  Services,
  Experience,
  Research,
  Contact,
} from "@/sections";

// import { QuoteVerse } from "@/components";
// import { quranSaveLifeVerse } from "@/data";

import "./page.scss";

// ---- home page ----
export default function Home() {
  return (
    <>
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

        {/* ---- research section ---- */}
        <Research />

        {/* ---- contact section ---- */}
        <Contact />
      </main>
    </>
  );
}

// {/* ---- quote verse section ----
//       <QuoteVerse
//         arabic={quranSaveLifeVerse.arabic}
//         translation={quranSaveLifeVerse.translation}
//         source={quranSaveLifeVerse.source}
//         href={quranSaveLifeVerse.href}
//         variant="primary"
//       /> */}
